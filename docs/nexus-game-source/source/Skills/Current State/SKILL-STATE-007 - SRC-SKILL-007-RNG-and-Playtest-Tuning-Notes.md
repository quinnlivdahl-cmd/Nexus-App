---
project: "Nexus"
doc_id: "SKILL-STATE-007"
legacy_ids:
  - 'SRC-SKILL-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\10 Skills Resolution RNG rev0.5\SRC-SKILL-007 - RNG_and_Playtest_Tuning_Notes.md'
title: "RNG and Playtest Tuning Notes"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "current_state"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "current_state"
topic_family: "rng_playtest_tuning_notes"
owns_topics:
  - 'rng_playtest_tuning_notes'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# RNG and Playtest Tuning Notes

## Steward repair note - 2026-05-23

User-approved replacement: the older pre-Lattice placeholder effect vocabulary from prior `SRC-SKILL-007` is intentionally superseded here. Active design guidance is now Lattice-100 modifier-lane, outcome-band, and playtest-risk language. Do not restore the old vocabulary as active source unless a later source explicitly revives it.

## 1. Current status

Lattice-100 is the active provisional working RNG kernel for Nexus.

This does not lock final math. It does mean Draft Mode, DM Mode, ability work, and playtest prep should use Lattice-100 as the default substrate unless a newer source supersedes it.

Current candidate handling:

| Candidate | Status | Handling |
|---|---|---|
| **Lattice-100** | Default working kernel | Use for source integration and playtest. |
| **Edge-d20** | Simplicity benchmark | Preserve for comparison only. |
| **Bell-20** | Parked | Do not spend equal design effort unless a targeted salvage/comparison pass is requested. |

## 2. Why the older deferred-RNG posture changed

The older Skills posture deferred exact RNG selection because core loop, combat, equipment, cyberware, and progression were still too undefined.

That posture is now too weak for playtest prep. The project needs provisional rules in place so abilities, combat actions, noncombat gates, and DM table execution can be tested against one working substrate.

Lattice-100 is adopted provisionally because it:

- supports five outcome bands cleanly;
- gives granular modifier room;
- is easier for ChatGPT to display and tune than hidden dice-pool odds;
- supports combat and noncombat band language with one roll structure;
- can absorb later systems if modifier lanes and conversion rules are enforced.

## 3. Numeric basis from Pass 3 work

Pass 3 simulations and reviews were narrow: mostly basic attack/defense at varying levels and modifier conditions. They did not prove full-system balance.

Useful findings to preserve:

- Lattice-100 did not trigger the same Direct-rate runaway alerts seen in Bell-20 under the tested matrix.
- Edge-d20 remained simpler but more breakpoint-sensitive.
- The simulation scope did not cover full 2 AP play, reactions, overwatch, free attacks, Mitigation, Shield, ability trees, cyberware, TacMap objectives, or noncombat counters.
- Therefore, playtest should stress full-system interactions rather than continue broad abstract simulation.

## 4. Stable tuning surfaces

Powers and checks can be designed around stable surfaces:

| Surface | Examples |
|---|---|
| Action economy | AP cost, reaction use, micro-interaction, stance/prepared reaction. |
| Movement | MP, dash bonus, sprint permission, carry tax, route tax, vertical access. |
| TacMap state | node cover, visibility, exposure, route hazard tags, objective authority. |
| Durability | Health, System Integrity, Mitigation, Shield, Downed/Disabled state, revive/restoration timer. |
| Status | resistance, clear timing, persistent conversion, status severity, status source. |
| Weapons | slot, range relation, tags, reload, ammo, charge, heat. |
| Systems warfare | sensor reach, access tier, trace, lock, jam, shutdown, seize, Firewall. |
| Recovery | stabilization quality, field repair, between-node repair, downtime action. |
| Campaign pressure | crew condition, ship condition, Health, Morale, Loyalty, trauma, reward tags, recruit slots. |
| Information | question rights, clue quality, hidden-route reveal, resistance read, faction procedure. |
| Signal/Contact | Signal pressure, Contact checks, weird resistance, discovery-gated vulnerability. |


### 4.1 Durability terminology and tuning boundary

Use **Health | System Integrity | Defense | Firewall | Mitigation | Shield** in prose when discussing durability-facing math. Compact display may use `HP/SI | DEF/FW | MTG | SHD`.

Armor is an equipment category. **Mitigation** is the damage-reduction stat or rule surface that armor and other effects may provide. Do not treat armor itself as the stat.

Shield is not extra Health. Baseline Shield behavior for tuning discussions:

- Shield X means X charges per encounter unless a specific source rule says otherwise.
- A Basic Shield auto-triggers on qualifying incoming effects, including Graze.
- Shield stepdown: Direct -> Hit; Hit -> Graze; Graze -> Miss / 0 Health damage.
- Apply durability in this order: Shield -> Mitigation -> Health/System Integrity.

### 4.2 Cover tuning boundary

Cover is a permission-and-position rule first, then a Defense modifier. Once a TacMap line, node/path relationship, or attack permission exists:

- Half Cover adds +20 Defense.
- Full Cover adds +40 Defense.
- Cover modifies Effective Defense only.
- Cover does not reduce damage and does not provide Mitigation.
- Do not use continuous angle calculation.

## 5. Primary Lattice-100 risk list

Watch these failure modes first:

