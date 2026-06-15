---
project: "Nexus"
doc_id: "SKILL-OPEN-008"
legacy_ids:
  - 'SRC-SKILL-008'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\10 Skills Resolution RNG rev0.5\SRC-SKILL-008 - Resolution_Open_Questions.md'
title: "Resolution Open Questions"
doc_status: "draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "open_questions"
canon_status: "provisional_source"
placement_domain: "Skills"
content_role: "open_questions"
topic_family: "resolution_open_questions"
owns_topics:
  - 'resolution_open_questions'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 Skills consolidation. Body routing now uses domain-first language; legacy package/slot wording is retained only in legacy_ids and legacy_paths."
---

# Resolution Open Questions

## 1. Current decision posture

Lattice-100 is the active provisional working kernel. It is not final locked math.

Open questions should now focus on making Lattice survive ability work and playtest, not on restarting broad RNG candidate selection.

## 2. Lattice-100 open decisions

| Question | Current status |
|---|---|
| Should Lattice-100 become final, or remain provisional after first playtest? | Open. Use Lattice now; decide after observed play. |
| What exact TS formula converts character capability, difficulty, Defense, Firewall, Hazard Rating, and modifier lanes into final Target Score? | Resolved provisionally for table use: `TS = 50 + Actor Bonus - (Defense - 15)`, Effective Defense variant, Firewall variant, and Hazard Rating variant. Keep final tuning open after playtest. |
| Should global TS floors/ceilings exist? | Open. Current guidance uses alert ranges, not hard caps. |
| What are the default difficulty/defense values for routine, hard, elite, hazardous, and impossible checks? | Open. Needs playtest table. |
| What is the desired Direct rate by character tier and encounter type? | Open. Combat Direct currently uses margin 70+; watch during playtest. |
| What is the desired Graze/Partial rate? | Partly resolved: combat Graze is margin 0-9; noncombat keeps original provisional bands for now. Watch pacing and usefulness. |
| Should ties at `roll = TS` remain Graze / Partial Success? | Current Lattice kernel says yes; verify in play. Combat tie is Graze; noncombat tie remains Partial / Compromised Success under original provisional bands. |
| How should opposed checks convert both sides into TS? | Open. Needs compact DM procedure. |
| How should advantage beyond TS 85 convert into effect, safety, information, or band shaping? | Open. Current guidance gives conversion categories. |
| How visible should TS be to players? | Open. DM Mode should show it when useful, not necessarily every hidden risk. |
| How much hidden modifier use is allowed? | Open. Current guidance strongly prefers visible/inferable sources. |
| When should a roll be skipped because threshold/Op Knowledge/gear already solves the action? | Open. Preserve threshold-for-competence principle. |

## 2.5 Resolved or narrowed by 2026-05-24 integration

| Topic | Current handling |
|---|---|
| Combat result bands | Resolved provisionally: Miss if roll > TS; Graze margin 0-9; Hit margin 10-69; Direct margin 70+. |
| Noncombat result bands | Preserve original provisional noncombat bands for now; do not force combat-tuned bands onto noncombat. |
| Defense formula | Resolved provisionally with the current Target Score formula forms in `SRC-SKILL-003` and `SRC-SKILL-004`. |
| Cover modifiers | Resolved provisionally: Half Cover +20 Defense; Full Cover +40 Defense; cover modifies Effective Defense only. |
| Durability terms | Use Health, System Integrity, Defense, Firewall, Mitigation, Shield in prose. Armor remains an equipment category, not the Mitigation stat. |

## 3. Ability / progression open decisions

| Question | Current status |
|---|---|
| What is the final top-level name for "Ability" / broad derived values? | Open. Current project language has shifted toward Attribute -> Skill -> Skill Focus -> Ability, but final naming remains unsettled. |
| Does Nexus need explicit broad Attribute/Ability values on the sheet? | Open. Current direction treats broad totals as derived from Skills/Focuses unless Draft approves another chassis. |
| What is the exact skill scale? | Open. Skill increases should be meaningful; maxing many things should be unlikely. |
| How many Skills should exist? | TBD after surrounding systems mature. Old 30 + 2 list is vocabulary/reference, not final count. |
| What is the lowest-tier name: ability, power, effect, feature, technique, talent, move, or other? | Open. Preserve as Draft naming issue. |
| Are powers/effects/features separate leaves or labels inside focus tiers? | Open. Rev0.3 treats them as likely low-tier player-facing picks under Skill Focus; current user language favors "abilities" for leaves. |
| How many focuses should a skill support? | Open. Avoid over-fragmenting. |
| Does every focus have levels/tiers? | Current best direction says likely yes, but exact tier count is open. |
| How do lower-tier abilities/powers/effects contribute to Skill Focus totals? | Open math. Direction is bottom-up. |
| How do Skill Focus totals bump parent Skills? | Open math. Direction is confirmed bottom-up. |
| How do Skill totals bump broad Attribute/Ability values? | Open math. Use as derived aggregate until Draft finalizes. |
| Are Skill Focuses universal under each Skill, discipline-specific, or mixed? | Open. |
| How should ability ranks affect Lattice? | Open. Prefer permission, band shaping, cost, risk, information, and bounded TS over passive stacking. |

## 4. Combat / equipment / TacMap open decisions

