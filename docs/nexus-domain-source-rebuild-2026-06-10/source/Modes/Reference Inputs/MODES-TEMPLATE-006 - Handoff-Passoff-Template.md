---
project: "Nexus"
doc_id: "MODES-TEMPLATE-006"
legacy_ids:
  - 'TPL-006'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\06 Mode Ops Registers Templates rev0.5\TPL-006 - Handoff_Passoff_Template.md'
title: "Handoff_Passoff_Template"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "template"
canon_status: "instruction"
placement_domain: "Modes"
content_role: "reference_input"
topic_family: "handoff_passoff_template"
owns_topics:
  - 'handoff_passoff_template'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Handoff/passoff guidance now uses domain-first routing and review-lane language; legacy package and slot wording is retained only where needed for migration history or evidence."
---

# Handoff / Passoff Template

Use this template for cross-mode handoffs, session passoffs, and source-intake prompts.

Handoffs are not active source by default. They become source evidence when attached to the active task, named in a dashboard/index, or formally promoted.

```md
---
project: "Nexus"
title: "Handoff Title"
doc_id: "HANDOFF-YYYYMMDD-001"
doc_status: "handoff"
working_state: "pending_intake"
mode_owner: "Steward"
source_role: "template"
canon_status: "handoff_evidence"
placement_domain: "Admin"
content_role: "reference_input"
topic_family: "handoff_passoff"
owns_topics:
  - "handoff_passoff"
borrows_topics: []
rev: "0.1"
created: 2026-05-13
last_updated: 2026-05-13
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_verified_date: 2026-05-13
metadata_notes: "Phase 10 consolidation complete for this rebuild pass. Metadata now uses domain-first routing vocabulary, with historical lineage preserved in legacy fields and reference-input bodies retained where they serve evidence or template continuity."
obsidian_path: "05_Handoffs_and_Passoffs/Pending/Handoff_Title.md"
project_source_access: "not_project_source"
source_chat: "Mode - Focus - YYYY-MM-DD"
source_inputs: []
supersedes: []
superseded_by: []
supplements: []
related_docs: []
delete_after_verification:
  - "Do not delete until integrated, archived, rejected, or explicitly approved for cleanup."
tags:
  - "nexus"
  - "handoff"
---

# Handoff Title

## 1. Source Chat / Context

## 2. What Changed or Was Learned

## 3. Target Docs / Domains

## 4. Decisions Made

## 5. Conflicts / Low-Confidence Items

## 6. Output Files Produced

## 7. Output Register Entries Needed

## 8. Replacement / Supplement / Deletion Guidance

## 9. Next Mode / Next Action
```

## Register Rule

Do not maintain a separate durable Handoff Register in `Modes`. Track handoff-generated files through `REG-001 - Nexus_Output_Register.md` and route handoff state through dashboards, workbench surfaces, review lanes, and domain source as appropriate.


## Source Handling Note

This document is a rebuild consolidation target. It is not a verbatim copy of one older backup file. It preserves and reorganizes usable mode/register/template instructions from the live source layer, later Nexus patterns, and backup evidence. Older wording that conflicts with the current domain-first operating model is treated as legacy evidence, not source truth.


## Mass-Intake / Harvest Routing Additions - 2026-05-15

Handoffs and passoffs should separate routing categories clearly.

Add these sections when relevant:

```md
## Source-Ready Items
- Item:
- Target domain/doc:
- Status: approved / proposed / unresolved / needs Draft

## Dashboard / Tracker Items
- Task:
- Target dashboard or tracker:
- Done when:

## Seed Harvest Items
- Branch/stem/leaf IDs:
- Approved decisions:
- P# proposals still unapproved:
- Dashboard update needed:
- Draft routing needed:

## Art / TacMap Items
- Visual prototype:
- Asset kit / SVG / sprite sheet:
- Play-aid routing:
- Canon structured-map status:

## Memory-to-Source Candidates
- Memory item:
- Why relevant:
- Target domain/doc:
- Needs user review? yes/no

## Do Not Promote Yet
- Item:
- Reason:
- Holding location:
```

Handoffs remain evidence by default. They become active source only after Steward review, Draft/source integration, or explicit promotion.



