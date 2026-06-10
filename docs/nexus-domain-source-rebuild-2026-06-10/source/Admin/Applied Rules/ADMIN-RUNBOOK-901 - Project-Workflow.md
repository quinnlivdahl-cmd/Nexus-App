---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-901"
legacy_ids:
  - 'ADM-901'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\05 Admin Runbooks Source Management rev0.3\ADM-901 - Project_Workflow.md'
title: "Project_Workflow"
doc_status: "legacy_reference"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "applied_rule"
canon_status: "non_source_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "project_workflow"
owns_topics:
  - 'project_workflow'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-13"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this legacy workflow reference. It is preserved as historical governance evidence, not as the primary operating model for the domain-first rebuild."
---

# Project_Workflow - Legacy / Review Candidate

## Package Handling Note

This file is included because the Routing Map lists it as an optional/review candidate for Admin.

It is packaged as `doc_status: legacy_reference`. It is not higher authority than the current loose operating docs, Routing Map, or ADM-002 through ADM-012 procedures.

Original source body follows.

---

# Nexus Project Workflow
Revision: 11.0
Status: Active
Package: Admin
Last Updated: 2026-05-05 22:58 CDT

## Purpose

This document defines how Nexus project work moves between modes, documents, handoffs, and packages.

Active documents are source of truth. Modes define workflow behavior, not canon.

## Core Principle

Playable first, expandable second, automatable third.

Nexus should first become a polished tabletop/GPT-DM game that can be played, revised, and documented. Automation and Replit implementation are downstream unless explicitly requested.

## Source-of-Truth Rule

Document status determines authority:

- Final - binding unless reopened.
- Active - current source of truth.
- Draft Active - usable and provisional.
- Draft - exploratory or in-progress.
- Placeholder - structure only.
- Archived / Superseded - history, not current authority.
- Seeds - inspiration only.

## Obsidian Vault Rule

The local Obsidian vault is the canonical working source for Nexus project documents.

Active, Final, and Draft Active documents inside the vault carry source authority according to the document-status hierarchy above. ChatGPT project-file zips are scoped upload/export snapshots used for assistant context, transfer, recovery, and package exchange. They are not a replacement for the vault.

Dashboards, canvases, Bases, handoffs, package manifests, and source bundles support navigation, workflow, transfer, recovery, or views of the source system. They do not override source documents unless their content is deliberately integrated into an Active, Draft Active, or Final source document through the approved mode workflow.


## Exact Mode Acknowledgment Rule

When the user enters or invokes a Nexus mode, the assistant must begin the reply with the exact active mode name. Valid current mode acknowledgments are:

- `Mode: Steward`
- `Mode: Draft`
- `Mode: Seed`
- `Mode: DM`
- `Mode: Art`

Steward is a first-class mode. Seed is the current official name for Brainstorm-style work. Legacy `Brainstorm` wording maps to `Seed`, but the assistant must not display obsolete mode-choice templates such as `Mode: Draft/Brainstorm/DM/Art`.

## Mode System

### Draft Mode / Workbench

Draft Mode is the source-document revision mode.

Draft Mode:
- tracks approved and proposed changes in the Draft Ledger
- maps handoff material to target docs
- rewrites rough decisions into clean source-doc language
- flags conflicts and slow-review decisions
- prepares redlines or clean revised docs
- prepares one Draft-to-Steward handoff `.md` at close
- may produce a revised-docs zip when many docs are touched

Draft Mode answers:

> What should the source docs say now?

Workbench is the Draft Queue and live revision tracker used during Draft Mode.

### Seed Mode

Seed Mode supersedes Brainstorm Mode.

Seed Mode is for branching, exploratory, non-canon idea development. It tracks Seeds, Sprouts, Blooms, Dormant items, Pruned items, and Harvests.

Seed Mode may create future canon, but Seed Mode output is not final canon until processed by Draft/Workbench and packaged by Steward.

