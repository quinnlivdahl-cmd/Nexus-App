---
project: "Nexus"
doc_id: "ADMIN-INDEX-000"
legacy_ids:
  - 'ADM-000'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\05 Admin Runbooks Source Management rev0.3\ADM-000 - README_Admin_Runbooks_Source_Management.md'
title: "README_Admin_Runbooks_Source_Management"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "reference_input"
topic_family: "admin_domain_readme"
owns_topics:
  - 'admin_domain_readme'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-15"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this Admin domain readme. It remains the entry surface for rebuild-era governance docs while adjacent admin upheaval work is still expected later."
---

# Admin Domain Readme

## Purpose

The `Admin` domain owns Nexus operating governance: source-first behavior, placement and routing rules, metadata checks, rebuild procedures, replacement/supplement/deletion guidance, dashboard update procedure, bootstrap material, and migration/runbook control surfaces.

This file is the domain-facing replacement for the old Admin package readme. It describes the administrative layer in the domain-first rebuild and separates governance from game canon.

## Domain structure

Current domain folders:

- `Applied Rules` for procedures, runbooks, upload guidance, routing maps, and source-management workflows.
- `Reference Inputs` for readmes, manifests, bootstrap references, transfer notes, and legacy admin support.
- `Open Questions` for unresolved admin governance issues if they emerge later.

Current high-level surfaces:

- `ADMIN-RUNBOOK-*` docs for source-management procedures.
- `ADMIN-MAP-003` for the legacy slot map preserved as migration context.
- `ADMIN-INDEX-*` docs for domain readme, manifest, and reference entries.

## Ownership boundaries

Admin owns:

- source-first operating rules;
- file placement and content routing procedure;
- metadata/frontmatter verification procedure;
- source rebuild and review workflows;
- replacement, supplement, deletion, and archive guidance;
- dashboard update procedure as governance, not dashboard body content;
- bootstrap and migration control documents.

Admin does not own:

- durable game mechanics, lore, or content canon;
- live dashboard state;
- reusable mode behavior and templates;
- visual art direction;
- generated data tables as domain content.

Instead, Admin borrows from:

- `Modes` for reusable behavior and templates;
- `Dashboards` for live state surfaces;
- canon-home domains for durable source truth;
- the ChatGPT bridge for external-context refresh governance.

## Operating rules

- Live `00 Source` remains protected until a rebuilt domain or cluster is accepted.
- Candidate outputs should be reviewable and traceable.
- Deletion, promotion, migration, or cleanup requires explicit approval.
- Handoffs and archives are evidence, not automatic source truth.
- Admin procedure can route work but should not absorb the content it routes.

## Migration status

This domain has completed structural import into the rebuild repo. Most non-index Admin docs still preserve legacy package-era bodies and need a later body-level rewrite.

Established already:

- all live Admin source files are represented in the rebuild;
- root bootstrap and slot-map files are represented;
- legacy paths and IDs remain traceable.

Still to do:

- rewrite body text away from package and slot assumptions;
- retire or reframe upload-era guidance now that Codex/local source is primary;
- align Admin procedure with the new ChatGPT bridge model;
- normalize final Admin IDs after consolidation.


