---
project: "Nexus"
doc_id: "SKILL-DISCIPLINE-001"
legacy_ids:
  - 'SRC-SKILL-006'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\10 Skills Resolution RNG rev0.5\SRC-SKILL-006 - Disciplines_Skills_and_Advancement_Links.md'
title: "Disciplines Skills and Advancement Links"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "canon_home"
topic_family: "disciplines_skills_and_advancement_links"
owns_topics:
  - 'disciplines_skills_and_advancement_links'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Disciplines Skills and Advancement Links

## 1. Purpose

This document preserves how skills, focuses, disciplines, powers, and advancement currently relate. It does not finalize XP, ranks, levels, final skill count, or the character sheet.

## 2. Current layered build model

Nexus character growth currently sits in a layered build stack:

```text
Body / Origin / Chassis / Traits
  + Discipline / Role
  + Loadout / Gear / Cyberware
  + Skill tree choices
  + Crew / Ship / Faction / Story consequences
```

Skills owns the skill-tree side of that stack.

## 3. Corrected skill-tree structure

The current best working structure is:

```text
Tiered Skill Focus Power / Effect / Feature / Technique / etc.
  -> Skill Focus
      -> Skill
          -> "Ability" / Ability Tree
```

Player-facing choices likely occur at the power/effect/feature or focus-tier level. Those choices cascade upward.

## 4. Cumulative totals at each split

Cumulative totals should be preserved as a design goal:

| Layer | What it may total or gate |
|---|---|
| Power / Effect / Feature | Specific permission, rider, action, discount, check modifier, status interaction, or tag. |
| Skill Focus | Total value or tier depth for a specialty track. |
| Skill | Parent total from related focuses; may drive broad checks or unlock thresholds. |
| "Ability" | Broad derived total or summary from parent skills; exact player-facing role open. |

The math is deliberately unresolved. The structure should survive even if the final names change.

## 5. Focus as selectable tiered ability

A Skill Focus should probably be a selectable tiered ability track rather than a flat specialization label.

Each focus should eventually define:

- parent Skill;
- parent "Ability";
- available tiers;
- lower-tier powers/effects/features;
- what each tier grants;
- what each tier contributes upward;
- whether it affects AP, MP, reaction, route cost, clock, trace, status, resource, defense, objective, access, recovery, or information;
- tags such as combat, social, tech, body, cyberware, ship, faction, signal, weird, or gear-adjacent.

## 6. Provisional focus schema for Draft

| Field | Meaning |
|---|---|
| Focus name | The selectable specialty/ability track. |
| Parent Skill | The skill bumped or gated by the focus. |
| Parent "Ability" | Broad aggregate that receives derived value from parent skill. |
| Tier | Current step within the focus. |
| Power/effect/feature | The named pick or granted capability. |
| Permission/effect | What the tier lets the character do, see, resist, improve, or reroute. |
| Upward contribution | How it contributes to Focus, Skill, and "Ability" totals. |
| Surface touched | AP, MP, reaction, route cost, clock, trace, status, resource, defense, objective, access, recovery, etc. |
| Tags | Combat, social, tech, body, cyberware, ship, faction, signal, weird, etc. |

## 7. Provisional broad scaffold

| "Ability" | Provisional skill bands or domains | Role note |
|---|---|---|
| Force | Offense, Guard, Command | combat pressure, defense, leadership, tactical reads. |
| Traverse | Mobility, Infiltration, Survival, Piloting | movement, stealth, EVA, extraction, hazard movement. |
| Systems | Computing, Engineering, Fabrication | hacking, systems, repair, structure, device control. |
| Vital | Medicine, Biotech, Cybernetics | triage, body systems, augmentation, recovery support. |
| Insight | Cognition, Perception, Resolve | analysis, sensing, stress, continuity, weird awareness. |
| Network | Rapport, Deceit, Pressure, Streetwise, Exchange | social leverage, faction access, logistics, commerce. |

This scaffold is provisional. It is useful for retrieval, DM interpretation, and Draft work, but it should not be locked as the final sheet.

## 8. Disciplines and roles

Characters owns discipline/role structure. Skills supports it by defining what skill surfaces a discipline can lean on.

Examples of discipline-skill relationships:

- Vanguard / breach roles likely touch Force, Guard, Traverse, and objective pressure.
- Ghost / infiltrator roles likely touch Traverse, Infiltration, Perception, and route control.
- Operator / systems roles likely touch Computing, Engineering, Cyberwarfare, sensors, trace, and access states.
- Medic / sustain roles likely touch Medicine, Biotech, recovery, and consequence mitigation.
- Envoy / social roles likely touch Network, Rapport, Deceit, Pressure, Culture, Faction Lore, and Commerce.
- Engineer / maker roles likely touch Engineering, Fabrication, Electronics, repairs, and field refit.
- Gunner / pressure roles likely touch Firearms, Heavy Weapons, Suppression, and position control.
- Adaptant / body-change roles likely touch Adaptation, Biotechnology, Cybernetics, Survival, or restricted weird channels.

These examples are source-supported direction, not a completed class list.

## 9. Planning Points preservation

Planning Points are not a global default system right now.

Preserve them as a possible specialist, focus, discipline, faction, command, tactics, intel, or preparation feature. If approved later, they may spend into:

- roll modifier;
- advantage/edge;
- clue quality;
- route control;
- defense targeting;
- consequence reduction;
- clock adjustment;
- status prevention or mitigation tied to the plan.

## 10. Recovery and repair focus hooks

Medicine, Biotech, Cybernetics, Engineering, Fabrication, and Cyberwarfare may eventually specialize in different recovery or repair surfaces.

Examples:

- Medicine: stabilize biological injury.
- Biotech: handle splice, vatborn, organ, infection, or engineered-body complications.
- Cybernetics: repair implants, prosthetics, body-machine interfaces, and upload sleeves.
- Engineering/Fabrication: repair gear, armor, shelter, life support, and physical systems.
- Cyberwarfare: contest System Status, Firewall, hostile software, or invasive control.

## 11. Auxiliary access channels

Do not make every fantasy a skill tree. Keep these beside the skill model:

| Channel | Grants |
|---|---|
| Body/chassis traits | friction reduction, tolerances, slot shifts, passive tags. |
| Gear/loadout sources | equipment-defined mini-fantasies and tactical permissions. |
| Cybernetic or biotech mods | cross-lane access, sensor changes, mobility rewrites, hack-surface changes. |
| Faction techniques | credential powers, access tags, squad doctrine. |
| Crew assists | group maneuvers, reroutes, extraction tricks, leadership or trust benefits. |
| Ship systems | scanning, route intel, repair, recovery, mission support. |
| Temporary node rewards | one-node powers, field upgrades, stolen tech, local credentials. |

## 12. Power and multitasking caution

Combined-effect powers should not imply a character manually performs two full actions at once. If a power appears to combine effects, fiction should frame it as automated, preloaded, triggered, integrated, assisted, queued, linked, or passive.

This preserves the user's action-economy preference while keeping powers flexible.

## 13. Advancement cautions

Skill-level increases should feel significant and endgame characters should only max a few things. Exact scale, XP, rank names, capstone timing, trait cadence, and final count remain unresolved.

Safe working advancement principles:

- broad Skill values should improve reliability and option visibility;
- Skill Focuses should grant concrete permissions and discounts;
- powers/effects/features should provide active or rule-bending capabilities;
- traits should carry body, background, faction, cyberware, or consequence identity;
- routine advancement and earned advancement should both exist, but their cadence is open.



