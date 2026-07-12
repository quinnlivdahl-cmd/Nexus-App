# Nexus Project Operations

The operational context for coordinating Nexus planning, execution, project state, and movement between human and agent work surfaces. It defines development and workflow language only; Nexus Game terms, player-facing rules, lore, and product decisions belong in the Nexus Game context and accepted ADR index.

## Language

**GitHub Issue**:
The live execution packet for scoped Nexus work, including the goal, acceptance criteria, progress, closeout evidence, and current open or closed state. A GitHub Issue transfers task authority; it does not become Nexus game-source authority or app implementation truth.
_Avoid_: Game canon, source truth, GitHub Project card

**Nexus Issue Index**:
The repo-readable Markdown map in `NEXUS_ISSUE_INDEX.md` that explains how known issues relate to roadmap lanes, blockers, parked ideas, and completed work. It helps agents orient before planning, but live GitHub remains authoritative for issue state when the two disagree.
_Avoid_: Replacement tracker, source authority, stale queue truth

**ChatGPT Project**:
The planning, brainstorming, drafting, and discussion lane for Nexus work when current local repo inspection, validation, commits, pushes, issue updates, or source-authority checks are not yet needed. It consumes curated context that may be stale until upload, paste, or searchability is confirmed for a named scope.
_Avoid_: Current repo authority, source of record, Codex substitute

**ChatGPT Project Bridge**:
The repo-trackable layer under `docs/chatgpt-project-bridge` that prepares stable context, packets, and refresh rules for ChatGPT Project. The bridge translates selected repo context for discussion and drafting; it does not prove ChatGPT Project has been refreshed and does not replace the app repo, GitHub Issues, canonical source docs, Obsidian, or Drive.
_Avoid_: Source mirror, upload proof, permanent task tracker

**Synced-Chat Packet**:
A repo-visible packet that preserves useful ChatGPT Project planning or discussion that is not its own GitHub Issue. It makes context retrievable by Codex and future chats, but it is not execution approval and must not be treated as current repo truth without verification.
_Avoid_: Handoff Packet, issue body, approval to edit

**Handoff Packet**:
A concrete transfer note for moving ready-enough work between ChatGPT, Codex, Replit, GitHub Issues, or a fresh session. A handoff should name the next safe action and relevant constraints, but the receiving agent still verifies live repo, issue, and source state before acting.
_Avoid_: Synced-Chat Packet, broad planning archive, permission to skip discovery

**Task Packet**:
A narrow task-shaped packet, prompt, or template for focused work. In Nexus, GitHub Issues are the primary task packets; repo task packets support bridge and handoff flows without replacing the live issue tracker.
_Avoid_: Broad roadmap, general chat transcript, duplicate issue tracker

**Source Draft Candidate**:
Draft material that may become Nexus source after review and promotion. It can preserve source-like language for later work, but it is not canonical game source until it passes the approved source-promotion route.
_Avoid_: Live source, accepted canon, implementation authority

**Obsidian Project Hub**:
The human-facing Nexus note and project-memory layer under `C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game`. It supports reading, routing, current-state notes, and pointer navigation; it is not an independent source authority over the repo.
_Avoid_: App repo, canonical source home, GitHub issue tracker

**Drive Payload Home**:
The bulky-materials and exchange surface for Nexus bundles, exports, workbench output, and large handoff payloads. Drive can hold useful context for retrieval or transfer, but Drive storage does not make a file current, authoritative, or accepted.
_Avoid_: Source of truth, unscoped Drive search, repo replacement
