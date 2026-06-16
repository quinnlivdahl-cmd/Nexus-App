import type { GameState } from '../types/game';
import {
  SOURCE_CONTEXT_PACK,
  type ContextCategory,
  type SourceBackedContextEntry,
} from './contextPack';

const CONTEXT_TOKEN_BUDGET = 900;

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function deriveSceneTags(state: GameState): Set<string> {
  const tags = new Set<string>();

  tags.add('always');

  for (const value of [
    state.campaign.campaignName,
    state.campaign.currentArc,
    state.campaign.currentLocation,
    state.campaign.nextNode,
    state.scene.locationName,
    state.scene.environmentType,
  ]) {
    const slug = slugify(value);
    if (!slug) continue;
    tags.add(slug);
    slug.split('-').forEach((part) => {
      if (part.length > 2) tags.add(part);
    });
  }

  if (state.encounter.active) {
    tags.add('encounter');
    tags.add('combat');
    for (const actor of state.encounter.actors) {
      tags.add(slugify(actor.name));
      tags.add(actor.faction);
    }
  }

  return tags;
}

function getActiveCrewIds(state: GameState): Set<string> {
  const ids = new Set<string>();
  for (const member of state.crew) {
    if (member.status === 'active' || member.status === 'ship-support') {
      ids.add(member.id);
    }
  }
  return ids;
}

function getActiveLocationIds(state: GameState): Set<string> {
  const ids = new Set<string>();
  for (const node of state.campaign.routeHistory) {
    if (node.status === 'current' || node.status === 'next') {
      ids.add(node.id);
    }
  }
  return ids;
}

function getActiveFactionIds(state: GameState): Set<string> {
  const ids = new Set<string>();
  if (state.encounter.active) {
    for (const actor of state.encounter.actors) {
      ids.add(slugify(actor.name));
      ids.add(actor.faction);
    }
  }
  return ids;
}

function linkedEntityMatches(entry: SourceBackedContextEntry, state: GameState): boolean {
  if (!entry.linkedEntityId) return false;

  return (
    getActiveCrewIds(state).has(entry.linkedEntityId) ||
    getActiveLocationIds(state).has(entry.linkedEntityId) ||
    getActiveFactionIds(state).has(entry.linkedEntityId)
  );
}

export function selectActiveContext(state: GameState): SourceBackedContextEntry[] {
  const sceneTags = deriveSceneTags(state);
  const selected: SourceBackedContextEntry[] = [];
  const seen = new Set<string>();

  function include(entry: SourceBackedContextEntry) {
    if (seen.has(entry.id)) return;
    seen.add(entry.id);
    selected.push(entry);
  }

  for (const entry of SOURCE_CONTEXT_PACK.entries) {
    const tagMatch = entry.tags.some((tag) => sceneTags.has(tag));
    if (entry.tags.includes('always') || tagMatch || linkedEntityMatches(entry, state)) {
      include(entry);
    }
  }

  return selected.sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
}

export function renderSelectedContext(entries: SourceBackedContextEntry[]): string {
  if (entries.length === 0) return '';

  const grouped: Partial<Record<ContextCategory, SourceBackedContextEntry[]>> = {};
  for (const entry of entries) {
    grouped[entry.category] ??= [];
    grouped[entry.category]?.push(entry);
  }

  const order: ContextCategory[] = [
    'dm_contract',
    'rules',
    'lore',
    'campaign_state',
    'encounter',
    'play_aid',
    'image_guidance',
  ];

  const headings: Record<ContextCategory, string> = {
    dm_contract: 'DM CONTRACT',
    rules: 'SOURCE-BACKED RULES',
    lore: 'SOURCE-BACKED LORE',
    campaign_state: 'CAMPAIGN STATE BOUNDARIES',
    encounter: 'ENCOUNTER AND CONTENT GUIDANCE',
    play_aid: 'PLAY AID GUIDANCE',
    image_guidance: 'IMAGE GUIDANCE',
  };

  const lines: string[] = ['## SOURCE-BACKED CONTEXT PACK'];
  lines.push(`Pack: ${SOURCE_CONTEXT_PACK.packId}@${SOURCE_CONTEXT_PACK.version}`);

  for (const category of order) {
    const items = grouped[category];
    if (!items?.length) continue;

    lines.push('');
    lines.push(`### ${headings[category]}`);

    for (const item of items) {
      lines.push('');
      lines.push(`#### ${item.title}`);
      lines.push(`Source docs: ${item.sourceDocIds.map((id) => `\`${id}\``).join(', ')}`);
      lines.push(`Source slices: ${item.sourceSliceIds.map((id) => `\`${id}\``).join(', ')}`);
      lines.push(item.content);
    }
  }

  return lines.join('\n');
}

export function buildContextTrace(entries: SourceBackedContextEntry[]): string[] {
  return entries.map(
    (entry) =>
      `${entry.id} [${entry.category}] docs=${entry.sourceDocIds.join(', ')} slices=${entry.sourceSliceIds.join(', ')}`,
  );
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function applyContextBudget(
  entries: SourceBackedContextEntry[],
  budgetTokens: number = CONTEXT_TOKEN_BUDGET,
): SourceBackedContextEntry[] {
  const sorted = [...entries].sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
  const result: SourceBackedContextEntry[] = [];

  for (const entry of sorted) {
    const candidate = [...result, entry];
    const cost = estimateTokens(renderSelectedContext(candidate));
    if (cost > budgetTokens) continue;
    result.push(entry);
  }

  return result;
}
