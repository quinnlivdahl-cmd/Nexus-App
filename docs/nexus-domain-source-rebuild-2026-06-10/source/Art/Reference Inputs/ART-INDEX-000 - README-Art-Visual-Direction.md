---
project: "Nexus"
doc_id: "ART-INDEX-000"
legacy_ids:
  - 'ART-000'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\19 Art Visual Direction rev0.3\ART-000 - README_Art_Visual_Direction.md'
title: "Art Domain Readme"
doc_status: "active"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "operational-index"
placement_domain: "Art"
content_role: "reference_input"
topic_family: "art_domain_readme"
owns_topics:
  - 'art_domain_readme'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-12"
metadata_verified: false
metadata_notes: "Updated by ChatGPT to add Style Trials lane. Needs Codex/local metadata verification, source index regeneration, and workflow validation. Previous Phase 10 note: Art domain readme aligned to domain-first model."
---

# Art Domain Readme

## Purpose

The `Art` domain owns visual direction, prompt guidance, asset routing, concept-art indexing, iconography direction, TacMap visual workflow notes, and asset canon-status rules.

Art answers: **what should Nexus look like, how should visual assets be prompted or routed, and what visual material is canon, reference, session-only, or deferred?**

## Authority Boundary

Art owns visual language and asset routing.

Art does not own:

- game rules;
- campaign state;
- live dashboard state;
- final source mechanics;
- actual binary asset storage;
- automation runtime behavior;
- content canon unless a visual concept is promoted by the owning domain.

Images, SVGs, PNGs, JPEGs, generated exports, and design files should generally live in asset folders or tool-specific storage and be indexed/routed here rather than converted into doctrine by inclusion.

## Current Structure

Current Art surfaces include:

- `ART-INDEX-000`: domain readme.
- `ART-INDEX-001`: domain manifest.
- `ART-STYLE-001`: Nexus visual style bible.
- `ART-NASAPUNK-001`: NASApunk / cyber-noir design language.
- `ART-CHARACTER-001`: character art direction.
- `ART-ENVIRONMENT-001`: environment and location art direction.
- `ART-EQUIPMENT-001`: equipment and interface art direction.
- `ART-UI-001`: UI, diagram, and tabletop iconography direction.
- `ART-RUNBOOK-008`: asset canon status and routing.
- `ART-PROMPT-001`: prompt library and variant rules.
- `ART-REFERENCE-010`: concept art library index.
- `ART-OPEN-011`: art open questions.
- `ART-RUNBOOK-012`: TacMap backdrop and build-plate art workflow.
- `ART-TRIAL-INDEX-000`: Art Style Trials README.
- `ART-TRIAL-020`: Nexus art style trial prompt series.

## Style Trials Lane

The `Style Trials` folder holds non-canon Art-domain trial packets for prompt testing, visual style comparison, palette comparison, generated-image output indexing, and pre-promotion review scoring.

Current lane paths:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/README.md`
- `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/ART-TRIAL-020 - Nexus-Art-Style-Trial-Prompt-Series.md`
- `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/README.md`

Style Trials supplement Art canon homes but do not replace or promote them automatically. Trial packets and outputs remain non-canon unless reviewed and promoted through the relevant Art home or asset-routing process.

## Routing Rules

Route material to Art when it concerns:

- visual style;
- prompt wording;
- concept-art references;
- asset canon status;
- image-generation workflows;
- iconography;
- TacMap visual readability;
- asset indexing and promotion path;
- non-canon style, palette, or prompt trials.

Route away from Art when the material is primarily:

- mechanics or procedures: source owner domain;
- live play state: `Dashboards`;
- source evidence: `Reference`;
- renderer/export behavior: `Automation`;
- structured asset metadata tables: `Data`;
- player-facing aids: `Play Aids`.

## Obsidian and Asset Handling

Obsidian remains relevant for browsing, mobile review, and asset/context lookup.

Art source docs should be readable in Obsidian, but large binary files should not be duplicated into source docs. Index them, link them, or route them through asset folders.

Generated images for style trials should be stored as separate files under dated `Style Trials/outputs/YYYY-MM-DD/` folders and indexed in that folder's README.

## Next Consolidation Needs

- Keep individual Art docs aligned to domain-first boundaries if later governance passes revise terminology.
- Confirm final asset folder and index conventions.
- Keep TacMap visual workflow aligned with `Combat`, `Play Aids`, `Automation`, and `Dashboards`.
- Preserve session/reference images until explicitly promoted, rejected, or archived.
- Regenerate the repo-side source index after Style Trials lane additions.
