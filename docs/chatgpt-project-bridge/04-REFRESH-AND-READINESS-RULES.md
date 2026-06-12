# Refresh And Readiness Rules

Status: upload-ready bridge file

## Currentness States

Use these states for ChatGPT Project context:

- `not-needed`: the task does not need a ChatGPT Project refresh.
- `stale-but-usable`: uploaded or repo-side context is good enough for brainstorming or rough planning with a caveat.
- `targeted-packet-needed`: a narrow task, source, issue, or playtest packet is needed.
- `source-index-needed`: GitHub source context is likely useful, but exact indexed paths are missing or stale.
- `baseline-refresh-needed`: the baseline bridge files need upload because operating context changed.
- `sent-pending-verification`: files were uploaded or pasted, but searchability/use has not been checked.
- `verified-current-for-scope`: ChatGPT Project was checked and is current for a named scope.

Never use these states as proof of live source currentness.

## Readiness Gate

Before preparing a refresh, answer:

1. What exact scope needs ChatGPT Project context?
2. Which authority lane owns the current truth?
3. Which bridge file, source index, or packet should carry the context?
4. Is a full baseline refresh needed, a targeted packet enough, or just a source-index update?
5. What should not be uploaded?
6. How will upload or index availability be confirmed or logged?

Default to the smallest useful refresh.

## Bridge Edit Reupload Notice

When Codex, ChatGPT, Replit, or a human changes any baseline upload file listed in `docs/chatgpt-project-bridge/README.md`, the closeout report must include a clear reupload warning.

Use this wording shape:

```text
ChatGPT Project reupload needed: baseline bridge context changed. Reupload or paste these files before treating ChatGPT Project as current for this scope: <changed upload-set files>.
```

Do not say ChatGPT Project is refreshed or current until upload/paste and confirmation have happened.

## ChatGPT Codex Synced Chat Workflow

Use ChatGPT Project as the normal lane for broad planning, brainstorming, design discussion, speculative architecture, issue-shaping, and "what should we do next?" exploration when local repo inspection or edits are not yet needed.

Route back to Codex when the next step needs current repo truth, local source inspection, file edits, validation, commits, pushes, issue updates, or source-authority checks.

When ChatGPT prepares context for Codex, use an approved repo destination. Do not invent file paths.

## Shared Session Discipline

Use the repo workflow spec for ChatGPT/Codex session focus:

`docs/admin/task-planning/codex-session-discipline-workflow.md`

Shared lifecycle:

```text
notice -> classify -> route -> record -> sync
```

Use the same side-item classes in ChatGPT and Codex:

- side task: actionable work that may need an issue, task packet, roadmap/index entry, or separate chat;
- side finding: useful evidence, risk, or relationship to record durably;
- tiny observation: a small note to preserve at closeout if worth keeping.

ChatGPT should use this model when preparing synced-chat packets, task packets, preservation packets, or handoffs. Codex should use it when verifying repo truth, implementing, validating, committing, pushing, and updating issues.

## Shared Side-Item Recording

ChatGPT and Codex should route side items to the same approved durable project surfaces. Do not maintain separate platform-only side-item systems when a repo, issue, handoff, synced-chat packet, preservation packet, or task packet is the correct durable lane.

ChatGPT should be especially alert for side findings and tiny observations because planning chats often surface adjacent workflow, source-routing, naming, and automation notes before they become implementation tasks.

Recording a side item is disciplined work; solving it inside the wrong chat is drift. Notice, classify, and route the item without derailing the active task unless it blocks current work or the user explicitly redirects.

Until a dedicated tiny-observation log exists, route tiny observations to the nearest appropriate durable surface: issue closeout, existing issue comment, handoff, synced-chat packet, preservation packet, or task packet.

When the user explicitly directs ChatGPT to write a bridge packet, issue comment, handoff, or other approved repo artifact, ChatGPT may use the approved repo path and available connector permissions to do so. If write access is unavailable, unclear, or outside the approved destinations, prepare candidate text and route it to Codex/local instead.

Every side-item closeout should say where the item was recorded or why it was only recommended.

## Approved ChatGPT Repo Destinations

Use only these default destinations for ChatGPT Project packets unless the user, a controlling issue, or an existing repo file explicitly approves another path:

| Purpose | Approved path | Use when |
|---|---|---|
| Synced chat packet | `docs/chatgpt-project-bridge/synced-chats/YYYY-MM-DD-<topic>.md` | Normal ChatGPT planning or discussion should be visible to Codex but is not its own GitHub issue. |
| Synced chat index | `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md` | Codex needs to discover ChatGPT planning packets. |
| Non-issue handoff | `docs/chatgpt-project-bridge/handoffs/YYYY-MM-DD-<topic>.md` | ChatGPT has a concrete transfer packet, but no GitHub issue owns it yet. |
| Handoff index | `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md` | Codex needs to discover ChatGPT handoffs that are not GitHub issues. |
| Long-chat preservation packet | `docs/chatgpt-project-bridge/preservation/YYYY-MM-DD-<topic>.md` | Accepted prose or decisions are too substantial to carry only in a prompt and do not belong in a more specific draft file. |
| Targeted task packet | `docs/chatgpt-project-bridge/task-packets/YYYY-MM-DD-<issue-or-topic>.md` | One issue, chat, source review, playtest, or planning problem needs narrow context. |
| Evolving game-system draft | `docs/game-system-contracts/drafts/<TOPIC>_WORKING_DRAFT.md` | A multi-chat rules-core or game-system design sequence should accumulate in one stable working file. |
| Source draft candidate | `docs/source-draft-candidates/YYYY-MM-DD-<domain>-<topic>.md` | Material may become Nexus source later but is not live source authority. |
| GitHub issue comment | Existing related issue | Short evidence, pointers, acceptance notes, or closeout breadcrumbs. Do not use for large accepted prose by default. |

These destinations are GitHub repo paths, not a standing ChatGPT Project Source upload list. Keep changing indexes and packets in GitHub. Upload only stable bridge instructions by default, then use exact repo paths or Codex/local inspection when current packet state matters.

If the correct destination is unclear, ask the user to choose the route in plain language. Do not force filesystem details when the route choice is enough.

## Long-Chat Preservation Procedure

Use this procedure when a Nexus chat has produced substantial accepted prose, durable decisions, system contracts, source-ready language, or structured design material that should survive beyond the current conversation.

Trigger this before producing a large next-chat handoff when any of these are true:

- the chat contains accepted working prose that would be costly to reconstruct;
- the handoff would need to copy a large packet of rules, source language, schemas, or decisions;
- the user is closing a long Nexus chat;
- the work belongs to a multi-chat sequence;
- the correct preservation route is unclear;
- the next chat needs to continue from an artifact, not from memory.

Do not rely on a giant chat-only handoff as the primary preservation method. Choose the smallest durable target that preserves the work:

1. Existing evolving draft or staging file: use when the work extends an active multi-chat design sequence, such as `docs/game-system-contracts/drafts/<TOPIC>_WORKING_DRAFT.md`.
2. Repo-file preservation packet: use `docs/chatgpt-project-bridge/preservation/YYYY-MM-DD-<topic>.md` when accepted prose or decisions need durable storage but do not belong in a more specific draft file.
3. Source-draft candidate: use `docs/source-draft-candidates/YYYY-MM-DD-<domain>-<topic>.md` when the material may become Nexus source after review, but is not live source authority.
4. Issue comment preservation: use an existing GitHub issue comment for short evidence, pointers, acceptance notes, or closeout breadcrumbs. Do not use issue comments as the default container for large accepted prose.
5. Next-chat handoff only: use a handoff prompt by itself only when no durable prose, decision packet, or source-ready language needs preservation.

If the route is not clear, ask the user for the one or two decisions that control placement. Good decision prompts are route-level, for example: "update the existing evolving draft, create a preservation packet, or create a source-draft candidate?"

Each preservation artifact or closeout pointer must state:

- intended placement;
- what it supplements or replaces;
- deletion or supersession guidance;
- source/currentness status;
- date;
- originating chat or issue when relevant;
- follow-up owner or validation route.

After saving the artifact, future handoffs should point to the repo path and commit instead of carrying the full preserved packet in chat.

## Synced Chat Packet Requirements

Each synced-chat packet should include:

- chat/topic title;
- date;
- related issue or roadmap lane, if any;
- current question or decision;
- accepted decisions;
- open questions;
- repo paths or source docs referenced;
- next recommended Codex action, if any;
- state: `planning-only`, `ready-for-issue`, `ready-for-Codex`, or `parked`.

