# Synced Chat Packet: Handoff Automation Planning

Date: 2026-06-11
Chat/topic title: Plan next useful Nexus automation
Prepared by: Codex, revised by ChatGPT Nexus Project
Related issue or roadmap lane: Nexus app workflow automation; follow-up to Issue #43 session discipline and bridge workflow
State: ready-for-Codex

## Current Question Or Decision

Plan the next useful Nexus automation: a repo-local handoff/synced-chat packet generator and index updater, with bounded GitHub workflow support.

Codex originally recommended building a small handoff/synced-chat packet generator and index updater before broader duplicate-check, observation-mining, or issue-clustering automation. ChatGPT planning refined that recommendation into an implementation-ready Codex plan.

User intent: the user will return to this synced-chat packet in Codex and have Codex execute the plan after local repo inspection and normal validation.

This packet is workflow implementation context. It is not Nexus source canon and does not authorize changes to live local `00 Source`.

## Why This Automation First

The repo already has approved bridge destinations, handoff templates, synced-chat packet states, and session-discipline expectations, but creating a useful planning packet still requires repeated manual or AI-assisted copying, naming, index updates, and guardrail wording.

The next high-value automation should make that workflow repeatable:

- generate a correctly named synced-chat or handoff packet from a short topic, lane, issue, and state;
- update `SYNC-INDEX.md` or `HANDOFF-INDEX.md`;
- include the startup guardrail that the receiving chat summarizes readiness before acting;
- emit a platform-specific opening prompt for ChatGPT, Codex, or Replit;
- check whether related packets or issues already exist before creating a new packet;
- support bounded GitHub issue lookup/linking/comment/create behavior when explicitly requested.

## Accepted Decisions

- Use this existing synced-chat packet as the durable plan document rather than creating a second packet for the same chat.
- Set this packet to `ready-for-Codex`.
- Start with synced-chat packet generation and `SYNC-INDEX.md` updating as the core v0 workflow.
- Include bounded GitHub workflow operations in scope.
- Treat GitHub Issues as task/evidence trails, not Nexus source canon.
- Keep the first automation repo-local, deterministic, and fail-safe.
- Prefer a script or CLI helper first; consider a Codex skill wrapper only after behavior stabilizes.

## Controlling Repo Paths

Codex should inspect these before implementation:

