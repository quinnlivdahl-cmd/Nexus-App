---
project: "Nexus"
doc_id: "COMBAT-INDEX-000"
legacy_ids:
  - 'SRC-COMBAT-000'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-000 - README_Source_Combat_TacMaps_Encounters.md'
title: "README_Source_Combat_TacMaps_Encounters"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "admin_reference"
placement_domain: "Combat"
content_role: "reference_input"
topic_family: "combat_domain_index"
owns_topics:
  - 'combat_domain_index'
borrows_topics:
  - 'combat_core'
  - 'action_economy'
  - 'tacmap_rules'
created: "2026-05-13"
last_updated: "2026-05-24"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Combat Domain Readme

## Purpose

The `Combat` domain owns the current Nexus source for tactical combat procedure, action economy, TacMap grammar, cover and hazard handling, encounter pacing, and enemy-behavior guidance as used during play.

This file is the Combat domain entry surface. It explains what combat owns in the rebuild, what it borrows from neighboring domains, and what still remains open.

## Domain structure

Current domain folders:

- `Canon Homes` for durable combat definitions and rules grammar.
- `Applied Rules` for encounter-use procedures and tactical behavior guidance.
- `Open Questions` for unresolved math, status, pacing, and routing issues.
- `Reference Inputs` for migration notes, manifests, and domain governance.

Current canon-home set:

- `COMBAT-CORE-001` - core combat procedure, durability application order, and combat-state expectations.
- `COMBAT-ACTION-001` - action economy, reactions, stances, movement anchors, and micro-interactions.
- `COMBAT-TACMAP-001` - node-web TacMap movement, node/path status, capacity, and positioning grammar.
- `COMBAT-ENV-001` - cover, visibility, hazards, line-of-fire, and environmental combat surfaces.

Current applied-rule set:

- `COMBAT-ENCOUNTER-001` - encounter presentation, approach phase, objectives, escape structures, and TacMap use at encounter start.
- `COMBAT-ENEMY-001` - enemy tactical roles and behavior scaffolding.

Current open-question and support set:

- `COMBAT-OPEN-001` - playtest gaps, unresolved formulas, routing issues, and preserved correction notes.
- `COMBAT-REF-001` - TacMap workbook and build-plate process reference input.

## Ownership boundaries

Combat owns:

- combat start procedure, activation flow, and tactical state tracking;
- the 2 AP + MP + reaction permission + micro-interaction combat baseline;
- combat result bands and tactical durability application order;
- TacMap node/path grammar, movement, cover, visibility, hazards, and positional pressure;
- encounter pacing, objective-first tactical structure, and escape/aftermath procedure cues;
- enemy tactical behavior guidance as a combat-use surface.

Combat borrows rather than owns:

- `Characters` for chassis identity, body continuity, recovery doctrine, and long-term actor structure;
- `Equipment` for weapon catalogs, Shield and Mitigation definitions, Firewall as equipment-side surface, cyberware catalogs, and inventory rules;
- `Skills` for checks, noncombat resolution structures, and advancement-linked action surfaces;
- `Dashboards` for live campaign state, active encounter state presentation, and execution-ready summaries;
- `Automation` for runtime schemas or structured generation pipelines when those become real systems;
- `Play Aids` and `Art` for printable/viewable TacMap aids, icon kits, and visual asset systems.

## Current stable direction

The current stable combat baseline remains:

- alternating activations with initiative math still deferred;
- 2 AP + MP + reaction permission + one free micro-interaction;
- one active personal defense posture at a time as the safe v0.1 constraint;
- node-web TacMaps with nodes and paths only, not free-placement areas;
- structured node/path/object data as canonical TacMap truth when a rendered map disagrees;
- durability application order of `Shield -> Mitigation -> Health/System Integrity`;
- Downed or Disabled at 0 durability with a 3-round countdown to critical state, not automatic permanent loss.

Additional preserved direction that must remain legible:

- "default" means upgradeable baseline, not hard cap;
- offensive Tech and system attacks follow attack-style action limits unless explicitly excepted;
- cover is relative, not a flat node property;
- node status and path status are separate tactical surfaces;
- objectives, escape, bypass, and tactical pressure matter as much as raw damage.

## Migration status

This domain is in the first deep-consolidation pass after pilot migration.

Established already:

- new `DOMAIN-TOPIC-###` IDs;
- clear canon-home versus applied-rule buckets;
- preserved legacy traceability in metadata;
- initial routing metadata for later script-assisted placement.

Still to do:

- remove remaining old routing language from surviving bodies;
- tighten boundaries with `Equipment`, `Dashboards`, `Automation`, and `Play Aids`;
- decide whether some combat open questions deserve split-out future docs;
- normalize inherited metadata once the content shape settles.

## Preservation note

This rebuild repo is the working replacement surface. The legacy `00 Source` tree remains protected until the rebuilt structure is reviewed and accepted.




