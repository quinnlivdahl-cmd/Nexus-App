export const authorityValues = [
  "game_current",
  "game_provisional",
  "runtime_ai_behavior",
  "project_operations",
  "historical_reference",
  "non_authoritative",
];

export const applicabilityValues = [
  "player_game_rules",
  "campaign_director_runtime",
  "content_authoring_workflow",
  "project_operations",
  "historical_provenance",
];

export const explicitlyClassifiedDomains = new Set(["Admin", "Modes"]);

const defaultGameAuthorities = new Set([
  "game_current",
  "game_provisional",
  "runtime_ai_behavior",
]);

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

export function retrievalMetadata(frontmatter, domain, repoPath) {
  const authority = frontmatter.authority || null;
  const applicability = asArray(frontmatter.applicability);

  if (explicitlyClassifiedDomains.has(domain) && !authority) {
    throw new Error(`${repoPath} must declare authority`);
  }
  if (authority && !authorityValues.includes(authority)) {
    throw new Error(`${repoPath} has invalid authority: ${authority}`);
  }
  if (explicitlyClassifiedDomains.has(domain) && applicability.length === 0) {
    throw new Error(`${repoPath} must declare applicability`);
  }
  for (const value of applicability) {
    if (!applicabilityValues.includes(value)) {
      throw new Error(`${repoPath} has invalid applicability: ${value}`);
    }
  }

  if (!authority) return {};

  return {
    authority,
    applicability,
    default_game_retrieval: defaultGameAuthorities.has(authority),
  };
}
