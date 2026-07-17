---
project: "Nexus"
doc_id: "MODES-TEMPLATE-001"
legacy_ids:
  - 'TPL-001'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\TPL-001 - Nexus_Obsidian_Property_Schema.md'
title: "Nexus_Obsidian_Property_Schema"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "template"
canon_status: "instruction"
authority: "non_authoritative"
applicability:
  - 'content_authoring_workflow'
  - 'historical_provenance'
placement_domain: "Modes"
content_role: "reference_input"
topic_family: "nexus_obsidian_property_schema"
owns_topics:
  - 'nexus_obsidian_property_schema'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-26"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Property-schema guidance now teaches domain-first metadata as the active model; legacy package and slot fields are preserved only as migration-era compatibility examples."
---

# Nexus Obsidian Property Schema

## 1. Purpose

This schema defines the default frontmatter contract for live Nexus source docs in Obsidian.

## 2. Core source-doc fields

Use this lighter contract for ordinary source, rules, lore, procedure, and reference docs.

```yaml
project: "Nexus"
title: "Document Title"
doc_id: "SRC-XXX-000"
doc_status: "draft"
rev: "0.1"
created: 2026-05-13
last_updated: 2026-05-13
placement_domain: "Core"
content_role: "canon_home"
topic_family: "document_topic"
owns_topics:
  - "document_topic"
borrows_topics: []
legacy_ids: []
legacy_paths: []
supersedes: []
superseded_by: []
related_docs: []
```

## 3. Richer fields for stewardship surfaces

Use richer metadata only when it materially helps navigation, inventory, or stewardship.

Typical richer-doc fields may include:

- `source_role`
- `canon_status`
- `placement_domain`
- `content_role`
- `topic_family`
- `owns_topics`
- `borrows_topics`
- `legacy_ids`
- `legacy_paths`

Use them for:

- domain readme and manifest docs;
- registers and dashboards;
- specialized stewardship runbooks and templates.

## 4. Status vocabulary

Use a short controlled set for `doc_status`:

- `draft`
- `active`
- `reference`
- `superseded`

If more nuance is needed, place it in a short body note or changelog instead of expanding the primary status vocabulary.

## 5. Date rule

Do not bump `last_updated` for metadata-only cleanup unless content itself changed.

## 6. Relationship guidance

Keep relationship fields lightweight and useful:

- `supersedes` for direct replacement lineage;
- `superseded_by` for explicit handoff to the newer doc;
- `related_docs` for navigation and neighboring authority surfaces.