The visible Seed Tree shows only items with reason to remain visible: Seed, Sprout, Bloom, or Dormant.

The live Seed dashboard is a navigation aid, not a full preservation archive. It should not become a large Seedbank.

A Seedbank, if used at all, is a small temporary holding function for pending seeds or dormant items not yet placed on the tree. If it grows, Seed Mode should demand water, harvest, prune, or consolidation.

Dormant means an item remains visible because it still has future value but is not currently being watered. Dormancy may relate to project phase, mode readiness, source integration, or another design area being blocked.

Pause is a global command, not a tree-item status.

Harvest is both preservation and cleanup. Harvest should propose what to package, what to carry forward, what to prune, what should remain dormant, and what needs source integration.

Broad mode instructions belong in Admin/mode documents. Live dashboards should stay user-facing and lightweight.

All displayed seed/branch IDs must include titles.

Correct:
`Sa - Seed Mode System`

Incorrect:
`Sa`


**Seed Inbox.**

The Seed Inbox is a lightweight holding area for accidental ideas that appear during any mode but should not interrupt the current task or bloat the visible Seed Tree.

Seed Inbox items use `SI-###` IDs. They are not Seed Tree branches until promoted.

Seed Inbox items may be promoted to a visible Seed branch, attached to an existing branch, routed to Draft Queue, marked Dormant, harvested, or deliberately pruned/archived. Nothing should be silently discarded.

### Steward Mode

Steward Mode manages document and package hygiene.

Steward Mode:
- inventories current project resources
- reviews handoffs
- decides package placement
- performs global consistency checks on package-change intake
- updates package-local indexes/manifests
- recommends Stable or Archive actions where appropriate
- rebuilds affected source bundles
- tells the user which old project-source packages to delete/reupload

Steward Mode answers:

> Are the project docs packaged, named, indexed, and archived correctly?

### DM Mode

DM Mode runs Nexus as a tabletop GM/rules assistant.

DM Mode:
- tracks party, crew, ship, route, node, encounter, resources, and consequences
- runs scenes and TacMaps
- makes temporary rulings when needed
- logs rules gaps for Draft review

### Art Mode

Art Mode creates prompts, prompt packs, visual direction, and concept-art support.

Art output is exploratory unless later promoted through Draft.


## Work Anchor / ID Separation Rule

Nexus uses separate ID systems for different kinds of work:

- `P1-...` IDs are Phase 1 plan/task execution anchors.
- `S...` IDs are Seed Tree idea-lineage anchors.
- `SI-###` IDs are Seed Inbox temporary idea-capture anchors.
- `D...` IDs are Draft/Workbench revision-tracking anchors.

Dashboards and source docs may cross-link these IDs, but they should not merge the naming systems. A Phase 1 task can have many related seeds; one seed can support many Phase 1 tasks.


## Mode-to-Mode Routing Rule

Every unresolved item produced in a mode must be routed to an approved holding place rather than living only in chat. Approved holding places include:

- Seed Inbox - accidental ideas that should not derail current work.
- Seed Tree - developed exploratory ideas with visible lineage.
- Draft Queue / Workbench - source-doc revisions and Phase 1 execution work.
- DM Rulings Log / Rules Gap Register - temporary rulings, playtest gaps, and procedure issues.
- Art Prompt Queue / Asset Register - visual prompts, icon needs, and concept-art assets.
- Steward Handoff Register - package, placement, consistency, and source-integration work.
- Archive / changelog / supersession record - deliberately rejected, superseded, or historical material.

Default rule: capture first, do not derail. If an accidental seed appears during Phase 1 task execution, capture it as a one-line Seed Inbox item linked to the relevant `P1-...` task where useful, then continue the active task unless the user waters it.

## Mode-to-Mode Handoff Rule

A handoff preserves context between modes. It is usually one `.md` file.

