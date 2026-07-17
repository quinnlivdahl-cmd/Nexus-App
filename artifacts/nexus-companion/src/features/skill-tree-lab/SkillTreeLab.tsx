import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Copy,
  ExternalLink,
  FileJson,
  FileText,
  FlaskConical,
  Gauge,
  Info,
  Library,
  Network,
  Paintbrush,
  PencilLine,
  Plus,
  Redo2,
  RotateCcw,
  Save,
  Search,
  ShieldAlert,
  Trash2,
  Undo2,
  Upload,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  ALL_COVERAGE_TAGS,
  COVERAGE_LABELS,
  allAbilities,
  coverageCounts,
  diagnostics,
  flattenNodes,
  statusLabel,
} from "./analysis";
import {
  LAB_STORAGE_KEY,
  cloneData,
  createNode,
  deleteNode,
  duplicateNode,
  exportTreeMarkdown,
  getNode,
  moveNode,
  parseImportedLabData,
  patchNode,
  reorderNode,
  upgradeCandidateEffects,
  validParentOptions,
  type EditableNode,
} from "./lab-state";
import { seedLabData, themePresets } from "./seed-data";
import type {
  Ability,
  AbilityType,
  Attribute,
  CoverageTag,
  LabData,
  NodeKind,
  ProposalStatus,
  ProvenanceCategory,
  ResearchEntry,
  Skill,
  SkillFocus,
  ThemeTokens,
} from "./types";
import "./SkillTreeLab.css";

type LabView =
  | "overview"
  | "research"
  | "rules"
  | "tree"
  | "editor"
  | "coverage"
  | "style";

const LAB_VIEWS: Array<{ id: LabView; label: string; icon: ReactNode }> = [
  { id: "overview", label: "Overview", icon: <Gauge size={15} /> },
  { id: "research", label: "Research Library", icon: <Library size={15} /> },
  { id: "rules", label: "Nexus Rules Map", icon: <BookOpen size={15} /> },
  { id: "tree", label: "Tree Explorer", icon: <Network size={15} /> },
  { id: "editor", label: "Draft Editor", icon: <PencilLine size={15} /> },
  { id: "coverage", label: "Coverage Lab", icon: <Activity size={15} /> },
  { id: "style", label: "Style Lab", icon: <Paintbrush size={15} /> },
];

const STATUS_OPTIONS: ProposalStatus[] = [
  "proposed",
  "under-review",
  "accepted-later",
  "deferred",
  "rejected",
];

const PROVENANCE_OPTIONS: ProvenanceCategory[] = [
  "existing-nexus-rule",
  "prior-nexus-proposal",
  "external-pattern",
  "new-original",
];

const ABILITY_TYPES: AbilityType[] = [
  "action",
  "reaction",
  "passive",
  "stance",
  "permission",
  "equipment-interaction",
  "preparation",
  "other",
];

const SEED_SIGNATURE = JSON.stringify(seedLabData);

function cleanText(value: string): string {
  return value.replace(/[\u2013\u2014]/g, "-");
}

function labelize(value: string): string {
  return cleanText(value.replaceAll("-", " "));
}

function loadInitialData(): LabData {
  if (typeof window === "undefined") return cloneData(seedLabData);
  const stored = window.localStorage.getItem(LAB_STORAGE_KEY);
  if (!stored) return cloneData(seedLabData);
  try {
    return upgradeCandidateEffects(parseImportedLabData(stored), seedLabData);
  } catch {
    return cloneData(seedLabData);
  }
}

function downloadText(filename: string, text: string, type: string): void {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function countTree(attribute: Attribute): {
  skills: number;
  focuses: number;
  abilities: number;
} {
  const focuses = attribute.skills.flatMap((skill) => skill.focuses);
  return {
    skills: attribute.skills.length,
    focuses: focuses.length,
    abilities: focuses.flatMap((focus) => focus.abilities).length,
  };
}

function Panel({
  title,
  eyebrow,
  action,
  children,
  className = "",
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`stl-panel ${className}`}>
      <header className="stl-panel-header">
        <div>
          {eyebrow ? <p className="stl-eyebrow">{eyebrow}</p> : null}
          <h2>{title}</h2>
        </div>
        {action ? <div className="stl-panel-action">{action}</div> : null}
      </header>
      <div className="stl-panel-body">{children}</div>
    </section>
  );
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="stl-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function StatusPill({ status }: { status: ProposalStatus }) {
  return (
    <span className={`stl-status stl-status-${status}`}>
      {statusLabel(status)}
    </span>
  );
}

