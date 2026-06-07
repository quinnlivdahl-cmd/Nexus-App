import { useState, useRef, useEffect, useCallback } from 'react';
import { GameStateProvider, useGameState } from './store/GameStateContext';
import { useDMChat } from './lib/useDMChat';
import { useImageGeneration } from './lib/useImageGeneration';
import TacMap from './components/tacmap/TacMap';
import type { AppView, MenuTab, CrewMember, Actor } from './types/game';
import { BACKDROP_LABELS } from './components/tacmap/backdrops';

/* ── Icons (simple SVG) ── */
function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const IconSword      = () => <Icon d="M14.5 17.5L3 6V3h3l11.5 11.5M16.5 15.5l2 2L20 16l-2-2M5 8l2-2" />;
const IconMap        = () => <Icon d="M3 7l6-4 6 4 6-4v13l-6 4-6-4-6 4V7z" />;
const IconUsers      = () => <Icon d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />;
const IconRoute      = () => <Icon d="M3 17l4-8 4 8 4-5 4 5M3 12h18" />;
const IconSettings   = () => <Icon d="M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />;
const IconSend       = () => <Icon d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />;
const IconImage      = () => <Icon d="M21 15l-5-5L5 20M21 3H3v18h18V3zM7.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />;
const IconBug        = () => <Icon d="M8 2l4 4 4-4M6.2 9.8L4 8M17.8 9.8L20 8M12 6v12M4 12h4M16 12h4M6.2 17.8L4 20M17.8 17.8L20 20M8 22h8" />;
const IconChevronD   = () => <Icon d="M6 9l6 6 6-6" />;
const IconChevronR   = () => <Icon d="M9 18l6-6-6-6" />;
const IconMenu       = () => <Icon d="M4 6h16M4 12h16M4 18h16" />;
const IconX          = () => <Icon d="M18 6L6 18M6 6l12 12" />;
const IconRefresh    = () => <Icon d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />;

/* ── Health bar ── */
function HealthBar({ current, max, className = '' }: { current: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(1, current / max)) : 0;
  const cls = pct < 0.25 ? 'bg-red-500' : pct < 0.5 ? 'bg-amber-500' : 'bg-teal-500';
  return (
    <div className={`h-1.5 bg-black/40 border border-white/10 rounded-full overflow-hidden ${className}`}>
      <div className={`h-full ${cls} rounded-full transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]`} style={{ width: `${pct * 100}%` }} />
    </div>
  );
}

