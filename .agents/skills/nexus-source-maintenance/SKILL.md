---
name: nexus-source-maintenance
description: Maintain Nexus canonical game-source routing and generated source indexes. Use when locating source authority, deciding where source-like material belongs, or adding, removing, renaming, or editing files under docs/nexus-game-source/source.
---

# Nexus Source Maintenance

## Unique Trigger

Use this workflow only for Nexus source-authority routing or canonical source-file maintenance. Do not use it for ordinary app implementation, issue administration, roadmap edits, or ChatGPT packet work.

## Owner

This is the sole repo-local skill for source routing and source-index maintenance. `docs/nexus-game-source/source` owns the current textual game definition; accepted ADRs control only affected claims until reconciliation.

## Workflow

1. Read `AGENTS.md`, `docs/admin/nexus-distributed-surfaces.md`, `docs/nexus-game-source/README.md`, and the relevant canonical source or ADR files.
2. Classify each input as canonical source, accepted decision, implementation truth, candidate material, generated Obsidian pointer, Drive payload, or historical evidence.
3. For routing-only requests, name the correct owner and avoid moving or copying material.
4. For approved canonical source changes, edit the owning domain document. Preserve unaffected material and keep ADR links as rationale and provenance.
5. When canonical source files change, run:
   - `corepack pnpm run source:index`
   - `corepack pnpm run source:index:check`
   - `corepack pnpm run validate:workflow`
6. Review both generated index diffs and confirm they match the source change before commit.

## Boundaries

- Do not hand-edit generated source indexes when the generator can produce them.
- Do not copy the source corpus into Obsidian; generated cards are navigation only.
- Do not overwrite source from Obsidian, Drive, archives, or review candidates without explicit approval.
- Do not promote provisional material, infer currentness from filenames, or rename the canonical source root as incidental cleanup.
