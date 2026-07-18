# ChatGPT Project Bridge

Status: active repo-side bridge orientation
Repo: `quinnlivdahl-cmd/Nexus-App`

## Purpose

This folder is the repo-trackable bridge between Nexus and the ChatGPT Nexus Project.

The permanent ChatGPT Project baseline is intentionally small. Changing task context, packets, handoffs, and preservation material stay in GitHub and are retrieved only when relevant.

## Two-File Baseline

Upload or paste only these permanent baseline files:

1. `PROJECT-INSTRUCTIONS.md`
2. `BRIDGE-INDEX.md`

`PROJECT-INSTRUCTIONS.md` owns ChatGPT behavior, authority, currentness, clarification, and the requirement to request targeted context when material context is missing.

`BRIDGE-INDEX.md` owns retrieval paths, packet destinations, baseline composition, and refresh verification routing.

Changing a rule should update its single owner rather than synchronized copies.

`BASELINE.json` is the repo-only machine-readable ownership manifest used by validation. It is not a third Project Source and should not be uploaded to ChatGPT.

## Repo-Side Context

Do not upload changing packet indexes or packet folders as permanent Project Sources. Keep them in GitHub and retrieve them when current contents matter:

- Synced Chat index and packets: `synced-chats/SYNC-INDEX.md`
- Non-issue handoff index and packets: `handoffs/HANDOFF-INDEX.md`
- Long-chat preservation packets: `preservation/`
- Targeted task packets: `task-packets/`
- Evolving game-system drafts: `../game-system-contracts/drafts/`
- Source draft candidates: `../source-draft-candidates/`

Existing packets, handoffs, and preserved chats remain in their dedicated folders. Bridge Consolidation #80 does not rewrite their contents.

## Current Source And Task Retrieval

- Canonical source index: `../nexus-game-source/source/SOURCE-INDEX.md`
- Accepted ADR index: `../adr/README.md`
- Roadmap index: `../nexus-roadmap/ROADMAP-INDEX.md`
- Active task state: live GitHub Issues
- Repo-readable task map: `../../NEXUS_ISSUE_INDEX.md`
- Maintained cross-surface registry: `../admin/nexus-distributed-surfaces.md`

Use the exact routes and packet-request behavior in the two baseline files. Do not treat the bridge as a second source corpus.

## Historical Bridge Material

The superseded seven-file baseline and unpromoted mode-workflow candidate are searchable through `../archive/README.md`. They are deliberate-retrieval provenance, not current Project context, and must not be uploaded as part of the baseline.

## Updating The Bridge

1. Edit only the baseline owner for the rule or route being changed.
2. Update repo-side indexes or packets only when their own current contents changed.
3. Run `corepack pnpm run validate:workflow`.
4. Commit and push the repo change when appropriate.
5. Warn that ChatGPT Project reupload is needed when either baseline file changed.
6. Record upload and searchability confirmation outside the uploaded baseline before calling it current for a named scope.
