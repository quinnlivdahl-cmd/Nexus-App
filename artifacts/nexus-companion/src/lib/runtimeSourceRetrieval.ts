import type { GameState } from '../types/game';

const NEXUS_API_BASE_URL =
  import.meta.env.VITE_NEXUS_API_BASE_URL ?? 'http://127.0.0.1:5000';

export interface RetrievedSourceSlice {
  sliceId: string;
  docId: string;
  docTitle: string;
  domain: string;
  section: string;
  heading: string;
  exactRepoPath: string;
  startLine: number;
  endLine: number;
  score: number;
  content: string;
}

export interface SourceRetrievalResult {
  authority: 'docs/nexus-game-source/source';
  generatedAt: string;
  query: string;
  terms: string[];
  results: RetrievedSourceSlice[];
}

export interface SourceRetrievalDebug {
  status: 'available' | 'unavailable';
  authority: string;
  query: string;
  terms: string[];
  resultCount: number;
  results: Array<{
    sliceId: string;
    docId: string;
    heading: string;
    exactRepoPath: string;
    lineRange: string;
    score: number;
  }>;
  error?: string;
}

function compactList(values: Array<string | undefined>): string {
  return values
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .join(' | ');
}

export function buildSourceRetrievalQuery(state: GameState, userText: string): string {
  const crew = state.crew
    .filter((member) => member.status === 'active' || member.status === 'ship-support')
    .map((member) =>
      compactList([
        member.name,
        member.role,
        member.discipline,
        member.origin,
        member.skills.map((skill) => skill.name).join(' '),
        member.loadout.map((item) => item.name).join(' '),
      ]),
    );

  const encounter = state.encounter.active
    ? [
        `Encounter: ${state.encounter.title ?? 'active tactical encounter'}`,
        `Objectives: ${state.encounter.objectives.join('; ')}`,
        `Actors: ${state.encounter.actors.map((actor) => `${actor.name} ${actor.faction}`).join('; ')}`,
        `Nodes: ${state.encounter.nodes.map((node) => node.label).join('; ')}`,
        `Notes: ${state.encounter.notes ?? ''}`,
      ]
    : [];

  return [
    `Player turn: ${userText}`,
    `Campaign: ${state.campaign.campaignName}`,
    `Arc: ${state.campaign.currentArc}`,
    `Main objective: ${state.campaign.mainObjective}`,
    `Current location: ${state.campaign.currentLocation}`,
    `Next node: ${state.campaign.nextNode}`,
    `Scene: ${state.scene.locationName} ${state.scene.environmentType} ${state.scene.narrativeContext}`,
    `Pressures: ${state.campaign.activePressures.join('; ')}`,
    `Clocks: ${state.campaign.activeClocks.map((clock) => `${clock.name} ${clock.current}/${clock.max}`).join('; ')}`,
    `Evidence and leads: ${state.campaign.evidenceAndLeads.map((evidence) => `${evidence.name}: ${evidence.notes}`).join('; ')}`,
    `Open questions: ${state.campaign.openQuestions?.join('; ') ?? ''}`,
    `Crew: ${crew.join('; ')}`,
    ...encounter,
  ].join('\n');
}

export function renderRetrievedSourceBlock(result: SourceRetrievalResult): string {
  if (result.results.length === 0) {
    return '';
  }

  const lines = [
    '## RETRIEVED CANONICAL SOURCE SLICES',
    `Authority: \`${result.authority}\``,
    'These slices are retrieved source context for this turn. Use them to stay consistent with Nexus rules/lore/play aids. Do not treat source IDs, paths, headings, or retrieval metadata as in-fiction mission content or player-visible artifacts.',
  ];

  for (const item of result.results) {
    lines.push('');
    lines.push(`### ${item.heading}`);
    lines.push(
      `Source: \`${item.docId}\` / \`${item.sliceId}\` (${item.exactRepoPath}:${item.startLine}-${item.endLine})`,
    );
    lines.push(item.content);
  }

  return lines.join('\n');
}

export function buildSourceRetrievalDebug(
  result: SourceRetrievalResult,
): SourceRetrievalDebug {
  return {
    status: 'available',
    authority: result.authority,
    query: result.query,
    terms: result.terms,
    resultCount: result.results.length,
    results: result.results.map((item) => ({
      sliceId: item.sliceId,
      docId: item.docId,
      heading: item.heading,
      exactRepoPath: item.exactRepoPath,
      lineRange: `${item.startLine}-${item.endLine}`,
      score: item.score,
    })),
  };
}

export async function retrieveSourceContext(
  state: GameState,
  userText: string,
): Promise<{ block: string; debug: SourceRetrievalDebug }> {
  const query = buildSourceRetrievalQuery(state, userText);

  try {
    const response = await fetch(`${NEXUS_API_BASE_URL}/api/source-retrieval`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        maxResults: 5,
        maxChars: 5200,
      }),
    });

    if (!response.ok) {
      throw new Error(`Source retrieval failed with HTTP ${response.status}`);
    }

    const result = (await response.json()) as SourceRetrievalResult;
    return {
      block: renderRetrievedSourceBlock(result),
      debug: buildSourceRetrievalDebug(result),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Source retrieval unavailable';
    return {
      block: '',
      debug: {
        status: 'unavailable',
        authority: 'docs/nexus-game-source/source',
        query,
        terms: [],
        resultCount: 0,
        results: [],
        error: message,
      },
    };
  }
}
