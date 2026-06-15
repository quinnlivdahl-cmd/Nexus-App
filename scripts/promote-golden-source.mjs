import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");
const goldenSourceRoot = resolve(
  repoRoot,
  "docs/nexus-game-source/source",
);

const vaultRoot = "C:\\Users\\Quintin Livdahl\\Nexus";
const liveSourceRoot = join(vaultRoot, "00 Source");
const rootSourceArchiveRoot = join(vaultRoot, "99 Archive", "01 Superseded Source");
const projectSourceRoot = join(vaultRoot, "Nexus", "00 Source");
const projectSourceArchiveRoot = join(
  vaultRoot,
  "Nexus",
  "99 Archive",
  "01 Superseded Source",
);
const projectSlotArchiveRoot = join(projectSourceArchiveRoot, "00 Source Slots 2026-06-10");

const oldMotherSourceRoot = "C:\\Nexus Mother Folder\\00 Nexus Obsidian Vault\\00 Source";
const oldMotherArchiveRoot =
  "C:\\Nexus Mother Folder\\00 Nexus Obsidian Vault\\99 Archive\\01 Superseded Source";
const newArchiveRoot = projectSourceArchiveRoot;
const newSlotArchiveRoot = projectSlotArchiveRoot;

const args = new Set(process.argv.slice(2));
const execute = args.has("--execute");
const skipReferenceRewrite = args.has("--skip-reference-rewrite");
const skipPromotion = args.has("--skip-promotion");
const skipProjectCleanup = args.has("--skip-project-cleanup");

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const runDate = timestamp.slice(0, 10);

const slotResidueNames = [
  "05 Admin Runbooks Source Management rev0.3",
  "06 Mode Ops Registers Templates rev0.5",
  "07 Core Game Campaign rev0.3",
  "08 Source Combat TacMaps Encounters rev0.4",
  "09 Characters Crew Progression rev0.4",
  "10 Skills Resolution RNG rev0.5",
  "11 Equipment Loadout Cyberware rev0.5",
  "12 Source Lore Factions Timeline rev0.2",
  "13 Content Systems rev0.5",
  "14 TT VG Automation rev0.2",
  "15 Auxiliary Play Aids rev0.2",
  "16 Current Dashboards State rev0.3",
  "17 Reference Reports and Research rev0.2",
  "18 Data Tables and Workbooks rev0.1",
  "19 Art Visual Direction rev0.3",
  "00 Bootstrap rev0.4.md",
  "01 Global Mode Operations Rules rev1.2.md",
  "02 Steward Mode Rules rev0.2.md",
  "03 Slot Map rev0.6.md",
];

const textExtensions = new Set([
  ".md",
  ".mjs",
  ".js",
  ".ts",
  ".tsx",
  ".json",
  ".yml",
  ".yaml",
  ".txt",
]);

const ignoredDirectoryNames = new Set([
  ".git",
  ".obsidian",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".turbo",
]);

const changes = [];

function log(message) {
  console.log(`[promote-golden-source] ${message}`);
}

function normalizePath(path) {
  return resolve(path).toLowerCase();
}

function assertInside(child, parent, label) {
  const childPath = normalizePath(child);
  const parentPath = normalizePath(parent);
  if (childPath !== parentPath && !childPath.startsWith(`${parentPath.toLowerCase()}${sep}`)) {
    throw new Error(`${label} is outside allowed parent: ${child}`);
  }
}

function assertRequiredPaths() {
  if (!existsSync(goldenSourceRoot)) {
    throw new Error(`Missing Golden Truth source: ${goldenSourceRoot}`);
  }
  if (!existsSync(vaultRoot)) {
    throw new Error(`Missing vault root: ${vaultRoot}`);
  }
  if (!existsSync(projectSlotArchiveRoot)) {
    throw new Error(`Missing slot archive: ${projectSlotArchiveRoot}`);
  }

  assertInside(goldenSourceRoot, repoRoot, "Golden source");
  assertInside(liveSourceRoot, vaultRoot, "Live source");
  assertInside(rootSourceArchiveRoot, vaultRoot, "Root source archive");
  assertInside(projectSourceRoot, join(vaultRoot, "Nexus"), "Project source");
  assertInside(projectSourceArchiveRoot, join(vaultRoot, "Nexus"), "Project source archive");
}

