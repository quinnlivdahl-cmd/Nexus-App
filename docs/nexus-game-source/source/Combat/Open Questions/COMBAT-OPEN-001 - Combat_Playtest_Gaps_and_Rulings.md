---
project: "Nexus"
doc_id: "COMBAT-OPEN-001"
legacy_ids:
  - 'SRC-COMBAT-008'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\08 Source Combat TacMaps Encounters rev0.4\SRC-COMBAT-008 - Combat_Playtest_Gaps_and_Rulings.md'
title: "Combat_Playtest_Gaps_and_Rulings"
doc_status: "working_draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Steward"
source_role: "open_questions"
canon_status: "review_queue"
placement_domain: "Combat"
content_role: "open_questions"
topic_family: "combat_open_questions"
owns_topics:
  - 'combat_open_questions'
  - 'playtest_gaps'
borrows_topics:
  - 'combat_core'
  - 'recovery_rules'
created: "2026-05-13"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved unresolved combat questions without relying on package-era framing."
---

# Combat Playtest Gaps and Rulings

## 1. Purpose

This document collects combat, TacMap, action economy, encounter, and enemy behavior gaps identified during consolidation and restrained mass-intake integration.

It is a Draft/Steward queue surface, not a final rules document.

## 2. Accepted during previous passes

- Current action baseline is 2 AP + MP + reaction permission + one free micro-interaction.
- Three-action economy remains comparison only.
- One active personal defense posture at a time is the safe v0.1 constraint.
- `Combat` owns tactical durability application order, while `Equipment` owns gear math and equipment-side definitions.
- `Combat` owns the general TacMap grammar for now.
- Enemy behavior doc is seeded from available evidence, not expanded into invented roster content.

## 3. Accepted and integrated in the restrained pass

The 2026-05-15 mass-intake review approved restrained combat-domain updates for later adjustment. These are source-integrated, not frozen final doctrine:

- Damage is broad degradation, not only biological harm.
- Standard Status is the in-encounter status layer.
- Persistent statuses live under long-term crew states: Health, Morale, Loyalty.
- If one effect both applies a Standard Status and Downs the target, that status becomes Persistent by default under the relevant long-term crew-state category.
- Use System Status for tech/cyberware/device/system surfaces.
- Defensive display spine: `Health | System Integrity | Defense | Firewall | Mitigation | Shield`; compact display may use `HP/SI | DEF/FW | MTG | SHD`.
- Actions normally resolve sequentially.
- Default action rules are upgradeable baselines.
- Offensive Tech/system actions obey attack-style limits unless explicitly excepted.
- Node Status and Path Status are distinct environmental/tactical status surfaces.
- Path connection does not equal line of sight.
- Visibility is assumed unless marked unavailable/blocked/obscured.
- Cover belongs under Cover / Visibility / Line-of-Fire.
- Cover is relative and may depend on direction, line, surface, side, or path relationship.
- Node-edge markers are the working display model for relative cover/visibility/line modifiers.
- Cover sharing is governed by node capacity, not separate cover slots by default.
- First occupant at a node keeps cover-use priority unless changed by fiction/rule/procedure.
- Full Wall blocks visibility/movement by default; Half Wall may allow visibility while providing cover.
- Tactical encounter start should automatically include TacMap support when spatial play matters.
- Canonical TacMap truth should be structured node/path/object data, with visual render as aid.
- Lattice combat formula: `TS = 50 + Actor Bonus - (Defense - 15)`.
- Effective Defense: `Effective Defense = Defense + cover + situational defensive modifiers`.
- Lattice combat formula with Effective Defense: `TS = 50 + Actor Bonus - (Effective Defense - 15)`.
- Firewall formula: `TS = 50 + Actor Bonus - (Firewall - 15)`.
- Hazard Rating formula: `TS = 50 + Actor Bonus - (Hazard Rating - 15)`.
- Result bands: Miss = roll > TS; Graze = margin 0-9; Hit = margin 10-69; Direct = margin 70+.
- Half Cover = +20 Defense; Full Cover = +40 Defense; cover modifies Defense only.
- Durability order is Shield -> Mitigation -> Health/System Integrity.
- 0 Health or System Integrity creates a 3-round Downed/Disabled countdown; failure creates critical state, not automatic permanent death/destruction.
- Resolving all active threats counts as revival/restoration unless a specific scenario rule says otherwise.

## 4. Open combat rules gaps

- Initiative / tempo math.
- Exact Health and System Integrity scale by actor type.
- Exact Dash value.
- Sprint limits and opportunity risks.
- Attack once-per-activation exceptions.
- Offensive Tech exception rules.
- Reload / ammo / heat / charge handling.
- Shove math and forced movement consequences.
- Stance duration and reaction refresh.
- Guard Self / Screen Route / Screen Node values.
- Permanent-loss rules after failed Downed/Disabled countdown.
- Stabilization procedure and what requires roll vs access/tool/time.

