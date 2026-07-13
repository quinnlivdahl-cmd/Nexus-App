"use client";

import { useEffect, useMemo, useState } from "react";
import rawSnapshot from "./data/project-snapshot.json";
import {
  assembleLaunchPacket,
  averageMaturity,
  displayMaturity,
  scoreFor,
  type ContextBundleManifestEntry,
  type LaunchInput,
  type ProjectSnapshot,
} from "./lib/project-control";

const snapshot = rawSnapshot as ProjectSnapshot;
const tabs = ["Roadmap", "Tickets", "Worktrees", "Vision", "Launch"] as const;
type Tab = (typeof tabs)[number];

function formatDate(value: string) {
  if (value === "Not yet verified") return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "UTC", timeZoneName: "short" }).format(new Date(value));
}

function statusClass(status: string) {
  return status.replace(/\s+/g, "-").toLowerCase();
}

function ticketLabel(ticket: ProjectSnapshot["tickets"][number]) {
  return `${ticket.title} #${ticket.id}`;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("Roadmap");
  const [attentionOpen, setAttentionOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [launch, setLaunch] = useState<LaunchInput>({ entryType: "ticket", entryId: "31", intent: "", worktreeId: "clean-review" });
  const [approved, setApproved] = useState(false);
  const [focusedStageId, setFocusedStageId] = useState(snapshot.roadmapStages[0]?.id ?? "");

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("tab");
    if (selected && tabs.includes(selected[0].toUpperCase() + selected.slice(1).toLowerCase() as Tab)) {
      const selectedTab = selected[0].toUpperCase() + selected.slice(1).toLowerCase() as Tab;
      const timer = window.setTimeout(() => setActiveTab(selectedTab), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function selectTab(tab: Tab) {
    setActiveTab(tab);
    window.history.replaceState({}, "", `?tab=${tab.toLowerCase()}`);
  }

  function updateLaunch(nextLaunch: LaunchInput) {
    setApproved(false);
    setLaunch(nextLaunch);
  }

  function openLaunchPacket(nextLaunch: LaunchInput) {
    updateLaunch(nextLaunch);
    selectTab("Launch");
  }

  function announce(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  }

  async function copy(value: string, message: string) {
    try {
      await navigator.clipboard.writeText(value);
      announce(message);
    } catch {
      announce("Copy was blocked. Select the packet text instead.");
    }
  }

  const overall = averageMaturity(snapshot.roadmapStages);
  const packet = useMemo(() => assembleLaunchPacket(snapshot, launch), [launch]);
  const selectedStage = launch.entryType === "stage" ? snapshot.roadmapStages.find((stage) => stage.id === launch.entryId) : undefined;
  const focusedStage = snapshot.roadmapStages.find((stage) => stage.id === focusedStageId) ?? snapshot.roadmapStages[0];
  const contextBundle = snapshot.contextBundle;
  const contextEntries: ContextBundleManifestEntry[] = contextBundle.manifestEntries;

  return (
    <main>
      <p className={notice ? "toast" : "sr-only"} role="status" aria-live="polite">{notice}</p>
      <header className="topbar">
        <button className="brand" onClick={() => selectTab("Roadmap")} aria-label="Open Nexus Project Control roadmap">
          <span className="brand-mark">N</span><span>Nexus Project Control</span>
        </button>
        <nav aria-label="Project Control views">
          {tabs.map((tab) => <button className={activeTab === tab ? "active" : ""} aria-current={activeTab === tab ? "page" : undefined} onClick={() => selectTab(tab)} key={tab}>{tab}</button>)}
        </nav>
        <button className="snapshot-button" onClick={() => announce("This local snapshot was generated from declared sources. Use Refresh Snapshot in a Codex packet to regenerate it.")}>Project Snapshot · {formatDate(snapshot.generatedAt)}</button>
      </header>

      <section className="overview" aria-label="Project overview">
        <div><p className="eyebrow">PRIVATE OWNER-ONLY COMMAND CENTER</p><h1>Nexus Game</h1><p>Spatial party RPG development, projected from authoritative systems — never substituted for them.</p></div>
        <dl className="overview-metrics">
          <div><dt>Overall maturity</dt><dd>{overall}%</dd><small>equal-weight player loop</small></div>
          <div><dt>Snapshot health</dt><dd className={`signal ${snapshot.freshness.status}`}>{snapshot.freshness.status}</dd><small>{snapshot.freshness.thresholdHours}h attention threshold</small></div>
          <div><dt>Worktrees</dt><dd>{snapshot.worktrees.length}</dd><small>{snapshot.worktrees.filter((tree) => tree.health === "clean").length} clean · {snapshot.worktrees.filter((tree) => tree.health === "dirty").length} need attention</small></div>
          <div><dt>Open decisions</dt><dd>{snapshot.decisions.length}</dd><small>prioritized by player-loop impact</small></div>
        </dl>
      </section>

      <section className="command-strip" aria-label="Project actions">
        <button aria-expanded={attentionOpen} aria-controls="attention-queue" onClick={() => setAttentionOpen(!attentionOpen)}>{snapshot.attention.length} attention items</button>
        <span>Snapshot: {formatDate(snapshot.generatedAt)}</span>
        <span>Ticket state: local mirror · stale</span>
        <button onClick={() => openLaunchPacket({ entryType: "freeform", entryId: "", intent: "Refresh the deterministic Nexus Project Snapshot from declared sources.", worktreeId: "clean-review" })}>Refresh Snapshot packet</button>
      </section>

      {attentionOpen && <aside className="attention-drawer" id="attention-queue" aria-label="Attention queue">
        <div className="section-title"><p className="eyebrow">UNIFIED ATTENTION QUEUE</p><h2>What needs a human or Codex next</h2></div>
        <div className="attention-grid">{snapshot.attention.map((item) => <button key={item.id} onClick={() => selectTab(item.tab[0].toUpperCase() + item.tab.slice(1) as Tab)} className={item.severity}><strong>{item.title}</strong><span>{item.detail}</span><small>Open {item.tab}</small></button>)}</div>
      </aside>}

      {activeTab === "Roadmap" && <section className="tab-content roadmap-view" id="roadmap">
        <div className="section-title"><p className="eyebrow">PLAYER LOOP ROADMAP</p><h2>The experience is the timeline.</h2><p>No invented dates. Each percentage represents demonstrated maturity, not effort consumed.</p></div>
        <div className="roadmap-line" aria-label="Seven stage player loop">
          {snapshot.roadmapStages.map((stage, index) => <article className={focusedStage?.id === stage.id ? "stage-card focused" : "stage-card"} key={stage.id}>
            <span className="stage-number">0{index + 1}</span><p className="eyebrow">{displayMaturity(stage.maturity)}</p><h3>{stage.name}</h3><p>{stage.summary}</p>
            <div className="maturity"><span style={{ width: `${scoreFor(stage.maturity)}%` }} /><strong>{scoreFor(stage.maturity)}%</strong></div>
            <div className="stage-actions"><button aria-pressed={focusedStage?.id === stage.id} aria-controls="stage-detail" onClick={() => setFocusedStageId(stage.id)}>View detail</button><button onClick={() => openLaunchPacket({ entryType: "stage", entryId: stage.id, intent: "", worktreeId: stage.worktreeIds[0] ?? "clean-review" })}>Build packet</button></div>
          </article>)}
        </div>
        {focusedStage && <aside className="stage-detail" id="stage-detail" aria-live="polite" aria-labelledby="stage-detail-title">
          <div className="stage-detail-heading"><p className="eyebrow">FOCUSED STAGE · {displayMaturity(focusedStage.maturity)} {scoreFor(focusedStage.maturity)}%</p><h3 id="stage-detail-title">{focusedStage.name}</h3><p>{focusedStage.summary}</p></div>
          <dl>
            <div><dt>Loop dependency</dt><dd>{snapshot.roadmapStages.findIndex((stage) => stage.id === focusedStage.id) > 0 ? `Follows ${snapshot.roadmapStages[snapshot.roadmapStages.findIndex((stage) => stage.id === focusedStage.id) - 1].name} in the player loop; no explicit blocking edge is recorded.` : "Opening player-loop stage; no explicit blocking edge is recorded."}</dd></div>
            <div><dt>Evidence</dt><dd>{focusedStage.evidence}</dd></div>
            <div><dt>Tickets</dt><dd>{focusedStage.ticketIds.length ? focusedStage.ticketIds.map((id) => { const ticket = snapshot.tickets.find((item) => item.id === id); return ticket ? ticketLabel(ticket) : `Unresolved ticket ${id}`; }).join(" · ") : "No ticket mapped"}</dd></div>
            <div><dt>Worktrees</dt><dd>{focusedStage.worktreeIds.length ? focusedStage.worktreeIds.map((id) => snapshot.worktrees.find((tree) => tree.id === id)?.purpose ?? `Unresolved worktree ${id}`).join(" · ") : "No worktree mapped"}</dd></div>
            <div><dt>Blockers & decisions</dt><dd>{focusedStage.decisionIds.length ? focusedStage.decisionIds.map((id) => { const decision = snapshot.decisions.find((item) => item.id === id); return decision ? `${decision.title} — ${decision.blocker}` : `Unresolved decision ${id}`; }).join(" · ") : "No blocking decision mapped"}</dd></div>
          </dl>
        </aside>}
        <div className="evidence-panel"><strong>Maturity scale</strong><span>Unframed 0% · Defined 20% · Prototyped 40% · Validated 60% · Integrated 80% · Playable 100%</span></div>
      </section>}

      {activeTab === "Tickets" && <section className="tab-content" id="tickets">
        <div className="section-title"><p className="eyebrow">TICKET MIRROR</p><h2>Execution packets, with vision alignment visible.</h2><p>GitHub Issues remain authoritative. This local mirror is stale and must be verified before work starts.</p></div>
        <div className="ticket-list">{snapshot.tickets.map((ticket) => <article key={ticket.id}>
          <div><span className="issue-number">GitHub execution packet</span><h3>{ticketLabel(ticket)}</h3><p>{ticket.note}</p><div className="relationship-line"><strong>Stage</strong> {ticket.stageIds.map((id) => snapshot.roadmapStages.find((stage) => stage.id === id)?.name ?? `Unresolved ${id}`).join(" · ") || "Not mapped"}</div></div>
          <div className="ticket-meta"><span className={"alignment " + statusClass(ticket.alignment)}>{ticket.alignment.replace(/-/g, " ")}</span><small><strong>Queue role / readiness</strong> {ticket.state.replace(/^mirror:\s*/, "")} · local mirror</small><small><strong>Freshness</strong> {ticket.freshness} · {ticket.owner}</small><small><strong>Dependencies</strong> No explicit ticket edges recorded</small><small><strong>Local progress</strong> {ticket.worktreeIds.length ? ticket.worktreeIds.map((id) => { const tree = snapshot.worktrees.find((item) => item.id === id); return tree ? `${tree.purpose} (${tree.health})` : `Unresolved ${id}`; }).join(" · ") : "No worktree mapped"}</small></div>
          <div className="ticket-actions"><a href={ticket.githubUrl} target="_blank" rel="noreferrer">Open on GitHub</a><button onClick={() => openLaunchPacket({ entryType: "ticket", entryId: String(ticket.id), intent: "", worktreeId: ticket.worktreeIds[0] ?? "clean-review" })}>Launch packet</button></div>
        </article>)}</div>
      </section>}

      {activeTab === "Worktrees" && <section className="tab-content" id="worktrees">
        <div className="section-title"><p className="eyebrow">WORKTREE MONITOR</p><h2>Isolated work, shown with its health.</h2><p>Paths are intentionally redacted in the public-facing interface layer; this is a snapshot, not a live filesystem watcher.</p></div>
        <div className="worktree-table"><div className="worktree-head"><span>Role & purpose</span><span>Branch</span><span>Health</span><span>Activity & links</span><span>Action</span></div>{snapshot.worktrees.map((tree) => <article key={tree.id}>
          <div><strong>{tree.purpose}</strong><small>{tree.id === "main" ? "Primary checkout" : tree.id === "clean-review" ? "Review / integration checkout" : tree.declarationStatus === "discovered" ? "Discovered local checkout" : "Isolated prototype checkout"}</small><small>{tree.displayPath} · {tree.freshness}</small></div><code>{tree.branch}</code><span className={"health " + tree.health}>{tree.health}</span><div className="worktree-activity"><span>{tree.activity}</span><small>Upstream: {tree.upstream ?? "not configured"}</small><small>Divergence: {tree.ahead === null || tree.behind === null ? "unknown in this snapshot" : `ahead ${tree.ahead} · behind ${tree.behind}`}</small><small>Tickets: {tree.ticketIds.length ? tree.ticketIds.map((id) => { const ticket = snapshot.tickets.find((item) => item.id === id); return ticket ? ticketLabel(ticket) : `Unresolved ${id}`; }).join(" · ") : "none mapped"}</small><small>Observed {formatDate(tree.observedAt)} · {tree.freshness}</small></div><button onClick={() => openLaunchPacket({ entryType: "freeform", entryId: "", intent: `Review the current health and safe next action for ${tree.purpose}.`, worktreeId: tree.id })}>Review with Codex</button>
        </article>)}</div>
      </section>}

      {activeTab === "Vision" && <section className="tab-content" id="vision">
        <div className="section-title"><p className="eyebrow">VISION ALIGNMENT</p><h2>Decisions stay attached to the player loop.</h2><p>Tickets are never silently rewritten or closed. Alignment calls route to deliberate review.</p></div>
        <div className="vision-statement"><p className="eyebrow">REVISED VISION</p><h3>A spatial party RPG where preparation, place, conversation, tactical pressure, and persistent consequences form one recoverable player loop.</h3><div className="vision-pillars"><span>Explorable ship home</span><span>Consequential route choice</span><span>Persistent spatial locations</span><span>Game-native dialogue & checks</span><span>Location-wide tactical resolution</span><span>Aftermath, recruitment & save</span></div><p><strong>System disposition:</strong> {snapshot.roadmapStages.filter((stage) => scoreFor(stage.maturity) >= 40).length} stages prototyped or beyond · {snapshot.tickets.filter((ticket) => ticket.alignment === "operational" || ticket.alignment === "aligned").length} mirrored tickets aligned/operational · {snapshot.tickets.filter((ticket) => ticket.alignment === "needs-revision" || ticket.alignment === "superseded" || ticket.alignment === "needs-decision").length} require deliberate alignment.</p></div>
        <div className="vision-columns"><div className="authority-card"><p className="eyebrow">AUTHORITY MAP</p>{snapshot.sources.map((source) => <article key={source.id}><strong>{source.owner}</strong><span>{source.authorityRole}</span><small>{source.freshness} · {source.location}</small></article>)}</div>
        <div className="decision-list"><p className="eyebrow">OPEN DECISION REGISTER</p>{snapshot.decisions.map((decision) => <article key={decision.id}><span className="priority">{decision.priority}</span><div><h3>{decision.title}</h3><p>{decision.blocker}</p><small>Affects: {decision.affectedStageIds.map((id) => snapshot.roadmapStages.find((stage) => stage.id === id)?.name ?? `Unresolved ${id}`).join(" · ")}<br />Evidence: {decision.evidence} · {decision.freshness}</small></div><button onClick={() => openLaunchPacket({ entryType: "freeform", entryId: "", intent: `${decision.action}: ${decision.title}. Evidence: ${decision.evidence}.`, worktreeId: "clean-review" })}>{decision.action}</button></article>)}</div></div>
      </section>}

      {activeTab === "Launch" && <section className="tab-content launch-view" id="launch">
        <div className="section-title"><p className="eyebrow">CODEX LAUNCH PACKET</p><h2>Assemble context, review it, then start.</h2><p>This first release deliberately uses a copy/open fallback. It does not claim an undocumented direct-Codex deep link.</p></div>
        <div className="launch-grid"><form onSubmit={(event) => event.preventDefault()}>
          <fieldset><legend>Start from</legend><div className="segmented">{(["ticket", "stage", "freeform"] as const).map((entryType) => <button type="button" aria-pressed={launch.entryType === entryType} className={launch.entryType === entryType ? "selected" : ""} key={entryType} onClick={() => updateLaunch({ ...launch, entryType, entryId: entryType === "ticket" ? "31" : entryType === "stage" ? "explore-location" : "" })}>{entryType === "stage" ? "Roadmap stage" : entryType}</button>)}</div></fieldset>
          {launch.entryType === "ticket" && <label>Ticket<select value={launch.entryId} onChange={(event) => updateLaunch({ ...launch, entryId: event.target.value })}>{snapshot.tickets.map((ticket) => <option key={ticket.id} value={ticket.id}>{ticketLabel(ticket)}</option>)}</select></label>}
          {launch.entryType === "stage" && <label>Roadmap stage<select value={launch.entryId} onChange={(event) => updateLaunch({ ...launch, entryId: event.target.value })}>{snapshot.roadmapStages.map((stage) => <option key={stage.id} value={stage.id}>{stage.name} · {scoreFor(stage.maturity)}%</option>)}</select></label>}
          {launch.entryType === "freeform" && <label>Intent<textarea value={launch.intent} onChange={(event) => updateLaunch({ ...launch, intent: event.target.value })} placeholder="What should this task accomplish?" /></label>}
          <label>Target worktree<select value={launch.worktreeId} onChange={(event) => updateLaunch({ ...launch, worktreeId: event.target.value })}>{snapshot.worktrees.map((tree) => <option key={tree.id} value={tree.id}>{tree.purpose} · {tree.health}</option>)}</select></label>
          <label className="approval"><input type="checkbox" checked={approved} onChange={(event) => setApproved(event.target.checked)} /> I reviewed this packet and want to prepare it for Codex.</label>
        </form>
        <aside className="packet-preview"><p className="eyebrow">PACKET PREVIEW</p><h3>{packet.objective}</h3><dl><div><dt>Worktree</dt><dd>{packet.worktree.purpose}</dd></div><div><dt>Context Bundle</dt><dd>{contextBundle.status}</dd></div><div><dt>Selected stage</dt><dd>{selectedStage ? `${selectedStage.name} · ${scoreFor(selectedStage.maturity)}%` : "Derived from ticket or intent"}</dd></div></dl>{contextEntries.length > 0 && <div className="context-manifest"><strong>Context manifest · {contextBundle.manifestVersion}</strong>{contextEntries.map((entry) => <article key={entry.id}><span>{entry.id}</span><small>{entry.publicationStatus} · {entry.driveId ?? "Drive ID pending"}<br />{entry.sourcePath} → {entry.ownerPath}<br />{entry.authorityRole} · {entry.retrievalIntent} · {entry.freshness}</small><code>{entry.hash}</code></article>)}</div>}<pre>{packet.prompt}</pre><div className="packet-actions"><button disabled={!approved} onClick={() => copy(packet.prompt, "Launch packet copied. Open Codex and paste it to begin.")}>Copy approved packet</button><button disabled={!approved} onClick={() => announce("Open Codex, create a task in the selected worktree, then paste the copied packet. Direct task deep links are intentionally not claimed.")}>Open Codex instructions</button></div></aside></div>
      </section>}

      <footer><span className="brand-mark">N</span><p>Project Control is a derived command surface. Game truth, issues, repo state, planning memory, and Drive context retain their owners.</p><button onClick={() => selectTab("Vision")}>Review authority map</button></footer>
    </main>
  );
}