function hasTextExtension(path) {
  const name = basename(path);
  const index = name.lastIndexOf(".");
  if (index === -1) return false;
  return textExtensions.has(name.slice(index).toLowerCase());
}

function walkFiles(dir, options = {}) {
  if (!existsSync(dir)) return [];
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirectoryNames.has(entry.name)) continue;
      if (options.skipPath?.(fullPath)) continue;
      files.push(...walkFiles(fullPath, options));
      continue;
    }

    if (entry.isFile() && (!options.textOnly || hasTextExtension(fullPath))) {
      if (options.skipPath?.(fullPath)) continue;
      files.push(fullPath);
    }
  }

  return files;
}

function replaceAll(text, from, to) {
  return text.split(from).join(to);
}

function rewriteSourceText(text) {
  const lines = text.split(/\r?\n/);
  let inFrontmatter = false;
  let frontmatterDone = false;
  let inLegacyPaths = false;

  const rewrittenLines = lines.map((line, index) => {
    if (index === 0 && line.trim() === "---") {
      inFrontmatter = true;
      return line;
    }

    if (inFrontmatter && index > 0 && line.trim() === "---") {
      inFrontmatter = false;
      frontmatterDone = true;
      inLegacyPaths = false;
      return line;
    }

    if (inFrontmatter && /^legacy_paths:\s*$/.test(line)) {
      inLegacyPaths = true;
      return line;
    }

    if (inFrontmatter && inLegacyPaths && /^\S/.test(line) && !/^legacy_paths:\s*$/.test(line)) {
      inLegacyPaths = false;
    }

    if (inFrontmatter && inLegacyPaths && line.includes(oldMotherSourceRoot + "\\")) {
      return replaceAll(line, oldMotherSourceRoot + "\\", newSlotArchiveRoot + "\\");
    }

    return line;
  });

  let rewritten = rewrittenLines.join("\n");
  rewritten = replaceAll(rewritten, oldMotherArchiveRoot, newArchiveRoot);
  rewritten = replaceAll(rewritten, oldMotherSourceRoot, liveSourceRoot);
  return rewritten;
}

function rewriteGeneralText(text) {
  let rewritten = text;
  rewritten = replaceAll(rewritten, oldMotherArchiveRoot, newArchiveRoot);
  rewritten = replaceAll(rewritten, oldMotherSourceRoot, liveSourceRoot);
  rewritten = replaceAll(
    rewritten,
    "C:\\Nexus Mother Folder\\03 APP\\Nexus AI DM App\\app docs\\nexus-game-source",
    resolve(repoRoot, "docs/nexus-game-source"),
  );
  return rewritten;
}

function rewriteFile(path, sourceAware) {
  const before = readFileSync(path, "utf8").replace(/^\uFEFF/, "");
  const after = sourceAware ? rewriteSourceText(before) : rewriteGeneralText(before);
  if (after === before) return false;

  if (execute) {
    writeFileSync(path, after, "utf8");
  }
  changes.push(`rewrite ${path}`);
  return true;
}

function rewriteReferences() {
  const repoFiles = walkFiles(repoRoot, { textOnly: true });
  for (const file of repoFiles) {
    const inGoldenSource =
      normalizePath(file) === normalizePath(goldenSourceRoot) ||
      normalizePath(file).startsWith(`${normalizePath(goldenSourceRoot)}${sep}`);
    rewriteFile(file, inGoldenSource && file.endsWith(".md"));
  }

  const activeVaultInstructionFiles = [
    join(vaultRoot, "AGENTS.md"),
    join(vaultRoot, "Nexus", "AGENTS.md"),
  ];

  for (const file of activeVaultInstructionFiles) {
    if (existsSync(file)) {
      rewriteFile(file, false);
    }
  }
}

