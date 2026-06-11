# ChatGPT Handoff: Nexus Self-Learning Automation Research Prompt

Date: 2026-06-10
Prepared by: ChatGPT Project
Related issue or roadmap lane: none yet; non-issue Codex research handoff
Status: ready-for-Codex-research
Destination file: `docs/chatgpt-project-bridge/handoffs/2026-06-10-nexus-self-learning-automation-research-prompt.md`

## Intended Placement

This file is a ChatGPT-to-Codex handoff packet in the approved non-issue handoff lane:

`docs/chatgpt-project-bridge/handoffs/YYYY-MM-DD-<topic>.md`

## Replacement / Supplement Guidance

- Supplements `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`.
- Does not replace source canon, roadmap files, issue packets, AGENTS instructions, or existing bridge baseline files.
- May be superseded only by a later implementation issue, synced-chat packet, task packet, or Codex research output that explicitly links back here.

## Deletion Guidance

Do not delete this file until Codex has either:

1. produced the requested research packet;
2. opened or linked a follow-up GitHub issue/task packet; or
3. created a documented supersession path.

## Source / Currentness Status

This is a prompt handoff, not a source-authority file and not implementation approval. Codex should inspect current repo files before making current-state claims.

## Context Summary

Q asked ChatGPT to commit the following Codex research prompt into the Nexus App GitHub repo. The prompt asks Codex to research one small, safe, repo-visible self-learning automation for Nexus without implementing anything yet.

## Files Or Sources Referenced

The prompt asks Codex to inspect current repo truth, including:

- root/repo `AGENTS.md` and nested agent instruction files;
- existing `.agents/`, skills, scripts, or comparable automation folders;
- `docs/admin/task-planning/codex-session-discipline-workflow.md` if present;
- the seven-file ChatGPT bridge baseline;
- handoff/synced-chat indexes if present;
- `NEXUS_ISSUE_INDEX.md`;
- roadmap files if relevant.

## Decisions Made

- Preserve the prompt in the repo as a non-issue handoff packet.
- Do not implement the automation in this step.
- Codex should produce a recommendation packet only.

## Blockers

None known. Codex must still verify the current repo structure before claiming exact currentness.

## Unresolved Questions

- Whether this later becomes a GitHub issue, task packet, synced-chat packet, or Codex implementation task.
- Whether the recommended first automation should prioritize handoff generation, tiny observation capture, or another learning loop.

## What Not To Redo

Do not reinterpret this as a request to create autonomous source-writing behavior. The working definition explicitly excludes unsupervised source rewriting, hidden memory, deletion, broad context dumps, and unapproved issue creation.

## Next Safe Action

Codex should run the research prompt below and produce `SELF_LEARNING_AUTOMATION_RESEARCH.md` as a candidate report, or print the full candidate report if no output path is appropriate.

## Research Prompt For Codex

```text
Research prompt for Codex — Nexus self-learning automation

Goal:
Research and recommend one small, safe “self-learning” automation for the Nexus Codex workflow.

Do not implement yet. Produce a recommendation packet only.

Working definition:
“Self-learning automation” does not mean autonomous source rewriting or unsupervised game-design changes. It means a repo-local workflow that helps Nexus agents learn from prior work by capturing, indexing, summarizing, or routing recurring observations, mistakes, decisions, prompts, handoffs, issue outcomes, validation results, or side items.

Use current repo truth. Inspect relevant files before making claims.

Required context to inspect:
1. Root/repo `AGENTS.md` and any nested agent instruction files.
2. Existing `.agents/`, skills, scripts, or comparable automation folders if present.
3. `docs/admin/task-planning/codex-session-discipline-workflow.md` if present.
4. ChatGPT bridge baseline files:
   - `docs/chatgpt-project-bridge/00-BOOTSTRAP.md`
   - `docs/chatgpt-project-bridge/01-SLOT-MAP.md`
   - `docs/chatgpt-project-bridge/02-GLOBAL-PROJECT-INSTRUCTIONS.md`
   - `docs/chatgpt-project-bridge/03-OPERATING-MODEL.md`
   - `docs/chatgpt-project-bridge/04-REFRESH-AND-READINESS-RULES.md`
   - `docs/chatgpt-project-bridge/20-SOURCE-AUTHORITY-SUMMARY.md`
   - `docs/chatgpt-project-bridge/90-OPEN-QUESTIONS-AND-CONTENT-PLAN.md`
5. Current synced-chat / handoff / preservation / task-packet indexes if present:
   - `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
   - `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`
