# Task Packet: Skill Focus Tile Behavior And Progression Math

Date: 2026-06-30
Prepared by: Codex
State: approval-needed
Related issue: Skill/Ability Structure #31 - Formalize skill focus and ability tree structure for playable drafts
Planning anchor: Source and Play Document Tasks / Roadmap Lane 6
Related synced-chat packet: `docs/chatgpt-project-bridge/synced-chats/2026-06-28-issue-31-skill-ability-planning-exchange.md`

## Purpose

Prepare the next narrow Skill/Ability Structure #31 packet for app-facing Skill Focus tile behavior and playable-first progression math.

This packet is context and approval framing only. It does not approve canonical source edits, app implementation, GitHub issue updates, commits, pushes, or canon promotion.

## Task Summary

Task name: Skill Focus tile behavior and progression math for Skill/Ability Structure #31
Task type: approval-gated source/app-facing specification
Request summary: Convert the 2026-06-28 planning exchange and 2026-06-29 playable-first continuation into a narrow, implementable specification target without editing source or app code yet.
Goal: Define the minimum behavior a future Skill Focus tile and progression math pass should support so Quintin can approve either a source-drafting pass, an app-facing behavior spec, or implementation work.
Why this matters: Skill/Ability Structure #31 is the current ready source/play document task, and the app needs a simple, playable progression posture before final balance exists.
Review gate: Nexus bridge review after validation.
Reviewer result: PASS_WITH_NOTES on 2026-06-30.
Reviewer feedback / fix status: No targeted fixes required. Note that the repo has many unrelated dirty files and these bridge changes are local-only and uncommitted.

## Current Known State

- Skill/Ability Structure #31 is listed as ready in `NEXUS_ISSUE_INDEX.md`.
- The canonical source relationship is currently `Attribute -> Skill -> Skill Focus -> Ability`.
- `CHAR-ABILITY-001` supports Tier, Rank, Focus Total, and Focus Total threshold language, while exact thresholds remain parked.
- `CHAR-PROGRESSION-001` says level-up/loadout-style choices happen before a selected node begins and warns DM Mode not to invent permanent stat math unless Draft/Steward promotes it.
- `Ability_and_Skill_Focus_Schema_Contract_rev0.1.md` already supports shared progression currency, direct Skill Focus spending, selectable/acquired/equipped-or-prepared/usable-now distinctions, and validation boundaries.
- `SKILL-OPEN-008`, `SKILL-STATE-007`, and `SKILL-DIFFICULTY-001` keep final formulas, caps, target-score tuning, and modifier derivation open.
- A read-only search of `artifacts/nexus-companion/src` did not find an existing Skill Focus or ability-rank tile surface.

## Proposed Narrow Output After Approval

After Quintin approves the next step, prepare one narrow candidate spec that covers:

1. Skill Focus tile fields and states.
2. Playable-first progression math defaults.
3. Tier visibility and unlock display behavior.
4. Ability tile display states.
5. Roll-modifier use boundaries.
6. Source/app authority boundaries and follow-up route.

Recommended destination after approval:

- App-facing/spec packet: `docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md` can be revised in place, or
- Source draft candidate: `docs/source-draft-candidates/2026-06-30-skills-skill-focus-tile-progression-math.md`, only if Quintin approves creating a source draft candidate.

Do not create the source draft candidate without explicit approval.

## Candidate Behavior Scope

The future Skill Focus tile should represent:

- Focus name.
- Parent Skill.
- Parent Attribute.
- raw Focus Total.
- derived Focus Modifier.
- direct Focus increase action.
- progression currency cost for direct Focus increase.
- Tier 1 ability tiles.
- Tier 2 full-preview locked ability tiles with exact unlock requirement.
- Tier 3 existence marker before reveal.
- Tier 3 details revealed when the Skill Focus reaches its Tier 2 threshold.
- ability current rank.
- ability max rank.
- next rank cost.
- ability state: hidden, visible_locked, selectable, acquired, unavailable_due_to_exclusion, temporarily_unavailable.
- detail section for cascade math and prerequisites.

## Candidate Playable-First Math Defaults

Use these as candidate defaults for a first playable pass:

- Every ability rank costs 1 progression currency.
- Every purchased ability rank adds +1 Skill Focus Total.
- Direct Skill Focus spend costs 1 progression currency.
- Direct Skill Focus spend adds +1 Skill Focus Total.
- Direct Skill Focus spend can unlock Tier 2 and Tier 3 by itself.
- Direct Skill Focus spend remains valid after Tier 3 is unlocked.
- Skill Focus Total has no current cap.
- Skill Total equals the sum of Skill Focus Totals under that Skill.
- Attribute Total equals the sum of Skill Totals under that Attribute.
- Raw totals and derived modifiers remain separate.
- Exact modifier formulas, thresholds, caps, currency name, award cadence, and milestone behavior remain deferred.

