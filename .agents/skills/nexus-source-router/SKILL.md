---
name: nexus-source-router
description: Use when locating Nexus source authority, separating source truth from repo implementation, or planning source placement.
---

# Nexus Source Router

Use this skill when a task touches Nexus source docs, the domain-first source corpus, live source authority, lore/rules authority, or source-to-app context.

Workflow:

1. Identify the task's source question.
2. Read the relevant repo workflow docs first, then the named live Nexus source or Golden Truth source files.
3. Separate:
   - live source authority;
   - repo implementation truth;
   - candidate/review material;
   - historical or old slot/admin context.
4. Treat Issue 42 and the roadmap candidate as controlling context for the current workflow redesign.
5. Treat old slot/admin docs as historical for admin redesign unless the user explicitly restores them.
6. Treat `docs/nexus-game-source/source` as the user-designated Golden Truth source home unless a later task explicitly supersedes it.
7. Treat `C:\Users\Quintin Livdahl\Nexus\00 Source` as the promoted live Obsidian working source. Verify it against Golden Truth when local vault currentness matters.
8. When Golden Truth source files are added, removed, renamed, or changed, also use `.agents/skills/nexus-source-index-maintainer/SKILL.md`.
9. When Golden Truth must be promoted into the vault, also use `.agents/skills/nexus-golden-source-promoter/SKILL.md`.
10. Recommend placement or promotion boundaries without moving source files unless explicitly approved.

Do not:

- overwrite Golden Truth from vault/archive material without explicit approval;
- promote provisional material to canon;
- infer currentness from filenames alone.