A handoff should include:
- source mode
- destination mode
- summary
- approved items
- proposed items
- unresolved questions
- affected docs
- package impact
- items not promoted
- recommended next actions

Handoffs are approved inputs, not automatically final source docs.

## Draft-to-Steward Workflow

Normal flow:

Seed / DM / Art / other mode -> Draft / Workbench -> Steward -> revised source bundle

At Draft close, Workbench prepares a Draft-to-Steward handoff. Steward then handles placement, package consistency, package-local indexes/manifests, and final replacement source bundles.

Steward applies accepted source changes into the local Obsidian vault first. Replacement source bundles are then rebuilt from the vault as scoped exports.

## Local Downloads Workflow

Temporary transfer files may remain in the user's local Downloads folder during active work.

The user's local Obsidian vault is the working source. Downloads are temporary staging, review, and transfer space unless the user deliberately places a file into the vault.

Project sources should stay lean. The user normally uploads current scoped source bundles for ChatGPT context, not every temporary handoff file.

Old project-file zips should be deleted or replaced only after Steward gives explicit handling instructions.


## Local Storage / Project File Plan

The user's Obsidian vault is the primary local working library and the best place to keep the human-readable current source set. ChatGPT project files should usually hold the current scoped source zips and the current dashboards needed for assistant context, not every transient handoff or temporary revision.

Recommended storage roles:

- Obsidian vault - local working source, indexes, dashboards, and reviewed documents.
- ChatGPT project files - current Admin, Fluid, Stable, Archive source bundles plus current dashboards chosen for context.
- Downloads folder - temporary staging during active work only.
- Archive package - curated superseded/historical source records.

Do not delete old local or project package files until Steward provides replacement instructions and the user has placed or verified the new files.

## Package Model

Nexus uses scoped package exports generated from the Obsidian vault. Current high-level upload/export types are:

### Fluid
Current active and Draft Active game/project content.

### Stable
Low-churn reference material. Promotion to Stable requires user approval. The assistant may recommend promotion only with a clear case that the document is durable and unlikely to need near-term revision.

### Archive
Curated recovery/history package. Archive holds superseded durable docs, retired package versions, important historical handoffs, and wording worth preserving. Archive is not a junk drawer.

### Admin
Durable project-operation docs: mode instructions, command key, dashboards, launch cards, package workflow, and AI behavior docs.

## Package-Local Index Rule

Each package owns its own index/manifest.

Admin may contain package maps and Steward workflow rules, but Admin should not need to change merely because Fluid, Stable, or Archive changed internally.

## File Output Logic

A handoff is usually one `.md`.

A zip is used for:
- multiple revised files
- source rebuilds
- preserving file separation

## Produced File Handling Rule

Whenever the assistant produces any downloadable file, zip, dashboard, source document, package update, export, or handoff file, the response must include explicit handling instructions. These instructions must state:

1. what each produced file is;
2. where the user should place it in the Obsidian vault;
3. which ChatGPT project file slot/package it should replace or supplement;
4. which old files or zips may be deleted only after the new files are placed and verified;
5. whether Admin, Fluid, Stable, Archive, dashboards, handoffs, or assets are affected.

Steward Mode must never output project files without these placement/replacement instructions.
- user-requested bundled exports

Steward normally produces replacement project-source source bundles.

Draft may produce a revised-docs zip when many docs are touched, but Steward remains responsible for final placement and source rebuild.


## 2026-05-05 13:22 CDT Obsidian Authority and Dashboard Intake Update

Integrated the Draft-to-Steward handoff for Obsidian authority wording and Draft dashboard/workbench queue support. Clarified that source changes are applied to the local Obsidian vault first, then rebuilt into scoped export zips.

## 2026-05-05 11:14 CDT Obsidian Reorganization Update

Integrated Seed Mode operating updates from the Seed Mode doc-update handoff and adopted the vault-based source-management model for ongoing Steward work.

## 2026-05-05 15:41 CDT Phase 1 Plan Integration