| Question | Current status |
|---|---|
| How should Lattice attack bands map to weapon damage? | Open. Working bands: Miss / Graze / Hit / Direct. |
| How much damage should Graze do? | Open. Must remain meaningful after Mitigation. |
| Should Direct pierce Mitigation, trigger tags, add damage, or improve tactical effect? | Open. Do not default to "ignore all Mitigation." |
| How exactly should Mitigation interact with Graze/Hit/Direct? | Open. Equipment/Combat dependency. |
| How exactly should Shield X work? | Open. Current recommendation: limited deflection/step-down/tag behavior, not generic extra HP. |
| Is half cover a TS modifier, band shaper, or both? | Resolved provisionally: Half Cover adds +20 Defense after attack permission/line is established. |
| Is full cover a TS penalty or permission/visibility gate? | Resolved provisionally: Full Cover adds +40 Defense when attack permission/line exists; otherwise cover may still affect permission/visibility. |
| How do reactions, overwatch, and free attacks avoid damage multiplication? | Open. Requires action economy guardrails. |
| What is the default number of offensive attacks per activation? | Current safety posture: one unless explicit exception. |
| How should objective actions use Lattice? | Open. Likely time, Exposure, Trace, hazard, or state-change stakes. |

## 5. Noncombat / counter open decisions

| Question | Current status |
|---|---|
| How should Gate / Pressure / Setup checks set TS? | Open. Current split accepted as working procedure. |
| How often should Disposition or Exposure directly modify TS versus stakes/consequence? | Open. Prefer risk/options/cost/stakes over constant raw modifiers. |
| When does Op Knowledge skip a roll instead of modifying one? | Open. Depends on subject importance, scope, and acquired leverage. |
| How does Trace become mechanically relevant without creating endless encounter chains? | Open. Current guardrail: only when later player action intersects Holder/Fact/Scope. |
| How visible should noncombat counters be to players? | Open. Need DM display test. |
| How should partial noncombat success move counters? | Open. Use scene-specific stakes until table evidence exists. |
| How should Pressure Checks support less-social characters without becoming the whole scene? | Open. Current model allows any character to work counters, exploit them, or push through them. |

## 6. Special-channel open decisions

| Question | Current status |
|---|---|
| How do crew skills interact with PC checks? | Provisional assist/lead/unlock/passive model. |
| How do ship system ratings modify checks? | Open. Cross-route to Core ship-phase sources and any future Data/Automation surfaces if a workbook or tool is needed. |
| How do cyberware, body traits, and gear grant skill-like abilities? | Cross-route to Equipment and Characters; do not force all into Skill tree. |
| What is the final status resistance/clear-check model? | Open. Combat owns status timing/taxonomy; Skills owns the check call when needed. |
| Which statuses clear automatically, require action, or require roll? | Open. |
| What is the exact distinction between Resolve, Morale, Loyalty, and Signal pressure? | Open; cross-route Characters, Lore, and Dashboards. |
| Should Contact be a skill, restricted channel, asset, or Signal relationship? | Open. Preserve as special/campaign-gated channel. |
| Should Cyberwarfare be unlockable, restricted, or a high-tier Computing focus? | Open. Preserve as restricted/special channel. |
| Should Planning Points exist as a focus/discipline/faction/specialist feature? | Open. Not a global default. |
| How should good planning bypass rolls without deleting drama? | Route full scene procedure to Core and Modes. |
| What does a recovery roll improve when basic stabilization is guaranteed? | Open; likely revival state, cost, consequence, resource, time, or status severity. |

## 7. Modes / DM Mode required follow-up

DM Mode must not ignore Lattice-100.

Modes should receive a mode-rule/template patch for:

- Lattice check call display;
- Target Score, roll, margin, and band syntax;
- combat band display: Miss / Graze / Hit / Direct;
- noncombat band display: Hard Fail / Fail / Partial / Success / Critical Success;
- playtest logging when Lattice produces confusion or friction;
- instruction not to silently revert to d20 or generic improvised RNG.

## 8. Core routing reminder

Core should receive or verify ownership of:

- scene-beat procedure;
- strong-plan rewards;
- when to resolve a complex plan in multiple beats;
- when a good plan bypasses a roll;
- how revealed options fit into mission-node and scene structure;
- how Lattice outcomes route into mission clocks, route nodes, and scene consequences.

## 9. Cross-domain backpatch notes

| Domain | Backpatch note |
|---|---|
| Admin | Add mass-intake/process lessons only if they affect ongoing source routing. |
| Modes | DM display docs should include or cross-reference Lattice-100 check display and narrative option presentation rules. |
| Core | Core loop should own scene-beat and strong-plan procedure; Lattice outcomes should route to mission/node consequences. |
| Combat | Combat should reference Lattice combat bands, reaction/overwatch guardrails, cover permission, status clear checks, and objective actions. |
| Characters | Recovery/revival can reference Skills for Lattice recovery-quality checks; basic stabilization remains non-failure when access/tool are present. |
| Equipment | Equipment/cyberware should state lanes, stack behavior, Shield/Mitigation relation, and Lattice band effects. |
| Lore | Signal/Contact lore can reference Skills for rare/deferred check surfaces without making Contact a normal skill. |
| Data | Future workbooks need columns for TS, lane, trigger, band effect, stack behavior, and playtest notes. |

## 10. Next best Draft work

Recommended Draft work after this provisional update:

1. Draft the first actual Focus schema using Lattice lanes and band effects.
2. Design one complete mini-tree for one combat focus, one systems focus, one social focus, and one weird/signal focus.
3. Convert the old 30 + 2 vocabulary list into candidate Skill/Focus/domain map without assuming final count.
4. Test Lattice display in DM Mode using one small encounter and one noncombat Gate.
5. Decide whether broad Attribute/Ability totals appear on player-facing sheets or remain internal/derived.

## 11. Preservation note

No old skill source, handoff, dashboard, RNG appendix, or legacy source copy is deletion-approved by this document. Old material may be archived only after verification and explicit user approval.


