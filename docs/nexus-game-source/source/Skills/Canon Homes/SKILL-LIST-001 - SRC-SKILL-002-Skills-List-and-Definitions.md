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
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Skills List and Definitions

## 1. Current working model

Nexus currently uses a layered skill model, not a finished attribute/class system.

The current best working model is:

```text
Tiered Skill Focus Power / Effect / Feature / Technique / etc.
  -> Skill Focus
      -> Skill
          -> "Ability" / Ability Tree
```

The player-facing pick is likely the lower-tier power/effect/feature or a tier inside a Skill Focus. That pick contributes upward:

```text
chosen power/effect/feature
  -> adds to or unlocks a Skill Focus tier
      -> contributes to the parent Skill total
          -> contributes to the broad "Ability" total
```

Use `"Ability"` in quotes when precision matters because the final top-level name is not locked. `Ability Tree` remains a useful older label, but it should not force a final sheet structure.

## 2. Cumulative total principle

The current direction preserves cumulative totals at each split:

- lower-tier powers/effects/features have their own permissions or values;
- a Skill Focus can total or gate its contained tiers;
- a parent Skill can total or gate its Skill Focuses;
- a broad "Ability" can summarize or derive from parent Skills.

Exact formulas, caps, point values, tier counts, and sheet display remain open.

## 3. Relationship to old Seed wording

This preserves the useful old tree metaphor while correcting the current direction:

| Older metaphor | Current interpretation |
|---|---|
| Ability = Tree | Broad derived "Ability" / top-level summary. |
| Skill = Branch | Parent skill/domain under the broad ability. |
| Skill Focus = Stem | Selectable focus track or specialty. |
| Power / Technique / Feat = Leaf | The likely player pick or individual tier/effect. |

The older 30 normal + 2 restricted skill list is preserved as vocabulary/reference and migration evidence. It is not the final count.

## 4. Provisional term definitions

| Term | Current meaning | Lock status |
|---|---|---|
| "Ability" / Ability Tree | Broad aggregate capability layer or sheet summary derived from Skills. | Provisional name and formula. |
| Skill | Broad domain under an Ability; receives value from Skill Focus development. | Provisional count. |
| Skill Focus | Specialty/track under a Skill; likely contains tiered powers/effects/features. | Current best structure. |
| Power / Effect / Feature / Technique / Talent | Lowest or near-lowest player-facing pick; grants permissions, actions, discounts, tags, or riders. | Terminology open. |
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

## 7. Provisional broad scaffold

| Provisional "Ability" | Possible skill domains | Current-list material most naturally mapped here |
|---|---|---|
| Force | Offense, Guard, Command | Firearms, Heavy Weapons, Melee, Armor, Tactics. |
| Traverse | Mobility, Infiltration, Survival, Piloting | Mobility, Stealth, Security, Survival, Vehicles. |
| Systems | Computing, Engineering, Fabrication | Computing, Engineering, Electronics, Fabrication, Cyberwarfare. |
| Vital | Medicine, Biotech, Cybernetics | Medicine, Biotechnology, Cybernetics, Adaptation. |
| Insight | Cognition, Perception, Resolve | Cognition, Perception, Willpower, signal or continuity-adjacent effects. |
| Network | Rapport, Deceit, Pressure, Streetwise, Exchange | Diplomacy, Deception, Coercion, Empathy, Performance, Streetwise, Commerce, Culture, Faction Lore, Contact-adjacent access. |

This scaffold is provisional. It is useful for retrieval, DM interpretation, and Draft work, but it should not be locked as the final character sheet.

## 8. What a lower-tier power/effect should do

A lower-tier power/effect/feature should not be just a bonus label. It should do at least one useful thing:

- reveal a type of option;
- reduce an action, AP, MP, time, trace, exposure, or resource cost;
- improve a partial success;
- grant a special action or reaction;
- make a short command reliable;
- unlock a question right, clue type, path, route, credential use, or objective method;
- attach a tag, status interaction, rider, or permission;
- make a crew assist, ship system, gear item, cyberware piece, or faction technique easier to use.

## 9. Current caution

Do not flatten this into a D&D-style attribute list or a fixed video-game skill tree yet. The exact number of skills is TBD after the surrounding systems are more complete.



