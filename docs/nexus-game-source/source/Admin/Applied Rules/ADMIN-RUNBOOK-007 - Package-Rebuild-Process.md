---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-007"
legacy_ids:
  - 'ADM-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\05 Admin Runbooks Source Management rev0.3\ADM-007 - Package_Rebuild_Process.md'
title: "Package_Rebuild_Process"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "admin_reference"
authority: "project_operations"
applicability:
  - 'project_operations'
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "domain_source_rebuild_process"
owns_topics:
  - 'domain_source_rebuild_process'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-15"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this rebuild process for the domain-first repo. It remains preserved as legacy package-first procedure while active rebuild work follows phased domain consolidation."
---

# Package Rebuild Process

## 1. Purpose

This procedure defines the standard Steward workflow for rebuilding, seeding, or refreshing one legacy source bundle at a time.

It is the focused package-level companion to `ADM-012 - Nexus_Source_Reorganization_Runbook.md`. ADM-012 owns the broader source reorganization campaign. ADM-007 owns the repeatable source rebuild checklist.

## 2. Scope

Use this procedure when rebuilding a planned legacy source bundle, including:

- consolidating package-specific source material;
- splitting old mixed documents into cleaner package docs;
- renaming documents into the current doc ID family;
- creating missing package docs from approved source material;
- updating frontmatter, metadata, README, manifest, placement guidance, and upload gates;
- preparing a source bundle for external-context upload after user approval.

Do not use this procedure as permission to perform whole-project integration. Package work stays inside the target package unless the user explicitly expands scope.

## 3. Source Intake Rule

The user may upload any potentially relevant material, including old packages, vault snapshots, dashboards, handoffs, registers, exports, planning notes, or working docs.

Uploaded material is source evidence, not automatic package membership.

For each uploaded file or folder, Steward should classify it as one or more of:

- package source candidate;
- same-topic overlap;
- duplicate;
- older reference;
- handoff input;
- dashboard/register input;
- out-of-package but routing-relevant;
- archive candidate;
- user-review needed.

Only clearly missing source categories that affect authority, preservation, or package correctness should be flagged before work begins.

## 3.1 Handoff Evidence Rule

Handoffs are evidence and preservation inputs, not automatically current source. They do not override active source docs merely because they exist.

However, relevant handoffs must not be ignored during package review. For each package, Steward should check available handoffs that plausibly touch the target domain and then integrate, route, ledger, archive-route, or explicitly leave the material open.

Do not use the absence of handoff promotion as permission to discard handoff content.

## 4. Package Startup

At the start of a source rebuild, Steward should confirm:

1. active mode and chat name;
2. target package name;
3. package ID family;
4. controlling loose source docs;
5. planned package docs from `SLOT-001` or current user instruction;
6. scope limit for the package;
7. whether Draft escalation is allowed or should be avoided by default;
8. known approval gates.

Steward should then begin with source intake and recommend the first package document to process.

## 5. One-Document-at-a-Time Workflow

Source rebuilds should proceed one package document at a time unless the user requests a batch pass.

Default sequence:

1. Confirm planned doc ID and filename.
2. Identify likely source inputs for that doc.
3. Decide whether the doc is a carry-forward, light consolidation, new split, new seed, or defer/park item.
4. Apply frontmatter and current package metadata.
5. Preserve substantive content unless rejected, superseded, archived, or migrated.
6. Flag true conflicts and unclear currentness.
7. Stage the doc as package-ready, parked, or user-review needed.
8. Ask for approval to continue to the next document.

README and manifest should usually be finalized after most individual docs are staged.

## 6. Consolidation Rules

When same-topic material appears in multiple sources:

- same meaning: merge or tighten;
- useful different angle: preserve both in one richer doc or split into companion docs;
- different maturity: prefer the current source and route old material to reference/archive notes;
- redundant wording: keep the clearest wording unless old wording has preservation value;
- true conflict: flag for user decision or Steward Review;
- wrong package: route to the correct package, holding place, or archive rather than discarding.

Do not silently drop substantive content because it is old, duplicated, awkwardly placed, or outside the target package.

## 7. Document Type Decisions

For each planned or discovered document, Steward should choose one of these treatments:

