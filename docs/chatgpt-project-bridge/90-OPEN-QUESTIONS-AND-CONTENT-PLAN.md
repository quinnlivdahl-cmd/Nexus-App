# Open Questions And Content Plan

Status: upload-ready bridge file

## Open Questions

1. Which future packet family should be populated first after the baseline bridge files are uploaded?
2. Should upload confirmations be tracked in this app repo, the older rebuild bridge ledger, or both during transition?
3. Should a future `05-CURRENT-STATE-DELTA.md` become part of every baseline refresh?
4. What exact ChatGPT Project searchability check should be used after the first upload?
5. When should the older rebuild-repo bridge scaffold be marked historical, if ever?

## Deferred Content Families

Create these only when needed:

| Family | First useful content | Notes |
|---|---|---|
| Current state delta | What changed since the last ChatGPT Project upload | Keep short and dated |
| Modes context | Current operating modes and command expectations | Summarize, do not paste long admin docs |
| Source authority summary | Domain-first source map and source-use rules | Avoid bulk source copying |
| App workflow context | Issue queue, task packet workflow, validation expectations | Pull from repo/GitHub current state |
| Playtest context | Active playtest state and safe improvisation boundaries | Refresh per play session |
| Targeted task packet | One issue, chat, or design problem | Prefer this over broad refresh |

## First Upload Recommendation

First upload the baseline bridge set:

- `00-BOOTSTRAP.md`
- `01-SLOT-MAP.md`
- `02-GLOBAL-PROJECT-INSTRUCTIONS.md`
- `03-OPERATING-MODEL.md`
- `04-REFRESH-AND-READINESS-RULES.md`
- `90-OPEN-QUESTIONS-AND-CONTENT-PLAN.md`

After upload, ask ChatGPT Project to summarize:

1. what it is allowed to treat as source authority;
2. what the bridge files are for;
3. what it should do when current source or GitHub state matters;
4. which future packet family it recommends populating first.

Record the upload and result before calling the project current for this bridge baseline.

