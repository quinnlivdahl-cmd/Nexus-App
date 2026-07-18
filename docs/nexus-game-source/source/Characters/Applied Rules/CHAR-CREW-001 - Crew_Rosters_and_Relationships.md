---
project: "Nexus"
doc_id: "CHAR-CREW-001"
legacy_ids:
  - 'SRC-CHAR-006'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\09 Characters Crew Progression rev0.4\SRC-CHAR-006 - Crew_Rosters_and_Relationships.md'
title: "Crew_Rosters_and_Relationships"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Steward"
source_role: "applied_rule"
canon_status: "provisional_source"
placement_domain: "Characters"
content_role: "applied_rule"
topic_family: "crew_relationships"
owns_topics:
  - 'crew_relationships'
  - 'crew_rosters'
borrows_topics:
  - 'character_roles'
created: "2026-05-13"
last_updated: "2026-07-17"
last_reviewed: "2026-07-17"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the reusable crew-state model without relying on legacy slot wording."
---

# Crew Rosters and Relationships

## 1. Current working purpose

Nexus is crew-based. Characters are not only stat blocks; they are ship functions, faction liabilities, relationship anchors, and route-choice consequences.

## 2. Crew roster model

A useful crew record should eventually track:

```text
name / callsign
Character Profile / Embodiment / Bioform / Chassis notes
discipline / role
key skills or focuses
loadout / tools / cyberware highlights
relationship pressures
injury / recovery / continuity state
ship function
faction ties
active availability
```

## 3. Crew roles beyond combat

Crew members can matter through:

- ship operations;
- downtime projects;
- repair/fabrication;
- medical/revival support;
- faction access;
- morale;
- investigation;
- route planning;
- black-market access;
- social cover;
- legal or identity complications.

## 4. Recruitment and unlocks

Recruitment should feel closer to FTL/XCOM/Pokemon inspiration: new crew members are exciting because they bring bodies, roles, vulnerabilities, stories, and ship functions.

The roster should support unusual recruits without letting every recruit collapse into pure combat math.

An accepted Recruitment Result commits immediately. During the same Location, the new Crewmate may replace either non-Player-Character Field Team member without increasing the three-character Field Team. The displaced Crewmate remains at their actual committed position under a **Location Support Assignment** and provides only a grounded contextual benefit rather than following as an autonomous fourth party member. The swap itself never relocates an actor. The assignment preserves the Crewmate's ordinary actor state and exposure to Location consequences; danger reaching that position may make the Crewmate a Tactical Participant under the existing participation rules. The player may reverse or change the swap only by physically returning to the support position during Free Movement. Remote roster swaps and default composition changes during Tactical Pressure are not permitted.

At departure, every extracting Crewmate and accepted recruit must be at the extraction point or safely reachable through **Rally to Extraction**. Rally may use automatic pathing over a validated safe route but cannot teleport an actor. If no safe route exists, the player must resolve the danger or explicitly leave without that actor and commit the grounded consequence. This reconciles [ADR-0094](../../../../adr/0094-in-location-recruitment-preserves-a-three-character-field-team.md).

A living Crewmate deliberately left behind becomes a **Stranded Crewmate**, not automatically dead or Permanently Lost. The character leaves the active Crew Roster while their Character Profile, Crew Archive Entry, Campaign Build, exact Actor State, last known Location, and known circumstances remain referenced by the campaign. Rescue, capture, escape, Permanent Loss, or another later outcome requires separate committed evidence.

## 5. Relationship pressure

Relationships should be used to make character consequences visible:

- trust and loyalty;
- faction pressure;
- personhood disputes;
- body prejudice;
- recovery debt;
- cyberware sponsorship;
- rivalry over risk-taking;
- moral friction over uploads, clones, full chassis, or splicer bodies.

## 6. Campaign-state boundary

Active named crew state belongs in `Dashboards` current-state surfaces. This doc owns the reusable system model only.

## 7. Long-term crew-state language

Use the long-term crew-state triad as current working language:

```text
Health | Morale | Loyalty
```

These are not merely combat statuses. They are campaign-facing state surfaces that can carry persistent consequences.

Possible triggers:

- Downed events;
- severe injury or recovery debt;
- body replacement or revival;
- upload continuity problems;
- betrayal, abandonment, rescue, or extraction failure;
- cyberware sponsorship or corporate debt;
- caste/status humiliation;
- personhood/legal dispute;
- repeated exposure to Signal, hostile factions, or impossible choices.

## 8. Crew dialogue and relationship model candidate

Preserve as a future model, not a current requirement:

```text
3-5 relationship/morale/loyalty sliders
+ trait tags
+ event memory
= dialogue pressure, loyalty shift, morale effects, and crew availability
```

Named crew state and current campaign values belong in `Dashboards`. This doc owns the reusable system concept.

## 9. Crew Archive and former Player Characters

A surviving Player Character automatically becomes a Crew Archive entry after Campaign Resolution. Player Character Permanent Loss prevents conversion. In a later campaign, the converted character may serve only as an ordinary Crewmate and never replaces the newly created Player Character as group leader.

Conversion preserves the Character Profile, Personal Canon, applicable Archive Memories, authored build foundations, Aptitude Traits, and the committed Embodiment—including Installed Cyberware and durable gene modifications. Run-specific level, Ability ranks, Skill Focus investment, ordinary carried equipment/loadout, temporary upgrades, and cyberware-tree investment reset or rebase into the universal complete level-0 Campaign Build.

Resolution produces one evidence-backed, capped **Converted Crewmate Package** for player review. It uses the normal creation allowance; mandatory persistent modifications are costed first. During review, the player may adjust discretionary traits and starting Abilities only among evidence-unlocked options and within the cap; committed Embodiment facts are not editable. A **Legacy Allowance** may cover only unavoidable mandatory overage and grants no discretionary points. A character whose mandatory modifications exceed the normal level-0 allowance remains archived but is ineligible for Starting Crew until the current campaign level can support a legal package, at which point the character may enter the Director's recruitment candidate pool rather than appearing automatically. This reconciles [ADR-0070](../../../../adr/0070-surviving-player-characters-become-archive-crewmates.md) and [ADR-0071](../../../../adr/0071-campaigns-start-at-level-zero-and-advance-before-node-one.md).

## 10. Aging, stasis, and retirement

Crewmates have a World Calendar age and a deterministic **Biological Age** based on elapsed non-stasis time. Long Ship Transits normally use Stasis, advancing chronology without equal biological aging. Validated Transit Events may interrupt stasis without aging the entire journey. Real-world product time never advances the Legacy World. The current simple natural-death baseline is Biological Age 100; the Campaign Director cannot author off-screen Crewmate death. This reconciles [ADR-0066](../../../../adr/0066-crewmates-age-but-stasis-suspends-biological-aging.md).

When age or another explicit continuity rule makes a Crewmate unavailable for field play, the character becomes a **Retired Crewmate**. They remain a living Legacy World person and Crew Archive entry who may appear as a contact, mentor, relationship figure, faction participant, or other NPC. Retirement, archive status, campaign absence, and context omission never imply death. This reconciles [ADR-0067](../../../../adr/0067-aged-out-crewmates-remain-living-world-characters.md).