Synced-chat packets are context, not execution approval.

## Context Window Handoff Trigger

Use this procedure when a Nexus Project chat is getting long or context-heavy enough that accepted decisions, working prose, source-ready language, system contracts, or task state may become hard to preserve accurately.

This is proactive. ChatGPT should suggest a handoff or synced-chat save point when context pressure is building, even if the user has not asked for a handoff and even if no large next-chat prompt has been requested.

Because ChatGPT may not have an exact visible context-window meter, use practical warning signs:

- the chat has produced several accepted decisions or chunks of working prose;
- the user and ChatGPT are relying on earlier parts of the same chat to continue accurately;
- the chat has shifted across multiple related subtopics or work phases;
- the assistant is summarizing older context from memory instead of directly working from current visible text;
- the next step would depend on preserving exact wording, file paths, task state, or source-routing decisions;
- the work belongs to a multi-chat sequence;
- the conversation is long enough that losing earlier detail would create rework.

When these signs appear, ChatGPT should pause and say that a handoff or synced-chat packet is recommended before continuing. The suggested action should be small and concrete, for example:

> This chat is getting context-heavy. I recommend saving a synced-chat packet or handoff before we keep going so Codex can pick up from a durable repo artifact instead of a long prompt.

Then offer the smallest useful route:

1. `synced-chats/YYYY-MM-DD-<topic>.md` for planning or discussion that Codex should later find.
2. `handoffs/YYYY-MM-DD-<topic>.md` for a concrete transfer to Codex or another fresh session.
3. `preservation/YYYY-MM-DD-<topic>.md` for accepted prose or decisions that need durable storage.
4. an existing evolving draft path when the work is part of a multi-chat design sequence.

Do not wait until the user asks for a big handoff. Do not solve context pressure by pasting a giant packet into the next prompt. The goal is to create or prepare a durable artifact while the current chat still has enough context to summarize accurately.

Every handoff, synced-chat packet, or preservation artifact must state:

- intended placement;
- what it supplements or replaces;
- deletion or supersession guidance;
- source/currentness status;
- date;
- originating chat or issue when relevant;
- follow-up owner or validation route.

## Upload Confirmation Rule

Do not say "ChatGPT Project was refreshed" unless one of these is true:

- the user confirms the selected files were uploaded or pasted;
- a refresh ledger records the upload action;
- a tool or direct project check verifies the uploaded context for the named scope.

If a file is prepared but not sent, call it `upload-ready`, not current.

## Source Index Confirmation Rule

Do not say GitHub on-demand source retrieval is ready for the Nexus Source Mirror unless an index can be fetched by exact path and it lists usable source files.

Expected index path:

`docs/nexus-domain-source-rebuild-2026-06-10/source/SOURCE-INDEX.md`

A source-index check proves only that ChatGPT can discover repo-side context files by path. It does not prove local live source currentness.

If mirror files changed locally, Codex should regenerate the index with `corepack pnpm run source:index` and validate with `corepack pnpm run validate:workflow` before calling the index current.

## Roadmap Index Confirmation Rule

Do not say GitHub on-demand roadmap retrieval is ready unless the roadmap index can be fetched by exact path and it lists usable roadmap lanes and linked issues.

Expected index path:

`docs/nexus-roadmap/ROADMAP-INDEX.md`

The roadmap index is planning context. It does not replace `NEXUS_ISSUE_INDEX.md` as the active issue queue and does not promote roadmap candidate content to source canon.

If roadmap lane mapping or issue linkage changed locally, Codex should regenerate the index with `corepack pnpm run roadmap:index` and validate with `corepack pnpm run validate:workflow` before calling the index current.

## What Not To Upload By Default

- Full live `00 Source`.
- Broad source snapshots.
- App source code unless a ChatGPT discussion needs it.
- Git history or issue dumps.
- Old slot packages as if they were current.
- Zip bundles unless Markdown is too large or awkward.

## Searchability Check

When checking whether ChatGPT Project has the current bridge context, ask it about specific anchor phrases from the uploaded files, such as:

- `repo-trackable bridge layer`
- `verified-current-for-scope`
- `Slots are upload/context roles`
- `ChatGPT Project is a curated context client`
- `source-index-needed`
- `Nexus Source Mirror`

A successful searchability check proves only that the uploaded project context can find the named scope.