## Candidate Roll-Use Boundary

Keep this as a candidate, not canon:

- General check: Attribute Modifier + Skill Modifier.
- Ability-granted use check: Attribute Modifier + relevant Skill Focus Modifier.
- Abilities may grant actions, options, permissions, passives, reactions, stances, modes, equipment interactions, or similar capabilities.
- The ability itself is not necessarily the action.

Any future implementation must route final legality, cost, target, timing, validation, effects, and state deltas through rules-core authority. A visible UI button does not prove current-use legality.

## Done When

This packet is done when:

- The June 28/29 Drive exchange is mirrored into the synced-chat lane.
- The synced-chat index points to the new mirror.
- This task packet names the narrow next target and approval boundary.
- Canonical source and app code remain untouched.
- Validation or manual review confirms the packet paths exist and scope boundaries are clear.

## In Scope

- Mirror and reconcile the Drive exchange into repo bridge context.
- Prepare a narrow approval-gated task packet.
- Cite current source and draft-contract inputs.
- Preserve source/app/GitHub boundaries.
- Make the next approval decision easy.

## Out Of Scope

- Canonical source edits.
- Source promotion into Obsidian.
- App implementation.
- GitHub issue updates or comments.
- Commits or pushes.
- Final ability catalog.
- Exact threshold values.
- Exact modifier formulas.
- Final balance or progression economy.
- Tutorial mode behavior.

## Do Not Do

- Do not treat this packet as source canon.
- Do not implement Skill Focus tiles from this packet alone.
- Do not update Skill/Ability Structure #31 on GitHub without explicit approval.
- Do not introduce progressive rank costs for the playable draft.
- Do not optimize progression math before play.
- Do not assume the current app already supports Skill Focus tiles.
- Do not silently erase the Force / Traverse / Systems / Vital / Insight / Network history; preserve it as mapped planning context until source review promotes replacements.

## Platform Owner

- ChatGPT Project: collaborative planning, candidate wording, and source/app-facing discussion.
- Codex/local: repo inspection, file edits, validation, source-authority checks, and future implementation only after approval.
- Replit: possible implementation target later, only after Codex/local or Quintin turns the approved spec into a Replit-ready task.

## Handoff Target

First target: Quintin approval.

After approval, route to one of:

- ChatGPT Project for a source-ready drafting conversation.
- Codex for a candidate source/app-facing spec file.
- Codex or Replit for implementation, only if Quintin explicitly approves implementation.

## Validation / Review Method

- Confirm the synced-chat mirror exists.
- Confirm `SYNC-INDEX.md` lists the mirror.
- Confirm this task packet exists under the approved `task-packets` lane.
- Run `corepack pnpm run validate:workflow` when practical.
- Run a Nexus review pass before claiming complete.

## Risks / Challenges

- The Drive exchange is planning-only and should not be mistaken for source authority.
- The repo working tree has many pre-existing unrelated changes; any future implementation should isolate or review scope carefully.
- The current app does not appear to have a Skill Focus tile surface yet.
- The roll-use defaults in the continuation are planning direction, not promoted Skills source.
- Exact formulas and thresholds are intentionally deferred, so implementation must avoid hardcoding final balance.

## Open Questions

- Should the next approved step be a source-ready drafting pass, an app-facing behavior spec, or implementation task shaping?
- Should the first implementation target a crew-sheet/level-up planning UI, a read-only display tile, or a rules-core data model first?
- What progression currency name should appear in player-facing UI, if any, before final source promotion?
- Should Tier 2 appear in the immediate playable draft or only as locked previews?

## Next Action

Ask Quintin to approve one narrow next step. Suggested approval prompt:

```text
Approve Codex to turn the Skill Focus tile/progression math packet into a candidate app-facing behavior spec for Skill/Ability Structure #31. Do not edit canonical source, update GitHub, or implement app code yet.
```

## Closeout Evidence

- Synced-chat mirror created at `docs/chatgpt-project-bridge/synced-chats/2026-06-28-issue-31-skill-ability-planning-exchange.md`.
- Synced-chat index updated at `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`.
- This task packet created at `docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md`.
- `corepack pnpm run validate:workflow` passed on 2026-06-30.
- Nexus bridge review result: PASS_WITH_NOTES on 2026-06-30.
- Canonical source files and app code were intentionally not edited.
- GitHub issue updates, commits, and pushes were intentionally not performed pending Quintin approval.
