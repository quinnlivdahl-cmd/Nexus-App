---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-006"
legacy_ids:
  - 'ADM-006'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\05 Admin Runbooks Source Management rev0.3\ADM-006 - Project_Source_Upload_and_Verification_Checklist.md'
title: "Project_Source_Upload_and_Verification_Checklist"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "applied_rule"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "project_source_upload_and_verification_checklist"
owns_topics:
  - 'project_source_upload_and_verification_checklist'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this upload checklist as a preserved legacy workflow surface. It remains useful for external-context upload gates but is no longer the core source-management model inside the rebuild repo."
---

# Source Upload and Verification Checklist

## 1. Purpose

This checklist defines the gate before a Nexus source bundle is uploaded to external chat context and the verification steps after upload.

## 2. Pre-Assembly Gate

Before package assembly:

- confirm package slot, package name, package ID family, and planned document list;
- review conflicts before producing the zip;
- stage only package-relevant docs;
- create missing placeholder docs when approved;
- check every staged doc for required frontmatter;
- ensure README and manifest explain use, replacement/supplement guidance, cleanup rules, and searchability expectations;
- confirm no archive or handoff bodies are included unless explicitly approved.

## 3. Required Frontmatter Gate

Every staged package doc must include and be checked for at least:

- `doc_id`;
- `doc_status`;
- `working_state`;
- `source_role`;
- `canon_status`;
- `package`;
- `package_slot`;
- `package_id_family`;
- `rev`;
- `created`, `last_updated`, `last_reviewed`;
- `metadata_verified`, `metadata_verified_date`, and `metadata_notes`;
- `obsidian_path`;
- `project_source_access`;
- `project_source_package`;
- `supersedes`, `superseded_by`, `supplements`, and `related_docs` where relevant;
- `delete_after_verification` guidance.

Do not bump `last_updated` for metadata verification only. Use `metadata_verified_date` and `metadata_notes` for verification-only passes.

## 4. Upload Gate

A package is ready for upload only when:

1. conflicts have been reviewed or safely recorded;
2. all planned docs are present or intentionally omitted in the manifest;
3. frontmatter check passes;
4. README and manifest are present;
5. old replacement/supplement/delete guidance is present;
6. Output Register handling is prepared;
7. the user approves upload or explicitly accepts seeded-package status.

## 5. Post-Upload Verification

After upload to sources:

- confirm the source bundle appears in the external context list;
- verify searchability by asking targeted retrieval questions;
- verify key docs can be retrieved by filename and doc ID;
- verify package manifest and README are retrievable;
- verify loose-doc cleanup conditions before removing temporary loose bridge files;
- update status to `uploaded` or `verified_searchable` only after the check is complete.

## 6. Mass Intake Upload and Verification States

For mass-intake outputs, track these states where relevant:

- produced;
- user download pending;
- user upload pending;
- source upload pending;
- searchability pending;
- metadata verification pending;
- old package cleanup not approved.

Replacement package production does not make the package current. A package should not be called current until upload, searchability, and metadata/status verification have been checked.

### 6.1 Filename and link rule

- Download link text should match the exact filename.
- Export filenames should be distinguishable when truncated.
- Preferred filename pattern: `TYPECODE - Topic - Mode - MMDD HHMM.ext`.
- Use Minnesota time when the user specifies CST/MN time or when the pass is otherwise anchored to Minnesota time.

## 6. Changelog

### rev0.1 - 2026-05-13

- Created from Routing Map package status terms, user frontmatter gate, and source rebuild procedure.


