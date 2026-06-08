---
title: "API DM + Rules Core Plan"
project: "Nexus App"
doc_status: "planning"
source_role: "codex_replit_handoff"
created: "2026-06-08"
created_by: "ChatGPT Steward"
repo_path: ".agents/plans/2026-06-08_api-dm-rules-core-plan.md"
intended_use:
  - "Codex/Replit planning input"
  - "Architecture handoff from ChatGPT project discussion"
  - "Not live game-rule authority"
---

# API DM + Rules Core Plan

## 1. Working direction

Nexus continues using an **API DM inside the app**.

The goal is not to remove the DM API. The goal is to make the DM work within real Nexus rules while keeping context small, cost controlled, and narration quality high.

Target authority split:

- **App rules core owns:** legality, costs, checks, rolls, modifiers, result bands, damage, effects, state deltas, clocks, progression, and mechanical truth.
- **API DM owns:** intent interpretation, scene framing, NPC voice, tone, option phrasing, dramatic pacing, and narration of resolved facts.
- **Context broker owns:** selecting the smallest useful state/rules/lore packet for each DM call.

## 2. Current repo facts

Current app path:

```text
artifacts/nexus-companion/
```

Important current files:

```text
artifacts/nexus-companion/src/types/game.ts
artifacts/nexus-companion/src/store/GameStateContext.tsx
artifacts/nexus-companion/src/lib/useDMChat.ts
artifacts/nexus-companion/src/lib/dmSystemPrompt.ts
artifacts/nexus-companion/src/lib/stateParser.ts
artifacts/nexus-companion/src/lib/contextSelector.ts
artifacts/nexus-companion/src/App.tsx
artifacts/nexus-companion/src/components/tacmap/TacMap.tsx
```

Current architecture:

- Browser-side OpenAI DM calls exist.
- Game state exists in React/localStorage.
- DM currently emits `nexus-state` JSON blocks.
- `stateParser.ts` parses DM state blocks and applies them to app state.
- Rules are currently prompt-like, not deterministic app logic.

## 3. Problem

The DM API is doing too much.

Current pattern:

```text
Player message
→ GPT DM interprets, rolls, decides, narrates, emits state JSON
→ app trusts parsed state block
```

Target pattern:

```text
Player message
→ API DM interprets intent / frames fiction
→ app rules core validates and resolves mechanics
→ API DM narrates resolved facts
→ app applies validated state delta
```

## 4. Required architecture pieces

Create or plan these layers:

```text
src/rules/
src/dm/
src/context/
```

Initial suggested files:

```text
src/rules/types.ts
src/rules/resolveCheck.ts
src/rules/resolveAction.ts
src/rules/applyEffects.ts
src/rules/rulesFixtures.ts

src/dm/types.ts
src/dm/buildIntentPrompt.ts
src/dm/buildNarrationPrompt.ts

src/context/buildDMContext.ts
```

Do not move everything immediately. Start with a scaffold that compiles.

## 5. Core contracts to define

Minimum types:

```text
CheckFamily
ActionRequest
ActionCost
TargetRef
CheckInput
ResultBand
CheckResult
Effect
StateDelta
ResolutionLogEntry
DMIntentProposal
DMNarrationRequest
DMNarrationResponse
```

## 6. First vertical slice

Implement only one thin slice first:

1. One actor.
2. One target.
3. One attack check.
4. One standard check.
5. One extended check stub.
6. One effect package.
7. One state delta.
8. One log entry.
9. One DM narration request that receives resolved facts.

Do not implement the full rules system yet.

## 7. Preservation rules

Do not delete the existing DM chat files yet.

Treat these as legacy/reference until replaced:

```text
src/lib/useDMChat.ts
src/lib/dmSystemPrompt.ts
src/lib/stateParser.ts
```

They may be renamed, wrapped, or bypassed later, but preserve them during the first rules-core scaffold.

## 8. Codex task

Task:

Prepare the Nexus app alpha for API-DM-plus-rules-core architecture.

Steps:

1. Inspect the files listed in Section 2.
2. Add a minimal rules-core scaffold.
3. Add TypeScript types for action/check/effect/state-delta contracts.
4. Add stub resolver functions.
5. Do not wire UI unless the scaffold compiles cleanly.
6. Run:

```text
pnpm --filter @workspace/nexus-companion run typecheck
```

7. Report:
   - files read;
   - files created;
   - files modified;
   - checks run;
   - whether typecheck passed;
   - recommended next vertical slice.

## 9. Non-goals

Do not:

- remove the API DM;
- remove the chat UI yet;
- implement full ability trees;
- implement full combat;
- move to a backend;
- rewrite the whole app;
- make prompt text the rules authority;
- allow arbitrary DM state mutation to remain the final architecture.
