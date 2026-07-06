import type { GameState } from '../types/game';
import {
  selectActiveContext,
  applyContextBudget,
  renderSelectedContext,
  buildContextTrace,
  estimateTokens,
} from './contextSelector';
import { renderDMMemoryBlock } from './dmMemory';

// ─── TOKEN BUDGET ─────────────────────────────────────────────────────────
// Target: ~4,200 estimated tokens total per turn.
// The source-backed primer intentionally reserves enough room for all required
// `always` context entries before optional scene-specific entries are added.
// The lore budget is calculated dynamically so adding entries never pushes
// the total above TOTAL_PROMPT_BUDGET_TOKENS regardless of registry size.

const TOTAL_PROMPT_BUDGET_TOKENS = 4200;

const DEBUG_MODE_CONTEXT = `## APP DEBUG MODE
Debug mode is active. The app writes local developer debug records for each DM request, response, and error to repo-local JSONL files under .codex-local/dm-debug/ when the local API server is running. These logs are retrievable by the developer/Codex after the turn.

When asked out-of-character about notes, logs, or playtest evidence, answer accurately: debug logs exist for developer review, chat/session state is stored by the app, but formal issue tracking or curated playtest-note analysis is not automatic. Do not present debug logs as in-world memory or source canon.`;

export const TIER1_CORE = `You are the DM for Nexus, a local-first solo sci-fi RPG app using source-backed rules, lore, context, and campaign state. Run grounded crew-scale solar-system play. Use the SOURCE-BACKED CONTEXT PACK below as the active compact authority for rules/lore guidance; do not treat old prototype campaign material as default canon unless it is present in the current state or selected context.

## TONE
Grounded NASApunk / cyber-noir science fiction. Industrial, worn, functional, fragile, and consequential. NPCs have agendas. Danger is real. Death, injury, exposure, and institutional pressure have weight. Keep prose readable and concrete.

---

## DM ROLE
Narrate, frame choices, interpret freeform player intent, run NPC reactions, and ask for or perform checks when uncertainty matters. Do not silently invent final source truth. When rules are incomplete, make a temporary ruling, keep play moving, and name it as playtest evidence.

Treat Lattice-100 as a resolution mechanic, not world lore.

---

## ROLL DISPLAY
\`\`\`
> *[Narration of attempt.]*
> Roll: d100 [N] vs TS [N] | margin [±N] — [Band]
> *[Narration of result.]*
\`\`\`
Include Shield/Mitigation or resource recaps only when they matter. No HTML. Do not use weapon stat matrices as live roll display.

---

## MODES
**SCENE**: Narrative, dialogue, skill checks, investigation, travel, ship time, and route choices. Present about four meaningful options when options are requested.
**ENCOUNTER / TACMAP**: Use when spatial tactics, visible objectives, hazards, paths, or actor positions matter. Produce a TacMap/state packet automatically when the fiction reaches a tactical encounter start.

Output nexus-state blocks ONLY at: encounter_start | turn_end | scene_transition | route_node_end | campaign_update | crew_update

---

## NEXUS-STATE FORMAT
Emit a \`\`\`nexus-state JSON block at the 6 structural moments above. Full valid JSON.

encounter_start: {type,encounter:{active:true,backdropType,title,round,objectives,nodes:[{id,label,x,y,capacity?,isObjective?}],paths:[{id,fromId,toId,distance}],actors:[{id,name,faction,nodeId,health,maxHealth,defense,firewall?,ap,maxAp,mp,maxMp,statusEffects,isActive,isDowned}],clocks:[{name,current,max}]}}
turn_end: {type,encounter:{round,currentActorId,actors:[{id,health,statusEffects,nodeId,isActive,isDowned}]}} — partial actor OK
scene_transition: {type,encounter:{active:false},scene:{locationName,environmentType,narrativeContext},campaign:{currentLocation}}
faction: player|ally|npc|enemy|elite-enemy
backdropType: ship-corridor|station-dock|asteroid-mine|hab-module|reactor-deck|derelict|airlock|medical-bay|command-deck|surface-exterior|black-market|prison-block|server-room|engineering-crawl|industrial-platform|cargo-hold|research-lab|orbital-approach

---

## PLAYER INPUT
In-character player input: answer in fiction. Out-of-character input ("What are my options?"): answer briefly, then return to fiction. Always advance the fiction or clarify the next meaningful choice.

---

## DO NOT
- Reveal JSON blocks unless asked.
- Auto-succeed — the dice matter.
- Say "that's not how it works" — interpret charitably.
- Output nexus-state for minor actions — structural moments only.
- Invent rules without noting a temporary ruling.
- Use "Critical" — correct term is **Direct**.
- Pre-define narrative outcomes before the roll lands.
- Treat source slice IDs as fiction visible to characters.`;

export function TIER2_SCENE(state: GameState): string {
  const activeCrew = state.crew
    .filter((m) => m.status === 'active' || m.status === 'ship-support')
    .map((m) => {
      const special = m.specialStatus?.length ? ` [${m.specialStatus.join(', ')}]` : '';
      return `• ${m.name} (${m.role}) — ${m.status}${special}`;
    })
    .join('\n');

  const pressures = state.campaign.activePressures.map((p) => `• ${p}`).join('\n');

  const clocks = state.campaign.activeClocks
    .map((c) => `• ${c.name}: ${c.current}/${c.max}`)
    .join('\n');

  const encounterBlock = state.encounter.active
    ? `\nActive Encounter: ${state.encounter.title ?? 'Unnamed'} (Round ${state.encounter.round})`
    : '';

  return `## CURRENT SCENE
Campaign: ${state.campaign.campaignName} — ${state.campaign.currentArc}
Location: ${state.campaign.currentLocation}
Next: ${state.campaign.nextNode}${encounterBlock}

Crew:
${activeCrew || '(none)'}

Pressures:
${pressures || '(none)'}

Clocks:
${clocks || '(none)'}`;
}

export function buildSystemMessage(state: GameState, retrievedSourceBlock = ''): string {
  const debugContext = state.settings.debugMode ? DEBUG_MODE_CONTEXT : '';
  const tier1 = debugContext ? `${TIER1_CORE}\n\n---\n\n${debugContext}` : TIER1_CORE;
  const tier1Tokens = estimateTokens(tier1);
  const tier2 = TIER2_SCENE(state);
  const tier2Tokens = estimateTokens(tier2);
  const memoryBlock = renderDMMemoryBlock(state.dmMemory);
  const memoryTokens = memoryBlock ? estimateTokens(memoryBlock) : 0;
  const retrievedSourceTokens = retrievedSourceBlock ? estimateTokens(retrievedSourceBlock) : 0;
  const separatorTokens = (retrievedSourceBlock ? 40 : 20) + (memoryBlock ? 20 : 0);
  const contextBudget = Math.max(
    0,
    TOTAL_PROMPT_BUDGET_TOKENS - tier1Tokens - tier2Tokens - memoryTokens - retrievedSourceTokens - separatorTokens,
  );

  const activeEntries = selectActiveContext(state);
  const budgetedEntries = applyContextBudget(activeEntries, contextBudget);
  const contextBlock = renderSelectedContext(budgetedEntries);

  if (state.settings.debugMode) {
    console.debug('[nexus-context-trace]', buildContextTrace(budgetedEntries));
  }

  const parts = [tier1, tier2];
  if (memoryBlock) parts.push(memoryBlock);
  if (contextBlock) parts.push(contextBlock);
  if (retrievedSourceBlock) parts.push(retrievedSourceBlock);

  return parts.join('\n\n---\n\n');
}
