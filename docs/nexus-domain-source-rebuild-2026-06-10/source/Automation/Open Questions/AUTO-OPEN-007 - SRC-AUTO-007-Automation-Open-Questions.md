---
project: "Nexus"
doc_id: "AUTO-OPEN-007"
legacy_ids:
  - 'SRC-AUTO-007'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\14 TT VG Automation rev0.2\SRC-AUTO-007 - Automation_Open_Questions.md'
title: "Automation_Open_Questions"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "open_questions"
canon_status: "provisional-source"
placement_domain: "Automation"
content_role: "open_questions"
topic_family: "automation_open_questions"
owns_topics:
  - 'automation_open_questions'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first routing questions, schema-promotion boundaries, and open-question bucket alignment."
---

# Automation Open Questions

## 1. TacMap packet questions

1. What is the minimum TacMap packet schema?
2. Which fields are required for first-use tabletop play, and which can wait?
3. Should a TacMap packet be Markdown-table-first, JSON-first, or hybrid?
4. What state changes must be delta-updatable during play?
5. Should node-edge markers be data objects, visual-only assets, or both?
6. How should marker orientation be recorded for cover, visibility, and line-of-fire modifiers?
7. How should hidden/DM-only layers be represented and later revealed?

## 2. Asset and renderer questions

1. What is the relationship between SVG sprite sheets and generated image maps?
2. Should the renderer place reusable SVG assets over a backdrop, or generate a composite image each time?
3. Where should actual sprite sheets and SVG symbols live in Obsidian?
4. What asset metadata is needed before an AI/DM can reference icons reliably?
5. What map display format works best inside chat and on phone/foldable screens?

## 3. Companion workflow questions

1. What renderer/workflow is realistic inside chat versus outside chat?
2. Should the first companion be a TacMap viewer, route-node map viewer, dashboard viewer, or packet validator?
3. What is the minimum useful local-file/copy-paste import format?
4. How much should a companion validate versus merely display?
5. What fallback must exist if the companion fails mid-session?

## 4. Source organization questions

1. Should future TacMap organization consolidate automation, rules, display, and visual guidance around one primary domain cluster?
2. If TacMap source reorganizes, which domain should own the core TacMap source?
3. Which DM rules and templates must remain in `Modes` even if TacMap source consolidates elsewhere?
4. What belongs in `Automation` after any future TacMap reorganization?

## 5. JSON and export questions

1. Which JSON packets are needed during tabletop play, and which can wait for `Data` or later app work?
2. Which schemas should be promoted into actual structured files in `Data`?
3. How should JSON deltas be reviewed when they conflict with Markdown source or dashboard text?
4. What information should be shown to players versus retained for DM-only state?

## 6. Current handling notes

- Keep JSON in the plan.
- Do not treat JSON as finished.
- Do not let app planning outrank tabletop source.
- Route actual data files, workbooks, and schemas to `Data` if promoted.
- Route display and play aids to `Play Aids`.
- Route visual style, assets, and prompts to `Art`.
- Route live dashboards and active state to `Dashboards`.
- Do not reorganize TacMap source during this pass.


