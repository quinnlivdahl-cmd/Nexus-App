---
project: "Nexus"
doc_id: "ART-TRIAL-INDEX-000"
title: "Art Style Trials README"
doc_status: "working_draft"
working_state: "style_trial_lane"
mode_owner: "Art"
source_role: "reference_input"
canon_status: "operational-index"
placement_domain: "Art"
content_role: "trial_lane_readme"
topic_family: "art_style_trials"
created: "2026-06-12"
last_updated: "2026-06-12"
metadata_verified: false
metadata_notes: "Created to route non-canon style and palette trials inside the Art source mirror. Needs Codex/local verification and source-index regeneration."
---

# Art Style Trials README

## Purpose

This folder holds non-canon Art-domain trial packets for visual style, palette, prompt, TacMap, character, equipment, iconography, and production-direction experiments.

Style Trials are for testing. They do not become Nexus visual canon unless reviewed and promoted through the Art-domain routing process.

## Current contents

- `ART-TRIAL-020 - Nexus-Art-Style-Trial-Prompt-Series.md` — prompt grid series for testing unified Nexus visual styles and palettes across TacMaps, characters, equipment, UI-adjacent objects, and production sheets.
- `outputs/2026-06-12/README.md` — placeholder/output index for generated images from the 2026-06-12 style trial series.

## Routing rules

Use this folder when material is primarily:

- prompt testing;
- art style comparison;
- color palette comparison;
- non-canon visual exploration;
- generated-image output indexing;
- visual-production trial notes;
- review scoring before promotion.

Do not use this folder for:

- final visual canon;
- rules mechanics;
- live play state;
- binary asset storage without an index note;
- app renderer/export implementation;
- source-truth changes outside Art.

## Output handling

Generated images should be stored as separate files under dated `outputs/YYYY-MM-DD/` folders and indexed in that folder's README.

Do not embed large image binaries into Markdown source docs.

## Promotion path

A trial may later supplement or update one of these Art-domain homes after review:

- `ART-STYLE-001 - Nexus-Visual-Style-Bible.md`
- `ART-NASAPUNK-001 - NASApunk-Cyber-Noir-Design-Language.md`
- `ART-CHARACTER-001 - Character-Art-Direction.md`
- `ART-ENVIRONMENT-001 - Environment-and-Location-Art-Direction.md`
- `ART-EQUIPMENT-001 - Equipment-and-Interface-Art-Direction.md`
- `ART-UI-001 - UI-Diagram-and-Tabletop-Iconography-Direction.md`
- `ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md`
- `ART-REFERENCE-010 - Concept-Art-Library-Index.md`

## Required maintenance

After adding, removing, or renaming files in this folder:

1. Regenerate the source mirror index with `corepack pnpm run source:index`.
2. Check the committed index with `corepack pnpm run source:index:check`.
3. Validate workflow with `corepack pnpm run validate:workflow`.
4. Do not delete trial outputs unless explicit review says they are rejected, archived, or replaced.