function Notice({
  tone = "info",
  children,
}: {
  tone?: "info" | "warning" | "success";
  children: ReactNode;
}) {
  const Icon =
    tone === "warning"
      ? AlertTriangle
      : tone === "success"
        ? CheckCircle2
        : Info;
  return (
    <div className={`stl-notice stl-notice-${tone}`}>
      <Icon size={16} />
      <div>{children}</div>
    </div>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="stl-filter-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function OverviewView({ data }: { data: LabData }) {
  const abilities = allAbilities(data);
  const focusCount = data.attributes.flatMap((attribute) =>
    attribute.skills.flatMap((skill) => skill.focuses),
  ).length;
  const skillCount = data.attributes.flatMap(
    (attribute) => attribute.skills,
  ).length;
  const acceptedCount = flattenNodes(data).filter((node) => {
    const value = getNode(data, node.id);
    return value?.status === "accepted-later";
  }).length;
  const coverage = coverageCounts(data);

  return (
    <div className="stl-view-grid">
      <Notice>
        <strong>Playtest boundary:</strong> {cleanText(data.noncanonicalNotice)}
      </Notice>
      <div className="stl-metric-grid">
        <Metric
          label="Attributes"
          value={data.attributes.length}
          detail="candidate frames"
        />
        <Metric
          label="Skills"
          value={skillCount}
          detail="roll-facing domains"
        />
        <Metric label="Focuses" value={focusCount} detail="identity lanes" />
        <Metric
          label="Abilities"
          value={abilities.length}
          detail="ranked proposals"
        />
        <Metric
          label="Shared branches"
          value={data.sharedBranches.length}
          detail="cross-skill links"
        />
        <Metric
          label="Accepted later"
          value={acceptedCount}
          detail="not current canon"
        />
      </div>
      <div className="stl-two-column stl-two-column-wide-left">
        <Panel title={cleanText(data.candidateModel)} eyebrow="Candidate model">
          <p className="stl-lede">{cleanText(data.modelDecision)}</p>
          <div className="stl-attribute-strips">
            {data.attributes.map((attribute) => {
              const counts = countTree(attribute);
              return (
                <div className="stl-attribute-strip" key={attribute.id}>
                  <div>
                    <strong>{cleanText(attribute.name)}</strong>
                    <span>{cleanText(attribute.gameplayPromise)}</span>
                  </div>
                  <div className="stl-strip-counts">
                    <span>{counts.skills} skills</span>
                    <span>{counts.focuses} focuses</span>
                    <span>{counts.abilities} abilities</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel title="Coverage pulse" eyebrow="Tagged abilities">
          <div className="stl-bar-list">
            {coverage.map((item) => {
              const maximum = Math.max(
                ...coverage.map((entry) => entry.count),
                1,
              );
              return (
                <div className="stl-bar-row" key={item.tag}>
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.count}</strong>
                  </div>
                  <div className="stl-bar-track">
                    <i style={{ width: `${(item.count / maximum) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
      <Panel
        title="Structural comparison"
        eyebrow="Broad domains versus legacy granularity"
      >
        <div className="stl-table-wrap">
          <table className="stl-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Broad domains</th>
                <th>Legacy granular</th>
                <th>Candidate reading</th>
              </tr>
            </thead>
            <tbody>
              {data.structuralComparison.map((row) => (
                <tr key={row.criterion}>
                  <th>{cleanText(row.criterion)}</th>
                  <td>{cleanText(row.broadDomains)}</td>
                  <td>{cleanText(row.legacyGranular)}</td>
                  <td className="stl-table-accent">
                    {cleanText(row.candidateReading)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function ResearchView({ data }: { data: LabData }) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const [genre, setGenre] = useState("all");
  const [mechanic, setMechanic] = useState("all");
  const [sourceType, setSourceType] = useState("all");
  const [strengthQuery, setStrengthQuery] = useState("");
  const [riskQuery, setRiskQuery] = useState("");
  const sources = useMemo(
    () => [...new Set(data.research.map((entry) => entry.source))].sort(),
    [data.research],
  );
  const genres = useMemo(
    () => [...new Set(data.research.map((entry) => entry.genre))].sort(),
    [data.research],
  );
  const mechanics = useMemo(
    () => [...new Set(data.research.map((entry) => entry.mechanic))].sort(),
    [data.research],
  );
  const normalized = query.trim().toLocaleLowerCase();
  const strengthNeedle = strengthQuery.trim().toLocaleLowerCase();
  const riskNeedle = riskQuery.trim().toLocaleLowerCase();
  const filtered = data.research.filter((entry) => {
    const haystack = Object.values(entry).join(" ").toLocaleLowerCase();
    return (
      (!normalized || haystack.includes(normalized)) &&
      (source === "all" || entry.source === source) &&
      (genre === "all" || entry.genre === genre) &&
      (mechanic === "all" || entry.mechanic === mechanic) &&
      (sourceType === "all" || entry.sourceType === sourceType) &&
      (!strengthNeedle ||
        entry.strength.toLocaleLowerCase().includes(strengthNeedle)) &&
      (!riskNeedle || entry.risk.toLocaleLowerCase().includes(riskNeedle))
    );
  });

  return (
    <div className="stl-view-grid">
      <Panel
        title="Research library"
        eyebrow={`${filtered.length} of ${data.research.length} sources`}
      >
        <div className="stl-filter-grid stl-research-filters">
          <FilterField label="Search">
            <span className="stl-input-with-icon">
              <Search size={15} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pattern, mechanic, or adaptation"
              />
            </span>
          </FilterField>
          <FilterField label="Game or source">
            <select
              value={source}
              onChange={(event) => setSource(event.target.value)}
            >
              <option value="all">All games and sources</option>
              {sources.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Genre">
            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              <option value="all">All genres</option>
              {genres.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Mechanic">
            <select
              value={mechanic}
              onChange={(event) => setMechanic(event.target.value)}
            >
              <option value="all">All mechanics</option>
              {mechanics.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Source quality">
            <select
              value={sourceType}
              onChange={(event) => setSourceType(event.target.value)}
            >
              <option value="all">All source types</option>
              <option value="official">Official</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </FilterField>
          <FilterField label="Strength contains">
            <input
              value={strengthQuery}
              onChange={(event) => setStrengthQuery(event.target.value)}
              placeholder="Example: identity"
            />
          </FilterField>
          <FilterField label="Risk contains">
            <input
              value={riskQuery}
              onChange={(event) => setRiskQuery(event.target.value)}
              placeholder="Example: tax"
            />
          </FilterField>
        </div>
      </Panel>
      <Notice>
        Fiction rows are interpretive capability lenses. They do not claim that
        publisher pages define game mechanics.
      </Notice>
      <div className="stl-research-grid">
        {filtered.map((entry) => (
          <ResearchCard key={entry.id} entry={entry} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <Notice tone="warning">No sources match these filters.</Notice>
      ) : null}
    </div>
  );
}

function ResearchCard({ entry }: { entry: ResearchEntry }) {
  return (
    <article className="stl-research-card">
      <header>
        <div>
          <p className="stl-eyebrow">
            {cleanText(entry.genre)} / {cleanText(entry.mechanic)}
          </p>
          <h3>{cleanText(entry.source)}</h3>
        </div>
        <span className="stl-quality">{entry.sourceType}</span>
      </header>
      <p className="stl-research-pattern">{cleanText(entry.pattern)}</p>
      <dl className="stl-research-facts">
        <div>
          <dt>Strength</dt>
          <dd>{cleanText(entry.strength)}</dd>
        </div>
        <div>
          <dt>Risk</dt>
          <dd>{cleanText(entry.risk)}</dd>
        </div>
        <div>
          <dt>Nexus adaptation</dt>
          <dd>{cleanText(entry.nexusAdaptation)}</dd>
        </div>
        <div>
          <dt>Avoid</dt>
          <dd>{cleanText(entry.avoid)}</dd>
        </div>
      </dl>
      <div className="stl-candidate-application">
        <CircleDot size={14} />
        <span>{cleanText(entry.candidateApplication)}</span>
      </div>
      <a
        className="stl-source-link"
        href={entry.citationUrl}
        target="_blank"
        rel="noreferrer"
      >
        {cleanText(entry.citationLabel)} <ExternalLink size={13} />
      </a>
    </article>
  );
}

function RulesView({ data }: { data: LabData }) {
  const [query, setQuery] = useState("");
  const [classification, setClassification] = useState("all");
  const normalized = query.trim().toLocaleLowerCase();
  const filtered = data.rulesMap.filter(
    (entry) =>
      (classification === "all" || entry.classification === classification) &&
      (!normalized ||
        `${entry.title} ${entry.detail} ${entry.sourcePath}`
          .toLocaleLowerCase()
          .includes(normalized)),
  );

  return (
    <div className="stl-view-grid">
      <Notice tone="warning">
        <strong>Traceability only:</strong> accepted rules and prior proposals
        are shown together, but their classifications remain distinct.
      </Notice>
      <Panel
        title="Nexus rules map"
        eyebrow={`${filtered.length} traceable entries`}
      >
        <div className="stl-filter-grid stl-filter-grid-compact">
          <FilterField label="Search">
            <span className="stl-input-with-icon">
              <Search size={15} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rule, proposal, or source path"
              />
            </span>
          </FilterField>
          <FilterField label="Classification">
            <select
              value={classification}
              onChange={(event) => setClassification(event.target.value)}
            >
              <option value="all">All classifications</option>
              <option value="accepted">Accepted</option>
              <option value="existing-rule">Existing rule</option>
              <option value="prior-proposal">Prior proposal</option>
              <option value="open-question">Open question</option>
            </select>
          </FilterField>
        </div>
        <div className="stl-rule-list">
          {filtered.map((entry) => (
            <article className="stl-rule-row" key={entry.id}>
              <span
                className={`stl-rule-class stl-rule-${entry.classification}`}
              >
                {labelize(entry.classification)}
              </span>
              <div>
                <h3>{cleanText(entry.title)}</h3>
                <p>{cleanText(entry.detail)}</p>
                <code>{cleanText(entry.sourcePath)}</code>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}

interface TreeFilters {
  query: string;
  tier: "all" | "1" | "2" | "3";
  status: "all" | ProposalStatus;
  type: "all" | AbilityType;
}

function abilityMatches(ability: Ability, filters: TreeFilters): boolean {
  const query = filters.query.trim().toLocaleLowerCase();
  const haystack =
    `${ability.name} ${ability.candidateEffect} ${ability.abilityType} ${ability.rulesImpact.checkSurface} ${ability.rulesImpact.stateSurfaces.join(" ")}`.toLocaleLowerCase();
  return (
    (!query || haystack.includes(query)) &&
    (filters.tier === "all" || ability.tier === Number(filters.tier)) &&
    (filters.status === "all" || ability.status === filters.status) &&
    (filters.type === "all" || ability.abilityType === filters.type)
  );
}

function TreeCard({
  attribute,
  position,
  filters,
  expandedSkills,
  onToggleSkill,
  onSelect,
  selectedId,
  onActivate,
}: {
  attribute: Attribute;
  position: "left" | "active" | "right";
  filters: TreeFilters;
  expandedSkills: Set<string>;
  onToggleSkill: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
  onActivate: () => void;
}) {
  const counts = countTree(attribute);
  const query = filters.query.trim().toLocaleLowerCase();

  return (
    <article
      className={`stl-tree-card stl-tree-${position}`}
      aria-current={position === "active" ? "true" : undefined}
      onClick={position === "active" ? undefined : onActivate}
    >
      <header className="stl-tree-card-header">
        <button
          className={selectedId === attribute.id ? "is-selected" : ""}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(attribute.id);
          }}
        >
          <span className="stl-tree-index">
            {String(attribute.name.charCodeAt(0)).slice(-2)}
          </span>
          <span>
            <small>Attribute proposal</small>
            <strong>{cleanText(attribute.name)}</strong>
          </span>
        </button>
        <StatusPill status={attribute.status} />
      </header>
      <p className="stl-tree-promise">{cleanText(attribute.gameplayPromise)}</p>
      <div className="stl-tree-stats">
        <span>{counts.skills} skills</span>
        <span>{counts.focuses} focuses</span>
        <span>{counts.abilities} abilities</span>
      </div>
      <div className="stl-tree-trunk" aria-label={`${attribute.name} tree`}>
        {attribute.skills.map((skill) => {
          const skillText =
            `${skill.name} ${skill.definition}`.toLocaleLowerCase();
          const matchingAbilities = skill.focuses.flatMap((focus) =>
            focus.abilities.filter((ability) =>
              abilityMatches(ability, filters),
            ),
          );
          const matches =
            !query ||
            skillText.includes(query) ||
            matchingAbilities.length > 0 ||
            skill.focuses.some((focus) =>
              `${focus.name} ${focus.identity}`
                .toLocaleLowerCase()
                .includes(query),
            );
          if (!matches) return null;
          const searchForcesOpen = Boolean(filters.query);
          const expanded = searchForcesOpen || expandedSkills.has(skill.id);
          return (
            <section className="stl-skill-branch" key={skill.id}>
              <div className="stl-skill-node">
                <button
                  className={selectedId === skill.id ? "is-selected" : ""}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(skill.id);
                  }}
                >
                  <span>{cleanText(skill.name)}</span>
                  <small>{skill.focuses.length} focuses</small>
                </button>
                <button
                  className="stl-branch-toggle"
                  aria-label={`${expanded ? "Collapse" : "Expand"} ${skill.name}`}
                  aria-expanded={expanded}
                  disabled={searchForcesOpen}
                  title={
                    searchForcesOpen
                      ? "Clear the search to collapse branches"
                      : `${expanded ? "Hide" : "Show"} ${skill.name} details`
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleSkill(skill.id);
                  }}
                >
                  <span>
                    {searchForcesOpen ? "Match" : expanded ? "Hide" : "Show"}
                  </span>
                  <ChevronRight size={14} />
                </button>
              </div>
              {expanded ? (
                <div className="stl-focus-list">
                  {skill.focuses.map((focus) => {
                    const abilities = focus.abilities.filter((ability) =>
                      abilityMatches(ability, filters),
                    );
                    const focusMatches =
                      !query ||
                      `${focus.name} ${focus.identity}`
                        .toLocaleLowerCase()
                        .includes(query) ||
                      abilities.length > 0;
                    if (!focusMatches) return null;
                    return (
                      <div className="stl-focus-node" key={focus.id}>
                        <button
                          className={
                            selectedId === focus.id ? "is-selected" : ""
                          }
                          onClick={(event) => {
                            event.stopPropagation();
                            onSelect(focus.id);
                          }}
                        >
                          <span>{cleanText(focus.name)}</span>
                          <small>{cleanText(focus.characterFantasy)}</small>
                        </button>
                        <div className="stl-ability-lanes">
                          {abilities.map((ability) => (
                            <button
                              key={ability.id}
                              className={`stl-ability-node stl-tier-${ability.tier} ${selectedId === ability.id ? "is-selected" : ""}`}
                              onClick={(event) => {
                                event.stopPropagation();
                                onSelect(ability.id);
                              }}
                              title={cleanText(ability.candidateEffect)}
                            >
                              <span>T{ability.tier}</span>
                              {cleanText(ability.name)}
                            </button>
                          ))}
                          {abilities.length === 0 ? (
                            <span className="stl-empty-branch">
                              No matching abilities
                            </span>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
      {position !== "active" ? (
        <button
          className="stl-recessed-activate"
          onClick={(event) => {
            event.stopPropagation();
            onActivate();
          }}
        >
          Rotate into focus
        </button>
      ) : null}
    </article>
  );
}

function QuickTreeEditor({
  data,
  node,
  commit,
  onOpenFull,
}: {
  data: LabData;
  node: EditableNode;
  commit: (next: LabData) => void;
  onOpenFull: () => void;
}) {
  const summary = quickEditDescription(node);
  const [name, setName] = useState(node.name);
  const [status, setStatus] = useState(node.status);
  const [description, setDescription] = useState(summary);

  useEffect(() => {
    setName(node.name);
    setStatus(node.status);
    setDescription(quickEditDescription(node));
  }, [node]);

  const changed =
    name !== node.name || status !== node.status || description !== summary;
  const summaryLabel =
    node.kind === "attribute"
      ? "Gameplay promise"
      : node.kind === "skill"
        ? "Definition"
        : node.kind === "focus"
          ? "Character fantasy"
          : node.kind === "ability"
            ? "Candidate effect"
            : "Rationale";

  const save = () => {
    const update: Partial<EditableNode> = {
      name: name.trim() || node.name,
      status,
    };
    if (node.kind === "attribute")
      Object.assign(update, { gameplayPromise: description });
    if (node.kind === "skill")
      Object.assign(update, { definition: description });
    if (node.kind === "focus")
      Object.assign(update, { characterFantasy: description });
    if (node.kind === "ability")
      Object.assign(update, { candidateEffect: description });
    if (node.kind === "shared-branch")
      Object.assign(update, { rationale: description });
    commit(patchNode(data, node.id, update));
  };

  const reset = () => {
    setName(node.name);
    setStatus(node.status);
    setDescription(summary);
  };

  return (
    <form
      className="stl-quick-edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <FormField label="Name">
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </FormField>
      <FormField label="Status">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as ProposalStatus)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option value={option} key={option}>
              {statusLabel(option)}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label={summaryLabel} wide>
        <TextArea value={description} onChange={setDescription} rows={3} />
      </FormField>
      <div className="stl-quick-edit-actions">
        <button
          className="stl-button stl-button-primary"
          type="submit"
          disabled={!changed}
        >
          <Save size={14} /> Save changes
        </button>
        <button
          className="stl-button"
          type="button"
          disabled={!changed}
          onClick={reset}
        >
          Revert
        </button>
        <button className="stl-button" type="button" onClick={onOpenFull}>
          <PencilLine size={14} /> All fields
        </button>
      </div>
    </form>
  );
}

function TreeExplorerView({
  data,
  selectedId,
  onSelect,
  onEdit,
  commit,
}: {
  data: LabData;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onEdit: () => void;
  commit: (next: LabData) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [filters, setFilters] = useState<TreeFilters>({
    query: "",
    tier: "all",
    status: "all",
    type: "all",
  });
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const pointerStart = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const count = data.attributes.length;
  const nodeNameById = useMemo(
    () => new Map(flattenNodes(data).map((node) => [node.id, node.name])),
    [data],
  );

  useEffect(() => {
    if (activeIndex >= count) setActiveIndex(Math.max(0, count - 1));
  }, [activeIndex, count]);

  const rotate = useCallback(
    (step: -1 | 1) => {
      if (count < 2) return;
      setDirection(step === 1 ? "left" : "right");
      setActiveIndex((current) => (current + step + count) % count);
      window.setTimeout(() => setDirection(null), 260);
    },
    [count],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    const target = event.target as HTMLElement;
    if (
      target.closest(
        "button, input, textarea, select, .stl-tree-trunk, .stl-wheel-controls, .stl-wheel-dots",
      )
    ) {
      pointerStart.current = null;
      return;
    }
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 48) {
      suppressClick.current = true;
      rotate(distance < 0 ? 1 : -1);
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    }
  };

  const activateSide = (step: -1 | 1) => {
    if (!suppressClick.current) rotate(step);
  };

  if (!count)
    return (
      <Notice tone="warning">
        No Attribute trees exist. Add one in Draft Editor.
      </Notice>
    );
  const indices = [
    (activeIndex - 1 + count) % count,
    activeIndex,
    (activeIndex + 1) % count,
  ];
  const selected = selectedId ? getNode(data, selectedId) : null;
  const selectedPrerequisites =
    selected?.kind === "ability"
      ? selected.prerequisiteIds.map(
          (id) => nodeNameById.get(id) ?? `Missing node (${id})`,
        )
      : [];

  return (
    <div className="stl-view-grid">
      <Panel title="Tree explorer" eyebrow="Rotating tree set">
        <div className="stl-filter-grid stl-tree-filters">
          <FilterField label="Find a node">
            <span className="stl-input-with-icon">
              <Search size={15} />
              <input
                value={filters.query}
                onChange={(event) =>
                  setFilters({ ...filters, query: event.target.value })
                }
                placeholder="Skill, Focus, Ability, or effect"
              />
            </span>
          </FilterField>
          <FilterField label="Tier">
            <select
              value={filters.tier}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  tier: event.target.value as TreeFilters["tier"],
                })
              }
            >
              <option value="all">All tiers</option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
            </select>
          </FilterField>
          <FilterField label="Status">
            <select
              value={filters.status}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  status: event.target.value as TreeFilters["status"],
                })
              }
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Ability type">
            <select
              value={filters.type}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  type: event.target.value as TreeFilters["type"],
                })
              }
            >
              <option value="all">All types</option>
              {ABILITY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {labelize(type)}
                </option>
              ))}
            </select>
          </FilterField>
        </div>
      </Panel>

      <section className="stl-wheel-shell" aria-label="Attribute tree carousel">
        <div className="stl-wheel-controls">
          <button
            className="stl-icon-button"
            onClick={() => rotate(-1)}
            aria-label="Previous Attribute tree"
          >
            <ChevronLeft />
          </button>
          <div className="stl-wheel-readout">
            <small>Tree position</small>
            <strong>
              {activeIndex + 1} / {count}
            </strong>
            <span>{cleanText(data.attributes[activeIndex].name)}</span>
          </div>
          <button
            className="stl-icon-button"
            onClick={() => rotate(1)}
            aria-label="Next Attribute tree"
          >
            <ChevronRight />
          </button>
        </div>
        <div
          className={`stl-wheel-stage ${direction ? `is-rotating-${direction}` : ""}`}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              rotate(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              rotate(1);
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStart.current = null;
          }}
        >
          <TreeCard
            attribute={data.attributes[indices[0]]}
            position="left"
            filters={filters}
            expandedSkills={expandedSkills}
            onToggleSkill={(id) =>
              setExpandedSkills((current) => {
                const next = new Set(current);
                next.has(id) ? next.delete(id) : next.add(id);
                return next;
              })
            }
            onSelect={onSelect}
            selectedId={selectedId}
            onActivate={() => activateSide(-1)}
          />
          <TreeCard
            attribute={data.attributes[indices[1]]}
            position="active"
            filters={filters}
            expandedSkills={expandedSkills}
            onToggleSkill={(id) =>
              setExpandedSkills((current) => {
                const next = new Set(current);
                next.has(id) ? next.delete(id) : next.add(id);
                return next;
              })
            }
            onSelect={onSelect}
            selectedId={selectedId}
            onActivate={() => undefined}
          />
          <TreeCard
            attribute={data.attributes[indices[2]]}
            position="right"
            filters={filters}
            expandedSkills={expandedSkills}
            onToggleSkill={(id) =>
              setExpandedSkills((current) => {
                const next = new Set(current);
                next.has(id) ? next.delete(id) : next.add(id);
                return next;
              })
            }
            onSelect={onSelect}
            selectedId={selectedId}
            onActivate={() => activateSide(1)}
          />
        </div>
        <div className="stl-wheel-dots" aria-label="Choose Attribute tree">
          {data.attributes.map((attribute, index) => (
            <button
              key={attribute.id}
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Show ${attribute.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => {
                if (index === activeIndex) return;
                const forward = (index - activeIndex + count) % count;
                setDirection(forward <= count / 2 ? "left" : "right");
                setActiveIndex(index);
                window.setTimeout(() => setDirection(null), 260);
              }}
            />
          ))}
        </div>
        <p className="stl-wheel-help">
          Scroll inside a tree to read it. Use the buttons, dots, or arrow keys
          to change trees.
        </p>
      </section>

      <Panel
        title="Quick edit"
        eyebrow={selected ? labelize(selected.kind) : "No node selected"}
        className="stl-quick-edit-panel"
      >
        {selected ? (
          <>
            {selected.kind === "ability" ? (
              <dl className="stl-selection-metadata">
                <div>
                  <dt>Tier</dt>
                  <dd>{selected.tier}</dd>
                </div>
                <div>
                  <dt>Maximum Rank</dt>
                  <dd>{selected.maxRank}</dd>
                </div>
                <div>
                  <dt>Prerequisites</dt>
                  <dd>
                    {selectedPrerequisites.length
                      ? `${selected.prerequisiteLogic}: ${selectedPrerequisites
                          .map(cleanText)
                          .join(", ")}`
                      : "None"}
                  </dd>
                </div>
                <div className="stl-selection-prerequisites">
                  <dt>Lattice check surface</dt>
                  <dd>{cleanText(selected.rulesImpact.checkSurface)}</dd>
                </div>
                <div>
                  <dt>Rules state surfaces</dt>
                  <dd>
                    {selected.rulesImpact.stateSurfaces
                      .map(cleanText)
                      .join(", ")}
                  </dd>
                </div>
                <div>
                  <dt>Result bands</dt>
                  <dd>{cleanText(selected.rulesImpact.resultBands)}</dd>
                </div>
                <div>
                  <dt>Guardrail</dt>
                  <dd>{cleanText(selected.rulesImpact.guardrail)}</dd>
                </div>
              </dl>
            ) : null}
            <QuickTreeEditor
              data={data}
              node={selected}
              commit={commit}
              onOpenFull={onEdit}
            />
          </>
        ) : (
          <p className="stl-muted">
            Select an Attribute, Skill, Focus, or Ability to edit it without
            leaving the tree.
          </p>
        )}
      </Panel>

      <Panel
        title="Shared branches"
        eyebrow={`${data.sharedBranches.length} synthesis proposals`}
      >
        <div className="stl-shared-grid">
          {data.sharedBranches.map((branch) => (
            <button
              key={branch.id}
              className={selectedId === branch.id ? "is-selected" : ""}
              onClick={() => onSelect(branch.id)}
            >
              <span className="stl-logic-chip">{branch.prerequisiteLogic}</span>
              <strong>{cleanText(branch.name)}</strong>
              <small>
                {branch.abilities.length} abilities / {branch.skillIds.length}{" "}
                linked skills
              </small>
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function nodeSummary(node: EditableNode): string {
  if (node.kind === "attribute") return cleanText(node.gameplayPromise);
  if (node.kind === "skill") return cleanText(node.definition);
  if (node.kind === "focus") return cleanText(node.identity);
  if (node.kind === "ability") return cleanText(node.candidateEffect);
  return cleanText(node.rationale);
}

function quickEditDescription(node: EditableNode): string {
  if (node.kind === "attribute") return cleanText(node.gameplayPromise);
  if (node.kind === "skill") return cleanText(node.definition);
  if (node.kind === "focus") return cleanText(node.characterFantasy);
  if (node.kind === "ability") return cleanText(node.candidateEffect);
  return cleanText(node.rationale);
}

function FormField({
  label,
  hint,
  children,
  wide = false,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`stl-form-field ${wide ? "stl-form-wide" : ""}`}>
      <span>{label}</span>
      {children}
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function EditorView({
  data,
  selectedId,
  onSelect,
  commit,
  onDeleteRequest,
}: {
  data: LabData;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  commit: (next: LabData) => void;
  onDeleteRequest: (id: string) => void;
}) {
  const nodes = flattenNodes(data);
  const selected = selectedId ? getNode(data, selectedId) : null;

  const create = (kind: NodeKind, parentId?: string) => {
    const result = createNode(data, kind, parentId);
    if (result.newId) {
      commit(result.data);
      onSelect(result.newId);
    }
  };
  const duplicate = () => {
    if (!selected) return;
    const result = duplicateNode(data, selected.id);
    if (result.newId) {
      commit(result.data);
      onSelect(result.newId);
    }
  };
  const patch = (value: Partial<EditableNode>) => {
    if (selected) commit(patchNode(data, selected.id, value));
  };
  const parentOptions = selected ? validParentOptions(data, selected.kind) : [];

  return (
    <div className="stl-editor-layout">
      <aside className="stl-editor-sidebar">
        <div className="stl-editor-sidebar-head">
          <div>
            <p className="stl-eyebrow">Proposal inventory</p>
            <h2>{nodes.length} nodes</h2>
          </div>
          <button
            className="stl-icon-button"
            onClick={() => create("attribute")}
            aria-label="Add Attribute"
          >
            <Plus />
          </button>
        </div>
        <button
          className="stl-button stl-button-wide"
          onClick={() => create("shared-branch")}
        >
          <Network size={14} /> New shared branch
        </button>
        <div className="stl-node-list">
          {data.attributes.map((attribute) => (
            <div key={attribute.id}>
              <button
                className={selectedId === attribute.id ? "is-selected" : ""}
                onClick={() => onSelect(attribute.id)}
              >
                <span>A</span>
                {cleanText(attribute.name)}
              </button>
              {attribute.skills.map((skill) => (
                <div key={skill.id}>
                  <button
                    className={selectedId === skill.id ? "is-selected" : ""}
                    onClick={() => onSelect(skill.id)}
                  >
                    <span>S</span>
                    {cleanText(skill.name)}
                  </button>
                  {skill.focuses.map((focus) => (
                    <div key={focus.id}>
                      <button
                        className={selectedId === focus.id ? "is-selected" : ""}
                        onClick={() => onSelect(focus.id)}
                      >
                        <span>F</span>
                        {cleanText(focus.name)}
                      </button>
                      {focus.abilities.map((ability) => (
                        <button
                          key={ability.id}
                          className={
                            selectedId === ability.id ? "is-selected" : ""
                          }
                          onClick={() => onSelect(ability.id)}
                        >
                          <span>{ability.tier}</span>
                          {cleanText(ability.name)}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          {data.sharedBranches.map((branch) => (
            <div key={branch.id}>
              <button
                className={selectedId === branch.id ? "is-selected" : ""}
                onClick={() => onSelect(branch.id)}
              >
                <span>X</span>
                {cleanText(branch.name)}
              </button>
              {branch.abilities.map((ability) => (
                <button
                  key={ability.id}
                  className={selectedId === ability.id ? "is-selected" : ""}
                  onClick={() => onSelect(ability.id)}
                >
                  <span>{ability.tier}</span>
                  {cleanText(ability.name)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>
      <section className="stl-editor-main">
        {!selected ? (
          <div className="stl-editor-empty">
            <PencilLine size={30} />
            <h2>Select a proposal node</h2>
            <p>
              Choose any Attribute, Skill, Focus, Ability, or shared branch from
              the inventory.
            </p>
          </div>
        ) : (
          <>
            <header className="stl-editor-toolbar">
              <div>
                <p className="stl-eyebrow">Editing {labelize(selected.kind)}</p>
                <h2>{cleanText(selected.name)}</h2>
              </div>
              <div className="stl-editor-actions">
                {selected.kind === "attribute" ? (
                  <button
                    className="stl-button"
                    onClick={() => create("skill", selected.id)}
                  >
                    <Plus size={14} /> Skill
                  </button>
                ) : null}
                {selected.kind === "skill" ? (
                  <button
                    className="stl-button"
                    onClick={() => create("focus", selected.id)}
                  >
                    <Plus size={14} /> Focus
                  </button>
                ) : null}
                {selected.kind === "focus" ||
                selected.kind === "shared-branch" ? (
                  <button
                    className="stl-button"
                    onClick={() => create("ability", selected.id)}
                  >
                    <Plus size={14} /> Ability
                  </button>
                ) : null}
                <button
                  className="stl-icon-button"
                  onClick={duplicate}
                  aria-label="Duplicate node"
                >
                  <Copy />
                </button>
                <button
                  className="stl-icon-button"
                  onClick={() => commit(reorderNode(data, selected.id, -1))}
                  aria-label="Move node up"
                >
                  <ArrowUp />
                </button>
                <button
                  className="stl-icon-button"
                  onClick={() => commit(reorderNode(data, selected.id, 1))}
                  aria-label="Move node down"
                >
                  <ArrowDown />
                </button>
                <button
                  className="stl-icon-button stl-danger"
                  onClick={() => onDeleteRequest(selected.id)}
                  aria-label="Delete node"
                >
                  <Trash2 />
                </button>
              </div>
            </header>
            <Notice>
              <strong>Proposal marker locked on.</strong> Editor changes are
              local to this browser and never update Nexus canon.
            </Notice>
            <div className="stl-editor-form">
              <FormField label="Name" wide>
                <input
                  value={selected.name}
                  onChange={(event) => patch({ name: event.target.value })}
                />
              </FormField>
              <FormField label="Status">
                <select
                  value={selected.status}
                  onChange={(event) =>
                    patch({ status: event.target.value as ProposalStatus })
                  }
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel(status)}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Provenance">
                <select
                  value={selected.provenance}
                  onChange={(event) =>
                    patch({
                      provenance: event.target.value as ProvenanceCategory,
                    })
                  }
                >
                  {PROVENANCE_OPTIONS.map((provenance) => (
                    <option key={provenance} value={provenance}>
                      {labelize(provenance)}
                    </option>
                  ))}
                </select>
              </FormField>
              {selected.kind === "skill" ||
              selected.kind === "focus" ||
              selected.kind === "ability" ? (
                <FormField
                  label="Move to parent"
                  wide
                  hint="Moving preserves the node and its child proposals."
                >
                  <select
                    value={
                      selected.kind === "skill"
                        ? selected.parentAttributeId
                        : selected.kind === "focus"
                          ? selected.parentSkillId
                          : (selected.parentFocusId ??
                            selected.sharedBranchId ??
                            "")
                    }
                    onChange={(event) =>
                      commit(moveNode(data, selected.id, event.target.value))
                    }
                  >
                    {parentOptions.map((option) => (
                      <option value={option.id} key={option.id}>
                        {cleanText(option.label)}
                      </option>
                    ))}
                  </select>
                </FormField>
              ) : null}
              <NodeSpecificFields data={data} node={selected} patch={patch} />
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function NodeSpecificFields({
  data,
  node,
  patch,
}: {
  data: LabData;
  node: EditableNode;
  patch: (value: Partial<EditableNode>) => void;
}) {
  if (node.kind === "attribute") {
    return (
      <>
        <FormField label="Identity" wide>
          <TextArea
            value={node.identity}
            onChange={(identity) =>
              patch({ identity } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Gameplay promise" wide>
          <TextArea
            value={node.gameplayPromise}
            onChange={(gameplayPromise) =>
              patch({ gameplayPromise } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Historical lineage" wide hint="One term per line">
          <TextArea
            value={node.historicalLineage.join("\n")}
            onChange={(value) =>
              patch({
                historicalLineage: value.split("\n").filter(Boolean),
              } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Coverage notes" wide>
          <TextArea
            value={node.coverageNotes}
            onChange={(coverageNotes) =>
              patch({ coverageNotes } as Partial<EditableNode>)
            }
          />
        </FormField>
      </>
    );
  }
  if (node.kind === "skill") {
    return (
      <>
        <FormField label="Definition" wide>
          <TextArea
            value={node.definition}
            onChange={(definition) =>
              patch({ definition } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Origin">
          <select
            value={node.origin}
            onChange={(event) =>
              patch({ origin: event.target.value } as Partial<EditableNode>)
            }
          >
            <option value="broad">broad</option>
            <option value="legacy-derived">legacy derived</option>
            <option value="newly-proposed">newly proposed</option>
          </select>
        </FormField>
        <FormField label="Legacy terms">
          <input
            value={node.legacyTerms.join(", ")}
            onChange={(event) =>
              patch({
                legacyTerms: event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Typical checks" wide hint="One check per line">
          <TextArea
            value={node.typicalChecks.join("\n")}
            onChange={(value) =>
              patch({
                typicalChecks: value.split("\n").filter(Boolean),
              } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Boundaries" wide hint="One boundary per line">
          <TextArea
            value={node.boundaries.join("\n")}
            onChange={(value) =>
              patch({
                boundaries: value.split("\n").filter(Boolean),
              } as Partial<EditableNode>)
            }
          />
        </FormField>
      </>
    );
  }
  if (node.kind === "focus") {
    return (
      <>
        <FormField label="Character fantasy" wide>
          <TextArea
            value={node.characterFantasy}
            onChange={(characterFantasy) =>
              patch({ characterFantasy } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Identity" wide>
          <TextArea
            value={node.identity}
            onChange={(identity) =>
              patch({ identity } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Typical uses" wide hint="One use per line">
          <TextArea
            value={node.typicalUses.join("\n")}
            onChange={(value) =>
              patch({
                typicalUses: value.split("\n").filter(Boolean),
              } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Boundary" wide>
          <TextArea
            value={node.boundary}
            onChange={(boundary) =>
              patch({ boundary } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Tier 2 posture" wide>
          <TextArea
            value={node.tier2Posture}
            onChange={(tier2Posture) =>
              patch({ tier2Posture } as Partial<EditableNode>)
            }
          />
        </FormField>
        <FormField label="Tier 3 posture" wide>
          <TextArea
            value={node.tier3Posture}
            onChange={(tier3Posture) =>
              patch({ tier3Posture } as Partial<EditableNode>)
            }
          />
        </FormField>
      </>
    );
  }
  if (node.kind === "shared-branch") {
    const skills = data.attributes.flatMap((attribute) => attribute.skills);
    return (
      <>
        <FormField label="Prerequisite logic">
          <select
            value={node.prerequisiteLogic}
            onChange={(event) =>
              patch({
                prerequisiteLogic: event.target.value,
              } as Partial<EditableNode>)
            }
          >
            <option value="AND">AND synthesis</option>
            <option value="OR">OR access</option>
          </select>
        </FormField>
        <FormField label="Linked Skills" wide>
          <div className="stl-check-grid">
            {skills.map((skill) => (
              <label key={skill.id}>
                <input
                  type="checkbox"
                  checked={node.skillIds.includes(skill.id)}
                  onChange={() =>
                    patch({
                      skillIds: node.skillIds.includes(skill.id)
                        ? node.skillIds.filter((id) => id !== skill.id)
                        : [...node.skillIds, skill.id],
                    } as Partial<EditableNode>)
                  }
                />
                {cleanText(skill.name)}
              </label>
            ))}
          </div>
        </FormField>
        <FormField label="Rationale" wide>
          <TextArea
            value={node.rationale}
            onChange={(rationale) =>
              patch({ rationale } as Partial<EditableNode>)
            }
          />
        </FormField>
      </>
    );
  }
  return <AbilityFields data={data} ability={node} patch={patch} />;
}

function AbilityFields({
  data,
  ability,
  patch,
}: {
  data: LabData;
  ability: Ability;
  patch: (value: Partial<EditableNode>) => void;
}) {
  const options = flattenNodes(data).filter(
    (node) => node.id !== ability.id && node.kind === "ability",
  );
  const patchRulesImpact = (value: Partial<Ability["rulesImpact"]>) =>
    patch({
      rulesImpact: { ...ability.rulesImpact, ...value },
    } as Partial<EditableNode>);
  return (
    <>
      <FormField label="Tier">
        <select
          value={ability.tier}
          onChange={(event) =>
            patch({
              tier: Number(event.target.value) as 1 | 2 | 3,
            } as Partial<EditableNode>)
          }
        >
          <option value="1">Tier 1</option>
          <option value="2">Tier 2</option>
          <option value="3">Tier 3</option>
        </select>
      </FormField>
      <FormField label="Maximum rank">
        <input
          type="number"
          min="1"
          max="9"
          value={ability.maxRank}
          onChange={(event) =>
            patch({
              maxRank: Number(event.target.value),
            } as Partial<EditableNode>)
          }
        />
      </FormField>
      <FormField label="Ability type">
        <select
          value={ability.abilityType}
          onChange={(event) =>
            patch({
              abilityType: event.target.value as AbilityType,
            } as Partial<EditableNode>)
          }
        >
          {ABILITY_TYPES.map((type) => (
            <option value={type} key={type}>
              {labelize(type)}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Applicability">
        <select
          value={ability.applicability}
          onChange={(event) =>
            patch({
              applicability: event.target.value,
            } as Partial<EditableNode>)
          }
        >
          <option value="away-team">away team</option>
          <option value="ship-support">ship support</option>
          <option value="both">both</option>
          <option value="general">general</option>
        </select>
      </FormField>
      <FormField label="Action cost" wide>
        <TextArea
          value={ability.actionCost}
          onChange={(actionCost) =>
            patch({ actionCost } as Partial<EditableNode>)
          }
          rows={2}
        />
      </FormField>
      <FormField label="Candidate effect" wide>
        <TextArea
          value={ability.candidateEffect}
          onChange={(candidateEffect) =>
            patch({ candidateEffect } as Partial<EditableNode>)
          }
        />
      </FormField>
      <FormField
        label="Lattice check surface"
        wide
        hint="State the actual target surface or check family: Effective Defense, Firewall, Hazard Rating, Injury Severity, Disposition, or Exposure."
      >
        <TextArea
          value={ability.rulesImpact.checkSurface}
          onChange={(checkSurface) => patchRulesImpact({ checkSurface })}
          rows={2}
        />
      </FormField>
      <FormField
        label="Rules state surfaces"
        wide
        hint="One state surface per line"
      >
        <TextArea
          value={ability.rulesImpact.stateSurfaces.join("\n")}
          onChange={(value) =>
            patchRulesImpact({
              stateSurfaces: value.split("\n").filter(Boolean),
            })
          }
          rows={3}
        />
      </FormField>
      <FormField label="Result-band behavior" wide>
        <TextArea
          value={ability.rulesImpact.resultBands}
          onChange={(resultBands) => patchRulesImpact({ resultBands })}
          rows={3}
        />
      </FormField>
      <FormField label="Rules guardrail" wide>
        <TextArea
          value={ability.rulesImpact.guardrail}
          onChange={(guardrail) => patchRulesImpact({ guardrail })}
          rows={3}
        />
      </FormField>
      <FormField label="Rank direction" wide>
        <TextArea
          value={ability.rankDirection}
          onChange={(rankDirection) =>
            patch({ rankDirection } as Partial<EditableNode>)
          }
        />
      </FormField>
      <FormField label="Prerequisite logic">
        <select
          value={ability.prerequisiteLogic}
          onChange={(event) =>
            patch({
              prerequisiteLogic: event.target.value,
            } as Partial<EditableNode>)
          }
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </FormField>
      <FormField
        label="Prerequisites"
        wide
        hint="Use Ctrl or Command to select multiple nodes."
      >
        <select
          multiple
          value={ability.prerequisiteIds}
          size={Math.min(8, Math.max(4, options.length))}
          onChange={(event) =>
            patch({
              prerequisiteIds: [...event.target.selectedOptions].map(
                (option) => option.value,
              ),
            } as Partial<EditableNode>)
          }
        >
          {options.map((option) => (
            <option value={option.id} key={option.id}>
              {labelize(option.kind)} / {cleanText(option.name)}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        label="Validation dependencies"
        wide
        hint="One dependency per line"
      >
        <TextArea
          value={ability.validationDependencies.join("\n")}
          onChange={(value) =>
            patch({
              validationDependencies: value.split("\n").filter(Boolean),
            } as Partial<EditableNode>)
          }
        />
      </FormField>
      <FormField label="Design rationale" wide>
        <TextArea
          value={ability.designRationale}
          onChange={(designRationale) =>
            patch({ designRationale } as Partial<EditableNode>)
          }
        />
      </FormField>
      <FormField label="Playtest notes" wide>
        <TextArea
          value={ability.playtestNotes}
          onChange={(playtestNotes) =>
            patch({ playtestNotes } as Partial<EditableNode>)
          }
        />
      </FormField>
      <FormField label="Coverage tags" wide>
        <div className="stl-check-grid">
          {ALL_COVERAGE_TAGS.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={ability.coverageTags.includes(tag)}
                onChange={() =>
                  patch({
                    coverageTags: ability.coverageTags.includes(tag)
                      ? ability.coverageTags.filter((item) => item !== tag)
                      : [...ability.coverageTags, tag],
                  } as Partial<EditableNode>)
                }
              />
              {COVERAGE_LABELS[tag]}
            </label>
          ))}
        </div>
      </FormField>
    </>
  );
}

function CoverageView({
  data,
  onSelect,
  onEdit,
}: {
  data: LabData;
  onSelect: (id: string) => void;
  onEdit: () => void;
}) {
  const counts = coverageCounts(data);
  const checks = diagnostics(data);
  const maximum = Math.max(...counts.map((entry) => entry.count), 1);
  const severityOrder = { critical: 0, warning: 1, info: 2, pass: 3 };
  const sorted = [...checks].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  );
  const totals = sorted.reduce<Record<string, number>>(
    (result, item) => ({
      ...result,
      [item.severity]: (result[item.severity] ?? 0) + 1,
    }),
    {},
  );

  return (
    <div className="stl-view-grid">
      <div className="stl-metric-grid stl-metric-grid-four">
        <Metric
          label="Critical"
          value={totals.critical ?? 0}
          detail="blocks consistency"
        />
        <Metric
          label="Warnings"
          value={totals.warning ?? 0}
          detail="review recommended"
        />
        <Metric
          label="Info"
          value={totals.info ?? 0}
          detail="intentional gaps"
        />
        <Metric
          label="Passes"
          value={totals.pass ?? 0}
          detail="verified checks"
        />
      </div>
      <div className="stl-two-column">
        <Panel title="Coverage distribution" eyebrow="Ability tags">
          <div className="stl-coverage-bars">
            {counts.map((entry) => (
              <div key={entry.tag}>
                <div>
                  <span>{entry.label}</span>
                  <strong>{entry.count}</strong>
                </div>
                <div>
                  <i style={{ width: `${(entry.count / maximum) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Shared branch load" eyebrow="Cross-skill synthesis">
          <div className="stl-branch-load">
            {data.sharedBranches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => {
                  onSelect(branch.id);
                  onEdit();
                }}
              >
                <span className="stl-logic-chip">
                  {branch.prerequisiteLogic}
                </span>
                <span>
                  <strong>{cleanText(branch.name)}</strong>
                  <small>
                    {branch.skillIds.length} linked Skills /{" "}
                    {branch.abilities.length} Abilities
                  </small>
                </span>
                <ChevronRight size={15} />
              </button>
            ))}
          </div>
        </Panel>
      </div>
      <Panel
        title="Consistency diagnostics"
        eyebrow={`${checks.length} automated checks`}
      >
        <div className="stl-diagnostics">
          {sorted.map((item) => {
            const Icon =
              item.severity === "critical"
                ? ShieldAlert
                : item.severity === "warning"
                  ? AlertTriangle
                  : item.severity === "pass"
                    ? CheckCircle2
                    : Info;
            return (
              <article
                className={`stl-diagnostic stl-diagnostic-${item.severity}`}
                key={item.id}
              >
                <Icon size={17} />
                <div>
                  <span>{item.severity}</span>
                  <h3>{cleanText(item.title)}</h3>
                  <p>{cleanText(item.detail)}</p>
                  {item.nodeId ? (
                    <button
                      onClick={() => {
                        onSelect(item.nodeId!);
                        onEdit();
                      }}
                    >
                      Open in editor <ChevronRight size={13} />
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function StyleView({
  data,
  commit,
}: {
  data: LabData;
  commit: (next: LabData) => void;
}) {
  const updateTheme = (patch: Partial<ThemeTokens>) =>
    commit({
      ...data,
      theme: { ...data.theme, ...patch, preset: patch.preset ?? "Custom" },
    });
  const tokenFields: Array<{ key: keyof ThemeTokens; label: string }> = [
    { key: "canvas", label: "Canvas" },
    { key: "surface", label: "Surface" },
    { key: "surfaceStrong", label: "Strong surface" },
    { key: "text", label: "Text" },
    { key: "textMuted", label: "Muted text" },
    { key: "line", label: "Line" },
    { key: "accent", label: "Accent" },
    { key: "accentStrong", label: "Strong accent" },
  ];
  return (
    <div className="stl-view-grid">
      <Panel title="Style presets" eyebrow="Live scoped theme">
        <div className="stl-preset-grid">
          {themePresets.map((preset) => (
            <button
              className={data.theme.preset === preset.preset ? "is-active" : ""}
              key={preset.preset}
              onClick={() =>
                commit({
                  ...data,
                  theme: cloneData({ ...data, theme: preset }).theme,
                })
              }
            >
              <span className="stl-preset-swatches">
                <i style={{ background: preset.canvas }} />
                <i style={{ background: preset.surfaceStrong }} />
                <i style={{ background: preset.accent }} />
              </span>
              <strong>{preset.preset}</strong>
              <small>
                Radius {preset.radius} / Density {preset.density}
              </small>
            </button>
          ))}
        </div>
      </Panel>
      <div className="stl-two-column stl-two-column-wide-left">
        <Panel title="Token controls" eyebrow={data.theme.preset}>
          <div className="stl-token-grid">
            {tokenFields.map((field) => (
              <FormField key={field.key} label={field.label}>
                <span className="stl-color-control">
                  <input
                    type="color"
                    value={String(data.theme[field.key])}
                    onChange={(event) =>
                      updateTheme({ [field.key]: event.target.value })
                    }
                  />
                  <input
                    value={String(data.theme[field.key])}
                    onChange={(event) =>
                      updateTheme({ [field.key]: event.target.value })
                    }
                  />
                </span>
              </FormField>
            ))}
            <FormField label="Radius" wide>
              <input
                type="range"
                min="0"
                max="24"
                value={data.theme.radius}
                onChange={(event) =>
                  updateTheme({ radius: Number(event.target.value) })
                }
              />
              <output>{data.theme.radius}px</output>
            </FormField>
            <FormField label="Density" wide>
              <input
                type="range"
                min="5"
                max="10"
                value={data.theme.density}
                onChange={(event) =>
                  updateTheme({ density: Number(event.target.value) })
                }
              />
              <output>{data.theme.density} / 10</output>
            </FormField>
          </div>
        </Panel>
        <Panel title="Live component board" eyebrow="Current tokens">
          <div className="stl-component-board">
            <div className="stl-live-header">
              <Network size={18} />
              <div>
                <small>Attribute tree</small>
                <strong>Wisdom</strong>
              </div>
              <StatusPill status="under-review" />
            </div>
            <nav className="stl-live-nav" aria-label="Style preview navigation">
              <button className="is-active">Tree</button>
              <button>Research</button>
              <button>Coverage</button>
            </nav>
            <div className="stl-live-skill">
              <span>Perception</span>
              <strong>3 Focuses</strong>
            </div>
            <div className="stl-live-focus">
              <CircleDot size={14} />
              <div>
                <strong>Threat Awareness</strong>
                <span>Read danger before it resolves.</span>
              </div>
            </div>
            <div className="stl-live-abilities">
              <button>Tier 1 / Scan the Room</button>
              <button>Tier 2 / Predictive Read</button>
            </div>
            <label className="stl-live-form">
              <span>Proposal status</span>
              <select defaultValue="under-review">
                <option value="proposed">Proposed</option>
                <option value="under-review">Under review</option>
              </select>
            </label>
            <div
              className="stl-live-table"
              role="table"
              aria-label="Style preview table row"
            >
              <div role="row">
                <strong role="cell">Threat Awareness</strong>
                <span role="cell">Tier 1</span>
                <span role="cell">Permission</span>
              </div>
            </div>
            <Notice tone="success">
              Tokens remain scoped to the Skill Tree Lab.
            </Notice>
            <div className="stl-live-modal" aria-label="Modal state preview">
              <div>
                <Info size={15} />
                <span>
                  <strong>Confirm proposal</strong>
                  <small>
                    This preview shows the modal surface and action hierarchy.
                  </small>
                </span>
              </div>
              <div>
                <button className="stl-button">Cancel</button>
                <button className="stl-button stl-button-primary">
                  Confirm
                </button>
              </div>
            </div>
            <div className="stl-live-actions">
              <button className="stl-button stl-button-primary">
                <Save size={14} /> Primary action
              </button>
              <button className="stl-button">Secondary</button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ConfirmDialog({
  title,
  detail,
  confirmLabel,
  tone = "danger",
  onConfirm,
  onCancel,
}: {
  title: string;
  detail: string;
  confirmLabel: string;
  tone?: "danger" | "safe";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  return (
    <div
      className="stl-dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onCancel();
      }}
    >
      <div
        className="stl-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="stl-dialog-title"
        aria-describedby="stl-dialog-detail"
        ref={dialogRef}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onCancel();
            return;
          }
          if (event.key !== "Tab") return;
          const focusable = Array.from(
            dialogRef.current?.querySelectorAll<HTMLButtonElement>(
              "button:not([disabled])",
            ) ?? [],
          );
          const first = focusable[0];
          const last = focusable.at(-1);
          if (!first || !last) return;
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <button
          className="stl-dialog-close"
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <X />
        </button>
        <div className={`stl-dialog-icon stl-dialog-icon-${tone}`}>
          {tone === "danger" ? <Trash2 /> : <RotateCcw />}
        </div>
        <h2 id="stl-dialog-title">{title}</h2>
        <p id="stl-dialog-detail">{detail}</p>
        <div className="stl-dialog-actions">
          <button className="stl-button" onClick={onCancel} ref={cancelRef}>
            Cancel
          </button>
          <button
            className={`stl-button ${tone === "danger" ? "stl-button-danger" : "stl-button-primary"}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SkillTreeLab() {
  const [data, setData] = useState<LabData>(loadInitialData);
  const [view, setView] = useState<LabView>("overview");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [past, setPast] = useState<LabData[]>([]);
  const [future, setFuture] = useState<LabData[]>([]);
  const [saveState, setSaveState] = useState<"saved" | "saving" | "error">(
    "saved",
  );
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [importError, setImportError] = useState("");
  const importRef = useRef<HTMLInputElement>(null);

  const commit = useCallback(
    (next: LabData) => {
      if (next === data || JSON.stringify(next) === JSON.stringify(data))
        return;
      setPast((current) => [...current.slice(-59), cloneData(data)]);
      setFuture([]);
      setData(next);
      setSaveState("saving");
    },
    [data],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(data));
        setSaveState("saved");
        setLastSaved(new Date());
      } catch {
        setSaveState("error");
      }
    }, 360);
    return () => window.clearTimeout(timer);
  }, [data]);

  const undo = () => {
    const previous = past.at(-1);
    if (!previous) return;
    setPast((current) => current.slice(0, -1));
    setFuture((current) => [cloneData(data), ...current].slice(0, 60));
    setData(previous);
    setSaveState("saving");
  };
  const redo = () => {
    const next = future[0];
    if (!next) return;
    setFuture((current) => current.slice(1));
    setPast((current) => [...current.slice(-59), cloneData(data)]);
    setData(next);
    setSaveState("saving");
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const imported = upgradeCandidateEffects(
        parseImportedLabData(await file.text()),
        seedLabData,
      );
      commit(imported);
      setImportError("");
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Import failed.");
    }
  };

  const reset = () => {
    setPast((current) => [...current.slice(-59), cloneData(data)]);
    setFuture([]);
    setData(cloneData(seedLabData));
    setSelectedId(null);
    setResetOpen(false);
    setSaveState("saving");
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    commit(deleteNode(data, deleteId));
    if (selectedId === deleteId) setSelectedId(null);
    setDeleteId(null);
  };

  const themeStyle = {
    "--stl-canvas": data.theme.canvas,
    "--stl-surface": data.theme.surface,
    "--stl-surface-strong": data.theme.surfaceStrong,
    "--stl-text": data.theme.text,
    "--stl-muted": data.theme.textMuted,
    "--stl-line": data.theme.line,
    "--stl-accent": data.theme.accent,
    "--stl-accent-strong": data.theme.accentStrong,
    "--stl-glow": data.theme.glow,
    "--stl-radius": `${data.theme.radius}px`,
    "--stl-density": data.theme.density,
  } as CSSProperties;
  const modified = JSON.stringify(data) !== SEED_SIGNATURE;

  return (
    <div className="skill-tree-lab" style={themeStyle}>
      <header className="stl-app-header">
        <div className="stl-brand-lockup">
          <div className="stl-brand-mark">
            <Network />
          </div>
          <div>
            <p>Nexus design instrument</p>
            <h1>Skill Tree Lab</h1>
          </div>
        </div>
        <div className="stl-app-status">
          <span className="stl-proposal-flag">
            <FlaskConical size={14} /> Playtest-ready · provisional
          </span>
          <span className={`stl-save-state stl-save-${saveState}`}>
            <i />
            {saveState === "saving"
              ? "Saving locally"
              : saveState === "error"
                ? "Storage error"
                : lastSaved
                  ? `Saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                  : "Saved locally"}
          </span>
          <span className="stl-change-state">
            {modified ? "Locally modified" : "Seed unchanged"}
          </span>
        </div>
        <div className="stl-app-actions">
          <button
            className="stl-icon-button"
            disabled={!past.length}
            onClick={undo}
            aria-label="Undo"
          >
            <Undo2 />
          </button>
          <button
            className="stl-icon-button"
            disabled={!future.length}
            onClick={redo}
            aria-label="Redo"
          >
            <Redo2 />
          </button>
          <span className="stl-action-separator" />
          <button
            className="stl-button"
            aria-label="Export JSON"
            title="Export JSON"
            onClick={() =>
              downloadText(
                "nexus-skill-tree-lab.json",
                JSON.stringify(data, null, 2),
                "application/json",
              )
            }
          >
            <FileJson size={14} /> <span>JSON</span>
          </button>
          <button
            className="stl-button"
            aria-label="Export Markdown"
            title="Export Markdown"
            onClick={() =>
              downloadText(
                "nexus-skill-tree-candidate.md",
                exportTreeMarkdown(data),
                "text/markdown",
              )
            }
          >
            <FileText size={14} /> <span>Markdown</span>
          </button>
          <button
            className="stl-button"
            aria-label="Import JSON"
            title="Import JSON"
            onClick={() => importRef.current?.click()}
          >
            <Upload size={14} /> <span>Import</span>
          </button>
          <button
            className="stl-icon-button stl-danger"
            onClick={() => setResetOpen(true)}
            aria-label="Reset to seed"
          >
            <RotateCcw />
          </button>
          <input
            className="stl-visually-hidden"
            ref={importRef}
            type="file"
            accept="application/json,.json"
            hidden
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleImport}
          />
        </div>
      </header>
      {importError ? (
        <div className="stl-import-error">
          <AlertTriangle size={15} />
          {cleanText(importError)}
          <button
            onClick={() => setImportError("")}
            aria-label="Dismiss import error"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}
      <nav className="stl-view-nav" aria-label="Skill Tree Lab views">
        {LAB_VIEWS.map((item) => (
          <button
            key={item.id}
            className={view === item.id ? "is-active" : ""}
            aria-label={item.label}
            title={item.label}
            aria-current={view === item.id ? "page" : undefined}
            onClick={() => setView(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <main className={`stl-workspace stl-workspace-${view}`}>
        {view === "overview" ? <OverviewView data={data} /> : null}
        {view === "research" ? <ResearchView data={data} /> : null}
        {view === "rules" ? <RulesView data={data} /> : null}
        {view === "tree" ? (
          <TreeExplorerView
            data={data}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onEdit={() => setView("editor")}
            commit={commit}
          />
        ) : null}
        {view === "editor" ? (
          <EditorView
            data={data}
            selectedId={selectedId}
            onSelect={setSelectedId}
            commit={commit}
            onDeleteRequest={setDeleteId}
          />
        ) : null}
        {view === "coverage" ? (
          <CoverageView
            data={data}
            onSelect={setSelectedId}
            onEdit={() => setView("editor")}
          />
        ) : null}
        {view === "style" ? <StyleView data={data} commit={commit} /> : null}
      </main>
      {resetOpen ? (
        <ConfirmDialog
          title="Reset the local Lab?"
          detail="This replaces every local tree edit and theme change with the bundled seed. You can still undo immediately after resetting."
          confirmLabel="Reset to seed"
          tone="safe"
          onConfirm={reset}
          onCancel={() => setResetOpen(false)}
        />
      ) : null}
      {deleteId ? (
        <ConfirmDialog
          title="Delete this proposal node?"
          detail={`Deleting ${cleanText(getNode(data, deleteId)?.name ?? "this node")} also removes every proposal nested beneath it. This can be undone from the Lab toolbar.`}
          confirmLabel="Delete proposal"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      ) : null}
    </div>
  );
}
