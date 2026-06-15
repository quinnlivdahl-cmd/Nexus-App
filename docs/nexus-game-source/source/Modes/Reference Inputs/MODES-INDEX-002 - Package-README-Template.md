---
project: "Nexus"
doc_id: "MODES-INDEX-002"
legacy_ids:
  - 'TPL-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\TPL-002 - Package_README_Template.md'
title: "Domain Readme Template"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "reference_input"
canon_status: "instruction"
placement_domain: "Modes"
content_role: "reference_input"
topic_family: "domain_readme_template"
owns_topics:
  - 'domain_readme_template'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-07"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Domain Readme Template

Use this template for domain readmes such as `CORE-INDEX-000`, `CHAR-INDEX-000`, or future domain entry surfaces.

```md
---
project: "Nexus"
doc_id: "DOMAIN-INDEX-000"
legacy_ids: []
legacy_paths: []
title: "Domain Name Domain Readme"
doc_status: "draft"
working_state: "domain_rebuild"
mode_owner: "Shared"
source_role: "reference_input"
canon_status: "admin_reference"
placement_domain: "Domain Name"
content_role: "reference_input"
topic_family: "domain_name_domain_readme"
owns_topics:
  - "domain_name_domain_readme"
borrows_topics: []
created: "YYYY-MM-DD"
last_updated: "YYYY-MM-DD"
metadata_verified: true
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary; legacy package, slot, and template lineage is preserved only as traceability or reference evidence."
---

# Domain Name Domain Readme

## Purpose

State what this domain owns and the question it answers.

## Authority Boundary

State what this domain owns and what it must not silently absorb.

## Current Structure

List current docs by rebuilt doc ID and role.

## Cross-Domain Routing

Name the adjacent domains that commonly borrow from or route into this domain.

## Current Maturity

State whether this domain is active, provisional, seeded, deferred, or review-needed.

## Preservation Rule

State what older material is not deletion-approved by this readme.
```

## Use Notes

- Prefer domain readmes over package readmes in the rebuilt source system.
- Keep the readme short enough to orient humans and scripts quickly.
- Do not duplicate every body-doc detail; point to the manifest and domain docs.
- Include preservation and routing boundaries even when they feel obvious.

