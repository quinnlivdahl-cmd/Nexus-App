---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-012"
legacy_ids:
  - 'ADM-012'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\05 Admin Runbooks Source Management rev0.3\ADM-012 - Nexus_Source_Reorganization_Runbook.md'
title: "Domain Source Rebuild Runbook"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "nexus_source_reorganization_runbook"
owns_topics:
  - 'nexus_source_reorganization_runbook'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-07"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this source reorganization runbook. The rebuild repo now follows phased domain consolidation and protected-source migration rather than legacy bundle-first workflow."
---

# Domain Source Rebuild Runbook

## 1. Purpose and Scope

This runbook defines how Nexus source is rebuilt from the legacy slot/package structure into a domain-first source system.

The rebuild is not a simple rename pass. Splits, merges, rewrites, removals, new documents, and ID reassignment are allowed when they improve placeability, parseability, ownership, and future Codex-led maintenance.

This runbook governs the rebuild workspace. It does not authorize direct edits to protected live `00 Source`.

## 2. Operating Model

The active model is phased repo rebuild:

1. Preserve current vault `00 Source` as protected legacy reference.
2. Rebuild source in `01 REPOS/Nexus Domain Source Rebuild/source`.
3. Keep legacy IDs and paths in metadata for traceability.
4. Consolidate one domain or domain cluster at a time.
5. Validate metadata, ownership, links, and Obsidian readability.
6. Stage review outputs in the vault `90 Codex Review` lane when human approval is needed.
7. Migrate accepted rebuilt content into permanent source only after review.

The first full import may carry bodies forward one-to-one. That is scaffolding, not completion.

## 3. Rebuild Pass Types

Use these pass types:

- `Scaffold migration`: creates domain folders, new IDs, metadata, and traceable copies.
- `Index rewrite`: rewrites domain README/manifest surfaces so they teach the new model.
- `Governance rewrite`: updates Admin and Mode docs that still assume package or slot operation.
- `Domain consolidation`: merges, splits, rewrites, and retires docs inside a domain.
- `Cross-domain ownership pass`: resolves overlap between domains and confirms a single canon home.
- `Bridge refresh pass`: updates ChatGPT project bridge packets and refresh ledgers.
- `Migration acceptance pass`: prepares accepted rebuilt content for permanent source replacement.

## 4. Domain Consolidation Workflow

For each domain or domain cluster:

1. Read the legacy source docs and the current rebuilt domain docs.
2. Identify canon homes, applied rules, current state, open questions, deferred seeds, reference inputs, data, art, and automation surfaces.
3. Group same-topic material across legacy docs, archive findings, dashboards, and registers.
4. Decide whether each topic should be kept, merged, split, deferred, archived, or rejected.
5. Rewrite domain index surfaces first so the domain has a clear map.
6. Consolidate body docs one at a time.
7. Preserve useful but incomplete drafting seeds explicitly.
8. Record unresolved conflicts in open questions rather than hiding them in prose.
9. Run metadata and duplicate-ID checks.
10. Produce review packets only when a user decision is needed.

Do not wait for perfect taxonomy before starting. The rebuild should discover better subdomains during consolidation.

## 5. Same-Topic Handling

Same-topic material from multiple sources is usually not a conflict. Treat it as signal.

Default handling:

- same topic, same meaning: merge and tighten;
- same topic, different useful angle: preserve both angles in one richer canon home or companion applied rule;
- same topic, different maturity: keep the current rule and preserve older drafting seed or reference value when useful;
- same topic, redundant wording: keep the clearest wording and preserve old wording only if evidence-worthy;
- same topic, true conflict: route to open questions or ask the user;
- different topic accidentally colocated: split to the correct domain and role bucket.

## 6. Draft, Steward, and Codex Roles

Codex/local source management is now the primary live document-management workflow during the rebuild.

Steward remains useful for governance, prioritization, and review decisions, but the slot/package upload model is no longer the controlling source-management method.

Draft Mode should be used when content needs prose integration, redline-style revision, or source-quality rewriting. Draft output is review-ready until accepted.

Seed Mode should preserve exploratory material and future drafting queues without prematurely canonizing them.

DM Mode should keep play execution moving, capture rulings and state, and route durable decisions back to source rather than burying them in dashboards.

## 7. Dashboard Handling

Dashboards remain useful because the user still works in Obsidian and mobile contexts.

Dashboards should carry:

- current state;
- active next actions;
- live mode status;
- short current instruction deltas when the ChatGPT project context is stale.

Dashboards should not become durable rule homes. If a dashboard repeatedly carries a rule, route that rule to the appropriate canon home or applied rule.

## 8. ChatGPT Project Bridge

The bridge folder records what the ChatGPT project is expected to know.

Use it to decide whether a future ChatGPT task needs:

- dashboard-only context;
- deferred seed or open-question context;
- selected canon-home summary refresh;
- direct per-chat source upload;
- or a broader project context refresh.

The bridge replaces routine slot zip churn. It does not replace source.

## 9. Validation Checklist

After each meaningful pass, verify:

- every rebuilt doc has one `doc_id`;
- every migrated doc retains legacy mapping when applicable;
- no duplicate doc IDs exist;
- every reusable concept has one canon home;
- dashboards remain thin and outward-routing;
- deferred seeds and open questions are explicit;
- review-needed content is staged in the review lane, not silently integrated;
- live `00 Source` was not modified unless migration was explicitly approved.

## 10. Closeout

Each pass should end with a short closeout:

- files read;
- files created;
- files modified;
- checks run;
- unresolved conflicts or assumptions;
- recommended next review step.

If the pass changes workflow assumptions, update Admin and Modes docs before deeper domain consolidation continues.

