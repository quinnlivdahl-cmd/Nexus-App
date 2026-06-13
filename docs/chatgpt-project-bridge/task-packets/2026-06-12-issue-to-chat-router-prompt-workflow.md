# Task Packet: Issue-to-Chat Router Prompt Workflow

Date: 2026-06-12
Prepared by: ChatGPT Project Steward mode
State: saved-for-reuse
Related lane: ChatGPT Project bridge / issue-to-chat routing

## Purpose

Save a reusable prompt and workflow for opening a useful Nexus chat from an open GitHub issue.

The workflow decides whether the next chat should be planning or drafting, then routes durable output to the correct repo lane.

This is a bridge/workflow aid only. It is not Nexus source canon, app implementation, or GitHub issue approval.

## Saved Reusable Prompt

```md
Mode: Steward

Steward — Issue-to-Chat Router — 2026-06-12

Goal: open the next useful Nexus chat from an open GitHub issue, then route it into either planning or drafting.

Use the current bridge baseline first. Then inspect the active repo issue queue through:

- `NEXUS_ISSUE_INDEX.md`
- the relevant open GitHub issue
- roadmap files only if the issue references a roadmap lane:
  - `docs/nexus-roadmap/README.md`
  - `docs/nexus-roadmap/ROADMAP-INDEX.md`
  - `docs/nexus-roadmap/ROADMAP.md`

Issue target:

- Preferred issue: `#<ISSUE NUMBER OR “choose next best open issue”>`

First summarize:

1. issue title and current state;
2. what the issue is really asking for;
3. whether the next chat should be:
   - **Planning**: clarify scope, sequence, acceptance criteria, repo task shape, or Codex handoff;
   - **Drafting**: produce actual Nexus language, schemas, rules text, source-ready prose, or a working draft;
4. what repo path should receive durable output.

Routing rules:

- If this is **Planning**, create or prepare a synced-chat packet at:

  `docs/chatgpt-project-bridge/synced-chats/YYYY-MM-DD-<topic>.md`

  Also update:

  `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`

  State should usually be `planning-only`, `ready-for-issue`, or `ready-for-Codex`.

- If this is **Drafting**, pass the chat to Draft mode and propose one durable draft destination:

  - evolving game-system draft:
    `docs/game-system-contracts/drafts/<TOPIC>_WORKING_DRAFT.md`

  - source draft candidate:
    `docs/source-draft-candidates/YYYY-MM-DD-<domain>-<topic>.md`

  - or a new repo folder only if the existing draft/candidate folders are not suitable. If proposing a new folder, explain why the existing lanes are insufficient.

Preservation rule:

Do not delete, replace, supersede, or promote source material unless the issue explicitly authorizes it or the user approves a replacement path.

Output required:

- recommended mode: Steward planning, Draft drafting, or split;
- proposed chat name;
- issue summary;
- target repo path;
- whether the output supplements or replaces anything;
- exact next action;
- what not to touch.

Do not implement or push changes until the user explicitly authorizes the write.
```

## Recommended User Workflow

### 1. Pick the issue source

Use one of these inputs:

- `Use issue #<number>` when the target issue is obvious.
- `Choose next best open issue` when the user wants Steward to inspect the issue queue and recommend the next chat.
- `Use this issue cluster: #<number>, #<number>, #<number>` when related issues should be grouped before routing.

### 2. Open the router chat

Start a new ChatGPT Project chat with the saved prompt.

Fill the `Issue target` line with the selected issue number or leave `choose next best open issue` in place.

### 3. Router produces one of three outcomes

- **Planning chat**: use when the issue needs scope, acceptance criteria, sequencing, or Codex handoff first.
- **Draft chat**: use when the issue is ready for rules text, schemas, source-ready prose, or a working draft.
- **Split**: use when the issue needs a short planning pass before drafting.

### 4. Durable output routing

For planning:

- Save a synced-chat packet:
  `docs/chatgpt-project-bridge/synced-chats/YYYY-MM-DD-<topic>.md`
- Update:
  `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`

For drafting:

- Save a working draft:
  `docs/game-system-contracts/drafts/<TOPIC>_WORKING_DRAFT.md`

or

- Save a source draft candidate:
  `docs/source-draft-candidates/YYYY-MM-DD-<domain>-<topic>.md`

Only create a new folder if the router explains why the existing lanes are insufficient.

### 5. Approval boundary

The router chat may recommend repo writes, but should not push changes until the user explicitly says to write or push.

Preferred approval phrases:

- `Save the planning packet.`
- `Push the draft packet.`
- `Create the working draft file.`
- `Update the index too.`

### 6. Closeout note

Every saved output should state:

- intended placement;
- what it supplements or replaces;
- whether old files may be deleted only after verification;
- status/date notes;
- what Codex should inspect next.

## Fast Operating Recipe

Use this when speed matters:

1. User says: `Stewy, use issue #<number> with the issue-to-chat router.`
2. Steward summarizes the issue and recommends `Planning`, `Draft`, or `Split`.
3. User says: `Proceed with that route.`
4. Steward opens or prepares the routed chat prompt.
5. If durable repo output is needed, user says: `Save it to repo.`
6. Steward writes only the named packet/draft path and any required index row.

## What Not To Do

- Do not make the router prompt a Nexus source document.
- Do not upload it as a permanent ChatGPT Project Source unless the bridge baseline later adds a prompt-library slot.
- Do not use the router to bypass issue review or source-currentness checks.
- Do not create new repo folders casually.
- Do not treat a planning packet as execution approval.

## Placement And Status Notes

Intended placement:

`docs/chatgpt-project-bridge/task-packets/2026-06-12-issue-to-chat-router-prompt-workflow.md`

This supplements the bridge workflow and synced-chat routing model.

It replaces nothing.

Old files may not be deleted.

Status: saved for future reuse on 2026-06-12.
