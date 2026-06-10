---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-008"
legacy_ids:
  - 'ADM-008'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\05 Admin Runbooks Source Management rev0.3\ADM-008 - Metadata_Verification_Procedure.md'
title: "Metadata_Verification_Procedure"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "metadata_verification_procedure"
owns_topics:
  - 'metadata_verification_procedure'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-15"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this metadata procedure for rebuild use. It remains valid as an Admin support surface while wording is normalized toward the domain-first model."
---

# Metadata Verification Procedure

## 1. Purpose

This procedure defines how Steward checks and normalizes metadata/frontmatter before package assembly, source placement, upload, or cleanup decisions.

## 2. Required Package Frontmatter Fields

Every staged package doc must be checked for:

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
- `metadata_notes`;
- `obsidian_path`;
- `project_source_access`;
- `project_source_package`;
- `supersedes`, `superseded_by`, `supplements`, and `related_docs` where relevant;
- `delete_after_verification` guidance.

## 3. Date Handling

- `created` records when the document or package edition was created.
- `last_updated` records the last substantive content change.
- Do not bump `last_updated` for metadata verification only.
- Use `metadata_verified_date` for verification-only passes.
- Use `metadata_notes` to explain whether changes were content changes, metadata normalization, package assembly, or searchability checks.

## 4. Verification Procedure

1. Confirm the doc ID matches the package ID family and filename.
2. Confirm status values match current package/source state.
3. Confirm package fields match the Routing Map package.
4. Confirm Obsidian path is plausible and not a stale migration path.
5. Confirm source-access fields describe direct, packaged, unavailable, or future access correctly.
6. Confirm supersession/supplement relationships are explicit.
7. Confirm deletion guidance does not authorize cleanup without verification and user approval.
8. Confirm README/manifest record any low-confidence handling.
9. Mark `metadata_verified: true` only after the field check is complete.

## 5. Legacy Metadata Evidence

The older metadata integrity guide emphasized accurate dates, frontmatter completeness, supersession, and not silently overwriting or deleting imported files. That legacy guidance remains compatible with the stricter current package gate.

### Legacy reference excerpt summary

# Metadata Integrity and Verification Rules

Maintaining accurate metadata across all Nexus project files is essential for trust, discoverability, and correct versioning.  Use this guide when creating or updating any Markdown file.

## Required Frontmatter Fields

- **`project`** - always `Nexus`.  
- **`title`** - descriptive title for the file.  
- **`doc_status`** - one of: `Active`, `Draft Active`, `Inactive`, `Archive`.  
- **`canon_status`** - describe how authoritative the content is (`Working`, `Provisional`, `Canon`, `Non-canon`).  
- **`package`** - the name of the package or export that first introduced this file (e.g. `Fluid`, `2026-05-11 rebuild`).  
- **`mode_owner`** - which mode primarily owns this document (`Steward`, `Draft`, `Seed`, `DM`, `Art`, or `Shared`).  
- **`source_role`** - classify the purpose (`Source`, `Dashboard`, `Admin`, `Handoff`, `Reference`).  
- **`created`** - date of creation (YYYY-MM-DD).  
- **`last_updated`** - date of last content change.  Update this whenever substantive modifications are made.  
- **`snapshot_date`** - for dashboards/exports: the date representing the project state captured.  Not required for evergreen source docs.  
- **`supersedes` / `superseded_by`** - lists of files this file replaces or is replaced by.  Use relative links.  

## Verification Process

1. **Check existing fields.**  Ensure all required fields are present.  Fill in missing entries.  
2. **Verify dates.**  `last_updated` should reflect the most recent content change, not just a metadata edit.  `snapshot_date` should match the captured state.  
3. **Update revision history.**  Increment the `rev` number if the document has been substantially revised.  
4. **Cross-reference.**  Update `supersedes` and `superseded_by` fields when replacing older documents.  Provide a short changelog section summarising differences.  
5. **Signpost draft content.**  If the file includes provisional or playtest material, mark it clearly in the body with callouts (e.g. `> [!warning] Provisional`).

## Handling Legacy Files

When importing older documents:

- **Do not silently overwrite or delete** the original.  Move old files into `99_Archive` or leave them in the `Old` folder.  
- **Preserve original timestamps** in the frontmatter but add new `superseded_by` pointing to the new file.  
- **Document your actions** in an admin log or the package manifest.  Transparency helps future stewards understand what changed and why.

## 6. Mass Intake Metadata Handling

Do not blindly bump `last_updated` unless body content changed. Distinguish content update date from metadata verification date.

For mass-intake restrained updates:

- changed source docs should receive a content update date;
- metadata-only files may receive metadata verification notes without claiming content changed;
- README/manifest should identify which files were body-updated, metadata-updated, preserved, or legacy/reference only;
- generated package status should remain pending until upload/searchability/metadata verification is complete.

## 6. Changelog

### rev0.1 - 2026-05-13

- Created from the current frontmatter gate, Global rules, Routing Map, and older metadata integrity source.



