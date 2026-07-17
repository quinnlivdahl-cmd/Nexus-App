---
name: nexus-source-router
description: Use when locating Nexus source authority, separating source truth from repo implementation, or planning source placement.
---

# Nexus Source Router

Use this skill when a task touches Nexus source docs, the domain-first source corpus, repo source authority, lore/rules authority, or source-to-app context.

Workflow:

1. Identify the task's source question.
2. Read `docs/admin/nexus-distributed-surfaces.md`, then the relevant repo workflow docs, then the named canonical source files.
3. Separate:
   - repo canonical source authority;
   - Obsidian reading/index and generated pointer-card navigation;
   - Drive payload/export/workbench context;
   - repo implementation truth;
   - candidate/review material;
   - historical or old slot/admin context.
4. Treat Issue 42 and the roadmap candidate as controlling context for the current workflow redesign.
5. Treat old slot/admin docs as historical for admin redesign unless the user explicitly restores them.
6. Treat `docs/nexus-game-source/source` as the user-designated canonical source home unless a later task explicitly supersedes it.
7. Treat `C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game\00 Source` as generated pointer-card navigation only. Inspect the repo source directly for current content and treat broken cards as navigation drift.
8. When canonical source files are added, removed, renamed, or changed, also use `.agents/skills/nexus-source-index-maintainer/SKILL.md`.
9. Recommend canonical placement and pointer-card refresh boundaries without moving source files unless explicitly approved.

Do not:

- overwrite canonical repo source from Obsidian, Drive, or archive material without explicit approval;
- copy canonical repo source into Obsidian for browsing;
- promote provisional material to canon;
- infer currentness from filenames alone.
