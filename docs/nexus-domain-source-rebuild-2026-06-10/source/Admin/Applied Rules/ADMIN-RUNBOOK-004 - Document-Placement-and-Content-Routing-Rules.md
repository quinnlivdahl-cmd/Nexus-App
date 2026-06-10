---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-004"
legacy_ids:
  - 'ADM-004'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\05 Admin Runbooks Source Management rev0.3\ADM-004 - Document_Placement_and_Content_Routing_Rules.md'
title: "Domain Placement and Content Routing Rules"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "applied_rule"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "document_placement_and_content_routing_rules"
owns_topics:
  - 'document_placement_and_content_routing_rules'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-07"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this placement guidance. Body language now supports domain-first routing, role buckets, and protected live-source migration in the rebuild repo."
---

# Domain Placement and Content Routing Rules

## 1. Purpose

This runbook defines how Nexus material is routed in the domain-first source rebuild.

The goal is placeability: a human or script should be able to identify the likely home for a piece of content from metadata, topic ownership, and content role before doing deeper semantic comparison.

This document replaces slot/package placement behavior for the rebuild repo. Legacy slot IDs remain traceability metadata only.

## 2. Source Boundaries

Use these operating boundaries during the rebuild:

- `00 Source` in the vault remains the protected legacy source until the rebuild is accepted.
- `01 REPOS/Nexus Domain Source Rebuild/source` is the active rebuild workspace.
- `90 Codex Review` in the vault is the preferred review output lane for validation packets, mined archive packets, and approval staging.
- `chatgpt-project-bridge` is not live source. It records what the ChatGPT project is expected to know and what context refreshes may be needed.

Do not route durable canon into dashboards, review folders, bridge packets, or archives merely because they are convenient in the moment.

## 3. Primary Routing Rule

Route material by durable function, not by filename, legacy package, frontmatter, or where it happened to be found.

Use this order:

1. Identify whether the material is canon, applied procedure, current state, open question, deferred seed, reference input, or data/art/automation support.
2. Identify the domain that owns the reusable concept.
3. If the content is only a use-case, summary, dashboard note, or mode instruction, route it to the consumer doc and cross-reference the canon home.
4. If no strong canon home exists, preserve it in the closest domain `Open Questions` or `Deferred Seeds` document rather than forcing a weak match.

## 4. Domain Routes

Use these default domain routes:

- `Admin`: source governance, placement rules, metadata, reorganization runbooks, review gates, deletion/supersession rules, migration manifests.
- `Modes`: mode behavior, mode boundaries, mode templates, mode registers, operating instructions for AI collaborators.
- `Core`: foundational game loop, global mechanics, universal design principles, common procedures that multiple domains consume.
- `Combat`: combat procedures, action economy, tactical map rules, encounters, combat environment rules.
- `Characters`: player character structure, chassis/body rules, growth, identity-facing character systems.
- `Skills`: skill systems, checks, talents, progression, skill-facing play procedures.
- `Equipment`: weapons, defenses, cyberware, gear tags, credits, equipment-side constraints.
- `Lore`: setting canon, factions, timeline, personhood, world logic, in-universe concepts.
- `Content`: missions, enemy libraries, rewards, encounters as content payloads, campaign-ready modules.
- `Automation`: scripts, rendering pipelines, schemas, generated outputs, machine workflows.
- `Play Aids`: player-facing and DM-facing aids, cheat sheets, tables, printable or display support that does not own canon.
- `Dashboards`: volatile current state, active next actions, live mode status, current instruction deltas.
- `Reference`: research reports, evidence packets, external inspiration, analysis that informs canon but does not itself own canon.
- `Data`: structured workbooks, CSVs, tables, extracted datasets, sourceable numeric references.
- `Art`: visual style, prompt libraries, concept art direction, asset canon routing, image-generation support.

## 5. Role Bucket Routes

Within a domain, route by role:

- `Canon Homes`: durable source of truth for reusable concepts.
- `Applied Rules`: procedures that consume canon in play, drafting, automation, or review.
- `Current State`: volatile but active state, especially dashboards and campaign status.
- `Open Questions`: unresolved decisions, conflicts, missing owners, and pending design calls.
- `Deferred Seeds`: valuable but intentionally incomplete material that should not be lost.
- `Reference Inputs`: manifests, reports, legacy summaries, evidence, and source history.

Deferred seeds are especially important. If a piece of content is not ready for canon but could drive future drafting, preserve it explicitly instead of allowing it to disappear during consolidation.

## 6. Single Canon Home Rule

Every reusable concept should have one canon home.

Other documents may summarize, apply, quote, consume, or display that concept, but they should not silently co-own it.

When two docs appear to own the same concept:

- keep the most durable concept definition in the canon home;
- move procedures to applied rules;
- move volatile examples to dashboards or play aids;
- move unresolved alternatives to open questions;
- move future drafting material to deferred seeds;
- preserve legacy links in metadata or short provenance notes.

## 7. Handoff and Archive Evidence Rule

Handoffs, passoffs, old dashboards, archive mirrors, and provenance docs are evidence. They are not automatically current source and do not override current source merely because they exist.

They also must not be ignored.

When evidence contains valuable material, do one of the following:

1. route source-ready content to the correct canon home or applied rule;
2. route incomplete but valuable drafting material to deferred seeds;
3. route unresolved conflicts to open questions;
4. route context-only material to reference inputs;
5. route live-state residue to dashboards only if it is still current;
6. preserve the decision in a manifest, review packet, or evidence note.

Frontmatter, archive status, age, and folder location may inform confidence, but they must not be the sole reason content is suppressed.

## 8. Review Lane Rule

Review outputs belong in `90 Codex Review`, preferably inside a named run folder.

Use review packets when the content needs human approval before integration. Use manifests to summarize routing, not as the primary review artifact.

Accepted review content can later be integrated by a separate placement/revision workflow. Rejected or held material should move to the appropriate reviewed archive or held lane rather than remaining ambiguous.

## 9. Deletion and Supersession Rule

No document or content block may be deleted merely because a new domain home exists.

Removal requires verification that the material was:

- migrated;
- intentionally superseded;
- archived as evidence;
- rejected;
- or preserved as deferred/open/reference material.

Existing live source remains untouched until the accepted rebuild is migrated deliberately.

