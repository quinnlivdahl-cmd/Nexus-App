# Synced Chat Packet: Issue 31 Skill/Ability Planning Exchange

Date: 2026-06-28
Continuation reconciled: 2026-06-29
Codex mirror date: 2026-06-30
Chat/topic title: Issue 31 Skill/Ability Planning Exchange
Prepared by: ChatGPT / Quintin planning exchange; mirrored by Codex
Related issue or roadmap lane: Skill/Ability Structure #31 / Source and Play Document Tasks / Roadmap Lane 6
State: planning-only

## Source / Currentness Status

Source Drive document:

- Google Doc: `https://docs.google.com/document/d/1KB4JjgyX4cr-zhEwkm-qOwV2UUnw3qL2p4ieAkyTAAE`
- Local Drive pointer: `G:\My Drive\90_Transfer\AI Assistant Exchange\2026-06-28 Issue 31 Skill Ability Planning Exchange.gdoc`
- Drive title: `2026-06-28 Issue 31 Skill Ability Planning Exchange`
- Drive modified time observed by Codex: `2026-06-30T01:41:19.939Z`

The Drive exchange follows the planning packet:

- `G:\My Drive\10_Projects\Nexus Game\90 Export Bundles\Issue 31 Skill Ability Structure - GPT Source Packet - 2026-06-28`

The exchange used these start files:

- `00 - README - Start Here.md`
- `03 - Compact Context Packet for GPT.md`

The exchange cited these supporting copied source docs:

- `10 - SKILL-LIST-001 - Skills List and Definitions.md`
- `12 - CHAR-ABILITY-001 - Ability Taxonomy and Level Up Working Model.md`
- `20 - Draft Contract - Ability and Skill Focus Schema rev0.1.md`

Canonical repo source remains in `C:\Users\Quintin Livdahl\Repos\Nexus-App-Worktrees\Nexus-App\docs\nexus-game-source\source`. This synced-chat packet is planning context only. It does not approve canonical source edits, GitHub issue updates, validation claims, commits, pushes, canon promotion, or app implementation.

## Current Question Or Decision

The 2026-06-28 exchange captured playable-draft decisions for Skill/Ability Structure #31. The 2026-06-29 continuation added a playable-first progression default and an app-facing Skill Focus tile target.

The current decision is narrow: preserve those planning decisions in the repo bridge and use them to prepare a next approval-gated packet for Skill Focus tile behavior and playable-first progression math.

## Reconciliation Summary

Codex reconciled the June 29 continuation into this repo-side mirror as additive planning context. No conflict was found between the continuation and the current provisional source posture that:

- `Attribute -> Skill -> Skill Focus -> Ability` is the active source-facing relationship.
- Ability ranks and direct Skill Focus investment can both contribute to Focus Total.
- Skill Focuses are one major ability lane, but not the only valid lane.
- Final formulas, caps, thresholds, skill counts, and balance values remain open.
- App-facing rules-core validation owns whether an ability is usable now.

Current app inspection found no existing Skill Focus or ability-rank tile surface in `artifacts/nexus-companion/src`, so the app-facing portion should be treated as a candidate behavior/spec task, not as evidence that the app already supports this structure.

## Accepted Decisions From 2026-06-28

### Attribute Layer

The playable draft should use these six visible Attribute terms for now:

- Combat
- Dexterity
- Intelligence
- Constitution
- Wisdom
- Charisma

These replace the prior provisional broad bands for current design purposes:

- Force -> Combat
- Traverse -> Dexterity
- Systems -> Intelligence
- Vital -> Constitution
- Insight -> Wisdom
- Network -> Charisma

These are playable-draft terms, not final canon unless later promoted.

### Core Relationship

The working relationship remains:

```text
Attribute -> Skill -> Skill Focus -> Ability
```

Working meanings:

- Attribute: broadest visible character competence surface.
- Skill: trained action area, commonly used for checks.
- Skill Focus: specialized lane, tree, or specialty under a Skill.
- Ability: selectable or rankable capability inside or from a lane.

### Totals Cascade Upward

Attribute values are not directly assigned as standalone stats. Totals cascade upward from lower investments:

```text
Ability / Rank investment -> Skill Focus Total -> Skill Total -> Attribute Total
```

This is already supported by existing documentation, which says lower-tier powers, effects, and features contribute upward into Skill Focus, parent Skill, and broad top-level totals. Current terminology maps that broad top level to Attribute.

### Tier Vs Rank

Tier and Rank remain distinct:

