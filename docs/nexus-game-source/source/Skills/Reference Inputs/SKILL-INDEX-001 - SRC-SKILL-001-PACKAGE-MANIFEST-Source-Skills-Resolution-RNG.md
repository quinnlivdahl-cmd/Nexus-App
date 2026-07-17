---
project: "Nexus"
doc_id: "SKILL-INDEX-001"
legacy_ids:
  - 'SRC-SKILL-001'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\10 Skills Resolution RNG rev0.5\SRC-SKILL-001 - PACKAGE_MANIFEST_Source_Skills_Resolution_RNG.md'
title: "Skills Domain Manifest"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "domain_manifest"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "reference_input"
topic_family: "skills_domain_manifest"
owns_topics:
  - 'skills_domain_manifest'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids, legacy_paths, and explicit migration history."
---

# Skills Domain Manifest

## Domain Contents

| Rebuilt doc ID | Legacy ID | Role | Current purpose |
|---|---|---|---|
| `SKILL-INDEX-000` | `SRC-SKILL-000` | Reference input | Domain readme and routing guide. |
| `SKILL-INDEX-001` | `SRC-SKILL-001` | Reference input | Domain manifest and migration notes. |
| `SKILL-LIST-001` | `SRC-SKILL-002` | Canon home | Skill vocabulary and current working tiered skill-tree structure. |
| `SKILL-TREE-001` | — | Current state | Playtest-ready provisional Attribute -> Skill -> Skill Focus -> Ability tree and full candidate-effect catalog. |
| `SKILL-RESOLUTION-001` | `SRC-SKILL-003` | Canon home | Resolution core rules and Lattice-100 outcome bands. |
| `SKILL-DIFFICULTY-001` | `SRC-SKILL-004` | Canon home | Difficulty, modifier lanes, Target Score, and check display. |
| `SKILL-REVEAL-001` | `SRC-SKILL-005` | Canon home | Skill-revealed options and noncombat scene interaction. |
| `SKILL-DISCIPLINE-001` | `SRC-SKILL-006` | Canon home | Disciplines, skills, advancement links, and powers/effects. |
| `SKILL-STATE-007` | `SRC-SKILL-007` | Current state | RNG and playtest tuning notes. |
| `SKILL-OPEN-008` | `SRC-SKILL-008` | Open questions | Resolution open questions and backpatch notes. |
| `SKILL-SCENE-001` | `SRC-SKILL-009` | Canon home | Noncombat scene systems working model. |

## Lattice Integration Summary

The legacy rev0.5 source aligned the Skills/Resolution domain with the Lattice/durability integration pass.

Retained decisions:

- Lattice-100 is the active provisional working kernel.
- Edge-d20 remains a simplicity benchmark only.
- Bell-20 remains parked.
- Broad simulation is paused unless playtest exposes a concrete failure.
- Modifier lanes and conversion rules are guardrails.
- DM Mode must use Lattice at the table when meaningful checks are called.
- Full Combat, Equipment, Character, and Core rewrites are separate domain work.

## Known Limits

This domain does not yet finalize:

- permanent Target Score formula;
- DC/Defense tables;
- advancement math;
- ability rank math;
- final Mitigation and Shield rules;
- reaction and overwatch full rules;
- final social/noncombat counter math;
- Contact or Cyberwarfare final treatment.

These open items do not prevent use of `SKILL-TREE-001` in current playtests. Use the candidate effects as written, log friction or ambiguity, and route unresolved math or ownership questions to `SKILL-OPEN-008` or the relevant domain open-question doc.

## Cross-Domain Routing

Use these routing boundaries:

- `Skills`: resolution call, skill/focus/ability vocabulary, check structure, Target Score, roll/margin/band reading.
- `Modes`: DM execution instruction and table display behavior.
- `Combat`: tactical timing, combat status, action economy, cover use in combat, TacMap implications.
- `Equipment`: defenses, weapons, shields, mitigation, cyberware, Firewall, and gear-side modifiers.
- `Characters`: chassis durability, recovery/revival consequences, character advancement, ability taxonomy when character-sheet facing.
- `Core`: mission rhythm, scene beats, strong-plan procedure, and system-wide play loop.

## Legacy Evidence

Legacy transition evidence remains useful for audits and future archive mining:

- Lattice-100 working kernel handoff.
- Lattice-100 source integration brief.
- Pass 3.1 simulation implementation report.
- Pass 3.2 candidate review.
- Pass 3.3 consolidated full-system stress review.
- Pass 3.4 guardrail spec / minimal integration patch.
- Lattice durability integration changelog.
- Provisional Lattice output register entry.

These are reference inputs, not active source homes.

## Preservation Rule

No older Skills source bundle, skill draft, handoff, report, dashboard, RNG appendix, or transition record is deletion-approved by this manifest.

Archive or prune only after content coverage is verified and the user explicitly approves cleanup.

## Next Recommended Work

1. Review the Phase 10 Skills consolidation manifest before any permanent-source migration.
2. Use `SKILL-TREE-001` as the current playtest tree while keeping final taxonomy ownership shared with `CHAR-ABILITY-001`.
3. Run focused playtests that log Ability choice, Target Score, roll, margin, band, state change, and table friction.
4. Patch Combat and Equipment only where Lattice interaction requires it.
5. Preserve unresolved math and counter issues in open-question docs rather than burying them in manifests.

