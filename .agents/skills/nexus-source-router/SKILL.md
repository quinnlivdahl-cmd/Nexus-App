---
name: nexus-source-router
description: Use when locating Nexus source authority, separating source truth from repo implementation, or planning source placement.
---

# Nexus Source Router

Use this skill when a task touches Nexus source docs, the domain-first source snapshot, live source authority, lore/rules authority, or source-to-app context.

Workflow:

1. Identify the task's source question.
2. Read the relevant repo workflow docs first, then the named live Nexus source or domain-source snapshot files.
3. Separate:
   - live source authority;
   - repo implementation truth;
   - candidate/review material;
   - historical or old slot/admin context.
4. Treat Issue 42 and the roadmap candidate as controlling context for the current workflow redesign.
5. Treat old slot/admin docs as historical for admin redesign unless the user explicitly restores them.
6. Prefer live domain-first source at `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source` when current source truth matters.
7. Use `docs/nexus-domain-source-rebuild-2026-06-10/source` as the app-side repo source mirror for context-pack and rules-core planning. The path is compatibility-retained from the 2026-06-10 rebuild.
8. When mirror files are added, removed, renamed, or changed, also use `.agents/skills/nexus-source-index-maintainer/SKILL.md`.
9. Recommend placement or promotion boundaries without moving source files unless explicitly approved.

Do not:

- treat the app-side snapshot as permission to delete or overwrite live vault source;
- promote provisional material to canon;
- infer currentness from filenames alone.
