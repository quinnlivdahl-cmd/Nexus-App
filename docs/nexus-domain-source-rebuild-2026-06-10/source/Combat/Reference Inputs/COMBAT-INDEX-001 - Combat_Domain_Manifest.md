---
project: "Nexus"
doc_id: "COMBAT-INDEX-001"
legacy_ids:
  - 'SRC-COMBAT-001'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-001 - PACKAGE_MANIFEST_Source_Combat_TacMaps_Encounters.md'
title: "PACKAGE_MANIFEST_Source_Combat_TacMaps_Encounters"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "domain_manifest"
canon_status: "admin_reference"
placement_domain: "Combat"
content_role: "reference_input"
topic_family: "combat_domain_manifest"
owns_topics:
  - 'combat_domain_manifest'
borrows_topics:
  - 'combat_core'
  - 'encounter_pacing'
created: "2026-05-13"
last_updated: "2026-05-24"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Combat Domain Manifest

## Domain identity

- Domain: `Combat`
- Rebuild status: `pilot cluster deep-consolidation pass`
- Legacy family: `SRC-COMBAT`
- Current function: domain inventory, boundary map, conflict ledger, and migration notes

## Domain contents

| Doc ID | Role | Current purpose |
|---|---|---|
| COMBAT-INDEX-000 | reference_input | Domain readme and ownership summary |
| COMBAT-INDEX-001 | reference_input | Domain manifest and conflict ledger |
| COMBAT-CORE-001 | canon_home | Core combat procedure, durability order, and state tracking |
| COMBAT-ACTION-001 | canon_home | Action economy, reactions, stances, and movement anchors |
| COMBAT-TACMAP-001 | canon_home | Node-web TacMap movement and positioning grammar |
| COMBAT-ENV-001 | canon_home | Cover, hazards, exposure, line-of-fire, and environment rules |
| COMBAT-ENCOUNTER-001 | applied_rule | Encounter presentation, approach phase, objectives, and escape structures |
| COMBAT-ENEMY-001 | applied_rule | Enemy tactical roles and behavior scaffolding |
| COMBAT-OPEN-001 | open_question | Combat playtest gaps, unresolved rules, and routing corrections |
| COMBAT-REF-001 | reference_input | TacMap workbook and build-plate process reference input |

## Canon-home boundary map

- `COMBAT-CORE-001` owns combat-state expectations, result bands, and tactical durability application order.
- `COMBAT-ACTION-001` owns AP, MP, reaction, stance, Ready, Sprint, and micro-interaction baseline grammar.
- `COMBAT-TACMAP-001` owns node/path movement, capacity, Crowded pressure, in-transit state, and positional grammar.
- `COMBAT-ENV-001` owns cover, visibility, line-of-fire, hazard, and environment-side tactical surfaces.
- `COMBAT-ENCOUNTER-001` applies combat canon to real encounter flow, objective pressure, TacMap start surfaces, and escape structures.
- `COMBAT-ENEMY-001` applies combat canon to enemy behavior and tactical role usage without pretending to be the full content library.

## Cross-domain boundaries

Combat does not own:

- identity, chassis continuity, long-term recovery doctrine, or actor personhood; those belong in `Characters`;
- weapon catalogs, Shield definition details, Mitigation catalogs, cyberware catalogs, credentials, or inventory systems; those belong in `Equipment`;
- checks, clocks as a general subsystem, noncombat resolution, or advancement math; those belong in `Skills` and `Core`;
- live campaign state, current encounter panels, or DM presentation formatting; those belong in `Dashboards` and `Modes`;
- runtime schemas, automation payloads, or map-generation implementation; those belong in `Automation`;
- printable route aids, icon kits, or visual TacMap asset systems; those belong in `Play Aids` and `Art`.

## Consolidation findings

- The combat pilot migrated cleanly as a structure, but some bodies still taught ownership through old routing references.
- The strongest combat split is between canon combat grammar and applied encounter procedure; that division should remain explicit.
- Several docs already contain the right concepts, but readability is weakened by inherited mojibake and legacy routing references.
- Combat open questions are valuable as routing surfaces and should not be collapsed too early into canon docs.

## Current conflict ledger

### C1 - Combat durability order vs equipment ownership

Handling: `Combat` owns tactical application order. `Equipment` owns the underlying gear-side definitions and catalogs.

### C2 - TacMap rules vs display and visual assets

Handling: `Combat` owns the rule grammar and canonical structured data expectations. `Play Aids`, `Art`, and later `Automation` own presentation systems and implementation.

### C3 - Encounter procedure vs live dashboard state

Handling: `Combat` owns encounter flow and the requirement that tactical state be legible. `Dashboards` owns live state surfaces and current run presentation.

### C4 - Enemy combat behavior vs full content libraries

Handling: `Combat` owns tactical role guidance. Broader enemy catalogs and mission/content libraries should move under `Content`.

### C5 - Open corrections inherited from earlier consolidation passes

Handling: preserve them in `COMBAT-OPEN-001` until the related domains are rewritten rather than hiding them in changelog prose.

## Future data and bridge notes

Likely future structured outputs or bridge support artifacts:

- standard tactical state panel summary;
- TacMap node/path/object schema summary;
- cover and hazard quick-reference tables;
- stance/reaction quick-reference tables;
- enemy tactical role cheat sheet;
- encounter template families and validation checklists.

These should be created after the domain boundaries are stable, not before.




