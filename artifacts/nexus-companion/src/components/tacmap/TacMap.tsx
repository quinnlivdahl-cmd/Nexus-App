import { useState, useRef, useEffect } from 'react';
import type { TacMapNode, TacMapPath, Actor, Faction, MarkerType } from '../../types/game';
import type { BackdropType } from '../../types/game';
import { BACKDROP_COMPONENTS } from './backdrops';

interface TacMapProps {
  backdropType: BackdropType;
  nodes: TacMapNode[];
  paths: TacMapPath[];
  actors: Actor[];
  currentActorId: string | null;
  onNodeClick?: (nodeId: string) => void;
  onActorClick?: (actorId: string) => void;
}

/* ── Colour maps ── */
const FACTION_COLOR: Record<Faction, string> = {
  player:        '#00b4aa',
  ally:          '#44aa88',
  npc:           '#8888aa',
  enemy:         '#E87722',
  'elite-enemy': '#ff4444',
};

const FACTION_BORDER: Record<Faction, string> = {
  player:        '#00e8dc',
  ally:          '#66ddaa',
  npc:           '#aaaacc',
  enemy:         '#ffaa44',
  'elite-enemy': '#ff6666',
};

const FACTION_ICON: Record<Faction, string> = {
  player:        '◈',
  ally:          '◆',
  npc:           '●',
  enemy:         '▲',
  'elite-enemy': '★',
};

/* ── Marker metadata ── */
const MARKER_META: Record<MarkerType, { symbol: string; color: string; label: string }> = {
  'half-cover':      { symbol: '⛉', color: '#7799aa', label: '½ Cover' },
  'full-cover':      { symbol: '⛊', color: '#99bbcc', label: 'Cover' },
  'hazard':          { symbol: '⚡', color: '#ffaa00', label: 'Hazard' },
  'objective':       { symbol: '◎', color: '#E87722', label: 'Obj' },
  'high-ground':     { symbol: '▲', color: '#aaddff', label: 'High' },
  'extraction':      { symbol: '⬡', color: '#00e8dc', label: 'Extract' },
  'entry':           { symbol: '→',  color: '#66cc88', label: 'Entry' },
  'exit':            { symbol: '←',  color: '#cc8866', label: 'Exit' },
  'loot-cache':      { symbol: '◇', color: '#ffdd44', label: 'Loot' },
  'reinforcement':   { symbol: '!',  color: '#ff4444', label: 'Reinf.' },
  'locked-route':    { symbol: '⊘', color: '#aa4444', label: 'Locked' },
  'ally-npc':        { symbol: '★', color: '#44aa88', label: 'NPC' },
};

/* ── Path status colours ── */
const PATH_COLOR: Record<string, { stroke: string; opacity: number; dash?: string }> = {
  open:    { stroke: '#E87722', opacity: 0.55 },
  locked:  { stroke: '#ff4444', opacity: 0.5, dash: '6 4' },
  blocked: { stroke: '#aa2222', opacity: 0.4, dash: '4 4' },
  hidden:  { stroke: '#446688', opacity: 0.3, dash: '2 6' },
};

/* ── Small HP bar drawn inside SVG ── */
function ActorHPBar({ actor, width = 24 }: { actor: Actor; width?: number }) {
  const pct = actor.maxHealth > 0 ? Math.max(0, Math.min(1, actor.health / actor.maxHealth)) : 0;
  const fill = pct > 0.5 ? '#00b4aa' : pct > 0.25 ? '#E87722' : '#ff3322';
  return (
    <g>
      <rect x={-width / 2} y={0} width={width} height={3} rx={1} fill="#1a2030" opacity={0.9} />
      <rect x={-width / 2} y={0} width={width * pct} height={3} rx={1} fill={fill} opacity={0.9} />
    </g>
  );
}

