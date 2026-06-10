# Nexus Issue Index

Status: active Markdown index
Repo: `quinnlivdahl-cmd/Nexus-App`
Local path: `C:\Nexus Mother Folder\01 REPOS\03 Nexus App\Nexus-App\Nexus-App`

## Purpose

This file is the AI-readable issue and work index for the Nexus app repo.

GitHub Issues are the task packets. This Markdown index explains how those packets relate to the roadmap, readiness, blockers, parked ideas, and completed work. It should remain understandable without a GitHub Projects board.

GitHub Projects may be useful later as a visual board. This file is the first shared planning surface because it is plain Markdown, script-friendly, reviewable in the repo, and easy for Codex, ChatGPT, Replit, and humans to read.

## Controlling Planning Context

- GitHub Issue 42: `Plan Codex Agent and Skill Automation Upgrade for Nexus`
- Latest Issue 42 planning handoff comments for agent/skill/task-intake workflow design
- Roadmap candidate: `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\90 Codex Review\01 Review Ready\2026-06-07_Nexus_Global_Project_Roadmap_Candidate.md`
- App transition control: `NEXUS_ISSUE_TRANSITION.md`
- App scope roadmap: `NEXUS_LOCAL_PLAYABLE_ALPHA.md`

Older slot/admin source documents can provide historical context, but they are not controlling authority for the current Codex-driven admin workflow redesign unless the user explicitly restores them.

## Index Rules

- Keep active work tied to GitHub issue numbers when possible.
- Keep issue packets small enough to execute and verify.
- Mark blocked tasks as blocked instead of forcing an implementation plan.
- Link prerequisite issues from blocked or parked work.
- Move completed work out of active sections after verification.
- Preserve useful parked ideas without treating them as ready execution work.
- Do not use this index as a substitute for Nexus source authority or app implementation truth.

## Readiness States

- `ready`: scoped, has a clear goal, has validation, and has no known blocking prerequisite.
- `blocked`: useful task, but a prerequisite or decision is missing.
- `parked`: worth preserving, but not near-term execution work.
- `in-progress`: actively being worked in Codex, Replit, GitHub, or another named surface.
- `done`: completed and verified enough to leave the active queue.

## Active Issues

Use this section for ready or in-progress issue packets.

| Issue | Title | State | Planning anchor | Depends on | Next action |
|---|---|---|---|---|---|
| #42 | Plan Codex Agent and Skill Automation Upgrade for Nexus | in-progress | Roadmap Lane 5 / workflow automation | none | Batch-one instruction and index layer |

## Blocked Issues

Use this section for tasks that should not be executed until a prerequisite is solved.

| Issue | Title | Missing prerequisite | Blocking issue | Recommended action |
|---|---|---|---|---|
| TBD | TBD | TBD | TBD | Start or update a prerequisite task packet |

## Parked Work

Use this section for useful ideas that are not ready, not urgent, or too broad for the current batch.

| Item | Reason parked | Revisit trigger |
|---|---|---|
| GitHub Projects board | Markdown index comes first | Add after issue template and label conventions stabilize |
| Repo-local skills | Needs stable packet/index language first | Add after batch-one files are used on real issues |
| Validation scripts | Needs stable templates first | Add after task packet fields stop changing |
| MCP/subagents | Too much machinery for batch one | Revisit after repo-local workflow proves useful |
| Exact file-location hardening | Mother Folder and GitHub repo structure still settling | Add exact locations and filenames to agent files after structure stabilizes |
| Source-in-repo placement | Domain reorganization not complete | Add source to repo only after domain reorg is complete and placement is approved |

## Completed Issues

Move verified completed work here when it no longer belongs in the active queue.

| Issue | Title | Completed evidence | Follow-up |
|---|---|---|---|
| TBD | TBD | TBD | TBD |

## Future Script Hooks

Future scripts should be able to:

- find this file from the repo root;
- list active, blocked, parked, and completed items;
- detect missing task packet fields;
- identify prerequisite links;
- flag issue-index drift;
- verify referenced local paths exist;
- generate platform-specific continuation prompts from handoff packets.
