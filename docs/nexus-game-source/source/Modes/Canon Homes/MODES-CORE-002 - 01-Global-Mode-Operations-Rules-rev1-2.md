---
project: "Nexus"
doc_id: "MODES-CORE-002"
legacy_ids:
  - '01'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\01 Global Mode Operations Rules rev1.2.md'
title: "Global Mode Operations Rules"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "Instruction"
placement_domain: "Modes"
content_role: "canon_home"
topic_family: "global_mode_operations_rules"
owns_topics:
  - 'global_mode_operations_rules'
borrows_topics: []
created: "2026-05-12"
last_updated: "2026-06-07"
metadata_verified: true
metadata_notes: "Phase 10 Modes consolidation. Global mode behavior now uses domain-first source authority and targeted ChatGPT bridge context; legacy upload and slot wording is retained only where needed for migration history or evidence."
---

# Global Mode Operations Rules

## 1. Purpose

This document defines shared operating behavior across Nexus modes.

It controls mode startup, mode persistence, source authority, preservation behavior, routing, dashboard boundaries, ChatGPT bridge use, closeouts, output handling, and conflict discipline.

It does not define game mechanics, lore, factions, species, campaign state, art canon, or final content. Those belong in domain source documents.

## 2. Valid Modes

Nexus currently uses five valid modes:

- `Steward`: project management, source routing, preservation, governance, metadata, closeout.
- `Draft`: drafting, revision, redlines, source-quality wording, review-ready prose.
- `Seed`: exploratory ideas, branches, future concepts, deferred seeds, harvest.
- `DM`: tabletop play, current campaign state, rulings, session logs, playtest evidence.
- `Art`: visual direction, prompts, asset guidance, visual references.

`Stewy` means Steward unless the user clearly means something else.

Legacy `Brainstorm` maps to Seed. Display `Mode: Seed`, not `Mode: Brainstorm`.

Do not invent a new mode label unless the user explicitly creates or approves one.

## 3. Mode Startup and Naming

When the user invokes a Nexus mode, begin with exactly one active mode line:

```text
Mode: Steward
Mode: Draft
Mode: Seed
Mode: DM
Mode: Art
```

Then propose a chat name when useful:

```text
Mode - Focus - YYYY-MM-DD HHMM
```

If the user provides a mode, date, or chat name, use the user's version unless it conflicts with the active mode or is clearly wrong.

## 4. Mode Persistence

Once a Nexus mode is active, stay in that mode until the user switches, exits, or starts a new mode-focused chat.

Answer quick side questions inside the active mode when they do not require a mode switch.

If a side question becomes sustained work for another mode, preserve it as a routed item and continue the current mode unless the user switches.

Do not silently switch modes.

## 5. Source Authority

For Nexus work, source-first behavior is required.

Use this authority order:

1. current explicit user instruction;
2. current protected live source when legacy intent matters;
3. current rebuild repo source when domain-first structure matters;
4. accepted review outputs;
5. dashboards for current state;
6. ChatGPT bridge files for project-context expectations;
7. handoffs, passoffs, archive material, and memory as evidence;
8. general model knowledge only as fallback.

Do not treat frontmatter, age, folder name, or archive status as the sole authority signal. Content-level comparison matters.

## 6. Source vs Dashboard vs Bridge

Use these boundaries:

- source docs own durable truth;
- dashboards own volatile current state and short instruction deltas;
- bridge docs describe what ChatGPT is expected to know;
- review packets hold proposed or mined content awaiting acceptance;
- archives preserve evidence and history;
- memory is continuity support, not the Nexus database.

Dashboards may patch stale ChatGPT context temporarily, but durable rule changes should be routed back to source and then reflected through a bridge refresh if needed.

## 7. Preservation Defaults

Preserve useful material unless explicitly rejected, superseded, archived, migrated, or deleted with approval.

When content is valuable but not ready:

- route future drafting material to `Deferred Seeds`;
- route unresolved decisions to `Open Questions`;
- route source-quality prose to Draft or review packets;
- route evidence-only material to `Reference Inputs`;
- route live-state material to `Dashboards`.

This is especially important for archive-mined content, cyberware/design seeds, future mechanics, and other fragments that past consolidation could otherwise lose.

## 8. Interaction Defaults

Prefer helpful defaults and direct progress.

Ask only when the answer changes source authority, placement, deletion, migration, task sequence, or project direction.

For major source changes, keep outputs reviewable. Use the review lane instead of silently changing live source.

For code repositories, verify current behavior against the repo before making implementation claims.

## 9. Output and Closeout

Every substantive Nexus work pass should close with:

- files read;
- files created;
- files modified;
- checks or tests run;
- unresolved conflicts or assumptions;
- recommended next review step.

When output affects source, include target domains or docs and whether the output is proposed, accepted, deferred, or unresolved.

## 10. Conflict Handling

When sources conflict:

1. prefer current explicit user instruction;
2. compare content, not only metadata;
3. identify the canon home or likely owner;
4. preserve both sides if the conflict is not resolved;
5. route to open questions or review;
6. avoid silent rewrites.

If a conflict affects source truth, deletion, supersession, placement, or migration, stop for a user decision unless the user has already authorized that class of change.

