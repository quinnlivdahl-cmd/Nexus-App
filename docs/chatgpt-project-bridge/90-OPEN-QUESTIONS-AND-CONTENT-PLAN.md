# Open Questions And Content Plan

Status: upload-ready bridge file

## Open Questions

1. Should upload confirmations be tracked in this app repo, the older rebuild bridge ledger, or both during transition?
2. Should a future `05-CURRENT-STATE-DELTA.md` become part of every baseline refresh?
3. What exact ChatGPT Project searchability check should be used after the first seven-file baseline upload?
4. When should the older rebuild-repo bridge scaffold be marked historical, if ever?
5. Which source domains should get small task-specific guide packets first?
6. Which synced-chat packets should be promoted into GitHub issues after ChatGPT planning matures?
7. Should the repo eventually gain a dedicated tiny-observation log, or should tiny observations continue to route through issue closeout, handoffs, synced-chat packets, preservation packets, and task packets?
8. Should platform-OS behavior for ChatGPT and Codex remain in bridge/session-discipline docs, or later split into mode-specific files after the manual workflow proves useful?

## Completed Content Tasks

The deterministic source index for the repo-side expanded source pool has been created and should be verified by exact-path fetch when needed:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.md`
- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.json`

`docs/chatgpt-project-bridge/20-SOURCE-AUTHORITY-SUMMARY.md` is now part of the seven-file bridge baseline.

Purpose: allow ChatGPT to fetch necessary expanded context from GitHub by exact path during general Nexus discussion without keeping broad source zips in permanent Project Sources.

2026-06-12 bridge OS update:

- `docs/chatgpt-project-bridge/02-GLOBAL-PROJECT-INSTRUCTIONS.md` now captures the Issue #33 ChatGPT Project OS behavior for decision-making: ask for user input only when decisions materially affect gameplay, gameplay app flow, source routing, or project workflow; make ordinary architecture/schema defaults without stopping.
- `docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md` now clarifies shared side-item recording across ChatGPT and Codex, including use of the same durable repo surfaces and temporary routing for tiny observations until a dedicated log exists.
- These are baseline bridge changes, so ChatGPT Project should be considered stale for this scope until the changed files are reuploaded or pasted and confirmed.

## Deferred Content Families

Create these only when needed:

| Family | First useful content | Notes |
|---|---|---|
| Current state delta | What changed since the last ChatGPT Project upload | Keep short and dated |
| Modes context | Current operating modes and command expectations | Summarize, do not paste long admin docs |
| Source authority extensions | Domain-specific authority notes beyond the baseline summary | Create only if a domain needs more routing detail than `20-SOURCE-AUTHORITY-SUMMARY.md` |
| App workflow context | Issue queue, task packet workflow, validation expectations | Pull from repo/GitHub current state |
| Playtest context | Active playtest state, constraints, and what is safe to improvise | Refresh per play session |
| Synced chat packet | ChatGPT planning or discussion that Codex should be able to find | Use `synced-chats/SYNC-INDEX.md` when it is not its own GitHub issue |
| Non-issue handoff | Concrete ChatGPT transfer context for Codex | Use `handoffs/HANDOFF-INDEX.md` when no issue owns the handoff yet |
| Long-chat preservation packet | Accepted prose or decisions that should not live only in a prompt | Prefer a more specific evolving draft when one exists |
| Targeted task packet | One issue, chat, or design problem | Prefer this over broad refresh |

## First Upload Recommendation

First upload the seven-file baseline bridge set:

- `00-BOOTSTRAP.md`
- `01-SLOT-MAP.md`
- `02-GLOBAL-PROJECT-INSTRUCTIONS.md`
- `03-OPERATING-MODEL.md`
- `04-REFRESH-AND-READINESS-RULES.md`
- `20-SOURCE-AUTHORITY-SUMMARY.md`
- `90-OPEN-QUESTIONS-AND-CONTENT-PLAN.md`

Do not upload changing packet indexes or packet folders as permanent Project Sources by default. Keep `synced-chats/SYNC-INDEX.md`, `handoffs/HANDOFF-INDEX.md`, synced-chat packets, handoff packets, preservation packets, task packets, evolving drafts, and source draft candidates in GitHub, then use exact paths when the current state is needed.

After upload, ask ChatGPT Project to summarize:

1. what it is allowed to treat as source authority;
2. what the bridge files are for;
3. what it should do when current source or GitHub state matters;
4. how it should use the repo-side expanded source pool;
5. which future packet family it recommends populating first.

Record the upload and result before calling the project current for this bridge baseline.

## First Non-Baseline Recommendation

Before adding broad packets, run the ChatGPT Project searchability check and verify that GitHub source-index retrieval works by fetching `SOURCE-INDEX.md` and one indexed source file. Then consider a narrow `05-CURRENT-STATE-DELTA.md` only when there is a specific source/repo/workflow change that ChatGPT needs for discussion.