import type {
  ChatMessage,
  DMMemoryDebugRecord,
  DMMemoryRecord,
  DMMemoryState,
  GameState,
} from '../types/game';
import type { ParsedDMBlock } from './stateParser';

const MAX_MEMORY_RECORDS = 28;
const MAX_CONTENT_CHARS = 560;
const MAX_RENDERED_RECORDS = 16;
const DM_MEMORY_KINDS = new Set<DMMemoryRecord['kind']>([
  'session_summary',
  'decision',
  'unresolved_thread',
  'npc_fact',
  'location_fact',
  'consequence',
]);

export const EMPTY_DM_MEMORY: DMMemoryState = {
  records: [],
};

function compact(value: string, maxChars = MAX_CONTENT_CHARS): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxChars) return normalized;
  return `${normalized.slice(0, maxChars - 3).trim()}...`;
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'memory';
}

function isDMMemoryKind(value: string): value is DMMemoryRecord['kind'] {
  return DM_MEMORY_KINDS.has(value as DMMemoryRecord['kind']);
}

function memoryRecord(
  existing: DMMemoryRecord | undefined,
  next: Omit<DMMemoryRecord, 'createdAt' | 'updatedAt' | 'status'> & {
    updatedAt: number;
    status?: DMMemoryRecord['status'];
  },
): DMMemoryRecord {
  return {
    ...next,
    status: next.status ?? 'active',
    createdAt: existing?.createdAt ?? next.updatedAt,
    updatedAt: next.updatedAt,
  };
}

export function normalizeDMMemory(value: unknown): DMMemoryState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return EMPTY_DM_MEMORY;

  const rawRecords = (value as { records?: unknown }).records;
  if (!Array.isArray(rawRecords)) return EMPTY_DM_MEMORY;

  const records = rawRecords.flatMap((item): DMMemoryRecord[] => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const record = item as Partial<DMMemoryRecord>;
    if (typeof record.kind !== 'string' || !isDMMemoryKind(record.kind)) {
      return [];
    }

    if (
      typeof record.id !== 'string' ||
      typeof record.title !== 'string' ||
      typeof record.content !== 'string'
    ) {
      return [];
    }

    return [{
      id: record.id,
      kind: record.kind,
      title: record.title,
      content: record.content,
      status: record.status === 'superseded' ? 'superseded' : 'active',
      createdAt: typeof record.createdAt === 'number' ? record.createdAt : Date.now(),
      updatedAt: typeof record.updatedAt === 'number' ? record.updatedAt : Date.now(),
      sourceMessageIds: Array.isArray(record.sourceMessageIds)
        ? record.sourceMessageIds.filter((id): id is string => typeof id === 'string')
        : undefined,
      supersededBy: typeof record.supersededBy === 'string' ? record.supersededBy : undefined,
    }];
  });

  const lastUpdatedAt = (value as { lastUpdatedAt?: unknown }).lastUpdatedAt;
  return {
    records,
    lastUpdatedAt: typeof lastUpdatedAt === 'number' ? lastUpdatedAt : records[0]?.updatedAt,
  };
}

export function mergeDMMemory(
  current: DMMemoryState,
  incomingRecords: DMMemoryRecord[],
  activeRecordIds: string[],
  supersededAt: number,
): DMMemoryState {
  const incomingIds = new Set(incomingRecords.map((record) => record.id));
  const currentById = new Map(current.records.map((record) => [record.id, record]));
  const activeIds = new Set(activeRecordIds);
  const mergedById = new Map<string, DMMemoryRecord>();

  for (const record of incomingRecords) {
    mergedById.set(record.id, memoryRecord(currentById.get(record.id), record));
  }

  for (const record of current.records) {
    if (incomingIds.has(record.id)) continue;
    if (record.status === 'active' && !activeIds.has(record.id)) {
      mergedById.set(record.id, {
        ...record,
        status: 'superseded',
        updatedAt: supersededAt,
        supersededBy: 'Current app state no longer includes this memory anchor.',
      });
      continue;
    }
    mergedById.set(record.id, record);
  }

  const records = [...mergedById.values()]
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === 'active' ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    })
    .slice(0, MAX_MEMORY_RECORDS);

  return {
    records,
    lastUpdatedAt: records[0]?.updatedAt ?? current.lastUpdatedAt,
  };
}

export function projectGameState(
  state: GameState,
  updates: Partial<Pick<GameState, 'encounter' | 'scene' | 'campaign' | 'crew'>>,
): GameState {
  return {
    ...state,
    scene: updates.scene ? { ...state.scene, ...updates.scene } : state.scene,
    encounter: updates.encounter ? { ...state.encounter, ...updates.encounter } : state.encounter,
    campaign: updates.campaign ? { ...state.campaign, ...updates.campaign } : state.campaign,
    crew: updates.crew ?? state.crew,
  };
}

function decisionRecord(
  existingRecords: DMMemoryRecord[],
  userText: string,
  assistant: ChatMessage,
  now: number,
): DMMemoryRecord | null {
  const decisionPattern = /\b(i|we)\s+(choose|decide|accept|refuse|open|enter|leave|go|take|keep|tell|ask|try|scan|hack|search|seal|unlock)\b/i;
  if (!decisionPattern.test(userText)) return null;

  const content = compact(`Player action/decision: ${userText}. DM consequence/context: ${assistant.content}`);
  const id = `decision-${slug(userText.slice(0, 90))}`;
  return memoryRecord(existingRecords.find((record) => record.id === id), {
    id,
    kind: 'decision',
    title: compact(userText, 90),
    content,
    updatedAt: now,
    sourceMessageIds: [assistant.id],
  });
}

