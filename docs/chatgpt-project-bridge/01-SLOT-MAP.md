# ChatGPT Project Slot Map

Status: upload-ready bridge file

## Purpose

This map replaces the old source-slot upload model with a smaller set of curated ChatGPT Project context slots.

Slots are upload/context roles, not source ownership lanes. A slot tells ChatGPT Project what kind of context a file provides and when it should be refreshed.

## Baseline Slots

| Slot | Upload file | Role | Refresh trigger |
|---|---|---|---|
| Bootstrap | `00-BOOTSTRAP.md` | First-read orientation and authority split | Major workflow or authority change |
| Slot map | `01-SLOT-MAP.md` | Defines current context slots and future packet families | New slot family, retired family, or changed upload policy |
| Global instructions | `02-GLOBAL-PROJECT-INSTRUCTIONS.md` | Always-on behavior for ChatGPT Project | Material change to project behavior expectations |
| Operating model | `03-OPERATING-MODEL.md` | Explains live source, repo/GitHub, ChatGPT, and Codex lanes | Lane or bridge model changes |
| Refresh rules | `04-REFRESH-AND-READINESS-RULES.md` | Currentness, readiness, and upload rules | New refresh workflow or verification rule |
| Source authority summary | `20-SOURCE-AUTHORITY-SUMMARY.md` | Compact authority lanes and indexed GitHub source retrieval guide | Source authority or source-index workflow changes |
| Open plan | `90-OPEN-QUESTIONS-AND-CONTENT-PLAN.md` | Deferred questions and future packet plan | After each bridge planning batch |

## Future Packet Families

These families are planned as bridge extension points after the seven-file baseline is uploaded. `20-SOURCE-AUTHORITY-SUMMARY.md` is now baseline, not a future packet.

| Family | Planned file pattern | Purpose | Create when |
|---|---|---|---|
| Current state delta | `05-CURRENT-STATE-DELTA.md` | Short update on what changed since the last project refresh | A material source/repo/workflow change affects ChatGPT discussion |
| Modes context | `10-MODES-CONTEXT.md` | Curated mode and operating behavior summary | Mode behavior is needed in ChatGPT Project |
| App workflow context | `30-APP-WORKFLOW-CONTEXT.md` | Current app repo/GitHub issue workflow summary | ChatGPT is helping plan app/repo work |
| Playtest context | `40-PLAYTEST-CONTEXT.md` | Active playtest state, constraints, and what is safe to improvise | ChatGPT is supporting a playtest session |
| Targeted task packet | `task-packets/YYYY-MM-DD-topic.md` | One-off context for a specific chat, issue, or play session | A task needs narrow current context |
| Oversized bundle | `bundles/YYYY-MM-DD-topic.zip` | Zip only when Markdown is too large or awkward | A later packet cannot remain readable as flat Markdown |

## Repo-Side Expanded Source Index

If a repo-side expanded source pool exists at `docs/nexus-domain-source-rebuild-2026-06-10/source`, it should include an index file that ChatGPT can fetch directly.

Preferred files:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.md`
- optional machine-readable companion: `docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.json`

The index should not make the repo-side source pool live source authority by itself. It should provide exact paths and routing metadata so ChatGPT can fetch relevant context when useful.

`20-SOURCE-AUTHORITY-SUMMARY.md` is part of the bridge baseline after the source index exists.

## Slot Rules

- Keep baseline bridge files small enough to upload together.
- Keep future packets mostly flat Markdown.
- Use bundles only when a concrete packet needs them.
- Do not bulk-copy live `00 Source` into this folder.
- Do not treat uploaded slots as source ownership.
- Do not rely on GitHub folder/tree URLs as the only source discovery method; provide exact indexed paths.
- When exact currentness matters, verify against live source or repo/GitHub before answering.

## Recommended Upload Order

1. Upload the seven baseline bridge files together.
2. Confirm ChatGPT Project can find and summarize the bootstrap, slot map, refresh rules, source authority summary, and source-index rule.
3. Verify the repo-side source index before expecting GitHub on-demand source retrieval to work reliably.
4. Add current-state delta only when a specific refresh is needed.
5. Add task-specific packets only when a chat or playtest needs narrower context.
