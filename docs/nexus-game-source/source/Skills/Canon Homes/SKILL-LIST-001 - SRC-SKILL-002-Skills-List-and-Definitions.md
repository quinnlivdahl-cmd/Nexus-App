---
project: "Nexus"
doc_id: "SKILL-LIST-001"
legacy_ids:
  - 'SRC-SKILL-002'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\10 Skills Resolution RNG rev0.5\SRC-SKILL-002 - Skills_List_and_Definitions.md'
title: "Skills List and Definitions"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "canon_home"
topic_family: "skills_list_and_definitions"
owns_topics:
  - 'skills_list_and_definitions'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Skills List and Definitions

## 1. Current working model

Nexus uses this layered model for current playtests:

```text
Attribute -> Skill -> Skill Focus -> Ability
```

The current complete playtest snapshot is `SKILL-TREE-001`. It is ready for use but remains provisional rather than final.

The player-facing pick is an Ability inside a Skill Focus. Investment contributes upward:

```text
chosen or ranked Ability
  -> adds to or unlocks a Skill Focus tier
      -> contributes to the parent Skill total
          -> contributes to the parent Attribute
```

The six current Attribute labels are `Combat`, `Dexterity`, `Intelligence`, `Constitution`, `Wisdom`, and `Charisma`. Their use is intentional for playtest clarity and does not make the tree final.

## 2. Cumulative total principle

The current direction preserves cumulative totals at each split:

- Abilities have their own permissions, actions, validation, effects, or values;
- a Skill Focus can total or gate its contained tiers;
- a parent Skill can total or gate its Skill Focuses;
- an Attribute can summarize or derive from parent Skills.

Exact formulas, caps, point values, tier counts, and sheet display remain open.

## 3. Relationship to old Seed wording

This preserves the useful old tree metaphor while correcting the current direction:

| Older metaphor | Current interpretation |
|---|---|
| Ability = Tree | Attribute / top-level tree. |
| Skill = Branch | Parent skill/domain under the broad ability. |
| Skill Focus = Stem | Selectable focus track or specialty. |
| Power / Technique / Feat = Leaf | Ability, the player-facing pick or individual tier/effect. |

The older 30 normal + 2 restricted skill list is preserved as vocabulary/reference and migration evidence. It is not the final count.

## 4. Provisional term definitions

| Term | Current meaning | Lock status |
|---|---|---|
| Attribute | Top-level playtest tree and broad capability grouping. | Current playtest labels; final names and formula remain open. |
| Skill | Roll-facing capability under an Attribute; receives value from Skill Focus development. | Current playtest count; final count remains open. |
| Skill Focus | Specialty/track under a Skill; likely contains tiered powers/effects/features. | Current best structure. |
| Ability | Selectable or rankable capability inside a Skill Focus; grants a concrete permission, action, rules effect, discount, tag, or rider. | Active playtest term; individual entries remain provisional. |
| Trait / Tag | Conditional permission, body fact, background fact, faction/credential marker, cyberware flag, consequence, or equipment property. | Active concept, exact format open. |

## 5. Current working vocabulary

The following current-list items are preserved as design vocabulary. They should not be discarded, but they also should not all be treated as final ranked skills.