export function deriveDMMemoryRefresh(
  previousState: GameState,
  projectedState: GameState,
  userText: string,
  assistant: ChatMessage,
  stateBlocks: ParsedDMBlock[],
): { records: DMMemoryRecord[]; activeRecordIds: string[]; supersededAt: number } {
  const now = assistant.timestamp;
  const existingRecords = previousState.dmMemory.records;
  const records: DMMemoryRecord[] = [];

  records.push(memoryRecord(existingRecords.find((record) => record.id === 'session-summary'), {
    id: 'session-summary',
    kind: 'session_summary',
    title: 'Session position',
    content: compact([
      `${projectedState.campaign.campaignName} / ${projectedState.campaign.currentArc}.`,
      `Location: ${projectedState.campaign.currentLocation}; scene: ${projectedState.scene.locationName}.`,
      `Objective: ${projectedState.campaign.mainObjective}.`,
      `Next: ${projectedState.campaign.nextNode}.`,
      `Latest exchange: Player: ${userText} DM: ${assistant.content}`,
    ].join(' '), 760),
    updatedAt: now,
    sourceMessageIds: [assistant.id],
  }));

  records.push(memoryRecord(existingRecords.find((record) => record.id === 'location-current'), {
    id: 'location-current',
    kind: 'location_fact',
    title: projectedState.scene.locationName,
    content: compact(`${projectedState.scene.locationName} (${projectedState.scene.environmentType}): ${projectedState.scene.narrativeContext}`),
    updatedAt: now,
    sourceMessageIds: [assistant.id],
  }));

  for (const question of projectedState.campaign.openQuestions ?? []) {
    const id = `open-question-${slug(question)}`;
    records.push(memoryRecord(existingRecords.find((record) => record.id === id), {
      id,
      kind: 'unresolved_thread',
      title: compact(question, 90),
      content: compact(`Open campaign question: ${question}`),
      updatedAt: now,
      sourceMessageIds: [assistant.id],
    }));
  }

  for (const pressure of projectedState.campaign.activePressures) {
    const id = `pressure-${slug(pressure)}`;
    records.push(memoryRecord(existingRecords.find((record) => record.id === id), {
      id,
      kind: 'consequence',
      title: compact(pressure, 90),
      content: compact(`Active pressure/consequence: ${pressure}`),
      updatedAt: now,
      sourceMessageIds: [assistant.id],
    }));
  }

  for (const clock of [...projectedState.campaign.activeClocks, ...(projectedState.scene.activeClocks ?? [])]) {
    const id = `clock-${slug(clock.name)}`;
    records.push(memoryRecord(existingRecords.find((record) => record.id === id), {
      id,
      kind: 'consequence',
      title: clock.name,
      content: `${clock.name}: ${clock.current}/${clock.max}`,
      updatedAt: now,
      sourceMessageIds: [assistant.id],
    }));
  }

  if (projectedState.encounter.active) {
    for (const actor of projectedState.encounter.actors.filter((actor) => actor.faction !== 'player' && actor.faction !== 'ally')) {
      const id = `npc-${slug(actor.id || actor.name)}`;
      records.push(memoryRecord(existingRecords.find((record) => record.id === id), {
        id,
        kind: 'npc_fact',
        title: actor.name,
        content: compact(`${actor.name}: ${actor.faction}, position ${actor.nodeId ?? 'unknown'}, HP ${actor.health}/${actor.maxHealth}, status ${actor.statusEffects.join(', ') || 'none'}.`),
        updatedAt: now,
        sourceMessageIds: [assistant.id],
      }));
    }
  }

  const decision = decisionRecord(existingRecords, userText, assistant, now);
  if (decision) records.push(decision);

  if (stateBlocks.length > 0) {
    records.push(memoryRecord(existingRecords.find((record) => record.id === 'latest-state-commit'), {
      id: 'latest-state-commit',
      kind: 'consequence',
      title: 'Latest committed state update',
      content: compact(`The DM emitted ${stateBlocks.length} state block(s): ${stateBlocks.map((block) => block.type).join(', ')}.`),
      updatedAt: now,
      sourceMessageIds: [assistant.id],
    }));
  }

  const preservedActiveIds = existingRecords
    .filter((record) => record.status === 'active' && record.kind === 'decision')
    .map((record) => record.id);

  return {
    records,
    activeRecordIds: [...records.map((record) => record.id), ...preservedActiveIds],
    supersededAt: now,
  };
}

export function getActiveDMMemoryRecords(memory: DMMemoryState): DMMemoryRecord[] {
  return memory.records
    .filter((record) => record.status === 'active')
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_RENDERED_RECORDS);
}

export function buildDMMemoryDebug(memory: DMMemoryState): {
  status: 'available';
  recordCount: number;
  activeCount: number;
  records: DMMemoryDebugRecord[];
} {
  const activeRecords = getActiveDMMemoryRecords(memory);
  return {
    status: 'available',
    recordCount: memory.records.length,
    activeCount: memory.records.filter((record) => record.status === 'active').length,
    records: activeRecords.map((record) => ({
      id: record.id,
      kind: record.kind,
      title: record.title,
      status: record.status,
      updatedAt: record.updatedAt,
    })),
  };
}

export function renderDMMemoryBlock(memory: DMMemoryState): string {
  const activeRecords = getActiveDMMemoryRecords(memory);
  if (activeRecords.length === 0) return '';

  const lines = [
    '## PERSISTENT DM MEMORY',
    'Authority: local play-session memory. This is durable campaign memory, not canonical Nexus source truth. Current app state and retrieved canonical source supersede memory when they conflict. Use memory to preserve continuity, unresolved threads, decisions, NPC/location facts, and prior consequences.',
  ];

  for (const record of activeRecords) {
    lines.push('');
    lines.push(`- [${record.kind}] ${record.title}: ${record.content}`);
  }

  return lines.join('\n');
}
