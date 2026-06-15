---
project: "Nexus"
doc_id: "AUTO-NOTES-005"
legacy_ids:
  - 'SRC-AUTO-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\14 TT VG Automation rev0.2\SRC-AUTO-005 - Companion_Tool_and_App_Feature_Backlog.md'
title: "Companion_Tool_and_App_Feature_Backlog"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "provisional-source"
placement_domain: "Automation"
content_role: "applied_rule"
topic_family: "companion_tool_app_feature_backlog"
owns_topics:
  - 'companion_tool_app_feature_backlog'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 reviewed the body for domain-first companion backlog framing and runtime-packet terminology."
---

# Companion Tool and App Feature Backlog

## 1. Purpose

This document preserves companion-tool, app, renderer, and automation concepts without making them active implementation requirements.

## 2. Current downstream scope constraint

The eventual first companion/app work should remain tabletop-supportive, not a premature full video game.

Useful constraints:

- text-forward;
- node-map based;
- data-driven;
- AI-assisted rather than AI-ruled;
- repairable during play;
- phone/foldable-readable where possible;
- fallback Markdown usable if visuals fail.

## 3. TacMap companion concepts

Current candidate companion features:

- TacMap renderer;
- reusable SVG asset placement;
- sprite-sheet/icon reference support;
- node/path table display;
- player-safe and DM-only layer toggles;
- actor/token movement updates;
- path/node status updates;
- objective/hazard changes;
- map-state repair or regeneration;
- exportable encounter-start packet;
- fallback Markdown node/path list.

## 4. Route and report concepts

Other useful companion concepts:

- route-node map viewer;
- route-node end report builder;
- campaign-state dashboard viewer;
- active clocks/counters display;
- loadout/inventory summary;
- character/crew state viewer;
- source packet or handoff viewer;
- validation checklist viewer.

## 5. Phone/chat constraint

TacMaps and dashboards should be usable in the actual play environment.

Current constraint notes:

- maps must display cleanly on phone or foldable screens when used in chat;
- node labels must not be too small;
- path connections must remain clear;
- visual density must not bury tactical truth;
- DM and player must still be able to continue from Markdown lists if the visual fails.

## 6. Build gate

Do not build the main companion app until tabletop play clarifies:

- core play loop;
- combat actions;
- TacMap procedures;
- encounter-start packet format;
- route-node report format;
- dashboard state needs;
- starter content;
- AI/DM boundaries.

Small utility prototypes remain acceptable if they support tabletop play and do not force premature architecture.


