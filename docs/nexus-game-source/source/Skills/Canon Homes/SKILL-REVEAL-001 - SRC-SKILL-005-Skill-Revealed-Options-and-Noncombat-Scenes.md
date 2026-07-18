---
project: "Nexus"
doc_id: "SKILL-REVEAL-001"
legacy_ids:
  - 'SRC-SKILL-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\10 Skills Resolution RNG rev0.5\SRC-SKILL-005 - Skill_Revealed_Options_and_Noncombat_Scenes.md'
title: "Skill Revealed Options and Noncombat Scenes"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "canon_home"
topic_family: "skill_revealed_options_and_noncombat_scenes"
owns_topics:
  - 'skill_revealed_options_and_noncombat_scenes'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-17"
last_reviewed: "2026-07-17"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths. 2026-07-17 issue #19 reconciliation added team-aware spatial opportunities and hidden Passive Check behavior."
---

# Skill Revealed Options

> [!important] Revised vision reconciliation — 2026-07-11
> Preserve capability-revealed options and Lattice Check Opportunities, but present them through in-world interaction, the Context Action Menu, or the Intent Bar. DM chat and menu-only scene framing below are historical presentation assumptions.

## 1. Key rule

Skills, focuses, and lower-tier powers/effects reveal possibilities; they do not automatically solve them.

A revealed option means the player can see, understand, attempt, price, or prepare the option. The check or action still matters unless threshold, gear, planning, or fiction makes the outcome routine.

## 2. Ownership correction

This document does not own full noncombat scene procedure.

- Core owns mission-node structure, scene rhythm, meaningful beats, and strong-plan procedure.
- Modes owns DM presentation, display formatting, and player-facing chat patterns.
- Skills owns what skills, focuses, powers, and abilities can reveal and how a revealed option interacts with checks.

## 3. Tabletop presentation rule

In tabletop play, the DM should usually present skill-revealed options through narrative cues, not as a default check menu.

Bad default:

> You can make a Tech check to hack the door, a Covert check to sneak past, or a Social check to bribe the guard.

Better default:

> The door's access panel is exposed. A stack of cargo creates a shadowed path past the checkpoint. The guard looks bored and underpaid.

Optional check labels can be shown when the user asks for mechanical clarity or when a scene is complex.

## 4. What skills, focuses, and powers can reveal

Skill layers may reveal:

- route options;
- risks and consequences;
- weaknesses or defenses;
- hidden clocks;
- access methods;
- safer or faster approaches;
- objective shortcuts;
- resistance profiles;
- faction procedures;
- social leverage;
- equipment vulnerabilities;
- environmental hazards;
- crew/ship assist opportunities;
- nonviolent or indirect-combat solutions.

## 5. Revealed option outcomes

A revealed option may lead to:

- automatic success by threshold when routine;
- a lower difficulty;
- a different defense target;
- a different cost;
- a safer failure consequence;
- a partial-success option;
- a new route or tactic;
- a required roll;
- a needed item, credential, body trait, tool, cyberware surface, crew assist, or preparation step.

## 6. Skill interaction with TacMap movement

Skills, focuses, traits, powers/effects, and gear may interact with TacMap movement by:

- revealing hidden or safer routes;
- reducing route MP cost;
- reducing AP costs when a power/effect explicitly permits it;
- negating terrain, hazard, or elevation modifiers;
- adding or banking MP;
- improving Dash/Sprint use;
- allowing special traversal;
- enabling or improving shove/displacement resistance;
- identifying route risks before movement;
- improving in-transit survival.

Examples:

- Mobility focus reduces climb or debris cost.
- Zero-G or EVA training reduces drift or stopping cost.
- Stealth reduces noise or exposure risk on a route.
- Engineering stabilizes an unstable path or lift.
- Tactics identifies overwatch blind spots.

## 7. Strong plans routing note

Strong plans can bypass rolls, lower difficulty, change target defense, convert failure into partial success, or reduce consequence. Skills preserves that resolution principle, but full DM procedure for presenting and pacing those plans belongs in Core and Modes.

## 8. Spatial Check Opportunities

A Check Opportunity is a known or discoverable action that may require Lattice-100 when uncertainty and meaningful stakes remain. It is not a promise that selecting the action will cause a roll.

Opportunity recognition considers the deployed Field Team so the player does not cycle characters merely to find possible actions. The spatial surface exposes only what the crew knows:

- known actions appear through the object's interaction surface;
- known but unavailable actions may remain visible when the correctable reason is useful and safe to reveal;
- secret or undiscovered actions remain absent; and
- discovering an action adds it to the object's known interaction surface.

The controlled eligible character is the default lead for a deliberate Check, but the player may choose another eligible lead and any qualified assistance. The system never silently selects the best odds. This implements [ADR-0090](../../../../adr/0090-check-opportunities-are-team-aware-and-knowledge-safe.md).

## 9. Hidden Passive Checks

Each eligible Field Team member rolls once for a hidden Passive Check opportunity. Eligibility may differ because of senses, knowledge, status, equipment, position, or another rules-native fact.

If all eligible members fail, ordinary play receives one grouped `Opportunity missed` entry that reveals no Skill, Target Score, character name, roll count, or secret content. The notice is visible by default and may be hidden by a player setting. Failure creates no added negative Effect; an unseen hazard may later act through its own rules, not as punishment for the failed discovery.

If anyone succeeds, ordinary play receives one grouped discovery entry that identifies a discoverer and the revealed result. Expanded history may show all eligible rolls after the information is no longer secret.

An eligible actor rolls only once per opportunity state. Leaving and returning, changing the controlled character, or reopening the same object does not create another roll. A new roll requires a meaningful state change, newly eligible actor, newly arrived actor, or materially changed opportunity.

Discovered knowledge automatically becomes shared crew knowledge when the discoverer can communicate with the others. If communication is blocked, only the discoverer knows it until a validated action shares it. This specializes the hidden and Passive Check decisions in [ADR-0011](../../../../adr/0011-lattice-100-and-visible-rolls-remain-core.md).