| Vocabulary item | Current working use | Routing note |
|---|---|---|
| Firearms | Ranged weapon competence, precision, target handling. | Force / Offense or Marksmanship focus. |
| Heavy Weapons | Heavy arms, breaching fire, area pressure. | Force / Offense; Equipment owns gear tags. |
| Melee | Close combat, breach entry, grapples, disarms. | Force / Offense or Guard focus. |
| Armor | Use, exploit, resist, or manage armor systems. | Likely Guard focus; Equipment owns armor mechanics. |
| Tactics | Tactical reading, overwatch lanes, coordinated pressure. | Force / Command or Insight link. |
| Stealth | Concealment, noise control, infiltration posture. | Traverse / Infiltration. |
| Mobility | Traversal, route speed, verticality, extraction. | Traverse. |
| Security | Physical breach, access control, locks, intrusion boundary. | Split between Infiltration and Computing. |
| Survival | Hazards, hostile environments, field endurance. | Traverse / Survival. |
| Computing | Software, logic systems, basic intrusion, data. | Systems / Computing. |
| Engineering | Machinery, structure, power, repair. | Systems / Engineering. |
| Fabrication | Building, patching, improvised tools, field refit. | Systems / Fabrication. |
| Electronics | Circuits, sensors, device work. | Likely Engineering or Computing focus. |
| Vehicles | Piloting, driving, EVA craft, transport handling. | Traverse / Piloting or vehicle focus. |
| Medicine | Triage, diagnosis, field care. | Vital / Medicine. |
| Biotechnology | Bioengineering, splice systems, organic tools. | Vital / Biotech. |
| Cybernetics | Implants, body-machine interface, cyberware support. | Vital / Cybernetics and Equipment. |
| Adaptation | Body/environment adjustment, weird survival, hazard body lane. | Maybe Survival, Biotech, or trait lane. |
| Cognition | Analysis, memory, pattern reasoning. | Insight / Cognition. |
| Perception | Observation, sensing, hidden detail, route risk. | Insight / Perception. |
| Willpower | Resolve, stress, fear, coercion resistance. | Current preferred play-facing direction is Resolve. |
| Diplomacy | Rapport, negotiation, legitimate persuasion. | Network / Rapport. |
| Deception | Cover identity, lies, misdirection. | Network / Deceit. |
| Coercion | Pressure, threats, command breakage. | Network / Pressure. |
| Empathy | Read emotion, stabilize, understand motives. | Network / Rapport or Insight link. |
| Performance | Impersonation, distraction, morale, public-facing action. | Network / Rapport or Deceit. |
| Streetwise | Underworld, informal networks, street procedure. | Network / Streetwise. |
| Faction Lore | Dossiers, norms, equipment patterns, access context. | Tag/focus/dossier lane. |
| Culture | Cultural fluency, protocol, taboo, context. | Tag/focus lane. |
| Commerce | Bargaining, requisition, trade, salvage conversion. | Network / Exchange. |

## 6. Restricted or special channels

| Channel | Current handling |
|---|---|
| Cyberwarfare | Restricted/unlockable or special focus channel under Computing / Systems. Do not make baseline for every technical character. |
| Contact | Signal-adjacent, relational, asset-like, or campaign-gated channel. Do not make a normal ranked skill until lore, safety, and campaign consequences are clearer. |

## 7. Current playtest scaffold

| Attribute | Current Skills |
|---|---|
| Combat | Firearms, Close Combat, Heavy Weapons, Field Defense, Tactics. |
| Dexterity | Mobility, Infiltration, Piloting. |
| Intelligence | Computing, Engineering, Fabrication. |
| Constitution | Endurance, Medicine, Biotechnology, Cybernetics. |
| Wisdom | Perception, Cognition, Resolve. |
| Charisma | Negotiation, Empathy, Deception, Pressure, Networks. |

The older `Force / Traverse / Systems / Vital / Insight / Network` scaffold remains design lineage and a useful coverage lens. It is not the current player-facing attribute list.

## 8. What an Ability should do

An Ability must not be just a name or bonus label. It should act on an established rules surface and do at least one useful thing:

- reveal a type of option;
- reduce an action, AP, MP, time, trace, exposure, or resource cost;
- improve a partial success;
- grant a special action or reaction;
- make a short command reliable;
- unlock a question right, clue type, path, route, credential use, or objective method;
- attach a tag, status interaction, rider, or permission;
- make a crew assist, ship system, gear item, cyberware piece, or faction technique easier to use.

## 9. Current status boundary

Use the complete tree in `SKILL-TREE-001` for current playtests and idea generation. It is deliberately marked **playtest-ready provisional**: usable now, but not final. Playtest evidence may change names, counts, tier placement, prerequisites, candidate effects, numerical balance, and progression costs.


