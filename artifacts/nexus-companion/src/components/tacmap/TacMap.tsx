import { useState, useRef, useEffect } from 'react';
import type { TacMapNode, TacMapPath, Actor, Faction } from '../../types/game';
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

const FACTION_COLORS: Record<Faction, string> = {
  player: '#00b4aa',
  ally: '#44aa88',
  npc: '#8888aa',
  enemy: '#E87722',
  'elite-enemy': '#ff4444',
};

const FACTION_BORDER: Record<Faction, string> = {
  player: '#00e8dc',
  ally: '#66ddaa',
  npc: '#aaaacc',
  enemy: '#ffaa44',
  'elite-enemy': '#ff6666',
};

function FactionIcon({ faction, size = 14 }: { faction: Faction; size?: number }) {
  const icons: Record<Faction, string> = {
    player: '◈',
    ally: '◆',
    npc: '●',
    enemy: '▲',
    'elite-enemy': '★',
  };
  return <text fontSize={size} textAnchor="middle" dominantBaseline="central" fill={FACTION_COLORS[faction]}>{icons[faction]}</text>;
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

  const toPixel = (pct: number, dim: number) => (pct / 100) * dim;

  const getActorsAtNode = (nodeId: string) => actors.filter((a) => a.nodeId === nodeId && !a.isDowned);

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
        className="tacmap-svg"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {/* Backdrop layer */}
        <g className="backdrop-layer">
          <BackdropComponent width={dims.w} height={dims.h} />
        </g>

        {/* Tactical overlay tint */}
        <rect x={0} y={0} width={dims.w} height={dims.h} fill="#000" opacity={0.25} />

        {/* Path layer */}
        <g className="path-layer">
          {paths.map((path) => {
            const fromNode = nodes.find((n) => n.id === path.fromId);
            const toNode = nodes.find((n) => n.id === path.toId);
            if (!fromNode || !toNode) return null;
            const x1 = toPixel(fromNode.x, dims.w);
            const y1 = toPixel(fromNode.y, dims.h);
            const x2 = toPixel(toNode.x, dims.w);
            const y2 = toPixel(toNode.y, dims.h);
            const isLocked = path.status === 'locked' || path.status === 'blocked';
            return (
              <g key={path.id}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isLocked ? '#ff4444' : '#E87722'}
                  strokeWidth={2}
                  strokeOpacity={isLocked ? 0.4 : 0.55}
                  strokeDasharray={isLocked ? '6 4' : undefined}
                />
                {/* Distance label */}
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 6}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#E87722"
                  fillOpacity={0.8}
                  fontFamily="monospace"
                >
                  {path.distance}
                </text>
              </g>
            );
          })}
        </g>

        {/* Node layer */}
        <g className="node-layer">
          {nodes.map((node) => {
            const px = toPixel(node.x, dims.w);
            const py = toPixel(node.y, dims.h);
            const nodeActors = getActorsAtNode(node.id);
            const isSelected = selectedNode === node.id;
            const isObjective = node.isObjective;
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
                  <circle r={r + 6} fill="none" stroke="#00e8dc" strokeWidth={2} strokeOpacity={0.8}
                    strokeDasharray="4 4" />
                )}
                {/* Objective ring */}
                {isObjective && (
                  <circle r={r + 4} fill="none" stroke="#E87722" strokeWidth={1.5} strokeOpacity={0.7} />
                )}
                {/* Node background */}
                <circle r={r} fill="#0d1620" fillOpacity={0.92} stroke={isObjective ? '#E87722' : '#2a4060'} strokeWidth={isObjective ? 2 : 1.5} />
                {/* Elevation indicator */}
                {node.elevation != null && node.elevation > 0 && (
                  <text x={r - 4} y={-r + 4} fontSize={8} fill="#E87722" textAnchor="middle" fontFamily="monospace">
                    +{node.elevation}
                  </text>
                )}
                {/* Node label */}
                <text
                  y={r + 12}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#b0c8e0"
                  fontFamily="monospace"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.label}
                </text>
                {/* Capacity dots */}
                {node.capacity != null && (
                  <g transform={`translate(0,${r + 22})`}>
                    {[...Array(node.capacity)].map((_, i) => {
                      const slotTaken = nodeActors[i] != null;
                      return (
                        <circle
                          key={i}
                          cx={(i - (node.capacity! - 1) / 2) * 7}
                          cy={0}
                          r={2.5}
                          fill={slotTaken ? FACTION_COLORS[nodeActors[i].faction] : '#2a4060'}
                          stroke="#2a4060"
                          strokeWidth={0.5}
                        />
                      );
                    })}
                  </g>
                )}
                {/* Actor tokens at node */}
                {nodeActors.slice(0, 4).map((actor, i) => {
                  const angle = (i / Math.max(nodeActors.length, 1)) * Math.PI * 2 - Math.PI / 2;
                  const tr = nodeActors.length === 1 ? 0 : 10;
                  const tx = Math.cos(angle) * tr;
                  const ty = Math.sin(angle) * tr;
                  const isActive = actor.id === currentActorId;
                  return (
                    <g
                      key={actor.id}
                      transform={`translate(${tx},${ty})`}
                      onClick={(e) => { e.stopPropagation(); onActorClick?.(actor.id); }}
                    >
                      {isActive && (
                        <circle r={10} fill="none" stroke={FACTION_BORDER[actor.faction]} strokeWidth={2} opacity={0.9} />
                      )}
                      <circle r={7} fill={FACTION_COLORS[actor.faction]} fillOpacity={0.2} stroke={FACTION_COLORS[actor.faction]} strokeWidth={1.5} />
                      <FactionIcon faction={actor.faction} size={8} />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>

        {/* Downed actors layer */}
        <g className="downed-layer">
          {actors
            .filter((a) => a.isDowned && a.nodeId)
            .map((actor) => {
              const node = nodes.find((n) => n.id === actor.nodeId);
              if (!node) return null;
              const px = toPixel(node.x, dims.w);
              const py = toPixel(node.y, dims.h) + 28;
              return (
                <g key={`downed-${actor.id}`} transform={`translate(${px},${py})`}>
                  <text fontSize={10} textAnchor="middle" fill="#ff4444" fillOpacity={0.7}>✕</text>
                  <text y={12} fontSize={7} textAnchor="middle" fill="#ff4444" fillOpacity={0.6} fontFamily="monospace">
                    {actor.name}
                  </text>
                </g>
              );
            })}
        </g>
      </svg>
    </div>
  );
}