## 5. Open status and durability gaps

- Final Standard Status tag list.
- Final System Status tag list.
- Whether "Severe" becomes a defined rule term beyond Downed + status conversion.
- Exact status duration and clearance rules.
- Crit/status interaction rules.
- Persistent Health/Morale/Loyalty status recovery procedures.
- Signal Echo intro timing.
- Signal/Contact subsystem scope.
- System Status / EMP / cyberware disruption scaling.
- Detailed Firewall vs System Integrity consequence boundary.

## 6. Open TacMap gaps

- Exposure consequences.
- Range bands or distance penalties.
- Elevation and falling math.
- Node capacity and cover-sharing tuning.
- Exact Crowded penalties.
- In-transit penalties.
- Pathblocking and body-blocking procedure.
- Default TacMap display template.
- Node-edge marker icon grammar.
- Wall breach/destructible wall procedure.
- Dense cluster display standard.
- Noncombat TacMap procedure examples.

## 7. Open encounter gaps

- Standard encounter size by party and level.
- Expected round length by encounter type.
- Timer / clock examples.
- Objective action cost standards.
- Bypass reward / consequence standards.
- Reinforcement rules.
- Retreat and surrender procedure.
- Encounter reward / loot / salvage link.
- Final Node-Web Quality Checklist wording.
- Encounter Layer Checklist vs Node-Web Quality Checklist boundary.
- Trust ladder validation process for AI-generated maps.
- Environment-family template list.

## 8. Open enemy gaps

- Enemy action menus.
- Enemy tactical role tags.
- Basic starter enemy stat blocks.
- Defense profile tuning.
- NetSec / system enemy behavior.
- Morale, rout, surrender, and capture.
- How enemies use node/path/cover/status surfaces.

## 9. Playtest evidence to preserve

Mock combat produced useful rules-surface lessons:

- AP/MP/resource changes should be legible during play;
- objective actions can be as important as attacks;
- hacking needs trace / lock / hostile system counterpressure;
- heavy frame, shove authority, and body-blocking need rules support;
- wall-crawl, stealth, and non-grid movement can produce distinct TacMap play;
- door opening, reinforcement jamming, cut link, manifest preservation, and extraction produced meaningful non-damage success.

Rook / Ternary Lock / E-43 produced useful encounter/process lessons:

- avoid option overload;
- use revealed objective/opportunity sparingly;
- pre-node level-up/loadout belongs before starting the node;
- live dashboard/state belongs to `Dashboards`;
- active campaign events may provide corrections but should not become generic source unless abstracted.

Seed systems and TacMap handoffs produced useful rules-surface lessons:

- status grammar must be explicit enough for mechanics to target;
- node/path status tags need visual support;
- cover must be relative, not a flat node property;
- cover display should be visual, not a visible cover matrix;
- TacMap generated images should be backed by structured node/path/object data;
- reusable SVG/icon/collage systems belong primarily to `Play Aids` and `Art`, while `Combat` owns the rules grammar.

## 10. Cross-domain correction: DM display rules

The first mode/dashboard pass undercaptured established DM display rules. Those rules belong in `Modes` and `Dashboards`, not `Combat`.

Correction target:

- `Modes` docs for DM live display rules, tactical presentation, and output handling.
- `Dashboards` docs for compact live-state layout and current encounter surfaces.
- later handoff/closeout templates for playtest sessions.

`Combat` may cross-reference those rules but should not own them.

## 11. Cross-domain correction: Dq9 escape/save handoff

The initial combat realization did not fully preserve the Dq9 handoff evidence for escape, counters, aftermath, and save workflow. Cleanup backpatch applied:

- `COMBAT-ENCOUNTER-001` now preserves Quick Exit, Requirement Escape, and Set-Piece Escape as procedure cues.
- Route-end reporting and save/export behavior should route to `Core` and `Dashboards`.
- Deferred combat dashboard layout migration remains a future `Dashboards` task, not a `Combat` source expansion in this cleanup pass.

Open follow-up: Draft may later decide whether escape structures need a dedicated combat/encounter procedure doc or belong in content systems.

## 12. Cross-domain correction: templates and dashboards

Mass intake reinforced that templates likely need updates after this source-update pass:

- `Modes` handoff/passoff templates should account for explicit routing and source-update review notes.
- `Play Aids` and `Art` templates or manifests should handle TacMap visual and icon assets.
- `Dashboards` should eventually rebuild live tactical surfaces without brittle legacy behavior.
- `Automation` may later need a structured TacMap data template if runtime automation becomes active.


