---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-009"
legacy_ids:
  - 'ADM-009'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\05 Admin Runbooks Source Management rev0.3\ADM-009 - Replacement_Supplement_Deletion_Guidance.md'
title: "Replacement_Supplement_Deletion_Guidance"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "applied_rule"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "replacement_supplement_deletion_guidance"
owns_topics:
  - 'replacement_supplement_deletion_guidance'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this preservation guidance for rebuild use. It remains an active Admin safety surface while wording is normalized toward the domain-first model."
---

# Replacement, Supplement, and Deletion Guidance

## 1. Purpose

This guidance prevents accidental loss during source-bundle rebuilds, file renames, source moves, and external-context cleanup.

## 2. Default Rule

Preserve by default.

Do not delete, discard, trim, overwrite, forget, archive, or supersede substantive Nexus material unless there is an explicit user instruction, approved replacement, recorded supersession, documented archive path, or clear migration route.

## 3. Replacement

A new file replaces an old file only when:

- the new file explicitly lists the old file in `supersedes` or manifest replacement notes;
- the useful old content has been preserved, integrated, routed, or intentionally rejected by the user;
- metadata and package placement have been checked;
- the user has accepted the replacement path.

Replacement does not automatically mean deletion.

## 4. Supplement

A file supplements another file when both remain useful and neither fully replaces the other.

Use `supplements` for companion runbooks, procedure docs, manifests, templates, dashboards, references, or split content that supports active source without overriding it.

## 5. Archive

Archiving is a preservation action, not deletion.

Archive old files when they are no longer active source but still useful for history, rationale, recovery, or audit.

## 6. Deletion

Deletion requires explicit user approval after verification.

Before recommending deletion, check:

- content coverage in replacement docs;
- README/manifest notes;
- supersedes/superseded_by metadata;
- package upload/searchability where sources are affected;
- Output Register and handoff/register coverage for generated outputs;
- whether backups still need to be extracted for useful content.

## 7. Stale Duplicate Handling

Stale duplicates should be recorded as duplicate evidence or legacy reference. Do not treat a duplicate as disposable until the controlling copy is identified and the useful differences are checked.

## 8. Mass Intake Replacement and Cleanup Rule

Mass-intake replacement packages do not authorize deletion by themselves.

Older packages, handoffs, dashboards, generated images, SVG kits, prototypes, backup files, and loose bridge files remain protected until:

1. the new package is uploaded;
2. searchability and metadata/status are verified;
3. unique-content migration is checked;
4. the user explicitly approves cleanup.

When unsure, route older or duplicate material to archive/reference/holding rather than deleting it.

## 8. Changelog

### rev0.1 - 2026-05-13

- Created from global preserve-by-default rules, current chat instructions, and legacy Admin conflict handling.


