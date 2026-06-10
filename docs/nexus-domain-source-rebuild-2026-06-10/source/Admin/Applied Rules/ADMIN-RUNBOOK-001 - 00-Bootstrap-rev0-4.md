---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-001"
legacy_ids:
  - 'BOOT-001'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\00 Bootstrap rev0.4.md'
title: "Nexus Source Bootstrap"
doc_status: "active"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "project_bootstrap"
owns_topics:
  - 'project_bootstrap'
borrows_topics: []
created: "2026-05-15"
last_updated: "2026-05-26"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this bootstrap surface for the domain-first rebuild. It remains preserved as root operating context while live source migration stays protected."
---

# Nexus Source Bootstrap rev0.4

## Purpose

This is the read-first bootstrap for the live Nexus `00 Source` lane.

Its job is to establish the root operating layer, reinforce source-first behavior, and route readers into the correct slot packages without relying on old upload-era naming.

## Read-first order

Use this order when grounding new Nexus work:

1. `[[00 Bootstrap rev0.4]]`
2. `[[01 Global Mode Operations Rules rev1.2]]`
3. `[[02 Steward Mode Rules rev0.2]]` when Steward routing is relevant
4. `[[03 Routing Map rev0.6]]`
5. The relevant package README and package manifest for the active slot

For source-management procedure, start with:

- `[[ADM-000 - README_Admin_Runbooks_Source_Management]]`
- `[[ADM-001 - PACKAGE_MANIFEST_Admin_Runbooks_Source_Management]]`
- `[[ADM-012 - Nexus_Source_Reorganization_Runbook]]` only as packaged historical procedure, not as a root operating object

If a needed source is missing, say it is missing and proceed provisionally rather than inferring authority from names alone.

## Source-first rule

For substantive Nexus work, active source docs in `00 Source` are the working authority layer ahead of memory, assumptions, handoffs, archives, or legacy packaging artifacts.

Check the relevant root operating docs, then the slot map, then the package README and manifest, and then the specific package docs that match the task.

## Root operating layer

The intended stable root layer is:

- `[[00 Bootstrap rev0.4]]`
- `[[01 Global Mode Operations Rules rev1.2]]`
- `[[02 Steward Mode Rules rev0.2]]`
- `[[03 Routing Map rev0.6]]`
- `AGENTS.md`

Loose transitional package paperwork does not belong in the root lane long-term.

## Currentness and conflict handling

Do not treat a file as current only because it exists in the workspace.

When source materials conflict:

1. flag the conflict;
2. prefer the newest relevant operating guidance or source package;
3. preserve uncertainty instead of silently rewriting canon;
4. route cleanup work back through Steward or Draft as needed.

## Valid modes

Valid Nexus modes are:

- Steward / Stewy
- Draft
- Seed
- DM
- Art

When a mode is invoked, begin with exactly one of:

```text
Mode: Steward
Mode: Draft
Mode: Seed
Mode: DM
Mode: Art
```

## Revision notes

### rev0.4 - 2026-05-26

- Renamed the root operating files to the stable `NN Title revN.N` format.
- Removed dependency on the loose root reorganization runbook.
- Recast the bootstrap around package-first local source use.

### rev0.3 - 2026-05-21

- Added source-first operating guidance and routing emphasis.


