---
project: "Nexus"
doc_id: "CHAR-OPEN-001"
legacy_ids:
  - 'SRC-CHAR-008'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\09 Characters Crew Progression rev0.4\SRC-CHAR-008 - Character_Open_Questions.md'
title: "Character_Open_Questions"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Steward"
source_role: "open_questions"
canon_status: "source_gap_register"
placement_domain: "Characters"
content_role: "open_questions"
topic_family: "character_open_questions"
owns_topics:
  - 'character_open_questions'
borrows_topics:
  - 'character_chassis'
  - 'recovery_rules'
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language, repaired inherited display corruption, and preserved unresolved character questions without relying on legacy slot wording."
---

# Character Open Questions

> [!important] Revised vision reconciliation — 2026-07-11
> Rook and Nexus Primer are Campaign Fixtures, not active default campaigns. Preserve unresolved build, recovery, Growth Trait, Campaign Build, and Crew Archive questions; historical live-campaign status questions no longer control current design.

## 1. Purpose

This doc records unresolved `Characters` questions and routes content to the current owning domains. It is not a deletion list.

## 2. High-priority Characters questions

| Question | Status |
|---|---|
| Are any non-baseline body/origin options allowed by default in the first playable ruleset? | Open. DM can use provisional guidance, but final default list is not locked. |
| What creation-point pool exists at character creation? | Open. `Equipment` is also needed. |
| What thresholds define cybernetic integration tiers? | Open. Tier labels preserved, exact math deferred. |
| At what cybernetic tier does a character become socially/legally treated as Cyborg? | Open. `Lore` is needed. |
| How expensive/dangerous should Splice + cyber integration be? | Open. Keep drawback-heavy until balanced. |
| Can Uploads be default PCs, special PCs, or campaign unlocks? | Open. |
| Are AI and Signal-Touched playable in v0.1? | Open/restricted. |
| How do body/chassis choices interact with skill-tree ability totals? | Open. A deeper `Skills` pass is needed. |
| How do recovery/revival systems affect crew retention and campaign stakes? | Open. `Core`, `Equipment`, `Lore`, and `Dashboards` are needed. |

## 3. Routed questions

### To `Skills`

- Ability tree / Skill / Skill Focus / Leaf hierarchy.
- How selectable focuses bump skill and ability totals.
- Exact roll math and derived stat math.

### To `Equipment`

- Cyberware item list.
- Cyberware CP costs and integration weights.
- Cyberware upgrade trees.
- Hack-surface tags from gear, cyberware, armor, drones, smart weapons, and upload bodies.
- Protective gear, armor, shields, tools, and active loadout.

### To `Lore`

- Legal meaning of Organic Human, Splicer, Cyborg, Upload, AI, Signal-Touched.
- Personhood law and anti-transhuman politics.
- Choir / implant megacorp / C-POH implications.
- Upload Persons vs Upload Polities.

### To `Dashboards`

- Active Rook/E43 crew status.
- Rill restoration or other named campaign recovery tracks.
- Any live campaign character state.

## 4. Backpatch notes for earlier packages

- `Admin` should preserve the handoff-check rule in rebuild and migration procedure if it is not already present.
- `Modes` still needs the DM display correction kept in view.
- `Core` may need a cross-reference to character advancement and prep before node start.
- `Combat` may need a cross-reference to Firewall, hack surface, and durability display once `Equipment` is rebuilt more deeply.

## 5. Temporary DM guardrail

Until Draft finalizes character math, DM Mode may use provisional chassis, origins, cyberware tiers, and recovery rules as narrative/mechanical guidance, but should not invent permanent stat blocks or declare final canon.

## 6. Mass-intake open questions

Add these to the active `Characters` queue:

| Question | Routing / note |
|---|---|
| What are the exact mechanical implications of Standard Fit? | `Characters` owns the concept; `Combat` and `Equipment` decide node, cover, path, gear, and equipment consequences. |
| Are Low-G / Adapted Humans a third gene-edited human category alongside Vatborn and Designer Humans? | `Characters` owns character-facing hooks; `Lore` owns lore, culture, and history. |
| How should Low Caste execute mechanically without becoming a flat social penalty? | `Characters` preserves the character hook; `Lore` owns social structure; `Skills` may own resolution tags. |
| What is the exact ape/gorilla strength and 1.5 body-fit math? | `Characters` owns the chassis note; `Combat` owns node capacity, Crowded, and cover; `Skills` owns checks. |
| How do body fit, Standard Fit, and Crowded interact across nodes, cover, paths, suits, and vehicles? | `Combat`, `Characters`, `Equipment`, and `Play Aids`. |
| What are C-POH boundaries between restorative prosthetics, integrated tools, occupational cyberware, mind alteration, and personhood-invasive implants? | `Lore` is primary, `Equipment` owns cyberware pieces, and `Characters` owns character-facing consequences. |
| How does EMP/cyber-disruption affect individual cyberware pieces without tracking every implant as a separate stat block? | `Equipment` is primary, `Combat` owns System Status and combat application, and `Characters` owns character consequence. |
| Is Vatborn Anti-Uprising Frame universal, common, optional, line-specific, or discarded? | Preserve for `Lore` and Seed review; do not canonize here. |
| Are Planning Points a specialist ability family, a crew-prep mechanic, or discarded? | `Admin` and `Modes` process may touch templates; `Characters`, `Skills`, and `Content` may own the mechanic if it survives. |

## 7. Routing reminders

- `Combat` owns body fit as it affects node capacity, cover sharing, Crowded pressure, and tactical positioning.
- `Characters` owns character-facing chassis, origin, progression, and recovery implications.
- `Skills` owns skill, focus, check, derived-stat, and ability math.
- `Equipment` owns cyberware pieces, Integrated Tool, EMP/disruption, loadout, armor, and module rules.
- `Lore` owns lore, caste, law, faction attitudes, C-POH doctrine, splicer history, Designer Human family culture, and personhood politics.
- `Dashboards` owns named crew state and live dashboard values.


## 8. Lattice and durability resolution updates

Resolved or narrowed by the 2026-05-24 Lattice/durability/chassis integration pass:

| Prior open item | Current status |
|---|---|
| Health/System Integrity durability split | Narrowed. Tier 0-2 characters are Health-main by default; Tier 3+ body-support cybernetic characters are System Integrity-main by default. Exact cyberware thresholds remain open and route to `Equipment`. |
| Downed/Disabled baseline | Resolved as baseline procedure. 0 Health creates Downed; 0 System Integrity creates Disabled; both use a 3-round countdown unless a specific source, tag, hazard, or scenario modifies it. |
| Permanent death/destruction from countdown failure | Narrowed. Countdown failure creates a critical state, not automatic permanent death, destruction, or deletion. Exact critical-state table remains open. |
| Temporary status persistence trigger | Narrowed. A temporary status that contributes to or coincides with Downed/Disabled converts to the persistent version unless a specific source, tag, hazard, or scenario says otherwise. |
| Armor as character stat | Corrected. Armor is an equipment category; Mitigation is the damage-reduction stat. `Equipment` owns exact equipment behavior. |

Still open after this pass:

- exact cyberware integration threshold math;
- exact Tier 3+ System Integrity bonus values;
- exact critical-state tables;
- exact EMP/cyber-disruption modeling for individual modules;
- Upload/AI playability scope;
- exact Standard Fit mechanical consequences across nodes, suits, tools, vehicles, and recovery.