- **Carry forward with metadata cleanup** - document is already usable and only needs package fields, rev/status, and placement cleanup.
- **Light consolidation** - several compatible sources can be merged or tightened without deep prose drafting.
- **Split** - old mixed content should become multiple cleaner docs or be routed to another package.
- **Seed** - planned doc does not yet exist, but enough approved material exists to create a source-ready scaffold.
- **Park** - doc belongs in package plan but cannot be completed without a missing source or user decision.
- **Out-of-package routing** - useful material belongs elsewhere and should be preserved with routing notes.
- **Draft escalation** - content needs substantial rewrite, redlines, or deep synthesis.

## 8. Metadata Pass

Every staged package doc should have checked frontmatter before package assembly.

At minimum, verify:

- `doc_id`;
- `doc_status`;
- `working_state`;
- `source_role`;
- `canon_status`;
- `package`;
- `package_slot`;
- `package_id_family`;
- `rev`;
- `created`, `last_updated`, and `last_reviewed`;
- `metadata_verified` and `metadata_verified_date`;
- `obsidian_path`;
- `project_source_access`;
- `project_source_package`;
- `supersedes`, `superseded_by`, `supplements`, and `related_docs` where relevant;
- `delete_after_verification` guidance.

Do not bump `last_updated` for metadata verification only unless the content itself changed. Use `metadata_verified_date` and `metadata_notes` for verification-only passes.

## 9. README and Manifest Pass

Each rebuilt or seeded package should include:

- `[PACKAGE]-000 - README_[Package_Name].md`
- `[PACKAGE]-001 - PACKAGE_MANIFEST_[Package_Name].md`

The README should explain package purpose, owns/excludes boundaries, AI use, document index, source inputs, package status, replacement/supplement guidance, deletion/archive guidance, open questions, and changelog.

The manifest should list every package doc by doc ID, filename, status, source role, canon status, short purpose, and readiness state.

## 10. Package Assembly Gate

Before creating or recommending a source bundle, Steward should confirm:

1. staged docs match the current planned package or documented deviations;
2. every included doc has package-appropriate metadata;
3. out-of-package docs are not accidentally included;
4. old duplicate/reference docs have a route, archive note, or keep-for-review status;
5. README/manifest include replacement, supplement, and deletion guidance;
6. package status is marked rebuilt, seeded, partial, or parked;
7. upload should wait for user approval.

## 11. Upload and Verification Gate

A package is not current merely because it was created.

Before calling a package current, verify or record pending status for:

- package filename;
- package contents;
- source upload status;
- searchability / retrieval by package name, doc ID, and key filename;
- Obsidian placement or mirror path;
- old package replacement/supplement relationship;
- old file deletion/archive permissions;
- Source Status Register update, if available;
- Output Register update, if a downloadable file was produced;
- dashboard/status update, if relevant.

If the package is created but not uploaded, mark it as package-ready pending upload approval, not current.

## 12. Closeout / Passoff Requirements

If the source rebuild session ends before package completion, Steward should provide a passoff or closeout that records:

- processed docs;
- staged docs and status;
- parked docs;
- conflicts or missing decisions;
- source inputs used;
- out-of-package routing notes;
- package status;
- next recommended document;
- any generated files and their placement/replacement guidance.

## 13. Restrained Steward Source Update Path

Package work now has two distinct paths.

### 13.1 Full source rebuild

Use a full rebuild when the package needs deep restructuring, full doc-by-doc consolidation, major conflict handling, new source architecture, or wording-sensitive redlines. Full rebuilds may require Draft Mode when prose precision or redesign depth is high.

### 13.2 Restrained Steward source update

Use a restrained update when the existing package structure is still valid and the user has approved a review plan for specific additions, corrections, routing notes, or tracker/template updates.

Restrained updates:

- preserve package structure;
- update affected docs only;
- record source evidence and routing;
- do not require Draft Mode by default;
- keep old files protected until upload/searchability/metadata verification.

### 13.3 Draft escalation rule

Draft Mode is preferred for prose-heavy redlines, major system redesign, wording-sensitive documents, user-requested redline passes, and focused drafting from Seed or Steward. Draft is not required merely because a reviewed source package needs a restrained update.

## 13. Changelog

### rev0.1 - 2026-05-13

Initial ADM package version seeded during `Steward - Admin Runbooks Source Management Rebuild - 2026-05-13`.

Created as a focused source rebuild procedure to supplement ADM-012 and reduce duplication in the broader source reorganization runbook.


## Package Edition Note

This ADM-007 package edition preserves the current standalone `Package_Rebuild_Process.md` procedure and normalizes frontmatter for legacy Admin assembly.