- Tier = access layer / availability band.
- Rank = investment within one specific ability.
- Focus Total = total investment inside one Skill Focus.

Ranks should generally improve the same ability rather than becoming unrelated riders. Higher-tier abilities can be added later without forcing every focus to be a single linear ladder.

### Skill Focus Starting Shape

Each Skill Focus should start with 2-3 Tier 1 abilities available in the playable draft.

Higher-tier abilities can be added later. Tiers still exist, but they are not assumed to be strictly linear.

### Shared Trees / Shared Abilities

Shared trees and shared ability access are supported, but they should not become the normal path.

Accepted working principles:

- Most abilities remain single-focus / single-lane by default.
- Shared ability structures are allowed and may be systematic, not purely ad hoc.
- Up to roughly 20-25% of abilities being shared is plausible.
- Shared abilities should be authored once, not duplicated under multiple trees.
- Shared trees connect two Skills, not merely two Skill Focuses.
- Shared Skill trees may connect freely across Attributes when the concept fits.
- Unlocks can be AND or OR depending on concept:
  - AND = true hybrid ability requiring both paths.
  - OR = alternate-path ability naturally reachable from either side.
- Which Skill pairs receive shared trees is deferred until skill drafting.

### Crew Sheet / Display Rule

Visible by default:

- Attribute totals
- Skill totals
- Skill Focus totals
- Ability names
- Ability ranks

Hidden by default, but available through dropdown/detail tiles:

- how Attribute totals are calculated
- how Skill totals are calculated
- how Skill Focus totals are calculated
- Ability / Rank contribution math
- prerequisite math
- Focus Total cascade math

Working display principle:

Show the values players need to use or reference. Hide the construction math unless the player opens the detail tile.

### Tutorial Mode Parking Note

All math should be easy to access for player learning. Tutorial mode may later open relevant math/detail tiles automatically, but tutorial-mode behavior is deferred and should not be designed in this pass.

## Accepted Playable-First Decisions From 2026-06-29

### Progression Defaults

- Playable-first posture: use simple defaults so the app can support expected play quickly; tune after actual play.
- Rank cost: every ability rank costs 1 for now.
- Focus contribution: every purchased ability rank adds +1 Skill Focus Total.
- Direct Focus spend is allowed: a player may spend 1 directly on a Skill Focus to add +1 Skill Focus Total.
- Direct Focus spend uses the same progression currency as ability ranks.
- Direct Focus spend has a visible button on the Skill Focus tile.
- Direct Focus increases can unlock Tier 2 and Tier 3 by themselves.
- Direct Focus increases remain allowable after Tier 3 is unlocked.
- Skill Focus Total has no current cap; stop conditions are deferred until later balance/app/source work.
- Skill Total equals the sum of all Skill Focus Totals under that Skill.
- Attribute Total equals the sum of all Skill Totals under that Attribute.

### Tier Visibility And Unlock Behavior

- Tier 1: fully visible and selectable when prerequisites are met.
- Tier 2: visible while locked, showing the same full tile the player would see if owned.
- Locked Tier 2 tiles show exact unlock requirements directly on the tile.
- Tier 2 unlock thresholds are standardized within a Skill Focus, but different Skill Focuses may use different thresholds.
- Tier 3: existence visible at first; details reveal immediately when the Skill Focus reaches its Tier 2 threshold.
- Tier 3 unlock requirements follow the same pattern: one exact threshold per Skill Focus, with different Focuses allowed to differ.
- Exact Tier 2/Tier 3 threshold values remain deferred until skill drafting/balance.

### Totals, Modifiers, And Roll Use

- Raw cascade: ability rank purchases + direct Skill Focus increases -> Skill Focus Total -> Skill Total -> Attribute Total.
- Raw totals and derived modifiers are separate.
- The sheet should show both raw totals and derived modifiers for Attributes, Skills, and Skill Focuses.
- Attribute Total may produce an Attribute Modifier for rolls, similar in concept to a D&D-style attribute modifier.
- Skill Total may produce a Skill Modifier for broad/general checks.
- Skill Focus Total may produce a Skill Focus Modifier for uses tied to a specific Focus.
- Different modifier derivation formulas are allowed for Attribute, Skill, and Skill Focus; final formulas remain deferred.
- General check roll: Attribute Modifier + Skill Modifier.
- Ability-granted use roll: when a character uses an action, option, permission, passive, reaction, stance, mode, equipment interaction, or similar capability granted by an ability, and that use requires a roll, use Attribute Modifier + the relevant Skill Focus Modifier.
- Abilities may grant actions, options, permissions, passives, reactions, stances, modes, equipment interactions, or similar capabilities. The ability itself is not necessarily the action.

