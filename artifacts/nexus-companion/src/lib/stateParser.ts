import type { GameState, EncounterState, SceneState, CampaignState, CrewMember } from '../types/game';

export interface ParsedDMBlock {
  type: 'encounter_start' | 'turn_end' | 'scene_transition' | 'route_node_end' | 'campaign_update' | 'crew_update';
  encounter?: Partial<EncounterState>;
  scene?: Partial<SceneState>;
  campaign?: Partial<CampaignState>;
  crew?: Partial<CrewMember>[];
}

export interface ParseResult {
  cleanContent: string;
  stateBlocks: ParsedDMBlock[];
  hasStateBlocks: boolean;
}

const NEXUS_STATE_RE = /```nexus-state\s*([\s\S]*?)```/g;

export function parseDMMessage(rawContent: string): ParseResult {
  const stateBlocks: ParsedDMBlock[] = [];
  let cleanContent = rawContent;

  let match: RegExpExecArray | null;
  NEXUS_STATE_RE.lastIndex = 0;

  const replacements: Array<{ start: number; end: number; parsed: ParsedDMBlock | null }> = [];

  while ((match = NEXUS_STATE_RE.exec(rawContent)) !== null) {
    const jsonStr = match[1].trim();
    try {
      const parsed = JSON.parse(jsonStr) as ParsedDMBlock;
      stateBlocks.push(parsed);
      replacements.push({ start: match.index, end: match.index + match[0].length, parsed });
    } catch {
      replacements.push({ start: match.index, end: match.index + match[0].length, parsed: null });
    }
  }

  let offset = 0;
  for (const r of replacements) {
    cleanContent =
      cleanContent.slice(0, r.start - offset) +
      cleanContent.slice(r.end - offset);
    offset += r.end - r.start;
  }

  cleanContent = cleanContent.replace(/\n{3,}/g, '\n\n').trim();

  return {
    cleanContent,
    stateBlocks,
    hasStateBlocks: stateBlocks.length > 0,
  };
}

export function applyStateBlocks(
  currentState: GameState,
  blocks: ParsedDMBlock[]
): Partial<Pick<GameState, 'encounter' | 'scene' | 'campaign' | 'crew'>> {
  let encounter = { ...currentState.encounter };
  let scene = { ...currentState.scene };
  let campaign = { ...currentState.campaign };
  let crew = [...currentState.crew];

  for (const block of blocks) {
    if (block.encounter) {
      encounter = { ...encounter, ...block.encounter };
    }
    if (block.scene) {
      scene = { ...scene, ...block.scene };
    }
    if (block.campaign) {
      campaign = { ...campaign, ...block.campaign };
    }
    if (block.crew) {
      for (const update of block.crew) {
        if (!update.id) continue;
        const idx = crew.findIndex((m) => m.id === update.id);
        if (idx >= 0) {
          crew[idx] = { ...crew[idx], ...update } as CrewMember;
        }
      }
    }

    if (block.type === 'encounter_start') {
      encounter.active = true;
      encounter.round = 1;
      encounter.currentActorId = null;
    }
  }

  return { encounter, scene, campaign, crew };
}
