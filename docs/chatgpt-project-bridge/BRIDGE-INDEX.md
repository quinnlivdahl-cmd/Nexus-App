# Nexus ChatGPT Project Bridge Index

Status: active ChatGPT Project baseline file
Companion baseline file: `PROJECT-INSTRUCTIONS.md`

## Purpose

This is the stable routing map for Nexus context used by ChatGPT Project. It names exact retrieval surfaces and packet destinations without copying their changing contents into the permanent Project baseline.

Follow `PROJECT-INSTRUCTIONS.md` for behavior, authority, currentness, clarification, and the Context Packet Requirement.

## Baseline Package

The complete permanent upload set is:

1. `PROJECT-INSTRUCTIONS.md`
2. `BRIDGE-INDEX.md`

`README.md` is repo-side orientation and is not part of the upload set. Changing packets and packet indexes are not permanent Project Sources.

## Retrieval Routes

| Needed context | Retrieve or request |
|---|---|
| Canonical rules, lore, game concepts, or domain language | `docs/nexus-game-source/source/SOURCE-INDEX.md`, then the exact indexed source files |
| Accepted decision rationale | `docs/adr/README.md`, then the applicable accepted ADR |
| Current task state or acceptance criteria | The live GitHub Issue; use `NEXUS_ISSUE_INDEX.md` only as a repo-readable map |
| Current implementation behavior | Nexus-App code through Codex/local inspection |
| Human-facing planning or project memory | Obsidian Nexus hub through the maintained registry reached from `docs/admin/nexus-distributed-surfaces.md` |
| Bulky payload, export, workbench, or handoff bundle | Drive lane through the maintained registry reached from `docs/admin/nexus-distributed-surfaces.md` |
| Repo-accessible roadmap context | `docs/nexus-roadmap/ROADMAP-INDEX.md`, then the exact roadmap file; task state still comes from GitHub Issues |
| Prior ChatGPT planning or discussion | `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`, then the named packet |
| Non-issue transfer context | `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`, then the named handoff |

## Packet Routes

| Packet need | Approved destination | Use when |
|---|---|---|
| Targeted task context | `docs/chatgpt-project-bridge/task-packets/YYYY-MM-DD-<issue-or-topic>.md` | One issue, source review, playtest, or planning problem needs narrow context |
| Synced Chat packet | `docs/chatgpt-project-bridge/synced-chats/YYYY-MM-DD-<topic>.md` | Planning or discussion should remain discoverable by Codex |
| Non-issue handoff | `docs/chatgpt-project-bridge/handoffs/YYYY-MM-DD-<topic>.md` | A concrete transfer has no controlling GitHub Issue |
| Long-chat preservation packet | `docs/chatgpt-project-bridge/preservation/YYYY-MM-DD-<topic>.md` | Accepted prose or decisions should not survive only in a prompt |
| Evolving game-system draft | `docs/game-system-contracts/drafts/<TOPIC>_WORKING_DRAFT.md` | A multi-chat design sequence has a stable accumulating artifact |
| Source draft candidate | `docs/source-draft-candidates/YYYY-MM-DD-<domain>-<topic>.md` | Material may become canonical source after review but is not canon yet |
| Short task evidence | Existing related GitHub Issue comment | A brief pointer, acceptance note, or closeout breadcrumb is enough |

Do not invent alternate packet destinations. A packet provides context; it does not authorize execution or promote material into canonical source.

## Requesting Context

When `PROJECT-INSTRUCTIONS.md` requires additional context:

1. Identify the smallest scope that could materially affect the answer.
2. Prefer an exact indexed file when one file is sufficient.
3. Otherwise request the matching packet type from the table above.
4. Name the expected packet or retrieval path instead of asking vaguely for “more context.”
5. Ask Codex/local to inspect live state or create the packet when ChatGPT cannot retrieve authoritative context directly.
6. After receiving context, name the files or packet used and retain any stated scope or staleness limit.

## Repo-Side Indexes

- Synced Chat discovery: `docs/chatgpt-project-bridge/synced-chats/SYNC-INDEX.md`
- Handoff discovery: `docs/chatgpt-project-bridge/handoffs/HANDOFF-INDEX.md`
- Targeted packet rules: `docs/chatgpt-project-bridge/task-packets/README.md`
- Preservation packet rules: `docs/chatgpt-project-bridge/preservation/README.md`
- Canonical source discovery: `docs/nexus-game-source/source/SOURCE-INDEX.md`
- Roadmap discovery: `docs/nexus-roadmap/ROADMAP-INDEX.md`

These indexes remain in GitHub and may change without requiring permanent Project uploads. Retrieve them when their current contents matter.

## Refresh And Upload Evidence

Follow the upload-currentness rule in `PROJECT-INSTRUCTIONS.md`. This section defines the evidence states and recording route for that rule.

Use these operational states in the external refresh record:

- `baseline-refresh-needed`: one or both baseline files changed after the last confirmed upload.
- `sent-pending-verification`: the files were uploaded or pasted, but retrieval has not been checked.
- `verified-current-for-scope`: the two baseline files were found and summarized correctly for a named scope.

Record actual upload confirmation outside the uploaded baseline, such as in the controlling GitHub Issue, refresh record, or verified handoff. Do not edit this file merely to claim that its own uploaded copy is current.

Useful searchability anchors are:

- `Context Packet Requirement`
- `smallest relevant context packet`
- `permanent ChatGPT Project baseline`
- `verified-current-for-scope`

A successful anchor check proves only that the baseline is retrievable for the named scope. It does not prove that source, implementation, GitHub, Obsidian, Drive, packet, or playtest state is current.

## Preservation And Handoff Rules

- Keep changing packets, handoffs, indexes, and preserved chats repo-side.
- Prefer a durable artifact plus a short pointer over a giant next-chat prompt.
- Preserve exact accepted language before handing off a long or context-heavy discussion.
- Link an execution-ready handoff to a GitHub Issue when practical.
- Never treat packet availability, upload confirmation, or a handoff as permission to mutate Nexus state.