The Phase 1 plan is now an Admin planning source. It defines `P1-...` task anchors for completing Nexus as a polished tabletop/GPT-DM playable game.

Planning IDs do not replace Seed, Draft, DM, Art, or Steward IDs. They are cross-link anchors used by dashboards, task queues, and mode handoffs.

Default routing during Phase 1:

- `P1-...` tasks live in the Phase 1 task register and may be mirrored in dashboards.
- accidental ideas go to Seed Inbox as `SI-###` entries and link to a `P1-...` task when useful.
- source language changes go to Draft/Workbench.
- session rulings and playtest gaps go to DM logs and Rules Gap Register.
- package placement, index, and consistency issues go to Steward.
- art/icon needs go to Art Mode and may cross-link `P1-ART...` tasks.

The plan was corrected during intake to match current source truth: TacMaps are node-web maps, combat currently uses Speed + 2 AP + limited reactions, skills are broad domains with tags/specialties, and ship/travel language should remain solar-system/route based rather than assuming interstellar travel.



## Integrated Update - Dq4 Mode-Operation Capture and Draft-to-Steward Workflow

Integrated: 2026-05-05 22:58 CDT  
Source: `Draft_to_Steward_Handoff_Dq4_Dq5_Dq6_Dq7_2026-05-05_2218_CDT.md`

### Mode-Operation Capture Rule

If the user gives an instruction that changes how a mode operates, how dashboards behave, how handoffs work, how branches/queues/tasks are managed, or how files should be handled, the instruction must be captured in a handoff, register, changelog, or relevant operating doc.

Do not rely on chat memory alone for mode-operation changes.

### Draft-to-Steward Handoff Workflow

Default workflow:

1. Draft intakes handoff or decision material.
2. Draft assigns or confirms Draft Queue codes.
3. Draft reviews queue items with the user through MCQs unless Auto Mode is requested.
4. Draft produces source-ready text or register-ready instructions.
5. Draft prepares a Steward handoff only after the draft substance is reviewed or clearly marked as draft.
6. Steward verifies package placement, register status, manifests, changelog, folder replacement instructions, and deletion/move guidance.

### Dashboard and Handoff Source-Truth Boundary

Dashboards and handoffs are control/routing surfaces unless explicitly source-integrated. Steward should verify before treating them as source truth.

### Dashboard Latest-Known Revision Rule

When Steward wants an updated dashboard, Steward should request the dashboard and state the revision/timestamp of the latest version of that specific dashboard it is aware of.

Steward should distinguish between verified latest dashboard files, latest known dashboard revisions, and memory-based reconstructions. Memory-based dashboard reconstruction is acceptable for discussion, planning, or emergency continuity, but should not be treated as verified source/control truth before replacement-package decisions.

### Whole-Folder Replacement Rule

Steward should prefer whole-folder zip replacements when multiple files in a folder/package change. Preserve exact folder names, filenames, relative paths, Obsidian-friendly Markdown, frontmatter where valid, and internal links unless an explicit migration/rename is documented. Do not touch `.obsidian/` unless explicitly instructed.

---

## 2026-05-08 18:35 CDT Stewy / Steward Project-Management Support

Stewy is the project-management support function of Steward Mode. The user may invoke it with either `Stewy, ...` or `Steward, ...`; `Stewy` is the preferred shorthand.

Stewy helps manage the Nexus project, but it does not replace source authority. Active, Final, and Draft Active project documents remain the source of truth according to the document-status hierarchy. Handoffs, audit reports, dashboards, live campaign state, chat memory, and source bundles are inputs or control surfaces unless their content is deliberately integrated into source through the approved mode workflow.

### Stewy Authority

Stewy may:

- report project status;
- recommend next work;
- check dependencies and blockers;
- route handoffs, ideas, rules gaps, dashboard drift, and package issues;
- identify source-doc update candidates;
- propose candidate tasks or register entries;
- preserve audit and handoff artifacts;
- flag source conflicts and unresolved decisions;
- enforce verification gates before cleanup;
- classify downstream/Replit/VG/schema material as deferred, source-hook, scope-control, or future planning.

