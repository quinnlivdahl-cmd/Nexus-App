import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import test from "node:test";
import {
  validateAdrState,
  validateArchiveBoundary,
  validateAuthorityRouter,
  validateBridgeArchitecture,
  validateObsidianPointerSurface,
  validatePlanningOwnership,
  validateReferencedArtifacts,
  validateRetiredPromotionReferences,
  validateSkillRouting,
  validateSliceCatalogData,
  validateSourceIndexData,
  validateSourceReconciliation,
  validateWorkflowInvariants,
} from "./nexus-workflow-invariants.mjs";
import {
  applicabilityValues,
  authorityValues,
} from "./source-retrieval-policy.mjs";

function fixture() {
  const root = mkdtempSync(resolve(tmpdir(), "nexus-workflow-"));
  return {
    root,
    write(path, text) {
      const absolute = resolve(root, path);
      mkdirSync(dirname(absolute), { recursive: true });
      writeFileSync(absolute, text, "utf8");
      return absolute;
    },
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

function validSourceItem(path) {
  return {
    domain: "Admin",
    exact_repo_path: path,
    authority: "project_operations",
    applicability: ["project_operations"],
    default_game_retrieval: false,
  };
}

function sourceIndex(files) {
  return {
    authority_values: authorityValues,
    applicability_values: applicabilityValues,
    file_count: files.length,
    files,
  };
}

test("source authority rejects excluded material in default game retrieval", () => {
  const f = fixture();
  try {
    const path = "docs/nexus-game-source/source/Admin/Current State/rules.md";
    f.write(path, "# Rules\n");
    const item = { ...validSourceItem(path), default_game_retrieval: true };
    const failures = validateSourceIndexData(sourceIndex([item]), f.root);
    assert.ok(failures.some((failure) => failure.includes("expected false")));
    assert.ok(
      failures.some((failure) => failure.includes("excluded authority")),
    );
  } finally {
    f.cleanup();
  }
});

test("source and slice indexes reject missing and inconsistent routes", () => {
  const f = fixture();
  try {
    const path = "docs/nexus-game-source/source/Admin/Current State/rules.md";
    f.write(path, "# Rules\n");
    const index = sourceIndex([validSourceItem(path)]);
    const catalog = {
      authority_values: authorityValues,
      applicability_values: applicabilityValues,
      slice_count: 1,
      h2_section_count: 1,
      h2_covered_count: 1,
      coverage_complete: true,
      slices: [
        {
          slice_id: "admin.rules",
          exact_repo_path: "docs/nexus-game-source/source/Admin/missing.md",
          start_line: 2,
          end_line: 1,
        },
      ],
    };
    const failures = validateSliceCatalogData(catalog, index, f.root);
    assert.ok(
      failures.some((failure) => failure.includes("points outside")),
    );
  } finally {
    f.cleanup();
  }
});

test("ADR validation rejects incomplete controlling metadata", () => {
  const f = fixture();
  try {
    f.write("docs/adr/README.md", "[0001](0001-example.md)\n");
    f.write(
      "docs/adr/0001-example.md",
      "---\nstatus: accepted\ndate: 2026-07-17\n---\n\n# Example\n",
    );
    const failures = validateAdrState(f.root);
    assert.ok(
      failures.some((failure) => failure.includes("missing provenance")),
    );
  } finally {
    f.cleanup();
  }
});

test("ADR validation rejects a same-ID broken index target", () => {
  const f = fixture();
  try {
    f.write("docs/adr/README.md", "[0001](0001-wrong-slug.md)\n");
    f.write(
      "docs/adr/0001-example.md",
      "---\nstatus: accepted\ndate: 2026-07-17\nprovenance: test\n---\n\n# Example\n",
    );
    const failures = validateAdrState(f.root);
    assert.ok(
      failures.some((failure) =>
        failure.includes("missing file 0001-wrong-slug.md"),
      ),
    );
  } finally {
    f.cleanup();
  }
});

test("reconciliation validation rejects unverified reconciliation markers", () => {
  const f = fixture();
  try {
    f.write(
      "docs/nexus-game-source/source/Core/Canon Homes/core.md",
      "---\nworking_state: revised_vision_reconciled\nlast_reviewed: 2026-07-17\nmetadata_notes: checked\n---\n\n# Core\n",
    );
    const failures = validateSourceReconciliation(f.root);
    assert.ok(
      failures.some((failure) => failure.includes("not metadata_verified")),
    );
  } finally {
    f.cleanup();
  }
});

test("reconciliation validation rejects a proposed ADR as controlling authority", () => {
  const f = fixture();
  try {
    f.write(
      "docs/adr/0001-proposal.md",
      "---\nstatus: proposed\ndate: 2026-07-17\nprovenance: test\n---\n\n# Proposal\n",
    );
    f.write(
      "docs/nexus-game-source/source/Core/Canon Homes/core.md",
      "---\nworking_state: revised_vision_reconciled\nmetadata_verified: true\nlast_reviewed: 2026-07-17\nmetadata_notes: checked\n---\n\n# Core\n\nReconciles ADR-0001.\n",
    );
    const failures = validateSourceReconciliation(f.root);
    assert.ok(
      failures.some((failure) => failure.includes("non-controlling ADR-0001")),
    );
  } finally {
    f.cleanup();
  }
});

test("skill routing follows current AGENTS dispatch instead of fixed skill names", () => {
  const f = fixture();
  try {
    f.write("AGENTS.md", "Use `.agents/skills/renamed-source/SKILL.md`.\n");
    f.write(
      ".agents/skills/renamed-source/SKILL.md",
      "---\nname: renamed-source\ndescription: Maintains the current source route.\n---\n\n# Source route\n",
    );
    f.write(
      ".agents/skills/renamed-source/agents/openai.yaml",
      "display_name: Source\n",
    );
    assert.deepEqual(validateSkillRouting(f.root), []);
  } finally {
    f.cleanup();
  }
});

test("bridge invariants allow baseline files to be renamed and reorganized", () => {
  const f = fixture();
  try {
    f.write(
      "docs/chatgpt-project-bridge/guide.md",
      "# Rephrased project guidance\n\nCurrent authority and packet behavior live here.\n",
    );
    f.write(
      "docs/chatgpt-project-bridge/routes.md",
      "# Reorganized routes\n\nFetch current context through these paths.\n",
    );
    f.write(
      "docs/chatgpt-project-bridge/BASELINE.json",
      JSON.stringify({
        schema_version: 1,
        files: [
          {
            path: "guide.md",
            roles: ["authority_currentness", "context_packet_requirement"],
          },
          { path: "routes.md", roles: ["retrieval_routes"] },
        ],
      }),
    );
    assert.deepEqual(validateBridgeArchitecture(f.root), []);
  } finally {
    f.cleanup();
  }
});

test("whole workflow reports malformed and missing bridge entries without throwing", () => {
  const f = fixture();
  try {
    f.write(
      "package.json",
      JSON.stringify({
        scripts: Object.fromEntries(
          [
            "source:index:check",
            "source:slices:check",
            "context:pack:check",
            "context:runtime:check",
            "roadmap:index:check",
            "validate:workflow",
          ].map((name) => [name, "node scripts/noop.mjs"]),
        ),
      }),
    );
    f.write("scripts/noop.mjs", "process.exit(0);\n");
    f.write("AGENTS.md", "Start with `CONTEXT-MAP.md`.\n");
    f.write(
      "CONTEXT-MAP.md",
      "Canonical source: `docs/nexus-game-source/source`.\n\n[ADRs](docs/adr/README.md)\n",
    );
    f.write("docs/adr/README.md", "# Decisions\n");
    f.write("planning/README.md", "Status: pointer only\n");
    f.write(".github/ISSUE_TEMPLATE/task.yml", "name: Task\n");
    f.write("docs/admin/nexus-distributed-surfaces.md", "# Owner pointer\n");
    f.write(
      "docs/chatgpt-project-bridge/BASELINE.json",
      JSON.stringify({
        schema_version: 1,
        files: [
          {
            path: "missing.md",
            roles: ["authority_currentness", "context_packet_requirement"],
          },
          null,
        ],
      }),
    );
    const failures = validateWorkflowInvariants(f.root);
    assert.ok(
      failures.some((failure) =>
        failure.includes("baseline path does not exist missing.md"),
      ),
    );
    assert.ok(
      failures.some((failure) =>
        failure.includes("baseline entry must be an object"),
      ),
    );
  } finally {
    f.cleanup();
  }
});

test("routing validation rejects missing referenced templates", () => {
  const f = fixture();
  try {
    f.write("AGENTS.md", "Use `.agents/skills/task/SKILL.md`.\n");
    f.write(
      ".agents/skills/task/SKILL.md",
      "---\nname: task\ndescription: Routes task packets.\n---\n\nUse `MISSING_TEMPLATE.md`.\n",
    );
    f.write(".github/ISSUE_TEMPLATE/task.yml", "name: Task\n");
    const failures = validateReferencedArtifacts(f.root);
    assert.ok(
      failures.some((failure) => failure.includes("MISSING_TEMPLATE.md")),
    );
  } finally {
    f.cleanup();
  }
});

test("authority routing rejects a missing accepted-ADR route", () => {
  const f = fixture();
  try {
    f.write("AGENTS.md", "Start with `CONTEXT-MAP.md`.\n");
    f.write(
      "CONTEXT-MAP.md",
      "Canonical source: `docs/nexus-game-source/source`.\n\n[Game](docs/contexts/game.md)\n",
    );
    f.write("docs/contexts/game.md", "# Game\n");
    const failures = validateAuthorityRouter(f.root);
    assert.ok(
      failures.some((failure) =>
        failure.includes("no accepted-ADR index route"),
      ),
    );
  } finally {
    f.cleanup();
  }
});

test("planning ownership rejects restored repo planning state", () => {
  const f = fixture();
  try {
    f.write("planning/README.md", "Status: pointer only\n");
    f.write("planning/task_plan.md", "# Competing plan\n");
    const failures = validatePlanningOwnership(f.root);
    assert.ok(
      failures.some((failure) => failure.includes("contains planning state")),
    );
  } finally {
    f.cleanup();
  }
});

test("archive boundary keeps superseded files out of active routes", () => {
  const f = fixture();
  try {
    f.write("docs/archive/project-controls/old.md", "# Historical\n");
    f.write("docs/current.md", "# Current\n");
    f.write(
      "docs/archive/ARCHIVE-INDEX.json",
      JSON.stringify({
        schema_version: 1,
        classification: "historical_reference",
        default_current_state_retrieval: false,
        entries: [
          {
            path: "docs/archive/project-controls/old.md",
            former_path: "OLD.md",
            superseded_by: ["docs/current.md"],
          },
        ],
      }),
    );
    f.write("AGENTS.md", "Use `OLD.md`.\n");
    const failures = validateArchiveBoundary(f.root);
    assert.ok(
      failures.some((failure) => failure.includes("active route AGENTS.md")),
    );
  } finally {
    f.cleanup();
  }
});

test("archive boundary rejects missing replacements and restored former paths", () => {
  const f = fixture();
  try {
    f.write("docs/archive/project-controls/old.md", "# Historical\n");
    f.write("OLD.md", "# Restored\n");
    f.write(
      "docs/archive/ARCHIVE-INDEX.json",
      JSON.stringify({
        schema_version: 1,
        classification: "current",
        default_current_state_retrieval: false,
        entries: [
          {
            path: "docs/archive/project-controls/old.md",
            former_path: "OLD.md",
            superseded_by: ["docs/missing.md", "../outside.md", 7],
          },
        ],
      }),
    );
    const failures = validateArchiveBoundary(f.root);
    assert.ok(
      failures.some((failure) => failure.includes("active path still exists")),
    );
    assert.ok(
      failures.some((failure) => failure.includes("replacement path is missing")),
    );
    assert.ok(
      failures.some((failure) => failure.includes("classification must be historical_reference")),
    );
    assert.ok(
      failures.some((failure) => failure.includes("replacement path escapes repo root")),
    );
    assert.ok(
      failures.some((failure) => failure.includes("replacement path must be a string")),
    );
  } finally {
    f.cleanup();
  }
});

test("active policy rejects retired source-promotion commands", () => {
  const f = fixture();
  try {
    f.write("AGENTS.md", "# Instructions\n");
    f.write(
      "package.json",
      JSON.stringify({
        scripts: { old: "node scripts/promote-golden-source.mjs" },
      }),
    );
    const failures = validateRetiredPromotionReferences(f.root);
    assert.ok(
      failures.some((failure) => failure.includes("promote-golden-source.mjs")),
    );
  } finally {
    f.cleanup();
  }
});

test("Obsidian pointer validation detects a copied canonical document", () => {
  const f = fixture();
  try {
    const sourceText = "# Canonical rules\n\nOnly the repo owns this text.\n";
    f.write(
      "docs/nexus-game-source/source/Core/Canon Homes/core.md",
      sourceText,
    );
    const pointerRoot = resolve(f.root, "obsidian-source");
    f.write(
      "obsidian-source/AGENTS.md",
      "# Pointer boundary\n\nPointer navigation only; not a copied source.\n",
    );
    f.write("obsidian-source/copied.md", sourceText);
    const owner = f.write(
      "owner.md",
      `| Fact | Path | Role |\n| --- | --- | --- |\n| Canonical game source | \`docs/nexus-game-source/source\` | Canonical |\n| Obsidian source navigation | \`${pointerRoot}\` | Pointer only |\n`,
    );
    const failures = validateObsidianPointerSurface(f.root, owner);
    assert.ok(
      failures.some((failure) =>
        failure.includes("duplicates canonical source"),
      ),
    );
  } finally {
    f.cleanup();
  }
});

test("Obsidian pointer validation rejects an unavailable configured surface", () => {
  const f = fixture();
  try {
    const failures = validateObsidianPointerSurface(
      f.root,
      resolve(f.root, "missing-owner.md"),
    );
    assert.ok(
      failures.some((failure) =>
        failure.includes("owner registry is unavailable"),
      ),
    );
  } finally {
    f.cleanup();
  }
});

test("Obsidian pointer validation detects a lightly modified source copy", () => {
  const f = fixture();
  try {
    const words = Array.from({ length: 80 }, (_, index) => `rule${index}`);
    const sourceText = `# Canonical rules\n\n${words.join(" ")}\n`;
    const nearCopyText = sourceText.replace("rule40", "changed40");
    f.write(
      "docs/nexus-game-source/source/Core/Canon Homes/core.md",
      sourceText,
    );
    const pointerRoot = resolve(f.root, "obsidian-source");
    f.write(
      "obsidian-source/AGENTS.md",
      "# Pointer boundary\n\nPointer navigation only; not a copied source.\n",
    );
    f.write("obsidian-source/near-copy.md", nearCopyText);
    const owner = f.write(
      "owner.md",
      `| Fact | Path | Role |\n| --- | --- | --- |\n| Canonical game source | \`docs/nexus-game-source/source\` | Canonical |\n| Obsidian source navigation | \`${pointerRoot}\` | Pointer only |\n`,
    );
    const failures = validateObsidianPointerSurface(f.root, owner);
    assert.ok(
      failures.some((failure) =>
        failure.includes("substantially copies canonical source"),
      ),
    );
  } finally {
    f.cleanup();
  }
});

test("Obsidian pointer validation accepts a structural pointer card", () => {
  const f = fixture();
  try {
    f.write(
      "docs/nexus-game-source/source/Core/Canon Homes/core.md",
      "---\ndoc_id: CORE-001\n---\n\n# Canonical rules\n\nThe current game rule remains in the repo.\n",
    );
    const pointerRoot = resolve(f.root, "obsidian-source");
    f.write(
      "obsidian-source/AGENTS.md",
      "# Pointer boundary\n\nPointer navigation only; not a copied source.\n",
    );
    f.write(
      "obsidian-source/core-card.md",
      "---\ntype: file-card\nsource_type: repo\npath: docs/nexus-game-source/source/Core/Canon Homes/core.md\n---\n\n# Core pointer\n\nOpen the repo source path above.\n",
    );
    const owner = f.write(
      "owner.md",
      `| Fact | Path | Role |\n| --- | --- | --- |\n| Canonical game source | \`docs/nexus-game-source/source\` | Canonical |\n| Obsidian source navigation | \`${pointerRoot}\` | Pointer only |\n`,
    );
    assert.deepEqual(validateObsidianPointerSurface(f.root, owner), []);
  } finally {
    f.cleanup();
  }
});
