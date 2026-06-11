# Synced Chat Packet: Handoff Automation Planning

Date: 2026-06-11
Chat/topic title: Plan next useful Nexus automation
Prepared by: Codex
Related issue or roadmap lane: Nexus app workflow automation; likely follow-up to Issue #43 session discipline and bridge workflow
State: planning-only

## Current Question Or Decision

Decide the next most useful Nexus automation to build after the current bridge, roadmap, source index, and session-discipline layers.

Codex recommendation: build a small handoff/synced-chat packet generator and index updater before broader duplicate-check or observation-mining automation.

## Why This Automation First

The repo already has approved bridge destinations, thread-title rules, handoff templates, and synced-chat packet states, but creating a useful planning packet still requires manual copying, naming, index updates, and guardrail wording.

The next high-value automation should make that workflow repeatable:

- generate a correctly named synced-chat or handoff packet from a short topic, lane, issue, and state;
- append or update the matching row in `SYNC-INDEX.md` or `HANDOFF-INDEX.md`;
- include the startup guardrail that the receiving chat summarizes readiness before acting;
- emit a platform-specific opening prompt for ChatGPT, Codex, or Replit;
- optionally check whether related packets or issues already exist before creating a new packet.

This is smaller and safer than automating issue clustering, duplicate detection, or side-observation mining, while still reducing the most common friction in the current workflow.

## Accepted Decisions

- Treat this as planning only until the user approves implementation.
- Use existing bridge destinations rather than inventing a new packet lane.
- Do not claim ChatGPT Project has refreshed merely because the repo packet exists.
- Keep the first automation repo-local and deterministic.

## Open Questions

- Should the first version be a script, a repo-local skill, or both?
- Should it create only synced-chat packets first, or both synced-chat and handoff packets?
- Should the generated packet be local-only until reviewed, or immediately update the bridge index?
- Should it support GitHub issue lookup in version one, or leave issue creation/linking manual?

## Repo Paths Or Source Docs Referenced

- `AGENTS.md`
- `NEXUS_ISSUE_INDEX.md`
- `NEXUS_HANDOFF_TEMPLATE.md`
- `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
- `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`
- `.agents/skills/nexus-handoff-bridge/SKILL.md`
- `.agents/skills/nexus-session-discipline/SKILL.md`

## Next Recommended Codex Action

Use this packet to plan a narrow implementation issue or task packet for a repo-local bridge packet generator. The receiving planning chat should first summarize readiness, likely scope, and risks, then wait for user approval before editing files.

## What Not To Redo

- Do not rebuild the existing ChatGPT bridge docs.
- Do not replace the handoff or synced-chat indexes with a new system.
- Do not implement duplicate-check, observation-mining, or issue-clustering automation in the first pass unless separately scoped.
- Do not mutate live Nexus source.
- Do not claim ChatGPT Project upload/searchability is complete unless confirmed or logged.

## Notes

Suggested thread title: `Plan | Bridge Automation | Packet Generator`

Suggested ChatGPT opening prompt:

```text
Use the Nexus app repo bridge packet at:
docs/chatgpt-project-bridge/synced-chats/2026-06-11-handoff-automation-planning.md

Goal: quickly plan the next useful Nexus automation. Codex recommends a small repo-local handoff/synced-chat packet generator and index updater.

First summarize the goal, controlling repo paths, current packet state, likely implementation shape, risks, and next safe action. Do not start implementation or claim the ChatGPT Project is refreshed until the user approves the next step.
```
