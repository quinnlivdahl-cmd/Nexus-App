---
project: "Nexus"
doc_id: "SKILL-INDEX-000"
legacy_ids:
  - 'SRC-SKILL-000'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\10 Skills Resolution RNG rev0.5\SRC-SKILL-000 - README_Source_Skills_Resolution_RNG.md'
title: "Skills Domain Readme"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_readme"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "reference_input"
topic_family: "skills_domain_readme"
owns_topics:
  - 'skills_domain_readme'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids, legacy_paths, and explicit migration history."
---

# Skills Domain Readme

## Purpose

The `Skills` domain owns skill vocabulary, resolution procedure, Target Score handling, modifier lanes, noncombat check structure, advancement links, and RNG/playtest tuning notes.

This domain is the current home for the provisional Lattice-100 working kernel.

Skills answers: **how do character capability, skill focus, difficulty, and RNG resolve uncertain action?**

## Current Stance

Lattice-100 is the active provisional roll substrate unless a newer source supersedes it.

Current reliable rules:

- Lattice-100 is used for meaningful checks during playtest.
- Combat bands are `Miss / Graze 0-9 / Hit 10-69 / Direct 70+`.
- Noncombat retains separate provisional bands and should not be forced into combat band language by default.
- Target Score notation uses Defense, Effective Defense, Firewall, or Hazard Rating depending on the target surface.
- Durability terms align with `Health`, `System Integrity`, `Defense`, `Firewall`, `Mitigation`, and `Shield`.
- Cover affects Effective Defense, not the base Defense value.
- Final math, DC/Defense tables, advancement math, and some counter systems remain open.

## Domain Structure

Current Skills surfaces:

- `SKILL-LIST-001`: skill vocabulary and tiered skill-tree structure.
- `SKILL-RESOLUTION-001`: resolution core rules and Lattice-100 outcome bands.
- `SKILL-DIFFICULTY-001`: difficulty, modifier lanes, Target Score, and check display.
- `SKILL-REVEAL-001`: skill-revealed options and noncombat scene interaction.
- `SKILL-DISCIPLINE-001`: disciplines, skills, advancement links, and powers/effects.
- `SKILL-SCENE-001`: noncombat scene systems working model.
- `SKILL-STATE-007`: RNG and playtest tuning notes.
- `SKILL-OPEN-008`: resolution open questions and backpatch notes.
- `SKILL-INDEX-000` and `SKILL-INDEX-001`: domain readme and manifest.

## Ownership Boundaries

Skills owns:

- roll substrate and check procedure;
- Target Score call structure;
- margin and band interpretation;
- skill/focus vocabulary;
- noncombat resolution principles;
- modifier provenance and guardrails;
- RNG tuning risks and targeted simulation triggers.

Skills does not own:

- live DM narration or tactical chat layout, which belongs to `Modes` and `Dashboards`;
- combat turn structure, status timing, and TacMap procedure, which belong to `Combat`;
- equipment-side Defense, Firewall, Mitigation, Shield, weapon, and cyberware definitions, which belong to `Equipment`;
- character recovery/revival consequences and chassis-facing durability, which belong to `Characters`;
- overall mission-node rhythm and scene structure, which belongs to `Core`.

## Cross-Domain Dependencies

Important dependencies:

- `Modes`: DM Mode must use Lattice-100 in playtest and display roll, Target Score, margin, band, and resource changes when mechanics are shown.
- `Combat`: combat bands, cover, effective defense, tactical consequences, and status timing must stay compatible with the resolution kernel.
- `Equipment`: durability terms, defenses, shields, mitigation, weapons, cyberware, and Firewall must stay compatible with Target Score handling.
- `Characters`: skill growth, chassis durability, recovery, and ability taxonomy must remain compatible with skill and resolution structure.
- `Core`: noncombat scenes and mission rhythm consume Skills procedure without making Skills own all scene pacing.

## Migration Notes

The legacy source was organized as a numbered upload package. That history is preserved through `legacy_ids`, `legacy_paths`, and the domain manifest.

The domain-first model does not require old upload verification gates before treating this rebuild source as the active working draft. Review and acceptance gates still apply before migration into permanent source.

Older RNG appendices, reports, handoffs, and transition records remain preservation evidence until content coverage and cleanup are explicitly approved.

## Next Consolidation Needs

- Use the Phase 10 Skills manifest to verify domain-first routing before any permanent-source migration.
- Confirm whether `SKILL-STATE-007` should remain `Current State` or move to `Open Questions` / `Reference Inputs` after playtest tuning stabilizes.
- Confirm whether the current Skill doc IDs are descriptive enough after body consolidation.
- Check whether ability taxonomy belongs primarily in `Skills`, `Characters`, or a shared cross-reference.


