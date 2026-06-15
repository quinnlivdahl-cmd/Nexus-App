---
project: "Nexus"
doc_id: "MODES-INDEX-001"
legacy_ids:
  - 'MODE-001'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\MODE-001 - PACKAGE_MANIFEST_Mode_Operations_Registers_Templates.md'
title: "PACKAGE_MANIFEST_Mode_Operations_Registers_Templates"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_manifest"
canon_status: "admin_reference"
placement_domain: "Modes"
content_role: "reference_input"
topic_family: "modes_domain_manifest"
owns_topics:
  - 'modes_domain_manifest'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Body routing now uses domain-first language; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Modes Domain Manifest

## Domain identity

- Domain: `Modes`
- Rebuild status: `full corpus imported; first governance rewrite started`
- Legacy families: `MODE`, `MODE-FUNC`, `REG`, and `TPL`
- Current function: reusable mode behavior, command surfaces, registers, and templates

## Domain contents

| Doc ID family | Role | Current purpose |
|---|---|---|
| MODES-INDEX-* | reference_input | Domain readme and manifest |
| MODES-MODE-* | canon_home | Mode rules, menu, launch cards, command key, and function bindings |
| MODES-TEMPLATE-* | reference_input | Reusable templates and property/schema guidance |
| MODES-REGISTER-* | reference_input | Output/source-status registers |
| MODES-OPEN-* | open_question | Open-question register and unresolved mode/template issues |

## Boundary map

- `MODES-MODE-002` through `MODES-MODE-005` own Draft, Seed, DM, and Art reusable behavior.
- `MODES-MODE-006` through `MODES-MODE-008` own mode menu, launch cards, and command key surfaces.
- `MODES-MODE-001` owns shared dashboard-function labels.
- `MODES-TEMPLATE-005` owns the reusable dashboard template, while `Dashboards` owns dashboard instances.
- `MODES-TEMPLATE-006` owns handoff/passoff template shape, while archives and review lanes own specific handoff bodies.

## Cross-domain boundaries

Modes does not own:

- source governance and placement procedure; that belongs in `Admin`;
- live dashboard state; that belongs in `Dashboards`;
- canon mechanics or lore; those belong in relevant source domains;
- final data tables; those belong in `Data`.

## Consolidation findings

- Modes is the natural home for reusable behavior and templates, while transition-evidence docs may still preserve older ChatGPT package history.
- The ChatGPT role change means active mode docs should describe targeted context refresh rather than broad source uploads.
- Some registers may become less central once the dashboard/task surfaces and bridge ledger mature.

## Current conflict ledger

### C1 - Reusable mode rules vs live dashboard deltas

Handling: `Modes` owns stable behavior. `Dashboards` may carry temporary current instruction deltas.

### C2 - Template authority vs domain source ownership

Handling: templates define document shapes. Domain docs own the actual content.

### C3 - ChatGPT project role change

Handling: future mode rewrites should explain ChatGPT as drafting, planning, brainstorming, and playtest space with targeted context, not primary source manager.

## Next normalization targets

- Review the Phase 10 Modes consolidation manifest before any permanent-source migration.
- Re-evaluate which register and template surfaces should remain active canon-home support versus historical reference input.
- Re-evaluate registers once `DASH-TASK-001` and the ChatGPT bridge are normalized.

