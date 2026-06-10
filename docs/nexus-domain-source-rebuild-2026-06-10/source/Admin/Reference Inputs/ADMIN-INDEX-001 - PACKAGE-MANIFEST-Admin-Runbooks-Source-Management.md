---
project: "Nexus"
doc_id: "ADMIN-INDEX-001"
legacy_ids:
  - 'ADM-001'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\05 Admin Runbooks Source Management rev0.3\ADM-001 - PACKAGE_MANIFEST_Admin_Runbooks_Source_Management.md'
title: "PACKAGE_MANIFEST_Admin_Runbooks_Source_Management"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_manifest"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "reference_input"
topic_family: "admin_domain_manifest"
owns_topics:
  - 'admin_domain_manifest'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-15"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this Admin domain manifest. It remains the entry surface for rebuild-era governance docs while later admin upheaval work may still revise policy details."
---

# Admin Domain Manifest

## Domain identity

- Domain: `Admin`
- Rebuild status: `full corpus imported; first governance rewrite started`
- Legacy family: `ADM`, `BOOT`, and root operating files
- Current function: source governance, project operations, placement, routing, and migration control

## Domain contents

| Doc ID family | Role | Current purpose |
|---|---|---|
| ADMIN-INDEX-* | reference_input | Domain readme, manifest, transfer notes, and legacy admin references |
| ADMIN-RUNBOOK-* | applied_rule | Operating procedures, upload guidance, metadata verification, routing, cleanup, and source-management workflows |
| ADMIN-MAP-003 | applied_rule | Legacy slot map preserved as migration context |

## Boundary map

- `ADMIN-RUNBOOK-004` owns placement and content routing procedure until rewritten under the new domain-first model.
- `ADMIN-RUNBOOK-008` owns metadata verification procedure.
- `ADMIN-RUNBOOK-011` owns dashboard update procedure, while `Dashboards` owns dashboard bodies.
- `ADMIN-RUNBOOK-012` owns legacy source-reorganization procedure as a historical input to this rebuild.
- `ADMIN-MAP-003` preserves the old slot map for traceability, not as the future live structure.

## Cross-domain boundaries

Admin does not own:

- mode behavior and templates; those belong in `Modes`;
- current live state; that belongs in `Dashboards`;
- canon mechanics, lore, content, art, or data definitions; those belong in their domain homes.

## Consolidation findings

- Admin is the domain most affected by the switch from upload/package management to Codex/local source management.
- Several Admin runbooks remain useful but need to be reframed around the rebuild repo and vault boundary instead of legacy source-bundle churn.
- Root operating files should survive as Admin/Modes governance, not as loose root clutter in the final source structure.

## Current conflict ledger

### C1 - Package-era workflow vs Codex-led source management

Handling: keep old workflow as traceable procedure while rewriting current governance around local source and review lanes.

### C2 - Obsidian relevance vs repo-led management

Handling: preserve Obsidian-facing placement and mobile usability concerns while treating Codex/local source as primary document-management surface.

### C3 - Routing map history vs domain-first future

Handling: retain the slot map as legacy migration context only. New placement uses domain and role metadata.

## Next normalization targets

- Rewrite `ADMIN-RUNBOOK-004` for domain-first placement.
- Rewrite `ADMIN-RUNBOOK-012` for the active rebuild process.
- Rewrite upload/searchability guidance into ChatGPT bridge refresh guidance where appropriate.