/* ── Clock ── */
function Clock({ name, current, max }: { name: string; current: number; max: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider flex-1 truncate">{name}</span>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-[2px] border transition-all ${
            i < current
              ? current >= max ? 'bg-red-500 border-red-400 shadow-[0_0_6px_rgba(255,51,34,0.6)]' : 'bg-amber-500 border-amber-400 shadow-[0_0_6px_rgba(232,119,34,0.6)]'
              : 'bg-black/50 border-white/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]'
          }`} />
        ))}
      </div>
    </div>
  );
}

/* ── Stat badge ── */
function StatBadge({ label, value, variant = 'default' }: { label: string; value: string | number; variant?: 'default' | 'amber' | 'teal' | 'red' }) {
  const colors = {
    default: 'text-white/70 border-white/20 bg-black/20',
    amber:   'text-amber-400 border-amber-500/40 bg-amber-500/5',
    teal:    'text-teal-400 border-teal-500/40 bg-teal-500/5',
    red:     'text-red-400 border-red-500/40 bg-red-500/5',
  };
  return (
    <div className={`flex flex-col items-center border px-2 py-1 rounded ${colors[variant]}`}>
      <span className="text-[8px] uppercase tracking-widest opacity-60 font-bold">{label}</span>
      <span className="text-sm font-mono font-medium">{value}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   CHAT WINDOW
══════════════════════════════════════════ */
function ChatWindow() {
  const { state } = useGameState();
  const { sendMessage } = useDMChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isAiThinking]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || state.isAiThinking) return;
    setInput('');
    sendMessage(text);
  }, [input, state.isAiThinking, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {state.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
            <div className="text-amber-500/60 text-xs font-mono uppercase tracking-widest font-bold">
              Nexus DM Interface — Ready
            </div>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
              The Wayfarer Saint drifts cold in Europa's shadow. Cache E-43 is waiting.
              Speak to begin.
            </p>
            {!state.settings.openaiApiKey && (
              <div className="mt-2 border border-amber-500/40 bg-amber-500/10 rounded px-3 py-2 text-amber-400/90 text-[11px] font-mono">
                ⚠ No API key — open Menu → Settings
              </div>
            )}
          </div>
        )}

        {state.messages.map((msg) => (
          <div key={msg.id} className={msg.role === 'user' ? 'flex justify-end' : ''}>
            {msg.role === 'user' ? (
              <div className="max-w-[85%] bg-amber-500/10 border-l-4 border-amber-500/80 pl-4 pr-4 py-3 rounded-r text-amber-50/90 text-[13px] leading-relaxed font-mono shadow-[inset_1px_0_4px_rgba(232,119,34,0.2)]">
                {msg.content}
              </div>
            ) : (
              <div className="max-w-[95%] bg-teal-500/5 rounded-r py-2 pr-2">
                <div className="flex items-center gap-2 mb-2 px-3">
                  <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold font-mono bg-teal-500/20 px-1.5 py-0.5 rounded-sm">SYS.DM</span>
                  {msg.hasStateBlock && (
                    <span className="text-[9px] border border-teal-500/40 text-teal-400/80 px-1.5 py-0.5 rounded-sm font-mono tracking-widest">STATE ↓</span>
                  )}
                </div>
                <div className="border-l-4 border-teal-500/60 pl-4 pr-3 py-1 text-white/85 text-[13px] leading-relaxed font-mono whitespace-pre-wrap">
                  {state.settings.debugMode && msg.rawContent && msg.rawContent !== msg.content
                    ? msg.rawContent
                    : msg.content}
                </div>
              </div>
            )}
          </div>
        ))}

        {state.isAiThinking && (
          <div className="border-l-4 border-teal-500/60 pl-4 py-2 bg-teal-500/5 rounded-r">
            <div className="flex items-center gap-1 nx-thinking">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Hazard tape divider */}
      <div className="hazard-stripe mx-0" />

      {/* Input area */}
      <div className="p-3 flex gap-2 bg-black/40 border-t border-white/15">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Speak to the DM…"
          rows={2}
          disabled={state.isAiThinking}
          className="flex-1 bg-black/60 border border-white/20 rounded-md text-white/90 text-[13px] font-mono px-3 py-2.5 resize-none outline-none placeholder:text-white/30 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={state.isAiThinking || !input.trim()}
          className="px-4 bg-amber-500/15 border border-amber-500/40 text-amber-400 rounded-md hover:bg-amber-500/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"
          title="Send (Enter)"
        >
          <IconSend />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   COMBAT TRACKER
══════════════════════════════════════════ */
function CombatTracker() {
  const { state, dispatch } = useGameState();
  const { encounter } = state;

  if (!encounter.active) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-center p-4">
        <div className="text-white/20 text-xs font-mono uppercase tracking-widest">No Active Encounter</div>
        <p className="text-white/15 text-[10px]">Tell the DM to initiate an encounter to start the tactical display.</p>
      </div>
    );
  }

  const players = encounter.actors.filter((a) => a.faction === 'player' || a.faction === 'ally');
  const enemies = encounter.actors.filter((a) => a.faction === 'enemy' || a.faction === 'elite-enemy');
  const others  = encounter.actors.filter((a) => a.faction === 'npc');

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Round / header */}
      <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="font-mono text-amber-400 text-xs uppercase tracking-widest">
          Round {encounter.round}
        </div>
        {encounter.title && (
          <div className="text-[10px] text-white/40 font-mono truncate max-w-[60%]">{encounter.title}</div>
        )}
      </div>

      {/* Current actor highlight */}
      {encounter.currentActorId && (() => {
        const cur = encounter.actors.find((a) => a.id === encounter.currentActorId);
        return cur ? (
          <div className="mx-3 mt-2 border border-teal-500/40 bg-teal-500/5 rounded px-2 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 text-xs font-mono">{cur.name} — Active Turn</span>
          </div>
        ) : null;
      })()}

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Objectives */}
        {encounter.objectives.length > 0 && (
          <div>
            <div className="text-[9px] uppercase tracking-widest text-amber-500/60 font-mono mb-1">Objectives</div>
            {encounter.objectives.map((obj, i) => (
              <div key={i} className="text-[11px] text-white/60 font-mono pl-2 border-l border-amber-500/30 mb-1">{obj}</div>
            ))}
          </div>
        )}

        {/* Clocks */}
        {encounter.clocks.length > 0 && (
          <div>
            <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">Clocks</div>
            <div className="space-y-1.5">
              {encounter.clocks.map((c, i) => <Clock key={i} {...c} />)}
            </div>
          </div>
        )}

        {/* Player/Ally actors */}
        {players.length > 0 && (
          <div>
            <div className="text-[9px] uppercase tracking-widest text-teal-500/60 font-mono mb-2">Crew</div>
            <div className="space-y-2">
              {players.map((a) => <ActorRow key={a.id} actor={a} currentActorId={encounter.currentActorId} />)}
            </div>
          </div>
        )}

        {/* Enemy actors */}
        {enemies.length > 0 && (
          <div>
            <div className="text-[9px] uppercase tracking-widest text-amber-500/60 font-mono mb-2">Hostiles</div>
            <div className="space-y-2">
              {enemies.map((a) => <ActorRow key={a.id} actor={a} currentActorId={encounter.currentActorId} />)}
            </div>
          </div>
        )}

        {/* NPC actors */}
        {others.length > 0 && (
          <div>
            <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">Others</div>
            <div className="space-y-2">
              {others.map((a) => <ActorRow key={a.id} actor={a} currentActorId={encounter.currentActorId} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActorRow({ actor, currentActorId }: { actor: Actor; currentActorId: string | null }) {
  const isActive = actor.id === currentActorId;
  const isDowned = actor.isDowned;
  const factionColor = {
    player: 'border-teal-500/40 bg-teal-500/5',
    ally: 'border-teal-500/30 bg-teal-500/5',
    npc: 'border-white/15 bg-white/5',
    enemy: 'border-amber-500/40 bg-amber-500/5',
    'elite-enemy': 'border-red-500/40 bg-red-500/5',
  }[actor.faction];

  return (
    <div className={`rounded border px-2 py-1.5 transition-all relative overflow-hidden ${isActive ? 'ring-1 ring-teal-400/40 shadow-[0_0_10px_rgba(0,180,170,0.15)] bg-teal-500/10' : ''} ${isDowned ? 'opacity-40' : ''} ${factionColor}`}>
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-teal-400 animate-pulse shadow-[0_0_5px_rgba(0,180,170,0.8)]" />}
      <div className={`flex items-center justify-between mb-1.5 ${isActive ? 'pl-2' : ''}`}>
        <span className="text-[13px] font-mono text-white/90 font-medium">{actor.name}</span>
        <div className="flex gap-1.5 text-[10px] font-mono">
          <span className="text-teal-400 font-bold">{actor.ap}/{actor.maxAp}<span className="text-white/40">AP</span></span>
          <span className="text-white/30">·</span>
          <span className="text-amber-400 font-bold">{actor.mp}/{actor.maxMp}<span className="text-white/40">MP</span></span>
        </div>
      </div>
      <HealthBar current={actor.health} max={actor.maxHealth} className={`mb-1.5 ${isActive ? 'ml-2' : ''}`} />
      <div className={`flex gap-2 text-[10px] font-mono text-white/50 ${isActive ? 'pl-2' : ''}`}>
        <span>HP {actor.health}/{actor.maxHealth}</span>
        {actor.systemIntegrity != null && <span>· SI {actor.systemIntegrity}/{actor.maxSystemIntegrity}</span>}
        <span>· DEF <strong className="text-white/70">{actor.defense}</strong></span>
        {actor.firewall != null && <span>· FW <strong className="text-white/70">{actor.firewall}</strong></span>}
        {actor.shield != null && actor.shield > 0 && <span>· SHD <strong className="text-amber-400/80">{actor.shield}</strong></span>}
      </div>
      {actor.statusEffects.length > 0 && (
        <div className={`flex flex-wrap gap-1 mt-1.5 ${isActive ? 'pl-2' : ''}`}>
          {actor.statusEffects.map((s, i) => (
            <span key={i} className="text-[9px] border border-amber-500/40 bg-amber-500/10 text-amber-400/90 px-1.5 py-0.5 rounded-sm font-mono tracking-wide">{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   CREW SHEET
══════════════════════════════════════════ */
function CrewPanel() {
  const { state } = useGameState();
  const [selected, setSelected] = useState<string | null>(state.crew[0]?.id ?? null);

  const member = state.crew.find((m) => m.id === selected);

  return (
    <div className="flex h-full">
      {/* Crew list sidebar */}
      <div className="w-44 border-r border-white/10 flex flex-col overflow-y-auto">
        <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono px-3 py-2 border-b border-white/10">Crew</div>
        {state.crew.map((m) => {
          const statusColor = { active: 'bg-teal-500', 'ship-support': 'bg-amber-500', unavailable: 'bg-white/30', down: 'bg-red-500' }[m.status];
          return (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`text-left px-3 py-2 text-xs font-mono border-b border-white/5 transition-all ${selected === m.id ? 'bg-white/8 text-white/90' : 'text-white/50 hover:bg-white/5 hover:text-white/70'}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
                <span className="truncate">{m.name}</span>
              </div>
              <div className="text-[9px] text-white/30 mt-0.5 ml-3.5 truncate">{m.role}</div>
            </button>
          );
        })}
      </div>

      {/* Member detail */}
      <div className="flex-1 overflow-y-auto p-3">
        {!member ? (
          <div className="text-white/20 text-xs font-mono">Select crew member</div>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="text-white/90 font-mono text-sm font-medium">{member.name}</div>
              <div className="text-[10px] text-white/40 font-mono">{member.chassis} · {member.discipline}</div>
              {member.origin && <div className="text-[10px] text-white/30 font-mono">Origin: {member.origin}</div>}
            </div>

            {/* Status */}
            <div className="flex flex-wrap gap-2">
              <StatBadge label="Status" value={member.status.replace('-', ' ')} variant="default" />
              {member.specialStatus?.map((s, i) => (
                <span key={i} className="text-[8px] border border-amber-500/30 text-amber-400/70 px-1.5 py-0.5 rounded font-mono self-center">{s}</span>
              ))}
            </div>

            {/* Defensive spine */}
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">Defensive Spine</div>
              <HealthBar current={member.health} max={member.maxHealth} className="mb-1" />
              <div className="flex flex-wrap gap-2 mt-2">
                <StatBadge label="HP" value={`${member.health}/${member.maxHealth}`} variant="teal" />
                {member.systemIntegrity != null && (
                  <StatBadge label="SI" value={`${member.systemIntegrity}/${member.maxSystemIntegrity}`} variant="teal" />
                )}
                <StatBadge label="DEF" value={member.defense} variant="default" />
                {member.firewall != null && <StatBadge label="FW" value={member.firewall} variant="teal" />}
                {member.mitigation != null && member.mitigation > 0 && <StatBadge label="MTG" value={member.mitigation} variant="amber" />}
                {member.shield != null && member.shield > 0 && <StatBadge label="SHD" value={member.shield} variant="amber" />}
              </div>
            </div>

            {/* Skills */}
            {member.skills.length > 0 && (
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">Skills</div>
                <div className="space-y-1">
                  {member.skills.map((sk, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1 h-1 rounded-full ${sk.focused ? 'bg-amber-400' : 'bg-white/30'}`} />
                      <span className={`text-xs font-mono flex-1 ${sk.focused ? 'text-white/80' : 'text-white/55'}`}>{sk.name}</span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((n) => (
                          <div key={n} className={`w-2 h-2 rounded-sm ${n <= sk.level ? 'bg-amber-500/80' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loadout */}
            {member.loadout.length > 0 && (
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">Loadout</div>
                <div className="space-y-1">
                  {member.loadout.map((item, i) => {
                    const typeColor = { weapon: 'text-red-400/70', armor: 'text-teal-400/70', gear: 'text-white/50', cyberware: 'text-amber-400/70', consumable: 'text-white/40' }[item.type];
                    return (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono">
                        <span className={`text-[8px] uppercase ${typeColor} w-12 shrink-0`}>{item.type}</span>
                        <span className="text-white/70">{item.name}</span>
                        {item.notes && <span className="text-white/30 text-[9px]">({item.notes})</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Campaign notes */}
            {member.campaignNotes && (
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-1">Campaign Notes</div>
                <div className="text-[11px] text-white/50 font-mono leading-relaxed border-l border-teal-500/30 pl-2">
                  {member.campaignNotes}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   CAMPAIGN PANEL
══════════════════════════════════════════ */
function CampaignPanel() {
  const { state } = useGameState();
  const { campaign } = state;

  return (
    <div className="overflow-y-auto p-3 space-y-4">
      {/* Main objective */}
      <div>
        <div className="text-[9px] uppercase tracking-widest text-amber-500/60 font-mono mb-1">Primary Objective</div>
        <div className="text-[11px] text-white/70 font-mono leading-relaxed border-l-2 border-amber-500/50 pl-2">
          {campaign.mainObjective}
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-1">Current</div>
          <div className="text-xs text-teal-400 font-mono">{campaign.currentLocation}</div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-1">Next Node</div>
          <div className="text-xs text-amber-400 font-mono">{campaign.nextNode}</div>
        </div>
      </div>

      {/* Active pressures */}
      {campaign.activePressures.length > 0 && (
        <div>
          <div className="text-[9px] uppercase tracking-widest text-red-500/60 font-mono mb-2">Active Pressures</div>
          <div className="space-y-1">
            {campaign.activePressures.map((p, i) => (
              <div key={i} className="text-[10px] text-white/55 font-mono pl-2 border-l border-red-500/30">{p}</div>
            ))}
          </div>
        </div>
      )}

      {/* Clocks */}
      {campaign.activeClocks.length > 0 && (
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">Campaign Clocks</div>
          <div className="space-y-2">
            {campaign.activeClocks.map((c, i) => <Clock key={i} {...c} />)}
          </div>
        </div>
      )}

      {/* Evidence & leads */}
      {campaign.evidenceAndLeads.length > 0 && (
        <div>
          <div className="text-[9px] uppercase tracking-widest text-teal-500/60 font-mono mb-2">Evidence & Leads</div>
          <div className="space-y-2">
            {campaign.evidenceAndLeads.map((ev, i) => (
              <div key={i} className="border border-white/10 rounded px-2 py-1.5">
                <div className="text-xs text-teal-300/80 font-mono mb-0.5">{ev.name}</div>
                <div className="text-[10px] text-white/45 font-mono leading-relaxed">{ev.notes}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Open questions */}
      {campaign.openQuestions && campaign.openQuestions.length > 0 && (
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">Open Questions</div>
          {campaign.openQuestions.map((q, i) => (
            <div key={i} className="text-[10px] text-white/40 font-mono pl-2 border-l border-white/15 mb-1">{q}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   ROUTE MAP
══════════════════════════════════════════ */
/* ── Route node position helper: lay nodes out automatically in a grid if
   no explicit x/y provided, otherwise use them. Positions are 0-100 pct. ── */
function computeRouteLayout(nodes: import('./types/game').RouteNode[]) {
  const perRow = 3;
  return nodes.map((node, i) => ({
    node,
    x: 18 + (i % perRow) * 32,
    y: 15 + Math.floor(i / perRow) * 35,
  }));
}

function RoutePanel() {
  const { state } = useGameState();
  const { campaign } = state;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const positions = computeRouteLayout(campaign.routeHistory);

  const NODE_COLORS = {
    completed: { fill: '#003c38', stroke: '#00b4aa', text: '#00e8dc' },
    current:   { fill: '#3c2000', stroke: '#E87722', text: '#ffaa44' },
    next:      { fill: '#1a1e30', stroke: '#4a5070', text: '#8899bb' },
    available: { fill: '#141628', stroke: '#2a3050', text: '#556080' },
    hidden:    { fill: '#0d0d14', stroke: '#1a1a24', text: '#2a2a38' },
  } as const;

  type RouteStatus = 'completed' | 'current' | 'next' | 'available' | 'hidden';

  const W = 560;
  const H = Math.max(200, Math.ceil(campaign.routeHistory.length / 3) * 35 + 30);

  const toPx = (pct: number, dim: number) => (pct / 100) * dim;

  const selectedNode = selectedId ? campaign.routeHistory.find((n) => n.id === selectedId) : null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Arc header */}
      <div className="shrink-0 px-3 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono">{campaign.currentArc}</div>
        <div className="text-[9px] font-mono text-amber-400/60">{campaign.currentLocation}</div>
      </div>

      {/* SVG node-web map */}
      <div className="flex-1 min-h-0 overflow-auto p-3">
        <svg
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          style={{ minHeight: H }}
        >
          {/* Connection lines between sequential nodes */}
          {positions.map((pos, i) => {
            if (i === 0) return null;
            const prev = positions[i - 1];
            const x1 = toPx(prev.x, W);
            const y1 = toPx(prev.y, H);
            const x2 = toPx(pos.x, W);
            const y2 = toPx(pos.y, H);
            const isForward = pos.node.status !== 'hidden';
            return (
              <line
                key={`edge-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isForward ? '#2a3050' : '#151822'}
                strokeWidth={1.5}
                strokeDasharray={pos.node.status === 'hidden' ? '3 5' : undefined}
                strokeOpacity={0.7}
              />
            );
          })}

          {/* Route nodes */}
          {positions.map(({ node, x, y }) => {
            const colors = NODE_COLORS[(node.status as RouteStatus)] ?? NODE_COLORS.available;
            const px = toPx(x, W);
            const py = toPx(y, H);
            const isSelected = node.id === selectedId;
            const r = 18;

            return (
              <g
                key={node.id}
                transform={`translate(${px},${py})`}
                onClick={() => setSelectedId(isSelected ? null : node.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Selection ring */}
                {isSelected && (
                  <circle r={r + 5} fill="none" stroke={colors.stroke} strokeWidth={1.5} strokeOpacity={0.6} strokeDasharray="4 3" />
                )}
                {/* Node body */}
                <circle r={r} fill={colors.fill} stroke={colors.stroke} strokeWidth={node.status === 'current' ? 2 : 1.2} />
                {/* Status symbol */}
                <text textAnchor="middle" dominantBaseline="central" fontSize={10} fill={colors.text}>
                  {{
                    completed: '✓',
                    current:   '◈',
                    next:      '→',
                    available: '◇',
                    hidden:    '?',
                  }[node.status as RouteStatus] ?? '·'}
                </text>
                {/* Node label */}
                <text
                  y={r + 11}
                  textAnchor="middle"
                  fontSize={8}
                  fill={colors.text}
                  fontFamily="monospace"
                  style={{ pointerEvents: 'none' }}
                >
                  {node.name.length > 12 ? node.name.slice(0, 11) + '…' : node.name}
                </text>
                {/* Type tag */}
                <text
                  y={r + 20}
                  textAnchor="middle"
                  fontSize={6}
                  fill={colors.text}
                  fillOpacity={0.6}
                  fontFamily="monospace"
                  style={{ pointerEvents: 'none' }}
                >
                  {node.type}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected node detail panel */}
      {selectedNode && (
        <div className="shrink-0 border-t border-white/10 bg-black/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-amber-400 font-mono text-xs font-medium">{selectedNode.name}</span>
            <span className="text-[8px] border border-amber-500/30 text-amber-400/60 px-1 rounded font-mono">{selectedNode.status}</span>
            <span className="text-[8px] text-white/30 font-mono">{selectedNode.type}</span>
          </div>
          {selectedNode.notes ? (
            <div className="text-[10px] text-white/55 font-mono leading-relaxed border-l border-teal-500/30 pl-2">
              {selectedNode.notes}
            </div>
          ) : (
            <div className="text-[10px] text-white/25 font-mono">No intel on this node.</div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="shrink-0 border-t border-white/10 px-3 py-2 flex flex-wrap gap-3">
        {(['completed', 'current', 'next', 'available', 'hidden'] as const).map((s) => {
          const c = NODE_COLORS[s];
          return (
            <div key={s} className="flex items-center gap-1">
              <svg width={10} height={10} viewBox="0 0 10 10">
                <circle cx={5} cy={5} r={4} fill={c.fill} stroke={c.stroke} strokeWidth={1} />
              </svg>
              <span className="text-[8px] font-mono" style={{ color: c.text }}>{s}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SETTINGS PANEL
══════════════════════════════════════════ */

/** Debug state editor: allows inspecting and manually patching individual
 *  state slices as raw JSON. Committed only on explicit "Apply" click. */
function DebugStateEditor() {
  const { state, dispatch } = useGameState();

  type Section = 'encounter' | 'scene' | 'campaign' | 'crew';
  const [section, setSection] = useState<Section>('encounter');
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  // When section changes, populate draft with current state
  useEffect(() => {
    try {
      setDraft(JSON.stringify(state[section], null, 2));
      setError(null);
    } catch {
      setDraft('');
    }
  }, [section, state]);

  function applyDraft() {
    try {
      const parsed = JSON.parse(draft);
      setError(null);
      if (section === 'encounter') {
        dispatch({ type: 'APPLY_DM_STATE', payload: { encounter: parsed } });
      } else if (section === 'scene') {
        dispatch({ type: 'APPLY_DM_STATE', payload: { scene: parsed } });
      } else if (section === 'campaign') {
        dispatch({ type: 'APPLY_DM_STATE', payload: { campaign: parsed } });
      } else if (section === 'crew') {
        dispatch({ type: 'UPDATE_CREW', payload: parsed });
      }
      setApplied(true);
      setTimeout(() => setApplied(false), 1500);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  }

  function copyState() {
    navigator.clipboard?.writeText(JSON.stringify(state, null, 2));
  }

  const sections: Section[] = ['encounter', 'scene', 'campaign', 'crew'];

  return (
    <div className="border border-amber-500/20 rounded bg-black/30 overflow-hidden">
      {/* Section picker */}
      <div className="flex border-b border-amber-500/15">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`flex-1 py-1 text-[8px] font-mono uppercase tracking-wider transition-colors ${
              section === s
                ? 'bg-amber-500/15 text-amber-400 border-b border-amber-500'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* JSON editor */}
      <textarea
        value={draft}
        onChange={(e) => { setDraft(e.target.value); setError(null); }}
        spellCheck={false}
        rows={12}
        className="w-full bg-transparent text-[10px] text-teal-300/80 font-mono p-2 outline-none resize-y border-b border-white/10"
        style={{ minHeight: 180 }}
      />

      {/* Error */}
      {error && (
        <div className="px-2 py-1 text-[9px] text-red-400 font-mono border-b border-red-500/20 bg-red-500/5">
          Parse error: {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 p-2">
        <button
          onClick={applyDraft}
          className="flex-1 border border-amber-500/40 text-amber-400 text-[9px] font-mono rounded px-2 py-1 hover:bg-amber-500/10 transition-colors"
        >
          {applied ? 'Applied' : 'Apply Changes'}
        </button>
        <button
          onClick={copyState}
          className="border border-white/15 text-white/40 text-[9px] font-mono rounded px-2 py-1 hover:bg-white/5 transition-colors"
          title="Copy full state to clipboard"
        >
          Copy All
        </button>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { state, dispatch, resetToRookCampaign } = useGameState();
  const [apiKey, setApiKey] = useState(state.settings.openaiApiKey);
  const [saved, setSaved] = useState(false);

  const saveKey = () => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { openaiApiKey: apiKey } });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="overflow-y-auto p-4 space-y-6">
      {/* API Key */}
      <div>
        <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">OpenAI API Key</div>
        <div className="flex gap-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="flex-1 bg-black/40 border border-white/15 rounded text-white/70 text-xs font-mono px-3 py-2 outline-none focus:border-amber-500/50 placeholder:text-white/20 transition-colors"
          />
          <button
            onClick={saveKey}
            className="px-4 border border-amber-500/50 text-amber-400 text-xs font-mono rounded hover:bg-amber-500/10 transition-colors"
          >
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
        <div className="text-[9px] text-white/25 font-mono mt-1">Stored in browser localStorage. Never sent to any server except OpenAI.</div>
      </div>

      {/* Model */}
      <div>
        <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">Model</div>
        <select
          value={state.settings.model}
          onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', payload: { model: e.target.value } })}
          className="bg-black/40 border border-white/15 rounded text-white/70 text-xs font-mono px-3 py-2 outline-none focus:border-amber-500/50 transition-colors w-full"
        >
          <option value="gpt-4o">GPT-4o (Recommended)</option>
          <option value="gpt-4o-mini">GPT-4o Mini (Faster / Cheaper)</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
        </select>
      </div>

      {/* History Compression Threshold */}
      <div>
        <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-2">History Compression Threshold</div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={9}
            max={100}
            value={state.settings.compressionThreshold ?? 20}
            onChange={(e) => {
              const v = Math.max(9, Math.min(100, parseInt(e.target.value, 10) || 20));
              dispatch({ type: 'UPDATE_SETTINGS', payload: { compressionThreshold: v } });
            }}
            className="w-20 bg-black/40 border border-white/15 rounded text-white/70 text-xs font-mono px-3 py-2 outline-none focus:border-amber-500/50 transition-colors"
          />
          <span className="text-[9px] font-mono text-white/30">turns before compressing (default: 20, min: 9)</span>
        </div>
        <div className="text-[9px] text-white/20 font-mono mt-1">Older turns beyond this limit are summarised into a compact block to reduce token costs.</div>
      </div>

      {/* Debug mode */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-white/70">Debug Mode</div>
          <div className="text-[9px] font-mono text-white/30">Show raw DM JSON blocks in chat + token estimates in browser console</div>
        </div>
        <button
          onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { debugMode: !state.settings.debugMode } })}
          className={`w-10 h-5 rounded-full border transition-all relative ${state.settings.debugMode ? 'bg-amber-500/30 border-amber-500/60' : 'bg-white/5 border-white/20'}`}
        >
          <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${state.settings.debugMode ? 'bg-amber-400 right-0.5' : 'bg-white/30 left-0.5'}`} />
        </button>
      </div>

      {/* Debug state editor — only visible in debug mode */}
      {state.settings.debugMode && (
        <div>
          <div className="text-[9px] uppercase tracking-widest text-amber-500/50 font-mono mb-2">State Editor</div>
          <div className="text-[9px] text-white/30 font-mono mb-2">
            Inspect and manually patch any state slice. Changes apply immediately to the live game state.
          </div>
          <DebugStateEditor />
        </div>
      )}

      {/* Reset */}
      <div className="border-t border-white/10 pt-4">
        <div className="text-[9px] uppercase tracking-widest text-red-500/40 font-mono mb-2">Danger Zone</div>
        <button
          onClick={() => {
            if (confirm('Reset all state to the Rook campaign start? This cannot be undone.')) {
              resetToRookCampaign();
            }
          }}
          className="w-full border border-red-500/30 text-red-400/70 text-xs font-mono rounded px-3 py-2 hover:bg-red-500/10 hover:border-red-500/50 transition-colors"
        >
          Reset to Rook Campaign (Fresh Start)
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MENU OVERLAY
══════════════════════════════════════════ */
function MenuOverlay({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useGameState();

  const tabs: { id: MenuTab; label: string; icon: React.ReactNode }[] = [
    { id: 'crew',     label: 'Crew',     icon: <IconUsers /> },
    { id: 'campaign', label: 'Campaign', icon: <IconMap /> },
    { id: 'route',    label: 'Route',    icon: <IconRoute /> },
    { id: 'settings', label: 'Settings', icon: <IconSettings /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-2xl h-full bg-[hsl(228_22%_7%)] border-l border-white/10 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
          <div>
            <div className="text-amber-400 font-mono text-xs uppercase tracking-widest">Nexus Companion</div>
            <div className="text-white/30 font-mono text-[9px]">{state.campaign.campaignName}</div>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
            <IconX />
          </button>
        </div>

        {/* Hazard stripe */}
        <div className="hazard-stripe shrink-0" />

        {/* Tab bar */}
        <div className="flex border-b border-white/10 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: 'SET_MENU_TAB', payload: tab.id })}
              className={`flex-1 flex flex-col items-center gap-1 py-2 text-[9px] font-mono uppercase tracking-widest transition-all ${
                state.menuTab === tab.id
                  ? 'text-amber-400 border-b-2 border-amber-500 bg-amber-500/5'
                  : 'text-white/30 hover:text-white/55 hover:bg-white/3'
              }`}
            >
              <span className={state.menuTab === tab.id ? 'text-amber-400' : 'text-white/25'}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {state.menuTab === 'crew'     && <CrewPanel />}
          {state.menuTab === 'campaign' && <CampaignPanel />}
          {state.menuTab === 'route'    && <RoutePanel />}
          {state.menuTab === 'settings' && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SCENE VIEW
══════════════════════════════════════════ */
function SceneView() {
  const { state } = useGameState();
  const { generateSceneImage, isGenerating } = useImageGeneration();
  const { scene } = state;

  return (
    <div className="flex h-full">
      {/* Atmosphere panel */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Scene image / placeholder */}
        <div className="flex-1 relative overflow-hidden bg-black/60 flex items-center justify-center">
          {scene.generatedImageUrl ? (
            <img
              src={scene.generatedImageUrl}
              alt={scene.locationName}
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-center px-8">
              <pre className="text-white/10 text-[8px] font-mono leading-tight mb-2 tracking-widest">
{`   [ VISUAL FEED OFFLINE ]   
    \\                   /    
     \\                 /     
      |               |      
      |  NO SIGNAL    |      
      |               |      
     /                 \\     
    /                   \\    
   [.....................]   `}
              </pre>
              <div className="text-white/20 text-xs font-mono uppercase tracking-widest font-bold">Visual Feed Offline</div>
              <p className="text-white/15 text-[10px] font-mono max-w-xs leading-relaxed">
                Press "Generate Scene" to establish visual link via DALL-E 3.
                Requires datalink (OpenAI API key).
              </p>
            </div>
          )}

          {/* Location overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-3">
            <div className="text-amber-400 font-mono text-sm font-medium">{scene.locationName}</div>
            <div className="text-white/40 font-mono text-[10px] uppercase tracking-wider">{scene.environmentType}</div>
          </div>

          {/* Generate button */}
          <button
            onClick={generateSceneImage}
            disabled={isGenerating || !state.settings.openaiApiKey}
            className="absolute top-3 right-3 flex items-center gap-2 border border-white/20 bg-black/50 text-white/60 text-[10px] font-mono px-3 py-1.5 rounded hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <><div className="nx-thinking"><span /><span /><span /></div> Generating…</>
            ) : (
              <><IconImage /> Generate Scene</>
            )}
          </button>
        </div>

        {/* Narrative context */}
        <div className="border-t border-white/10 p-3 bg-black/30">
          <div className="text-[9px] uppercase tracking-widest text-white/25 font-mono mb-1">Scene Context</div>
          <div className="text-xs text-white/55 font-mono leading-relaxed">{scene.narrativeContext}</div>
        </div>

        {/* Scene clocks */}
        {scene.activeClocks && scene.activeClocks.length > 0 && (
          <div className="border-t border-white/10 p-3 bg-black/20 space-y-1.5">
            {scene.activeClocks.map((c, i) => <Clock key={i} {...c} />)}
          </div>
        )}
      </div>

      {/* Chat */}
      <div className="w-80 border-l border-white/20 flex flex-col bg-[hsl(228_22%_7%)]">
        <ChatWindow />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ENCOUNTER VIEW
══════════════════════════════════════════ */
function EncounterView() {
  const { state } = useGameState();
  const { encounter } = state;
  const [backdropOverride, setBackdropOverride] = useState<string | null>(null);
  const [showBackdropPicker, setShowBackdropPicker] = useState(false);

  const backdropType = (backdropOverride ?? encounter.backdropType) as typeof encounter.backdropType;

  return (
    <div className="flex h-full">
      {/* TacMap */}
      <div className="flex-1 relative flex flex-col">
        {/* TacMap fill */}
        <div className="flex-1 min-h-0 relative bg-black border-r border-white/15">
          <TacMap
            backdropType={backdropType}
            nodes={encounter.nodes}
            paths={encounter.paths}
            actors={encounter.actors}
            currentActorId={encounter.currentActorId}
          />

          {/* Backdrop picker */}
          <div className="absolute top-2 left-2 z-10">
            <button
              onClick={() => setShowBackdropPicker(!showBackdropPicker)}
              className="flex items-center gap-1 bg-black/60 border border-white/15 text-white/40 text-[9px] font-mono px-2 py-1 rounded hover:border-amber-500/40 hover:text-amber-400/70 transition-all"
            >
              <IconMap /> {BACKDROP_LABELS[backdropType] ?? backdropType}
              <IconChevronD />
            </button>
            {showBackdropPicker && (
              <div className="absolute top-full left-0 mt-1 bg-[hsl(228_22%_7%)] border border-white/15 rounded shadow-xl overflow-y-auto max-h-64 w-48 z-20">
                {Object.entries(BACKDROP_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => { setBackdropOverride(key); setShowBackdropPicker(false); }}
                    className={`w-full text-left px-3 py-1.5 text-[10px] font-mono hover:bg-white/8 transition-colors ${backdropType === key ? 'text-amber-400' : 'text-white/50'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Round indicator */}
          {encounter.active && (
            <div className="absolute top-2 right-2 z-10 bg-black/70 border border-amber-500/40 text-amber-400 font-mono text-xs px-3 py-1 rounded">
              Round {encounter.round}
            </div>
          )}

          {/* No active encounter overlay */}
          {!encounter.active && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[1px] pointer-events-none">
              <pre className="text-white/10 text-[10px] font-mono leading-none mb-4">
{` +-----------------+ 
 | NO TACTICAL MAP | 
 +-----------------+ `}
              </pre>
              <div className="text-center">
                <div className="text-white/30 font-mono text-xs uppercase tracking-widest mb-2 font-bold">No Active Encounter</div>
                <div className="text-white/20 font-mono text-[10px]">Awaiting DM initialization…</div>
              </div>
            </div>
          )}
        </div>

        {/* Objectives strip */}
        {encounter.active && encounter.objectives.length > 0 && (
          <div className="shrink-0 border-t border-white/10 bg-black/50 px-3 py-2 flex gap-4 overflow-x-auto">
            {encounter.objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[10px] font-mono text-white/55">{obj}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right panel: Combat tracker + Chat */}
      <div className="w-[340px] border-l border-white/20 flex flex-col bg-[hsl(228_22%_7%)]">
        <div className="flex-1 min-h-0 border-b border-white/20 overflow-hidden bg-black/20">
          <CombatTracker />
        </div>
        <div className="h-72 overflow-hidden flex flex-col">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TOP NAV BAR
══════════════════════════════════════════ */
function TopNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const { state, dispatch } = useGameState();
  const { view, encounter, campaign } = state;

  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'scene',    label: 'Scene',    icon: <IconMap /> },
    { id: 'encounter',label: 'Encounter',icon: <IconSword /> },
  ];

  return (
    <header className="h-10 border-b border-white/10 bg-[hsl(228_22%_6%)] flex items-center px-3 gap-3 shrink-0">
      {/* Campaign title */}
      <div className="hidden sm:block">
        <div className="text-amber-400/70 font-mono text-[10px] uppercase tracking-widest truncate max-w-[140px]">
          {campaign.campaignName}
        </div>
      </div>

      <div className="hazard-stripe w-px h-6 bg-amber-500/40 mx-1" style={{ width: 1, height: 24, background: 'rgba(232,119,34,0.3)' }} />

      {/* View switcher */}
      <div className="flex gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-[10px] font-mono uppercase tracking-widest transition-all ${
              view === item.id
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/60 shadow-[0_0_8px_rgba(232,119,34,0.25)] font-bold'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className="w-3.5 h-3.5">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Encounter status indicator */}
      {encounter.active && (
        <div className="flex items-center gap-1.5 text-[10px] font-mono border border-red-500/40 bg-red-500/10 text-red-400 px-2 py-0.5 rounded">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          ENCOUNTER
        </div>
      )}

      {/* Scene location */}
      {!encounter.active && (
        <div className="text-[10px] font-mono text-white/30 truncate max-w-[200px] hidden md:block">
          {state.scene.locationName}
        </div>
      )}

      {/* Menu button */}
      <button
        onClick={onMenuOpen}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-white/50 text-[10px] font-mono rounded-[2px] hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/10 transition-all font-bold shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]"
      >
        <IconMenu /> MENU
      </button>
    </header>
  );
}

/* ══════════════════════════════════════════
   MAIN APP SHELL
══════════════════════════════════════════ */
function AppShell() {
  const { state } = useGameState();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-full h-full bg-[hsl(230_20%_4%)] overflow-hidden">
      <TopNav onMenuOpen={() => setMenuOpen(true)} />

      <main className="flex-1 min-h-0 overflow-hidden">
        {state.view === 'scene'     && <SceneView />}
        {state.view === 'encounter' && <EncounterView />}
      </main>

      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function App() {
  return (
    <GameStateProvider>
      <AppShell />
    </GameStateProvider>
  );
}
