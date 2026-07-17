# Nexus Project Operations

The operational context for coordinating Nexus planning, execution, project state, and movement between human and agent work surfaces. It defines development and workflow language only; Nexus Game terms, player-facing rules, lore, and product decisions belong in the Nexus Game context and accepted ADR index.

Accepted operations decisions are recorded under [`docs/contexts/nexus-project-operations/docs/adr`](docs/adr), beginning with [Project Control Hub derives state from authoritative systems](docs/adr/0001-project-control-hub-derives-state.md).

## Language

**GitHub Issue**:
The live execution packet for scoped Nexus work, including the goal, acceptance criteria, progress, closeout evidence, and current open or closed state. A GitHub Issue transfers task authority; it does not become Nexus game-source authority or app implementation truth.
_Avoid_: Game canon, source truth, GitHub Project card

**Nexus Issue Index**:
The repo-readable Markdown map in `NEXUS_ISSUE_INDEX.md` that explains how known issues relate to roadmap lanes, blockers, parked ideas, and completed work. It helps agents orient before planning, but live GitHub remains authoritative for issue state when the two disagree.
_Avoid_: Replacement tracker, source authority, stale queue truth

**ChatGPT Project**:
The planning, brainstorming, drafting, and discussion lane for Nexus work when current local repo inspection, validation, commits, pushes, issue updates, or source-authority checks are not yet needed. It consumes curated context that may be stale until upload, paste, or searchability is confirmed for a named scope.
_Avoid_: Current repo authority, source of record, Codex substitute

**ChatGPT Project Bridge**:
The repo-trackable layer under `docs/chatgpt-project-bridge` that prepares stable context, packets, and refresh rules for ChatGPT Project. The bridge translates selected repo context for discussion and drafting; it does not prove ChatGPT Project has been refreshed and does not replace the app repo, GitHub Issues, canonical source docs, Obsidian, or Drive.
_Avoid_: Source mirror, upload proof, permanent task tracker

**Synced-Chat Packet**:
A repo-visible packet that preserves useful ChatGPT Project planning or discussion that is not its own GitHub Issue. It makes context retrievable by Codex and future chats, but it is not execution approval and must not be treated as current repo truth without verification.
_Avoid_: Handoff Packet, issue body, approval to edit

**Handoff Packet**:
A concrete transfer note for moving ready-enough work between ChatGPT, Codex, Replit, GitHub Issues, or a fresh session. A handoff should name the next safe action and relevant constraints, but the receiving agent still verifies live repo, issue, and source state before acting.
_Avoid_: Synced-Chat Packet, broad planning archive, permission to skip discovery

**Task Packet**:
A narrow task-shaped packet, prompt, or template for focused work. In Nexus, GitHub Issues are the primary task packets; repo task packets support bridge and handoff flows without replacing the live issue tracker.
_Avoid_: Broad roadmap, general chat transcript, duplicate issue tracker

**Durable Planning Note**:
A human-facing plan, finding, or progress record retained in the Obsidian Nexus hub under `02 Planning`. It preserves useful project thinking without becoming executable task state, game-source authority, or a required duplicate of a GitHub Issue.
_Avoid_: GitHub Issue, temporary session plan, repo planning overlay

**Session Plan**:
A temporary sequence used by the active chat or tool to coordinate the current session. It may be revised or discarded as work progresses and is not copied into durable planning merely because the task is long or uses many tools.
_Avoid_: Durable planning note, handoff, task tracker

**Executable Continuity**:
The minimum cross-session state needed to resume scoped work, recorded in a linked GitHub Issue comment or approved handoff. It names the next safe action and current constraints without becoming a second task queue.
_Avoid_: Session transcript, broad planning archive, duplicate issue state

**Source Draft Candidate**:
Draft material that may become Nexus source after review and promotion. It can preserve source-like language for later work, but it is not canonical game source until it passes the approved source-promotion route.
_Avoid_: Live source, accepted canon, implementation authority

**Obsidian Project Hub**:
The human-facing Nexus note and project-memory layer identified by the maintained path registry reached through `docs/admin/nexus-distributed-surfaces.md`. It supports reading, routing, current-state notes, and pointer navigation; it is not an independent source authority over the repo.
_Avoid_: App repo, canonical source home, GitHub issue tracker

**Drive Payload Home**:
The bulky-materials and exchange surface for Nexus bundles, exports, workbench output, and large handoff payloads. Drive can hold useful context for retrieval or transfer, but Drive storage does not make a file current, authoritative, or accepted.
_Avoid_: Source of truth, unscoped Drive search, repo replacement

## Control Surfaces

**Project Control Hub**:
The private, owner-only command center for viewing Nexus project state, navigating authoritative systems, and launching planning or execution work. It derives status from the systems that own it rather than becoming a competing source of truth.
_Avoid_: Source of truth, duplicate task tracker, static dashboard

**Project Snapshot**:
A timestamped capture of local worktree, ticket, and planning state generated by Codex for display in the Project Control Hub. It must identify its freshness and must not imply continuous synchronization.
_Avoid_: Live sync, current state without a timestamp

**Worktree Monitor**:
The Project Control Hub view that presents each Nexus Git worktree's purpose, branch, path, health, recent activity, linked work, and available actions from the latest Project Snapshot.
_Avoid_: Checkout list, branch list

**Player Loop Roadmap**:
The primary visual plan for Nexus development, organized around the stages of the target player experience. Tickets, prototypes, blockers, decisions, and evidence attach to these stages rather than replacing them as the roadmap's structure.
_Avoid_: Ticket-only roadmap, invented delivery timeline

**Codex Launch Packet**:
A generated, reviewable handoff containing the selected task's objective, authoritative context, workspace or worktree, constraints, acceptance criteria, and starting prompt. Opening the packet does not authorize execution; the user confirms before Codex begins work.
_Avoid_: Auto-executing task, context-free prompt, undocumented deep link

**Nexus Context Bundle**:
A curated Drive folder and deterministic manifest that expose current, authoritative Nexus planning context to GPT without manual file attachment. Generated entries preserve their owner source, freshness, identity, and authority role so Drive retrieval does not elevate duplicates or stale files.
_Avoid_: Drive dump, manual attachment bundle, unscoped Drive search

## Progress

**Maturity Score**:
An evidence-based percentage for a Player Loop Roadmap stage: Unframed 0%, Defined 20%, Prototyped 40%, Validated 60%, Integrated 80%, and Playable 100%. It represents demonstrated maturity, not elapsed time, effort consumed, or delivery confidence.
_Avoid_: Percent complete, time estimate
