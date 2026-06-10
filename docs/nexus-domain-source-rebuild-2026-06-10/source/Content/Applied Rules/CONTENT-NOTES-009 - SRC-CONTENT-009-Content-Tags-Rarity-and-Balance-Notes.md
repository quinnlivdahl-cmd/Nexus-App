---
project: "Nexus"
doc_id: "CONTENT-NOTES-009"
legacy_ids:
  - 'SRC-CONTENT-009'
legacy_paths:
  - 'C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source\13 Content Systems rev0.5\SRC-CONTENT-009 - Content_Tags_Rarity_and_Balance_Notes.md'
title: "Content_Tags_Rarity_and_Balance_Notes"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "provisional-source"
placement_domain: "Content"
content_role: "applied_rule"
topic_family: "content_tags_rarity_balance_notes"
owns_topics:
  - 'content_tags_rarity_balance_notes'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-06-08"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Full migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active content-tag and rarity notes without relying on slot-era wording."
---

# Content Tags, Rarity, and Balance Notes

## Purpose

Tags let content interact with rules, skills, loadouts, hazards, NPCs, aftermath, and route consequences without writing long bespoke rules every time.

## Tag groups

### Damage / defeat tags

```text
Lethal
Nonlethal
Stun
Disable
Hack
Morale
Capture
Explosive
Fire
EMP
Signal
Legal
Custody
Suppression
```

### Enemy / opposition tags

```text
Swarm
Brute
Elite
Skirmisher
Objective Runner
Controller
Suppressor
Guard
Sniper
Breacher
Hacker
Drone
Machine
Biological
Shielded
Armored
High-Evasion
Control-Resistant
System-Vulnerable
Hazard-Linked
```

### Hazard / environment tags

```text
Vacuum
Pressure
Radiation
Fire
Cold
Gravity
Zero-G
Debris
Contamination
Surveillance
Alarm
Software
Legal
Custody
Signal
Anomaly
```

### Reward / salvage tags

```text
Gear
Credential
Information
Route Access
Faction Leverage
Crew Benefit
Ship Benefit
Salvage
Story Asset
Data-Rich
Salvageable
Contaminated
Traceable
Illegal
```

## Rarity guidance

Rarity should mean more than store price.

Possible rarity surfaces:

- how hard content is to find;
- how hard it is to safely use;
- legal/faction restriction;
- maintenance burden;
- social visibility;
- ship infrastructure requirement;
- story permission;
- specialist skill requirement;
- drawback or heat risk;
- campaign-stage gate.

## Balance notes from test profiles

Enemy/content balance should preserve meaningful build niches.

- If precision builds beat swarms as efficiently as area builds, niche protection may be weak.
- Flat armor can over-punish multi-hit builds unless armor interaction is carefully designed.
- If evasion is too easy to bypass, it stops mattering; if too hard, some builds become helpless.
- Shields should create tactical timing, not just a second health bar.
- Boss control resistance should reduce control dominance without making control characters irrelevant.
- Machine vulnerability should make technical characters useful without making hacking universal.
- Biological and non-machine opposition can prevent hacking universality without invalidating technical characters entirely.
- Objective-runner content keeps non-damage builds meaningful.
- Attrition is useful but can become unfun bookkeeping if choices are not meaningful.

## Tag currentness rule

Tags are provisional. Do not treat this list as exhaustive or final. When a tag becomes rule-bearing, route it to the owning package and update this doc or the future data package.

## Data package future

Later, tag dictionaries, rarity levels, encounter templates, enemy profile rows, hazard lists, and loot tables may move into CSV/XLSX under the Data package. Markdown remains the creative authority until that migration is explicit.

## Mass-intake tag additions

The following provisional tags are now useful content-side vocabulary. They are not a final controlled dictionary.

```text
Node Status
Path Status
System Status
Firewall
System Integrity
Standard Fit
Low-G
Vacuum
Pressure Boundary
Bypass
Breach
Locked Route
Player-Safe
DM-Only
Encounter Start
Route Node End
Persistent Aftermath
Traceable
Contaminated
Restricted
Illegal
Custody
```

Future controlled vocabulary, CSVs, or data dictionaries should likely route through `Data` or a dedicated data-table pass after the mechanics stabilize.


