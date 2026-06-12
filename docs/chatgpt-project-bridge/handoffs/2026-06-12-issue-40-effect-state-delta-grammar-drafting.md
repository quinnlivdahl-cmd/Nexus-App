# ChatGPT Handoff: Issue #40 effect/state-delta grammar drafting

Date: 2026-06-12  
Prepared by: ChatGPT Draft Mode  
Related issue or roadmap lane: #40 — Define effect and state-delta grammar; parent epic #33  
Status: ready-for-next-Draft-chat  
Destination file: `docs/chatgpt-project-bridge/handoffs/2026-06-12-issue-40-effect-state-delta-grammar-drafting.md`

## Context Summary

Issue #39 was drafted into the grand schema continuation file:

`docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`

Issue #40 is the next logical drafting issue in the system-schema sequence. The next Draft chat should append Issue #40 material to the same continuation file rather than creating a standalone #40 draft, unless the continuation file becomes too long and a new continuation split is needed.

Issue #40 purpose:

Define what rules are allowed to change and distinguish `Effect` from `StateDelta`, preventing abilities, checks, and DM narration from producing bespoke or unvalidated state changes.

Issue #40 depends on #36, #38, and #39. It should use the #38 object model and #39 check-family/result-band boundaries.

## Files Or Sources Referenced

- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX.md`
- GitHub Issue #33
- GitHub Issue #38
- GitHub Issue #39
- GitHub Issue #40
- `docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md`

## Decisions Made

- Subsequent schema-epic drafts should append to `GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md` until another split is needed.
- #39 defines check families by engine behavior, not domain.
- `ValidatedAction` remains the earliest action object allowed into resolution.
- `CheckInput` carries selected `CheckFamily`.
- `ResultBand` meaning is interpreted inside the selected `CheckFamily`.
- #40 owns final effect/state-delta grammar and mutable surfaces.

## Blockers

No drafting blocker identified.

Do not implement yet.

## Unresolved Questions For #40

- What is an `Effect` versus a `StateDelta`?
- Can effects fail after check resolution?
- How are hidden effects stored?
- How are temporary effects expired?
- How are ongoing effects displayed?
- How does the DM narrate effects without changing them?
- Which state surfaces are rules-core-only?
- Which state surfaces can be updated by non-combat checks?
- How do reducers validate and commit deltas?

## What Not To Redo

- Do not re-litigate #39 check-family families unless #40 finds a concrete conflict.
- Do not embed OS/workflow residue inside game-system draft artifacts.
- Do not create a separate #40 standalone draft unless the continuation file becomes too long.
- Do not finalize TypeScript schemas or source canon.
- Do not let API DM narration become mutation authority.

## Next Safe Action

Open a new Draft Mode chat for #40.

Start by fetching:

- Issue #33
- Issue #38 and comments
- Issue #39 and comments
- Issue #40
- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX.md`

Then draft and append an Issue #40 section to:

`docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`

Preservation note: this handoff supplements #40 and #33. It replaces nothing. Old drafts and bridge artifacts may not be deleted unless later verified and superseded.