These roll-use bullets are accepted planning direction from the exchange, not promoted source canon. They need source review before canonical source edits or implementation.

### App-Facing Behavior Target

A Skill Focus tile should support:

- Focus name
- Focus Total
- Focus Modifier
- visible direct Focus increase button
- Tier 1 ability tiles
- Tier 2 locked full-preview tiles with exact unlock requirement
- Tier 3 existence marker until details reveal
- ability tiles showing current rank, max rank, next rank cost, and lock/select/acquired state

## Deferred / Do Not Invent

- Final skill count is not locked.
- Final attribute naming is still provisional, though the six working terms above are accepted for current drafting.
- Force / Traverse / Systems / Vital / Insight / Network should not be silently erased from history; they are mapped for current planning.
- Combat Attack / Defense / Support / Tactics / Technical & Systems / Mobility & Exploration / Social & Network / Identity-Signal-Horror should be treated as ability-family/display buckets for now, not structural parents, unless later source review changes that.
- Defense ability content remains a priority gap.
- Identity / Signal / Horror ability content remains a priority gap only if needed for the test campaign.
- Tier 2 inclusion in immediate playtest remains undecided.
- Exact Focus Total thresholds, rank caps, formulas, modifiers, progression currency name, and milestone cadence remain undecided.
- Do not reintroduce progressive rank costs for the playable draft.
- Do not optimize progression math before play.
- Do not assume current app crew sheet already supports this behavior.

## Repo Paths Or Source Docs Referenced

- Skill/Ability Structure #31: `https://github.com/quinnlivdahl-cmd/Nexus-App/issues/31`
- `docs/chatgpt-project-bridge/synced-chats/2026-06-27-issue-31-skill-ability-structure.md`
- `docs/game-system-contracts/drafts/Ability_and_Skill_Focus_Schema_Contract_rev0.1.md`
- `docs/nexus-game-source/source/Characters/Applied Rules/CHAR-ABILITY-001 - Ability_Taxonomy_and_Level_Up_Working_Model.md`
- `docs/nexus-game-source/source/Characters/Canon Homes/CHAR-PROGRESSION-001 - Traits_Feats_and_Progression.md`
- `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-LIST-001 - SRC-SKILL-002-Skills-List-and-Definitions.md`
- `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-DISCIPLINE-001 - SRC-SKILL-006-Disciplines-Skills-and-Advancement-Links.md`
- `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-DIFFICULTY-001 - SRC-SKILL-004-Difficulty-Modifiers-and-Check-Display.md`
- `docs/nexus-game-source/source/Skills/Current State/SKILL-STATE-007 - SRC-SKILL-007-RNG-and-Playtest-Tuning-Notes.md`
- `docs/nexus-game-source/source/Skills/Open Questions/SKILL-OPEN-008 - SRC-SKILL-008-Resolution-Open-Questions.md`

## Next Recommended Codex Action

Use this packet as planning context for the approval-gated task packet:

`docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md`

Do not edit canonical source, update GitHub issues, commit, push, or implement app changes from this synced-chat packet alone. The next safe action is for Quintin to approve a narrow source/app-facing specification pass or implementation pass.

## ChatGPT Opening Prompt

```text
You are helping Quintin continue Nexus Skill/Ability Structure #31.

Read this as planning context, not execution approval and not canon promotion. Start by summarizing the accepted 2026-06-28 and 2026-06-29 decisions in 5 bullets or fewer, then ask Quintin exactly one focused question about the next approval-gated step.

Controlling issue:
Skill/Ability Structure #31 - Formalize skill focus and ability tree structure for playable drafts
https://github.com/quinnlivdahl-cmd/Nexus-App/issues/31

Current planning direction:
- Attribute -> Skill -> Skill Focus -> Ability.
- Ability ranks and direct Skill Focus spends both add to Skill Focus Total.
- Rank cost is 1 for the playable draft.
- Raw totals and derived modifiers are separate.
- A Skill Focus tile should show Focus Total, Focus Modifier, direct Focus increase, Tier 1 abilities, locked Tier 2 previews, Tier 3 existence marker, and ability rank/state fields.

Guardrail:
Do not edit canonical source, update GitHub, or implement app behavior. Help Quintin decide whether the next step should be a source-ready drafting pass, an app-facing behavior spec, or a later implementation task.
```

## Notes

This packet supplements the 2026-06-27 Issue #31 synced-chat packet. It replaces nothing and does not delete, supersede, or promote source material.
