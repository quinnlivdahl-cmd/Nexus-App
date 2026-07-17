function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "[]") return [];
  return trimmed;
}

export function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {};
  const endMatch = text.slice(3).match(/\r?\n---\r?\n/);
  if (!endMatch) return {};

  const frontmatter = {};
  let activeArrayKey = null;
  const block = text.slice(3, endMatch.index + 3);
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+$/, "");
    if (!line.trim()) continue;
    const listMatch = line.match(/^\s+-\s*(.*)$/);
    if (listMatch && activeArrayKey) {
      frontmatter[activeArrayKey].push(stripQuotes(listMatch[1]));
      continue;
    }
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyMatch) continue;
    const [, key, rawValue] = keyMatch;
    if (!rawValue.trim()) {
      frontmatter[key] = [];
      activeArrayKey = key;
      continue;
    }
    const value = stripQuotes(rawValue);
    frontmatter[key] = value;
    activeArrayKey = Array.isArray(value) ? key : null;
  }
  return frontmatter;
}
