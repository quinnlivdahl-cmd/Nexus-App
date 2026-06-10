# Nexus Domain Source Rebuild Snapshot

Date: 2026-06-10

## Purpose

This folder preserves the reviewed domain-first Nexus source rebuild for app/GitHub collaboration.

It is a source-reference snapshot, not app runtime code.

## Contents

- `source\` - domain-first rebuilt Nexus source tree.
- `phase-11-review\` - Phase 11 migration-readiness and staging review notes.

## Status

- Source Markdown docs: 186.
- Top-level source domains: 15.
- Live vault `00 Source` has since been migrated to the domain-first structure.
- This snapshot was copied from the reviewed staging lane in `90 Codex Review`.
- This app-side snapshot was created before live migration, so some `legacy_paths` metadata may still point at former live slot paths instead of the archived slot-source path.

## Use

Use this snapshot as the app-side source reference while planning source-backed DM runtime, context packs, rules-core work, and local playable alpha tasks.

Use the live domain-first vault source at `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source` when live source currentness matters.

Do not treat this folder as authority to delete, overwrite, or supersede live vault source.
