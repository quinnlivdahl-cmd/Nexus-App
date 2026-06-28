import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const SOURCE_ROOT = "docs/nexus-game-source/source";
const SOURCE_SLICE_CATALOG = `${SOURCE_ROOT}/SOURCE-SLICES.json`;
const DEFAULT_MAX_RESULTS = 5;
const DEFAULT_MAX_CHARS = 5200;
const MAX_QUERY_CHARS = 6000;
const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "and",
  "are",
  "but",
  "can",
  "current",
  "does",
  "for",
  "from",
  "have",
  "how",
  "into",
  "like",
  "next",
  "not",
  "now",
  "our",
  "player",
  "scene",
  "should",
  "state",
  "that",
  "the",
  "their",
  "then",
  "there",
  "this",
  "turn",
  "use",
  "what",
  "when",
  "where",
  "with",
  "would",
  "you",
]);

const RUNTIME_DM_DOMAINS = new Set([
  "Art",
  "Automation",
  "Characters",
  "Combat",
  "Content",
  "Core",
  "Equipment",
  "Lore",
  "Play Aids",
  "Skills",
]);

export interface SourceRetrievalRequest {
  query?: string;
  maxResults?: number;
  maxChars?: number;
}

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

export interface SourceRetrievalResponse {
  authority: "docs/nexus-game-source/source";
  generatedAt: string;
  query: string;
  terms: string[];
  results: RetrievedSourceSlice[];
}

interface SourceSliceCatalogItem {
  slice_id: string;
  doc_id: string;
  doc_title: string;
  domain: string;
  section: string;
  exact_repo_path: string;
  heading: string;
  start_line: number;
  end_line: number;
}

interface SourceSliceCatalog {
  slices: SourceSliceCatalogItem[];
}

interface IndexedSlice extends SourceSliceCatalogItem {
  content: string;
  termCounts: Map<string, number>;
  termTotal: number;
}

let cachedIndex: IndexedSlice[] | undefined;

function findWorkspaceRoot(startDir: string): string {
  let current = path.resolve(startDir);

  while (true) {
    if (existsSync(path.join(current, "pnpm-workspace.yaml"))) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return path.resolve(startDir);
    }
    current = parent;
  }
}

function normalizeLimit(value: number | undefined, fallback: number, min: number, max: number) {
  const limit = value ?? fallback;
  if (!Number.isFinite(limit)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(limit)));
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length >= 3 && !STOP_WORDS.has(term));
}

function termCounts(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const term of tokenize(text)) {
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }
  return counts;
}

function readSliceContent(root: string, slice: SourceSliceCatalogItem): string {
  const absolutePath = path.resolve(root, slice.exact_repo_path);
  const sourceRoot = path.resolve(root, SOURCE_ROOT);

  if (!absolutePath.startsWith(sourceRoot)) {
    throw new Error(`Refusing to read non-source path: ${slice.exact_repo_path}`);
  }

  const text = readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/);
  return lines.slice(slice.start_line - 1, slice.end_line).join("\n").trim();
}

function loadIndex(): IndexedSlice[] {
  if (cachedIndex) return cachedIndex;

  const root = findWorkspaceRoot(process.cwd());
  const catalogPath = path.resolve(root, SOURCE_SLICE_CATALOG);
  const catalog = JSON.parse(readFileSync(catalogPath, "utf8")) as SourceSliceCatalog;

  cachedIndex = catalog.slices
    .filter((slice) => RUNTIME_DM_DOMAINS.has(slice.domain))
    .map((slice) => {
      const content = readSliceContent(root, slice);
      const searchableText = [
        slice.slice_id,
        slice.doc_id,
        slice.doc_title,
        slice.domain,
        slice.section,
        slice.heading,
        content,
      ].join("\n");
      const counts = termCounts(searchableText);
      return {
        ...slice,
        content,
        termCounts: counts,
        termTotal: [...counts.values()].reduce((sum, count) => sum + count, 0),
      };
    });

  return cachedIndex;
}

function scoreSlice(slice: IndexedSlice, terms: string[]): number {
  if (terms.length === 0) return 0;

  const titleText = `${slice.slice_id} ${slice.doc_id} ${slice.doc_title} ${slice.heading}`.toLowerCase();
  const domainText = `${slice.domain} ${slice.section}`.toLowerCase();
  let score = 0;

  for (const term of terms) {
    const count = slice.termCounts.get(term) ?? 0;
    if (count === 0) continue;

    score += Math.log1p(count) * 2;
    if (titleText.includes(term)) score += 4;
    if (domainText.includes(term)) score += 1.5;
  }

  const density = score / Math.max(1, Math.log2(slice.termTotal + 2));
  return Number(density.toFixed(4));
}

function uniqueTerms(query: string): string[] {
  return [...new Set(tokenize(query.slice(0, MAX_QUERY_CHARS)))].slice(0, 80);
}

function trimToBudget(results: RetrievedSourceSlice[], maxChars: number): RetrievedSourceSlice[] {
  let remaining = maxChars;
  const trimmed: RetrievedSourceSlice[] = [];

  for (const result of results) {
    if (remaining <= 0) break;
    const content =
      result.content.length > remaining
        ? `${result.content.slice(0, Math.max(0, remaining - 32)).trimEnd()}\n[retrieved slice truncated]`
        : result.content;

    trimmed.push({ ...result, content });
    remaining -= content.length;
  }

  return trimmed;
}

export function retrieveSourceSlices(request: SourceRetrievalRequest): SourceRetrievalResponse {
  const query = (request.query ?? "").slice(0, MAX_QUERY_CHARS);
  const terms = uniqueTerms(query);
  const maxResults = normalizeLimit(request.maxResults, DEFAULT_MAX_RESULTS, 1, 8);
  const maxChars = normalizeLimit(request.maxChars, DEFAULT_MAX_CHARS, 1000, 9000);

  const scored = loadIndex()
    .map((slice) => ({ slice, score: scoreSlice(slice, terms) }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.slice.domain.localeCompare(b.slice.domain) ||
        a.slice.slice_id.localeCompare(b.slice.slice_id),
    )
    .slice(0, maxResults)
    .map<RetrievedSourceSlice>(({ slice, score }) => ({
      sliceId: slice.slice_id,
      docId: slice.doc_id,
      docTitle: slice.doc_title,
      domain: slice.domain,
      section: slice.section,
      heading: slice.heading,
      exactRepoPath: slice.exact_repo_path,
      startLine: slice.start_line,
      endLine: slice.end_line,
      score,
      content: slice.content,
    }));

  return {
    authority: SOURCE_ROOT,
    generatedAt: new Date().toISOString(),
    query,
    terms,
    results: trimToBudget(scored, maxChars),
  };
}
