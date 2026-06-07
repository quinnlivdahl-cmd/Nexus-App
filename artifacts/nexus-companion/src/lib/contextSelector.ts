import type { GameState } from '../types/game';
import { LORE_REGISTRY, type LoreEntry } from './loreRegistry';

const LORE_TOKEN_BUDGET = 600;

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function deriveSceneTags(state: GameState): Set<string> {
  const tags = new Set<string>();

  tags.add('always');

  const arcSlug = slugify(state.campaign.currentArc);
  tags.add(arcSlug);
  if (arcSlug.includes('arc-1') || arcSlug.includes('kallisto')) {
    tags.add('arc-1');
    tags.add('kallisto-signal');
  }

  const locationSlug = slugify(state.campaign.currentLocation);
  tags.add(locationSlug);
  locationSlug.split('-').forEach((part) => {
    if (part.length > 2) tags.add(part);
  });

  if (state.encounter.active) {
    for (const actor of state.encounter.actors) {
      if (actor.faction === 'enemy' || actor.faction === 'elite-enemy') {
        tags.add(slugify(actor.name));
      }
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
      if (actor.faction === 'enemy' || actor.faction === 'elite-enemy') {
        ids.add(slugify(actor.name));
      }
    }
  }
  return ids;
}

/**
 * Selection rules by category:
 *
 * world   — include if tags intersect sceneTags (always, arc slug, location slug, encounter factions)
 * faction — include if tags intersect sceneTags OR linkedEntityId matches active faction
 * crew    — include ONLY via entity linking (linkedEntityId matches active crew id)
 *           Exception: entries explicitly tagged 'always' are always included
 * location — include ONLY via entity linking (linkedEntityId matches active/next route node id)
 *            Exception: entries explicitly tagged 'always' are always included
 *
 * This prevents arc-tagged crew/location entries from being injected for every
 * turn just because the current arc slug matches.
 */
export function selectActiveContext(state: GameState): LoreEntry[] {
  const sceneTags = deriveSceneTags(state);
  const activeCrewIds = getActiveCrewIds(state);
  const activeLocationIds = getActiveLocationIds(state);
  const activeFactionIds = getActiveFactionIds(state);

  const seen = new Set<string>();
  const selected: LoreEntry[] = [];

  function include(entry: LoreEntry) {
    if (seen.has(entry.id)) return;
    seen.add(entry.id);
    selected.push(entry);
  }

  for (const entry of LORE_REGISTRY) {
    const hasAlwaysTag = entry.tags.includes('always');

    if (hasAlwaysTag) {
      include(entry);
      continue;
    }

    switch (entry.category) {
      case 'world': {
        if (entry.tags.some((t) => sceneTags.has(t))) {
          include(entry);
        }
        break;
      }

      case 'faction': {
        const tagMatch = entry.tags.some((t) => sceneTags.has(t));
        const entityMatch = entry.linkedEntityId
          ? activeFactionIds.has(entry.linkedEntityId)
          : false;
        if (tagMatch || entityMatch) {
          include(entry);
        }
        break;
      }

      case 'crew': {
        // Default: entity linking. Manual override: any explicit scene-matching tag
        // on the entry (e.g. 'always', 'europa') force-injects it even when the
        // crew member is not active in the current GameState.
        const entityMatch = !!(entry.linkedEntityId && activeCrewIds.has(entry.linkedEntityId));
        const tagOverride = entry.tags.some((t) => sceneTags.has(t));
        if (entityMatch || tagOverride) {
          include(entry);
        }
        break;
      }

      case 'location': {
        // Default: entity linking. Manual override: any explicit scene-matching tag
        // force-injects the entry regardless of route node status.
        const entityMatch = !!(entry.linkedEntityId && activeLocationIds.has(entry.linkedEntityId));
        const tagOverride = entry.tags.some((t) => sceneTags.has(t));
        if (entityMatch || tagOverride) {
          include(entry);
        }
        break;
      }
    }
  }

  return selected;
}

export function renderSelectedLore(entries: LoreEntry[]): string {
  if (entries.length === 0) return '';

  const grouped: Record<string, LoreEntry[]> = {};
  for (const entry of entries) {
    if (!grouped[entry.category]) grouped[entry.category] = [];
    grouped[entry.category].push(entry);
  }

  const ORDER: Array<LoreEntry['category']> = ['world', 'faction', 'location', 'crew'];
  const lines: string[] = ['## CAMPAIGN LORE'];

  for (const cat of ORDER) {
    const items = grouped[cat];
    if (!items || items.length === 0) continue;
    for (const item of items) {
      lines.push('');
      lines.push(item.content);
    }
  }

  return lines.join('\n');
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Enforce a hard token budget on the lore portion.
 * Returns entries in priority order, stopping once the budget is exhausted.
 * Priority: always-tagged first, then world, then faction, then location, then crew.
 */
export function applyLoreBudget(
  entries: LoreEntry[],
  budgetTokens: number = LORE_TOKEN_BUDGET
): LoreEntry[] {
  const PRIORITY: Record<string, number> = { world: 0, faction: 1, location: 2, crew: 3 };
  const sortedByPriority = [...entries].sort((a, b) => {
    const aAlways = a.tags.includes('always') ? -1 : 0;
    const bAlways = b.tags.includes('always') ? -1 : 0;
    if (aAlways !== bAlways) return aAlways - bAlways;
    return (PRIORITY[a.category] ?? 99) - (PRIORITY[b.category] ?? 99);
  });

  const result: LoreEntry[] = [];
  let usedTokens = 0;

  for (const entry of sortedByPriority) {
    const cost = estimateTokens(entry.content);
    if (usedTokens + cost > budgetTokens) continue;
    result.push(entry);
    usedTokens += cost;
  }

  return result;
}