Stewy may not:

- canonize lore, mechanics, factions, campaign events, or procedures by itself;
- treat dashboards or live campaign state as source truth;
- silently resolve source conflicts;
- merge ID systems;
- delete, archive, supersede, or prune material without a migration path and user verification;
- make Replit, videogame implementation, full JSON/schema automation, or dream-game features active Phase 1 work unless explicitly approved.

### Stewy PM Functions

Stewy supports these commands:

- `Stewy, status` / `Steward, status` - show source, dashboard, handoff, blocker, save/package, and next-work status.
- `Stewy, next` / `Steward, next` - recommend the next 3 practical work options with a default.
- `Stewy, dependency check` - check whether a P1 task, Dq item, handoff, or proposed work block can proceed.
- `Stewy, blocker check` - identify blockers, severity, blocked work, and routes.
- `Stewy, route this` - route a new item to the correct holding place.
- `Stewy, handoff status` - report lifecycle status of one or more handoffs.
- `Stewy, rules gap` - classify or draft a candidate Rules Gap entry.
- `Stewy, dashboard check` - check dashboard/register/source drift.
- `Stewy, save/package status` - show replacement, upload, placement, and verification status.
- `Stewy, scope check` - classify active Phase 1 work versus deferred/future/source-hook material.
- `Stewy, verify cleanup` - run strict cleanup verification before archive/delete/supersession.

### Source vs Dashboard Rule

Dashboards are runtime/status/control surfaces. They may summarize current focus, live campaign state, package state, or next work, but they do not override source documents. If a dashboard conflicts with a source document or register, Stewy flags the drift and routes it to the appropriate holding place. It does not silently resolve the conflict.

### Routing Requirement

Future-affecting output must be routed to an approved holding place:

- Phase 1 Task Register;
- Steward Handoff Register;
- Draft Queue / Workbench;
- Seed Inbox / Seed Tree;
- DM Rulings Log / Rules Gap Register;
- Art Prompt Queue / Asset Register;
- Source Status Register;
- Archive;
- Changelog / Revision Log.

Stewy must keep ID systems separate. P1 task IDs, Dq/Draft Queue IDs, Seed Tree IDs, Seed Inbox IDs, Rules Gap/DM ruling IDs, Art Queue IDs, handoff IDs, package IDs, and revision IDs may cross-link but must not be merged.

### Scope-Control Rule

The active priority remains: playable first, expandable second, automatable third. Stewy should classify Replit, videogame implementation, full JSON/schema automation, and dream-game content as deferred or source-hook material unless the user explicitly changes scope or an active Phase 1 source task requires it.

### Cleanup Verification Gate

No cleanup, deletion, archive move, or supersession is approved until all applicable checks are complete:

1. replacement package/file exists;
2. replacement has been installed in Obsidian or the intended project location;
3. processed copy or audit copy is preserved;
4. changelog/register/source-status entries are updated;
5. user verifies the replacement works;
6. old-file handling instructions are clear.


## JSON Translation Layer - Added 2026-05-11

Admin now maintains a Phase 1 JSON translation layer. See [[Nexus_JSON_Translation_and_State_Packets]].

Operational rule: Markdown/source docs remain source of truth. JSON packets are mirrors, exports, imports, or display aids. If a JSON packet and Markdown source conflict, preserve both and route the conflict to an approved register before changing source truth.

Steward may create or update JSON companions for package manifests, handoff records, campaign saves, TacMap state, route-node map state, dashboard imports, and auxiliary play-aid exports. Draft must own any source-rule change implied by those packets.


## Package Changelog

### rev0.1 - 2026-05-13

- Wrapped as an ADM optional/review candidate with current frontmatter and no deletion authority.