- `AGENTS.md`
- `NEXUS_ISSUE_INDEX.md`
- `NEXUS_HANDOFF_TEMPLATE.md`
- `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
- `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`
- `.agents/skills/nexus-handoff-bridge/SKILL.md`
- `.agents/skills/nexus-session-discipline/SKILL.md`

The packet being updated is:

`docs/chatgpt-project-bridge/synced-chats/2026-06-11-handoff-automation-planning.md`

## What This Supplements Or Replaces

Supplements:

- existing synced-chat packet workflow;
- `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`;
- `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`;
- Issue #43 session discipline / bridge workflow follow-up context.

Replaces:

- nothing.

Guidance:

- Do not create a duplicate synced-chat packet for this same planning thread.
- Do not replace the bridge system or invent new packet destinations.

## Source / Currentness Status

This packet is based on ChatGPT Project planning and repo-side bridge workflow context available during the chat.

Codex/local must verify current repo state before implementation. Do not treat this packet as proof that local live source or repo workflow files are current.

## Likely Implementation Shape

Recommended v0 shape:

1. Repo-local script or CLI helper first.
2. Optional Codex skill wrapper later, after script behavior stabilizes.
3. Plain Markdown packet output.
4. Safe index insertion/update.
5. Dry-run behavior for all file and GitHub workflow operations.
6. Explicit flags for GitHub issue creation or issue commenting.

Likely inputs:

- packet type, defaulting to `synced-chat`;
- date, defaulting to current date but overrideable;
- topic title;
- topic slug;
- related issue or roadmap lane, optional;
- packet state;
- current question or decision;
- accepted decisions, optional;
- open questions, optional;
- referenced paths, optional;
- next recommended Codex action, optional;
- target platform prompt style, optional: ChatGPT, Codex, or Replit.

Likely outputs:

- created packet path;
- updated index path;
- warnings, if any;
- generated receiving-session prompt;
- validation reminder;
- GitHub workflow operations proposed or performed.

## V0 Core Scope

Build a deterministic repo-local helper that can:

1. Create a correctly named synced-chat packet at:

   `docs/chatgpt-project-bridge/synced-chats/YYYY-MM-DD-<topic>.md`

2. Include the required synced-chat packet sections:

   - chat/topic title;
   - date;
   - related issue or roadmap lane, if any;
   - current question or decision;
   - accepted decisions;
   - open questions;
   - repo paths or source docs referenced;
   - next recommended Codex action, if any;
   - state.

3. Support allowed packet states:

   - `planning-only`;
   - `ready-for-issue`;
   - `ready-for-Codex`;
   - `parked`.

4. Update or append the matching row in:

   `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`

5. Prevent obvious duplicate/collision errors:

   - refuse to overwrite an existing packet by default;
   - detect identical target path;
   - warn if a similar slug/title already appears in the index.

6. Emit a copyable opening prompt for the receiving chat or Codex session.

7. Include receiving-session guardrail language:

   - summarize goal, paths, packet state, likely scope, risks, and next safe action before acting;
   - do not claim ChatGPT Project has refreshed unless upload/paste/searchability is confirmed or logged;
   - do not mutate live Nexus source.

## Bounded GitHub Workflow Support

The helper should support GitHub workflow operations in v0, but only with explicit visibility and safety gates.

In scope:

- inspect `NEXUS_ISSUE_INDEX.md`;
- search or inspect open GitHub Issues for related work;
- report likely related issues before creating a packet;
- link a generated packet to an existing issue when selected;
- optionally add a concise issue evidence comment when explicitly requested;
- optionally create a narrow implementation issue when explicitly requested and no suitable issue exists.

Required safety behavior:

- dry-run mode available;
- explicit flag required for issue creation;
- explicit flag required for issue comments;
- print all intended file and GitHub workflow operations before performing them;
- include repo, issue number, file path, and operation type in output;
- prefer issue comments over issue-body edits unless repo conventions say otherwise.

Out of v0 unless separately approved:

- broad duplicate clustering;
- observation mining;
- roadmap restructuring;
- source promotion;
- live `00 Source` mutation;
- ChatGPT Project upload claims.

## Acceptance Criteria

Codex should consider v0 acceptable when:

1. A new synced-chat packet can be generated from minimal inputs.
2. The packet path follows the approved naming pattern.
3. The packet includes all required sections.
4. `SYNC-INDEX.md` is updated predictably.
5. Existing packet collisions are blocked by default.
6. Similar existing packet/index entries produce warnings.
7. Generated output includes the receiving-session guardrail.
8. The helper can detect likely related issues before suggesting issue creation.
9. The helper can link a generated packet to an existing issue.
10. Optional issue creation/commenting requires explicit flags.
11. Dry-run output clearly shows proposed repo and GitHub workflow operations.
12. Repo validation passes using the appropriate workflow command.
13. Codex reports changed files, GitHub operations, and validation evidence.

## Suggested Implementation Sequence

1. Inspect repo conventions and current files named in this packet.
2. Decide whether this belongs as a script, CLI helper, or repo-local skill wrapper.
3. Decide whether GitHub workflow support should use GitHub CLI, GitHub API, existing repo tooling, or another repo-approved mechanism.
4. Implement the smallest synced-chat-only v0.
5. Implement safe `SYNC-INDEX.md` update.
6. Implement related issue lookup.
7. Implement dry-run reporting for all file and GitHub workflow operations.
8. Implement optional issue comment/create behavior behind explicit flags.
9. Test on a harmless sample packet name or fixture.
10. Verify collision behavior.
11. Verify index update behavior.
12. Run repo validation.
13. Report changed files, GitHub operations performed, and validation evidence.
14. Ask the user before expanding to handoff packets, broad duplicate clustering, observation mining, or issue-state automation.

## Open Questions For Codex To Resolve Locally

- Which implementation location matches repo conventions?
- Which command/runtime should own the helper?
- Should handoff packet support be v0.1 or included behind a flag in v0?
- What exact GitHub issue lookup mechanism is already available or preferred?
- What exact validation command should gate completion?

## Next Recommended Codex Action

Codex should use this packet as the execution plan for a repo-local bridge packet generator with bounded GitHub workflow support.

First, Codex should summarize:

- goal;
- controlling repo paths;
- packet state;
- likely implementation shape;
- risks;
- next safe action.

Then Codex should inspect local repo truth, implement the narrow v0, run validation, and report evidence, provided the user's current Codex prompt authorizes execution.

## What Not To Redo

- Do not rebuild the existing ChatGPT bridge docs.
- Do not replace the handoff or synced-chat indexes with a new system.
- Do not create another synced-chat packet for this same planning thread.
- Do not implement broad duplicate-check, observation-mining, or issue-clustering automation in the first pass unless separately scoped.
- Do not mutate live Nexus source.
- Do not claim ChatGPT Project upload/searchability is complete unless confirmed or logged.

## Suggested Codex Opening Prompt

```text
Use the Nexus app repo bridge packet at:

docs/chatgpt-project-bridge/synced-chats/2026-06-11-handoff-automation-planning.md

Goal: execute the ready-for-Codex plan for a repo-local synced-chat packet generator and index updater with bounded GitHub workflow support.

First summarize the goal, controlling repo paths, packet state, likely implementation shape, risks, and next safe action. Then inspect local repo truth and implement the narrow v0 if no blocker is found. Keep v0 deterministic and fail-safe. Do not mutate live Nexus source. Do not claim ChatGPT Project refresh/upload/searchability unless confirmed or logged.
```