function hashFile(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function fileMap(rootPath, excludeBasenames = new Set()) {
  const stat = statSync(rootPath);
  if (stat.isFile()) {
    if (excludeBasenames.has(basename(rootPath))) return new Map();
    return new Map([["", hashFile(rootPath)]]);
  }

  const files = walkFiles(rootPath, {
    skipPath: (path) => excludeBasenames.has(basename(path)),
  });
  const map = new Map();
  for (const file of files) {
    map.set(relative(rootPath, file).split(sep).join("/"), hashFile(file));
  }
  return map;
}

function sameTree(left, right, options = {}) {
  if (!existsSync(left) || !existsSync(right)) return false;
  const leftStat = statSync(left);
  const rightStat = statSync(right);
  if (leftStat.isFile() !== rightStat.isFile()) return false;
  if (leftStat.isDirectory() !== rightStat.isDirectory()) return false;

  const leftMap = fileMap(left, options.leftExcludeBasenames);
  const rightMap = fileMap(right, options.rightExcludeBasenames);
  if (leftMap.size !== rightMap.size) return false;

  for (const [key, value] of leftMap) {
    if (rightMap.get(key) !== value) return false;
  }

  return true;
}

function ensureParent(path) {
  if (execute) {
    mkdirSync(dirname(path), { recursive: true });
  }
}

function writeTextIfChanged(path, content) {
  if (existsSync(path) && readFileSync(path, "utf8") === content) return;

  changes.push(`write ${path}`);
  if (execute) {
    ensureParent(path);
    writeFileSync(path, content, "utf8");
  }
}

function copyDirectory(source, destination, options = {}) {
  if (!execute) return;
  cpSync(source, destination, {
    recursive: true,
    force: true,
    filter: (path) => !options.excludeBasenames?.has(basename(path)),
  });
}

function archiveAndPromoteLiveSource() {
  const archiveTarget = join(
    rootSourceArchiveRoot,
    `00 Source Root Partial pre-golden-truth ${timestamp}`,
  );
  const liveExclusions = new Set(["AGENTS.md"]);
  const goldenExclusions = new Set(["SOURCE-INDEX.md", "SOURCE-INDEX.json"]);
  const liveAlreadyPromoted =
    existsSync(liveSourceRoot) &&
    sameTree(liveSourceRoot, goldenSourceRoot, {
      leftExcludeBasenames: liveExclusions,
      rightExcludeBasenames: goldenExclusions,
    });

  if (liveAlreadyPromoted) {
    log("live source already matches Golden Truth source");
  } else if (existsSync(liveSourceRoot)) {
    if (existsSync(archiveTarget)) {
      throw new Error(`Archive target already exists: ${archiveTarget}`);
    }
    changes.push(`archive ${liveSourceRoot} -> ${archiveTarget}`);
    if (execute) {
      mkdirSync(rootSourceArchiveRoot, { recursive: true });
      renameSync(liveSourceRoot, archiveTarget);
      writeFileSync(
        join(archiveTarget, "PROMOTION-MANIFEST.md"),
        [
          "# Source Promotion Manifest",
          "",
          `Date: ${runDate}`,
          `Archived from: \`${liveSourceRoot}\``,
          `Promoted from Golden Truth: \`${goldenSourceRoot}\``,
          "",
          "This folder preserves the pre-promotion vault-root source so no source material was lost during Golden Truth promotion.",
          "",
        ].join("\n"),
        "utf8",
      );
    }
  }

  if (!liveAlreadyPromoted) {
    changes.push(`copy Golden Truth ${goldenSourceRoot} -> ${liveSourceRoot}`);
    if (execute) {
      mkdirSync(liveSourceRoot, { recursive: true });
    }
    copyDirectory(goldenSourceRoot, liveSourceRoot, {
      excludeBasenames: goldenExclusions,
    });
  }

  const liveAgents = [
    "# Nexus Live Source Agent Instructions",
    "",
    "Use this folder as the live, protected Nexus source.",
    "",
    `- Live source path: \`${liveSourceRoot}\``,
    "- Golden Truth promotion source: `docs/nexus-game-source/source` in the Nexus-App repo.",
    "- Treat these notes as source authority for Nexus rules, lore, design, routing, dashboards, and source-management procedures.",
    "- Ask before deleting, moving, renaming, bulk-editing, or superseding source notes.",
    "- Preserve archive evidence and legacy paths; do not silently rewrite canon, rules, or lore.",
    "- If source notes conflict with the app repo, report the conflict and ask which surface should be updated.",
    "",
  ].join("\n");
  writeTextIfChanged(join(liveSourceRoot, "AGENTS.md"), liveAgents);
}

function movePath(source, destination) {
  ensureParent(destination);
  changes.push(`move ${source} -> ${destination}`);
  if (execute) {
    if (existsSync(destination)) {
      throw new Error(`Destination already exists: ${destination}`);
    }
    renameSync(source, destination);
  }
}

function deletePath(path) {
  changes.push(`delete duplicate ${path}`);
  if (execute) {
    rmSync(path, { recursive: true, force: true });
  }
}

function cleanProjectSourceResidue() {
  if (!existsSync(projectSourceRoot)) return;

  const residueArchive = join(
    projectSourceArchiveRoot,
    `Project 00 Source Residue pre-root-source ${timestamp}`,
  );
  const handledNames = new Set();

  for (const name of slotResidueNames) {
    const candidate = join(projectSourceRoot, name);
    if (!existsSync(candidate)) continue;

    const archivedCopy = join(projectSlotArchiveRoot, name);
    if (existsSync(archivedCopy) && sameTree(candidate, archivedCopy)) {
      deletePath(candidate);
      handledNames.add(name);
      continue;
    }

    movePath(candidate, join(residueArchive, name));
    handledNames.add(name);
  }

  if (existsSync(projectSourceRoot)) {
    const remaining = readdirSync(projectSourceRoot);
    for (const name of remaining) {
      if (handledNames.has(name)) continue;
      const candidate = join(projectSourceRoot, name);
      if (isCurrentProjectRedirectFile(candidate, name)) continue;
      movePath(candidate, join(residueArchive, name));
    }
  }

  const redirectAgents = [
    "# Nexus Project Source Redirect",
    "",
    "This project-folder source slot is intentionally not the live source authority.",
    "",
    `- Live source: \`${liveSourceRoot}\``,
    `- Archived project-source residue root: \`${projectSourceArchiveRoot}\``,
    "- Use the vault-root live source for current Nexus rules, lore, design, dashboards, and source-management procedures.",
    "",
  ].join("\n");

  const redirectNote = [
    "# Source Redirect",
    "",
    "The live Nexus source has been promoted to the vault-root `00 Source` folder.",
    "",
    `Current live source: \`${liveSourceRoot}\``,
    "",
    "This folder remains only as a pointer so old project-folder habits do not recreate a second source tree.",
    "",
  ].join("\n");

  if (execute) {
    mkdirSync(projectSourceRoot, { recursive: true });
  }
  writeTextIfChanged(join(projectSourceRoot, "AGENTS.md"), redirectAgents);
  writeTextIfChanged(join(projectSourceRoot, "SOURCE-REDIRECT.md"), redirectNote);
}

function isCurrentProjectRedirectFile(path, name) {
  if (name !== "AGENTS.md" && name !== "SOURCE-REDIRECT.md") return false;
  if (!statSync(path).isFile()) return false;

  const text = readFileSync(path, "utf8");
  return (
    text.includes("Nexus Project Source Redirect") ||
    text.includes("The live Nexus source has been promoted to the vault-root `00 Source` folder.")
  );
}

function main() {
  assertRequiredPaths();

  if (!skipReferenceRewrite) {
    log(`${execute ? "rewriting" : "would rewrite"} old source path references`);
    rewriteReferences();
  }

  if (!skipPromotion) {
    log(`${execute ? "promoting" : "would promote"} Golden Truth to live source`);
    archiveAndPromoteLiveSource();
  }

  if (!skipProjectCleanup) {
    log(`${execute ? "cleaning" : "would clean"} project-folder source residue`);
    cleanProjectSourceResidue();
  }

  if (!execute) {
    log("dry run only; rerun with --execute to apply changes");
  }

  log(`${execute ? "applied" : "planned"} ${changes.length} changes`);
  for (const change of changes) {
    console.log(`- ${change}`);
  }
}

main();