6. `NEXUS_ISSUE_INDEX.md`
7. Current roadmap files if relevant:
   - `docs/nexus-roadmap/README.md`
   - `docs/nexus-roadmap/ROADMAP-INDEX.md`
   - `docs/nexus-roadmap/ROADMAP.md`

Research questions:
1. What recurring information should Nexus agents be learning from?
   - examples: repeated user corrections, stale-context failures, missing handoff triggers, useful tiny observations, issue closeout lessons, validation failures, repeated prompt patterns, source-routing mistakes.
2. Where is this information currently recorded, if anywhere?
3. What is the smallest automation that would improve future Codex/ChatGPT work without creating review debt?
4. Should the automation be:
   - a script,
   - a repo-local skill,
   - an AGENTS.md convention,
   - a Markdown packet generator,
   - an index updater,
   - a closeout checklist,
   - or a hybrid?
5. What should the automation explicitly not do?
   - no live source promotion,
   - no deletion,
   - no overwrite,
   - no autonomous issue creation unless approved,
   - no broad context dumps,
   - no hidden permanent memory outside repo-visible artifacts.
6. What repo paths should it read from and write to?
7. What validation command(s) should run after it creates or updates files?
8. How should ChatGPT and Codex share the resulting learning artifact?

Candidate automation shapes to evaluate:
A. Tiny Observation Ledger
   - Appends short durable observations from Codex/ChatGPT closeout.
   - Later mined into AGENTS.md, skills, task packets, or issue candidates.

B. Session Closeout Miner
   - Reads a handoff/synced-chat packet or Codex final report.
   - Extracts side tasks, side findings, tiny observations, and validation lessons.
   - Updates a small index or candidate queue.

C. Prompt Pattern Library
   - Captures successful Nexus prompts by task type.
   - Produces reusable prompt templates for Codex and ChatGPT.

D. Stale Context Incident Log
   - Records cases where stale uploaded context, source mirror drift, or missing issue/source verification caused bad work.
   - Helps decide when baseline refresh, source-index update, or targeted packet is needed.

E. Skill Recommendation Scout
   - Reviews recent task packets/issues and recommends one new Codex skill when repeated manual behavior appears.
   - Does not generate the skill unless separately approved.

F. Handoff Packet Generator + Index Updater
   - Creates small repo-local synced-chat or handoff packets from structured input.
   - Updates the relevant index.
   - Validates workflow.
   - Treat as current leading candidate if evidence supports it.

Output required:
Produce `SELF_LEARNING_AUTOMATION_RESEARCH.md` as a candidate report, or print the full candidate report if no output path is appropriate.

Report structure:
1. Summary recommendation
2. Files inspected
3. Existing workflow facts found
4. Candidate automation options considered
5. Recommended first automation
6. Why this is the smallest useful step
7. Proposed read paths
8. Proposed write paths
9. Proposed commands / validation
10. Safety boundaries
11. Risks and mitigations
12. Open questions for Q
13. Suggested next Codex implementation prompt

Decision constraints:
- Prefer small, repo-visible, auditable learning loops.
- Preserve existing content by default.
- Do not invent paths if the repo already defines approved destinations.
- Do not treat GitHub Issues as game/source canon.
- Do not treat ChatGPT Project uploads as current repo truth.
- Do not modify live Nexus source.
- Do not implement anything in this research pass.
- If a file or workflow is missing, report that plainly and recommend the smallest verification or creation step.

Final response required:
End with:
- files read;
- files created;
- files modified;
- checks/tests run;
- unresolved assumptions;
- recommended next action.
```