export default function TacMap({
  backdropType,
  nodes,
  paths,
  actors,
  currentActorId,
  onNodeClick,
  onActorClick,
}: TacMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 900, h: 600 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredActor, setHoveredActor] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const BackdropComponent = BACKDROP_COMPONENTS[backdropType] ?? BACKDROP_COMPONENTS['ship-corridor'];
  const toPx = (pct: number, dim: number) => (pct / 100) * dim;
  const liveActors = (nodeId: string) => actors.filter((a) => a.nodeId === nodeId && !a.isDowned);

  function handleNodeClick(nodeId: string) {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
    onNodeClick?.(nodeId);
  }

  return (
    <div ref={containerRef} className="tacmap-container">
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {/* ── Backdrop ── */}
        <g>
          <BackdropComponent width={dims.w} height={dims.h} />
        </g>

        {/* ── Tactical tint ── */}
        <rect x={0} y={0} width={dims.w} height={dims.h} fill="#000" opacity={0.28} />

        {/* ── Paths ── */}
        <g>
          {paths.map((path) => {
            const fromNode = nodes.find((n) => n.id === path.fromId);
            const toNode   = nodes.find((n) => n.id === path.toId);
            if (!fromNode || !toNode) return null;

            const x1 = toPx(fromNode.x, dims.w);
            const y1 = toPx(fromNode.y, dims.h);
            const x2 = toPx(toNode.x,   dims.w);
            const y2 = toPx(toNode.y,   dims.h);

            const style = PATH_COLOR[path.status ?? 'open'] ?? PATH_COLOR.open;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;

            // Tags: e.g. ['elevated','hazard']
            const tags = path.tags ?? [];

            return (
              <g key={path.id}>
                {/* Path line */}
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={style.stroke}
                  strokeWidth={2}
                  strokeOpacity={style.opacity}
                  strokeDasharray={style.dash}
                />
                {/* Distance badge */}
                <g transform={`translate(${mx},${my})`}>
                  <rect x={-10} y={-9} width={20} height={12} rx={2} fill="#0d1620" fillOpacity={0.85} />
                  <text textAnchor="middle" y={0} fontSize={9} fill={style.stroke} fillOpacity={0.9} fontFamily="monospace">
                    {path.distance}
                  </text>
                </g>
                {/* Path status tag */}
                {path.status && path.status !== 'open' && (
                  <g transform={`translate(${mx},${my + 12})`}>
                    <rect x={-16} y={-1} width={32} height={10} rx={2} fill="#0d1620" fillOpacity={0.8} />
                    <text textAnchor="middle" y={8} fontSize={7} fill={style.stroke} fillOpacity={0.8} fontFamily="monospace">
                      {path.status.toUpperCase()}
                    </text>
                  </g>
                )}
                {/* Extra tags (e.g. 'elevated', 'exposed') */}
                {tags.map((tag, ti) => (
                  <g key={tag} transform={`translate(${mx},${my + 22 + ti * 10})`}>
                    <text textAnchor="middle" y={0} fontSize={6} fill="#8899aa" fillOpacity={0.7} fontFamily="monospace">
                      [{tag}]
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </g>

        {/* ── Nodes ── */}
        <g>
          {nodes.map((node) => {
            const px = toPx(node.x, dims.w);
            const py = toPx(node.y, dims.h);
            const nodeActors = liveActors(node.id);
            const isSelected  = selectedNode === node.id;
            const isObjective = node.isObjective;
            const markers     = node.markers ?? [];
            const statusTags  = node.status ?? [];
            const r = 22;

            return (
              <g
                key={node.id}
                transform={`translate(${px},${py})`}
                onClick={() => handleNodeClick(node.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Selection ring */}
                {isSelected && (
                  <circle r={r + 8} fill="none" stroke="#00e8dc" strokeWidth={2} strokeOpacity={0.9} strokeDasharray="4 4" />
                )}
                {/* Objective pulse ring */}
                {isObjective && (
                  <circle r={r + 5} fill="none" stroke="#E87722" strokeWidth={1.5} strokeOpacity={0.8} />
                )}
                {/* Node body */}
                <circle
                  r={r}
                  fill="#0d1620"
                  fillOpacity={0.92}
                  stroke={isObjective ? '#E87722' : '#2a4060'}
                  strokeWidth={isObjective ? 2 : 1.5}
                />
                {/* Elevation badge */}
                {node.elevation != null && node.elevation > 0 && (
                  <g transform={`translate(${r - 6},${-r + 6})`}>
                    <rect x={-8} y={-6} width={16} height={10} rx={2} fill="#0d1620" fillOpacity={0.9} />
                    <text textAnchor="middle" y={2} fontSize={7} fill="#aaddff" fontFamily="monospace">+{node.elevation}</text>
                  </g>
                )}
                {/* Node label */}
                <text
                  y={r + 13}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#b0c8e0"
                  fontFamily="monospace"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.label}
                </text>
                {/* Status tags below label */}
                {statusTags.slice(0, 2).map((tag, ti) => (
                  <text
                    key={tag}
                    y={r + 23 + ti * 10}
                    textAnchor="middle"
                    fontSize={7}
                    fill="#6699aa"
                    fontFamily="monospace"
                    style={{ pointerEvents: 'none' }}
                  >
                    [{tag}]
                  </text>
                ))}
                {/* Capacity slots */}
                {node.capacity != null && node.capacity > 0 && (
                  <g transform={`translate(0,${-r - 6})`}>
                    {[...Array(node.capacity)].map((_, i) => {
                      const slotActor = nodeActors[i];
                      return (
                        <circle
                          key={i}
                          cx={(i - (node.capacity! - 1) / 2) * 7}
                          cy={0}
                          r={2.5}
                          fill={slotActor ? FACTION_COLOR[slotActor.faction] : '#1a2840'}
                          stroke="#2a4060"
                          strokeWidth={0.5}
                        />
                      );
                    })}
                  </g>
                )}
                {/* ── Marker icon layer ── */}
                {markers.slice(0, 4).map((m, mi) => {
                  const meta = MARKER_META[m];
                  if (!meta) return null;
                  // Place markers in a small arc around the node edge
                  const angle = (mi / Math.max(markers.length, 1)) * Math.PI * 2 - Math.PI / 2;
                  const mr = r + 14;
                  const mx = Math.cos(angle) * mr;
                  const my = Math.sin(angle) * mr;
                  return (
                    <g key={m} transform={`translate(${mx},${my})`}>
                      <circle r={7} fill="#0d1620" fillOpacity={0.9} stroke={meta.color} strokeWidth={1} strokeOpacity={0.7} />
                      <text textAnchor="middle" dominantBaseline="central" fontSize={8} fill={meta.color} fillOpacity={0.9}>
                        {meta.symbol}
                      </text>
                    </g>
                  );
                })}
                {/* ── Actor tokens ── */}
                {nodeActors.slice(0, 4).map((actor, i) => {
                  const count = Math.min(nodeActors.length, 4);
                  const angle = count === 1 ? -Math.PI / 2 : (i / count) * Math.PI * 2 - Math.PI / 2;
                  const tr    = count === 1 ? 0 : 11;
                  const tx    = Math.cos(angle) * tr;
                  const ty    = Math.sin(angle) * tr;
                  const isActive = actor.id === currentActorId;
                  const isHovered = actor.id === hoveredActor;
                  const hpPct = actor.maxHealth > 0 ? actor.health / actor.maxHealth : 1;

                  return (
                    <g
                      key={actor.id}
                      transform={`translate(${tx},${ty})`}
                      onClick={(e) => { e.stopPropagation(); onActorClick?.(actor.id); }}
                      onMouseEnter={() => setHoveredActor(actor.id)}
                      onMouseLeave={() => setHoveredActor(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Active-turn pulse ring */}
                      {isActive && (
                        <circle r={12} fill="none" stroke={FACTION_BORDER[actor.faction]} strokeWidth={2} opacity={0.9} />
                      )}
                      {/* Status-effect ring (one per active status) */}
                      {actor.statusEffects.slice(0, 3).map((_, si) => (
                        <circle
                          key={si}
                          r={8 + si * 2}
                          fill="none"
                          stroke={FACTION_COLOR[actor.faction]}
                          strokeWidth={0.6}
                          strokeOpacity={0.35}
                          strokeDasharray={`${2 + si} ${3 + si}`}
                        />
                      ))}
                      {/* Token body */}
                      <circle
                        r={7}
                        fill={FACTION_COLOR[actor.faction]}
                        fillOpacity={isActive ? 0.35 : 0.2}
                        stroke={FACTION_COLOR[actor.faction]}
                        strokeWidth={1.5}
                      />
                      {/* Faction icon */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={8}
                        fill={FACTION_COLOR[actor.faction]}
                      >
                        {FACTION_ICON[actor.faction]}
                      </text>
                      {/* HP fraction bar — shown below token */}
                      <g transform="translate(0,10)">
                        <ActorHPBar actor={actor} width={hpPct > 0.99 ? 0 : 18} />
                      </g>
                      {/* Actor name — shown on hover or when active */}
                      {(isHovered || isActive) && (
                        <g transform="translate(0,-14)">
                          <rect
                            x={-(actor.name.length * 3)}
                            y={-8}
                            width={actor.name.length * 6}
                            height={10}
                            rx={2}
                            fill="#0d1620"
                            fillOpacity={0.9}
                          />
                          <text
                            textAnchor="middle"
                            y={0}
                            fontSize={7}
                            fill={FACTION_COLOR[actor.faction]}
                            fontFamily="monospace"
                            style={{ pointerEvents: 'none' }}
                          >
                            {actor.name}
                          </text>
                        </g>
                      )}
                      {/* Status effect dots ring */}
                      {actor.statusEffects.length > 0 && !isHovered && (
                        <g transform="translate(6,-6)">
                          <circle r={3} fill="#E87722" opacity={0.9} />
                          <text textAnchor="middle" dominantBaseline="central" fontSize={4} fill="#0d0d10">
                            {actor.statusEffects.length}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>

        {/* ── Downed actors ── */}
        <g>
          {actors
            .filter((a) => a.isDowned && a.nodeId)
            .map((actor) => {
              const node = nodes.find((n) => n.id === actor.nodeId);
              if (!node) return null;
              const px = toPx(node.x, dims.w);
              const py = toPx(node.y, dims.h) + 32;
              return (
                <g key={`downed-${actor.id}`} transform={`translate(${px},${py})`}>
                  <text fontSize={10} textAnchor="middle" fill="#ff4444" fillOpacity={0.6}>✕</text>
                  <text y={11} fontSize={7} textAnchor="middle" fill="#ff4444" fillOpacity={0.5} fontFamily="monospace">
                    {actor.name}
                  </text>
                </g>
              );
            })}
        </g>

        {/* ── Marker legend (bottom-left, when markers exist) ── */}
        {(() => {
          const allMarkers = Array.from(new Set(nodes.flatMap((n) => n.markers ?? [])));
          if (allMarkers.length === 0) return null;
          return (
            <g transform={`translate(8,${dims.h - 8 - allMarkers.length * 14})`}>
              {allMarkers.map((m, i) => {
                const meta = MARKER_META[m];
                if (!meta) return null;
                return (
                  <g key={m} transform={`translate(0,${-i * 14})`}>
                    <rect x={0} y={-10} width={70} height={12} rx={2} fill="#0d1620" fillOpacity={0.8} />
                    <text x={4} y={0} fontSize={8} fill={meta.color} fontFamily="monospace">
                      {meta.symbol} {meta.label}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
