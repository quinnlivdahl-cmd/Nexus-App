# Handoff — Game System Schema Cleanup + Continuation

Date: 2026-06-10  
Origin chat: `Draft — Game System Schema Continuation — 2026-06-10`  
Mode: Draft  
State: ready-for-Codex  

## Intended placement

`docs/chatgpt-project-bridge/handoffs/2026-06-10-game-system-schema-cleanup-continuation.md`

## What this supplements

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/TACMAP_CANDIDATE_RESOLVER_WORKING_DRAFT.md` as a cleanup target only
- GitHub issue sequence #33, #34, #35, #36, #38, #41

## What this replaces

Nothing.

## Deletion / supersession guidance

Do not delete or supersede source files from this handoff. The mistaken resolver draft should be deleted only after its accepted material is merged into the main construction schema draft and coverage is confirmed.

## Source/currentness status

This handoff is based on ChatGPT Project discussion plus repo-side source mirror retrieval. It does not verify live local `00 Source` currentness. Exact live currentness still requires Codex/local inspection.

## Handoff prompt for next chat / Codex

```text
Mode: Draft

Draft — Game System Schema Cleanup + Continuation — 2026-06-10

We need to cleanly continue the game-system construction schema work.

Use the current bridge baseline as operating context. Then use GitHub exact-path retrieval in `quinnlivdahl-cmd/Nexus-App`.

Primary file to update:

`docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`

Mistaken temporary file to inspect and then remove after merge:

`docs/game-system-contracts/drafts/TACMAP_CANDIDATE_RESOLVER_WORKING_DRAFT.md`

Context:

In the prior chat, accepted TacMap / Structured Action Transaction decisions were accidentally written into a separate working draft instead of the main construction schema draft. That was wrong. The material belongs in the main construction schema file with the other outputs from the chat.

Do not create a new location.

Tasks:

1. Fetch the main construction schema draft.
2. Fetch the mistaken TacMap Candidate Resolver working draft.
3. Merge the resolver material into the main construction schema draft under the 2026-06-10 update log, after the existing accepted authority/transaction sections.
4. Preserve the accepted decisions, but keep the merged section concise.
5. After confirming coverage in the parent draft, delete the mistaken `TACMAP_CANDIDATE_RESOLVER_WORKING_DRAFT.md`.
6. Commit the cleanup.

Accepted material to preserve:

- Structured Action Transaction is the umbrella, replacing loose “turn transaction” framing.
- Freeform Scene Input is default.
- Structured Noncombat Step is a loose bounded non-map procedure label, not a second turn system.
- TacMap Encounter handles mechanically spatial procedure and can be combat or noncombat.
- TacMap Encounter uses the same turn/activation structure whether combat or noncombat.
- A scene should not casually devolve into a TacMap Encounter unless a usable TacMap frame exists or is deliberately created.
- Many ordinary environments are No Map Needed.
- Important recurring or encounter-capable environments should usually have a base TacMap pointer.
- A TacMap Encounter requires a workbook-backed node/path frame, not merely a map image.
- Base TacMap Library requires reusable visuals plus workbook templates.
- TacMap readiness states:
  1. No Map Needed
  2. Abstract Only
  3. Base TacMap Ready
  4. Encounter-Ready TacMap
  5. Active TacMap Encounter
- Environment readiness state and encounter instance state are different things.
- DM populates the encounter layer, not the base map.
- API DM should not select TacMaps from the full library.
- Add TacMap Candidate Resolver function:
  - app/content-side function;
  - uses environment, mission, scene tags, and map registry;
  - returns valid base TacMap candidates or none;
  - does not narrate;
  - does not resolve rules;
  - does not create live encounter state;
  - does not invent live tactical geometry.
- Context Broker assembles relevant context.
- TacMap Candidate Resolver returns valid map candidates.
- API DM frames/proposes encounter layer from supplied candidates.
- Rules/App validates activation.
- Game State Store commits live encounter state.
- If no valid TacMap candidate exists, the scene remains Freeform or Structured Noncombat Step.

Source context already checked in prior chat:

- `COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md`
- `COMBAT-REF-001 - TacMap_Workbook_and_Build_Plate_Process.md`
- `CORE-MISSION-001 - SRC-CORE-006-Mission-Node-Structure.md`

Important correction from prior assistant:

Do not route this as a separate file long-term. Merge it into the construction schema file. Delete the mistaken separate file only after confirming the merge.
```

## Follow-up owner / validation route

Codex/local should perform the merge, confirm coverage, delete the mistaken draft, validate workflow as appropriate, and commit the cleanup.
