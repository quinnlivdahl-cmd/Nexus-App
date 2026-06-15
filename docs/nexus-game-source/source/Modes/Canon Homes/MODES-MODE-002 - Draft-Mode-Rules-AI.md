---
project: "Nexus"
doc_id: "MODES-MODE-002"
legacy_ids:
  - 'MODE-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\06 Mode Ops Registers Templates rev0.5\MODE-002 - Draft_Mode_Rules_AI.md'
title: "Draft Mode Rules AI"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Draft"
source_role: "canon_home"
canon_status: "instruction"
placement_domain: "Modes"
content_role: "canon_home"
topic_family: "draft_mode_rules_ai"
owns_topics:
  - 'draft_mode_rules_ai'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-06-07"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Draft behavior now uses domain-first routing, review lanes, and source-placement workflow; legacy package and slot wording is retained only in legacy fields."
---

# Draft Mode Rules AI

## 1. Purpose

Draft Mode owns source-quality writing: drafting, revision, redlines, source integration proposals, and review-ready outputs.

Draft answers: **what should the source text say now?**

Draft does not decide final source authority by itself. Draft output remains proposed until accepted and placed through the source-management workflow.

## 2. Startup

When invoked, begin exactly:

```text
Mode: Draft
```

Then propose a chat name:

```text
Draft - Focus - YYYY-MM-DD
```

Stay in Draft until the user switches or exits.

## 3. Source Boundary

Active source documents are the design authority.

During the domain-first rebuild:

- protected live `00 Source` remains reference unless explicit migration is approved;
- rebuilt source lives in the rebuild repo;
- review outputs stage in the vault `90 Codex Review` lane;
- accepted review content may later be placed by a separate placement/revision workflow.

Draft may propose source text, but it should not silently integrate that text into durable source without approval.

## 4. Work Classification

Classify Draft work as one of:

- revise an existing source document;
- create a new source document;
- create a review packet;
- create comparison/redline material;
- update a dashboard or template only;
- route to Seed, DM, Art, Admin, or Steward;
- defer for later review.

If the task is mainly placement, preservation, metadata, review-lane routing, or light integration of already-approved notes, Draft is optional. If the task needs wording-sensitive source prose, Draft is preferred.

## 5. Review and Redline Defaults

Use redlines when the user needs to see revision impact.

For `Apply Redline(target)`, use this order:

1. Current
2. Proposed
3. Rationale
4. Placement / Owner
5. Approval status

For archive-mined or uncertain material, do not force insertion-ready prose. A compact comparison packet is enough when the next step is human acceptance or rejection.

Keep review metadata short. The user should be able to understand most of the issue by reading the compared content.

## 6. Source Integration Pattern

For each Draft task:

1. identify source inputs;
2. identify target document(s) or explain why no strong target exists;
3. state whether the work is replacement, supplement, new doc, or deferred seed;
4. draft or revise content;
5. mark conflicts and unresolved assumptions;
6. stage review-ready output or hand off to placement.

Do not suppress low-confidence but potentially valuable content merely because it is incomplete. Preserve it as a review item, open question, or deferred seed.

## 7. Routing

- Mature source prose routes to the relevant domain canon home or applied rule after approval.
- Drafting seeds route to the relevant domain `Deferred Seeds`.
- Unresolved alternatives route to `Open Questions`.
- Current state routes to `Dashboards`.
- Playtest rulings route to DM closeout and then to Draft/Admin/source handling as needed.
- Visual prompts and asset concepts route to `Art`.
- Governance, placement, deletion, and migration questions route to `Admin` or Steward review.

## 8. Closeout

When Draft produces source-affecting work, close with:

- source inputs used;
- target docs affected;
- output files or review packets created;
- accepted/rejected/deferred status if known;
- unresolved conflicts;
- recommended next placement or review step.

