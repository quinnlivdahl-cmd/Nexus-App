# Codex Handoff: Source Drafting Consolidation

Date: 2026-06-14
Prepared by: Codex
Workspace/repo path: `C:\Users\Quintin Livdahl\Repos\Nexus-App`
Controlling issue: none single; related to #9, #31, #38, #39, #36, #33
Planning anchor: `NEXUS_ISSUE_INDEX.md`, `NEXUS_LOCAL_PLAYABLE_ALPHA.md`, Golden Truth source workflow
Related synced-chat or bridge packet: none
Suggested thread title: `Active | Source Consolidation [Nexus]`

## Context Summary

The prior chat reviewed recent Nexus rules source text and app source text drafting. The key conclusion: do not treat all recent drafting as one source bucket.

There are three different authority levels:

1. Repo-side rules/app contract drafts in `docs/game-system-contracts/drafts`.
2. Golden Truth source corpus in `docs/nexus-game-source/source`.
3. Open source/play-doc task packets in GitHub issues #26-#32.

Best course recommended: run a narrow source-to-app consolidation pass before more broad drafting or implementation.

The consolidation should produce:

- a #38/#39 rules-core rev0.1 scaffold-or-deferral decision;
- a source promotion map identifying what belongs in Golden Truth, what stays app-contract-only, and what remains an open question;
- a #9 context-pack extraction plan using source IDs instead of hardcoded prompt/lore text.

## Files / Sources Inspected

- `AGENTS.md`
- `NEXUS_ISSUE_INDEX.md`
- `NEXUS_ISSUE_TRANSITION.md`
- `NEXUS_LOCAL_PLAYABLE_ALPHA.md`
- `replit.md`
- `NEXUS_HANDOFF_TEMPLATE.md`
- `docs/admin/task-planning/codex-session-discipline-workflow.md`
- `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`
- `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
- `docs/game-system-contracts/drafts/README.md`
- `docs/source-draft-candidates/README.md`
- `docs/game-system-contracts/drafts/DM_Authority_Split_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1.md`
- `docs/game-system-contracts/drafts/Rules_Object_Model_rev0.1_ACCEPTANCE_AND_SCAFFOLD_APPENDIX.md`
- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01.md`
- `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT_CONTINUATION_01_ISSUE_41_SPIRITUAL_APPEND.md`
- `docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1.md`
- `docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1_BIOFORM_CHASSIS_APPEND.md`
- `docs/game-system-contracts/drafts/Ability_and_Skill_Focus_Schema_Contract_rev0.1.md`
- `artifacts/nexus-companion/src/lib/dmSystemPrompt.ts`
- `artifacts/nexus-companion/src/lib/loreRegistry.ts`
- `artifacts/nexus-companion/src/lib/contextSelector.ts`
- `artifacts/nexus-companion/src/types/game.ts`
- GitHub issue bodies/comments for #26-#41 using the GitHub connector.

## Files Changed

This handoff file was created. No source, app, rules, or issue state files were intentionally changed in the review before this handoff.

## Progress State

Review completed. Recommendation exists. No implementation or promotion has been approved yet.

Important local state: the worktree was already dirty before this handoff, including a large source-home rename/migration state around `docs/nexus-domain-source-rebuild-2026-06-10` and `docs/nexus-game-source`. Do not clean, revert, or normalize that state unless the user explicitly asks.

## Closeout Evidence

Checks run in the prior chat and passed:

```powershell
corepack pnpm run validate:workflow
corepack pnpm run source:index:check
corepack pnpm run roadmap:index:check
corepack pnpm run typecheck
```

## Decisions Made

- Recent rules-core contract drafting is useful implementation-planning material, but it is not automatically source canon.
- Golden Truth source remains `docs/nexus-game-source/source`.
- Current app runtime prompt/context is still prototype and hand-authored, not generated from Golden Truth.
- Do not bulk-promote repo-side contract drafts into Golden Truth.
- Do not implement the full rules engine directly from these drafts before resolving #38/#39 scaffold/deferral.

## Blockers / Risks

- #36 appears to have preservation debt: the issue expected `Game_State_Lanes_Contract_rev0.1.md`, and the GitHub comment says the draft was approved as source-ready design material, but the prior review did not find that file under `docs/game-system-contracts/drafts`.
- #38 and #39 remain open pending repo architecture/type lane inspection or explicit scaffold deferral.
- There is no dedicated `rules-core` package yet. Current game types live in `artifacts/nexus-companion/src/types/game.ts`; shared packages are API/db focused.
- App prompt/context currently hardcodes mechanics in `dmSystemPrompt.ts` and hand-authored lore in `loreRegistry.ts`.

## Unresolved Questions

1. Should the next Codex session produce only a consolidation map, or also patch the missing #36 durable artifact?
2. Should #38/#39 close via a thin TypeScript scaffold or an explicit deferral?
3. Which contract decisions should become Golden Truth source versus app-contract-only implementation guidance?
4. Should #31 be treated as still open despite the new ability/focus contract draft, or should that draft become closeout evidence after review?

## What Not To Redo

- Do not re-read the entire prior chat.
- Do not redo broad GitHub issue discovery unless live issue state must be refreshed.
- Do not re-run all validation before making a discussion-only recommendation.
- Do not treat issue comments as source authority unless preserved into the approved repo/vault source workflow.
- Do not create a ChatGPT Project packet unless the user redirects to ChatGPT/Stewy sync.

## Startup Guardrail

This handoff is context, not execution approval. A fresh receiving Codex chat should read this handoff, state the understood goal, controlling source of truth, current status, and next safe action, then wait for current user approval before editing files, running validation, committing, pushing, updating GitHub, moving queue files, or closing issues.

## Next Safe Action

Ask the user which path they want:

1. produce the consolidation map only;
2. produce the map and patch the missing #36 durable artifact / index references;
3. proceed into a thin #38/#39 rules-core scaffold decision after the map.

Default recommendation: option 2, because #36 preservation debt is small and blocks clean source-to-app routing.

## Continue Prompts

### Codex

```text
Read `docs/chatgpt-project-bridge/handoffs/2026-06-14-source-drafting-consolidation-codex-handoff.md` and use thread title `Active | Source Consolidation [Nexus]`.

Summarize your understanding of the Nexus source-drafting consolidation goal, the controlling source of truth, current status, and next safe action. Do not edit files, run validation, update GitHub, commit, push, or close issues until I explicitly approve the next action in this chat.
```

### ChatGPT

```text
This is a Codex-to-Codex handoff, not a ChatGPT Project planning packet. If pulled into ChatGPT, summarize only the source-routing decisions and recommend whether a dedicated synced-chat packet is needed.
```

### Replit

```text
Not ready for Replit. Wait until Codex produces a scoped implementation task packet.
```
