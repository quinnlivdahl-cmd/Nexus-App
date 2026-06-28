import rawSourceContextPack from '../data/sourceContextPack.json';

export type ContextCategory =
  | 'rules'
  | 'lore'
  | 'campaign_state'
  | 'encounter'
  | 'play_aid'
  | 'image_guidance'
  | 'dm_contract';

export type ContextVisibility = 'player-visible' | 'dm-facing' | 'hidden-permitted';

export interface SourceBackedContextEntry {
  id: string;
  category: ContextCategory;
  title: string;
  tags: string[];
  priority: number;
  visibility: ContextVisibility;
  sourceSliceIds: string[];
  sourceDocIds: string[];
  content: string;
  linkedEntityId?: string;
}

export interface SourceContextPack {
  packId: string;
  version: string;
  description: string;
  entries: SourceBackedContextEntry[];
}

export const SOURCE_CONTEXT_PACK = rawSourceContextPack as SourceContextPack;