1. **Additive modifier inflation** makes TS too high too often.
2. **Direct frequency creep** makes critical/superior outcomes feel routine.
3. **Reaction / Overwatch / free attack multiplication** causes damage pacing to explode.
4. **Mitigation erases Graze** so partial combat success feels pointless.
5. **Shield X becomes extra Health** instead of limited deflection or step-down behavior.
6. **Full cover is too soft** if treated only as a number instead of permission/visibility gating.
7. **d100 display feels clinical** if DM Mode over-shows math or under-narrates consequences.
8. **Noncombat counters become mandatory minigames** rather than ambient pressure systems.
9. **Ability text hides stack behavior** and accidentally creates passive raw TS inflation.
10. **Cyberware/loadout stacking** becomes the dominant way to solve checks.

## 6. Modifier-lane playtest watch

The most important early test is not whether Lattice can roll. It is whether the table can control modifier sources.

Flag an ability, gear item, cover rule, cyberware rule, or assist rule if it:

- grants unconditional raw TS;
- stacks passively with other same-lane bonuses;
- improves chance and effect at the same time;
- triggers on every attack, reaction, assist, or round;
- scales with number of attacks, allies, drones, summons, or overwatch triggers;
- has no clear lane, trigger, frequency, or display line.

## 7. Action economy guardrails

The current safety posture remains:

- one offensive attack per activation is the default;
- extra attacks require explicit trigger, cost, frequency, eligible action, band/effect limits, and chain restrictions;
- reactions and overwatch must not create free attack chains;
- objective actions, scanning, marking, assisting, defensive posture, reload/clear, hacking, and movement should remain valuable AP alternatives.

Playtest must watch whether Direct, weapon tags, and reaction triggers combine into burst loops.

## 8. Mitigation / Shield interaction recommendations

Mitigation should apply after Shield stepdown and after the hit band is identified by default. Armor is the equipment category that often provides Mitigation; do not use armor as the stat name.

Working combat relation:

| Band | Mitigation relation |
|---|---|
| Miss | No damage. |
| Graze | Chip, pressure, status, low damage, or tag effect; Mitigation may reduce heavily but should not always erase the result. |
| Hit | Normal damage/effect reduced by Mitigation. |
| Direct | Superior hit; may pierce, overwhelm, trigger tags, or improve effect, but should not automatically ignore all Mitigation. |

Shield should be limited deflection, step-down, prevention, charge, or tag-gated protection. It should not default to generic extra Health.

## 9. Cover / TacMap compatibility notes

Cover is not damage reduction. It modifies Effective Defense only after attack permission, node/path relation, and line of attack are established.

Working stance:

- Half Cover adds +20 Defense.
- Full Cover adds +40 Defense.
- Cover modifies Effective Defense only.
- Cover does not provide Mitigation.
- Do not use continuous angle calculation.
- Elevation, flank, mark, suppress, exposed route, and objective position should convert into band effects, permissions, or costs when raw TS stacking would inflate.
- Objective actions can use Lattice with time, Exposure, Trace, Hazard Rating, or state-change stakes.

## 10. Ability and modifier design constraints

Ability text should declare:

- lane;
- trigger;
- cost/frequency;
- stack behavior;
- eligible action or check;
- band effect or after-effect;
- whether it modifies TS, changes band result, grants permission, reduces cost, changes risk, or alters consequence;
- compact DM display wording.

Prefer ability designs that affect:

- permission;
- band shaping;
- safer failure;
- lower cost;
- objective progress;
- information;
- Shield/Mitigation interaction;
- counter control;
- one bounded situational TS contribution.

Avoid early focus tiers that only add flat numerical stacking.

## 11. Noncombat counter compatibility

Disposition, Exposure, Trace, and Op Knowledge should remain scene pressure systems, not mandatory tracks players must solve before acting.

Lattice should be used for:

- Gate checks;
- Pressure checks;
- Setup checks;
- risk discovery when uncertainty matters;
- Trace/Exposure/Disposition consequence quality when a roll is actually called.

Bad Trace or Exposure should not automatically spawn endless follow-up encounters. It should matter when later player action intersects the adverse fact, scope, or risk surface.

## 12. Playtest questions

Use DM Mode and Draft reviews to answer:

- Do the Lattice bands create enough texture at the table?
- Does Graze feel useful without slowing combat?
- Does Partial / Compromised Success improve noncombat pacing?
- Are final rolls uncertain enough to feel genuinely random?
- Does TS display help or make play feel too clinical?
- Are focus thresholds useful without replacing player creativity?
- Do skill-revealed options reduce confusion or become menu clutter?
- Does the focus-tier model create too many micro-choices?
- Do cumulative totals at each split help play or bloat the sheet?
- Do broad Ability/Attribute totals help play, or are Skills/Focuses enough?
- Do crew skills improve play without stealing PC agency?
- Does Contact or Cyberwarfare need special safety/currentness handling?
- Do status clear/resistance checks add good drama or too much friction?
- What does a recovery roll improve when basic stabilization is already guaranteed?

## 13. Targeted simulation triggers

Further simulation is paused unless a specific playtest or source issue demands it.

Resume simulation only for concrete questions such as:

- Direct rate is too common at observed TS ranges;
- Mitigation/Shield math erases too many Graze results;
- reaction chains produce too much expected damage;
- ability modifier lanes cannot keep TS inside target ranges;
- noncombat Gate/Pressure/Setup checks produce too many failures or too many clean successes;
- an alternate benchmark is needed to explain a table-facing failure.

## 14. Do not finalize yet

Do not finalize permanent probability bands, DC tables, skill caps, advancement costs, ability totals, status clear math, Contact math, Cyberwarfare math, or Planning Point math until Lattice has been tested against:

- one combat-focused ability batch;
- one noncombat/social/infiltration batch;
- one equipment/loadout/cyberware batch;
- at least one TacMap playtest;
- at least one DM Mode execution pass using visible TS/margin/band display.


