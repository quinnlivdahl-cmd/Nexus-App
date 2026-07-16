---
project: "Nexus"
doc_id: "ART-RUNBOOK-008"
legacy_ids:
  - 'ART-008'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\19 Art Visual Direction rev0.3\ART-008 - Asset_Canon_Status_and_Routing.md'
title: "Asset_Canon_Status_and_Routing"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "asset-handling-rule"
placement_domain: "Art"
content_role: "applied_rule"
topic_family: "asset_canon_status_and_routing"
owns_topics:
  - 'asset_canon_status_and_routing'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 complete for the Art domain. Asset-canon handling and routing now follow domain-first boundaries while preserving Obsidian asset-library usage."
---

# Asset Canon Status and Routing

## Purpose

This doc defines how Nexus art assets, prompts, generated images, icons, diagrams, and visual references are classified and routed.

## Canon status categories

### 1. Canon visual source

Use only after explicit approval and placement. These assets define or constrain future art direction.

Examples:

- approved style bible image set;
- approved faction logo sheet;
- approved species/chassis reference sheet;
- approved icon family.

### 2. Canon candidate

Useful and promising, but not yet binding. Requires Steward/Draft/Art review before it becomes source.

### 3. Session visual

Generated or used for a specific play session, scene, dashboard, or moment. It may help mood and continuity but does not establish source truth.

### 4. Prompt exploration

Prompt tests, alternatives, failed variants, moodboards, or experiments. Preserve if useful, but do not treat as canon.

### 5. Non-canon reference

External or generated visual reference used for inspiration only. It can influence prompts but does not define Nexus source.

### 6. Asset index only

A record that an asset exists, where it lives, and how it should be handled.


## Art Direction / Art Production routing - 2026-05-15

Art workflow artifacts must be routed by lane and output type.

### Art Direction artifacts

Text-only planning outputs include visual critique, prompt drafts, edit prompts, prompt variants, style locks, icon grammar notes, routing notes, and Art Production Packets. These belong in the prompt library, asset register, dashboard queue, or relevant handoff/source doc. They are not generated art.

### Art Production outputs

Generated or edited images produced in Art Production are visual assets or prototypes by default. They require asset metadata and routing before they can become canon candidates or canon visual sources.

### Production Packet status

An Art Production Packet is a bridge artifact. It may carry source constraints and execution instructions, but it is still not canon by itself. It should preserve the planning chat's decisions and prevent the production chat from broad redesign unless explicitly allowed.

### Required lane metadata

When practical, asset or prompt records should include:

- lane: Art Direction / Art Production;
- production packet used: yes/no, filename/link if saved;
- execution prompt version;
- whether `do not generate` or prompt-only constraints were present;
- output status: prompt exploration / visual prototype / session visual / canon candidate / canon visual source;
- whether the image implies source changes;
- target Obsidian folder and related source docs.

## Promotion path

```text
Prompt exploration, Art Direction packet, or session visual
-> Art review
-> Steward placement check
-> Draft/source update if it affects rules/lore
-> Canon candidate or canon visual source
```

## Required asset metadata

When practical, asset records should include:

- filename;
- asset type;
- origin/source chat or tool;
- prompt or prompt summary;
- Art lane: Direction or Production;
- Art Production Packet reference if used;
- creation date;
- mode owner;
- intended use;
- canon status;
- related source docs;
- replacement/supplement guidance;
- deletion guidance;
- known duplicates;
- notes on whether the image implies source changes.

## Storage routing

Recommended Obsidian asset structure:

```text
07_Assets/
  00_Asset_Index.md
  01_Concept_Art/
    Characters/
    Environments/
    Equipment/
    Factions/
    UI_Diagrams/
    TacMaps/
    Maps/
  02_Generated_Art/
    Canon_Candidate/
    Non_Canon_Reference/
    Prompt_Explorations/
  03_Reference_Images/
    NASA_Industrial/
    Cyber_Noir/
    Space_Habitats/
    Equipment_References/
  04_Prompt_Library/
  05_Canva_and_Design_Exports/
```

## Source boundary

Art source docs should contain art direction, prompt rules, and indexes. Large image binaries usually belong in Obsidian asset folders, not in permanent source docs.

## Duplicate handling

Duplicate images should not be deleted automatically. Mark duplicates in the asset index and clean up only after user-approved verification.

## Deletion rule

No art asset, prompt note, icon sheet, reference board, design export, or dashboard visual may be deleted unless there is explicit rejection, supersession, archive placement, or a verified migration path.
## TacMap asset canon-status update - 2026-05-15

### TacMap asset categories

Use these routing categories when indexing or promoting TacMap visuals:

- **SVG icon kit:** reusable icons or marker parts; may be useful before mechanics are final.
- **Sprite sheet:** organized reusable asset sheet for AI/human composition.
- **Test composition:** proof that icons can work together; not automatically canon.
- **Map prototype:** visual demonstration of a possible Location or tactical view; not playable source unless geometry, authored positions, objects, objectives, and state are structured and verified.
- **Canonical playable Location spec:** authored geometry and structured Location/objective state plus approved visual display.
- **Visual reference image:** mood, architecture, materials, or environmental reference; not canon location by default.

### Promotion path

Visual prototype -> Art review -> route implications to Play Aids display spec and/or Combat mechanics -> asset index entry -> possible canonical visual source if approved.

An SVG icon can be a reusable visual asset without making its implied mechanic final. A tactical image can be an excellent visual prototype without being valid Location geometry or state.

Actual SVG/PNG/JPEG files should live in Obsidian asset folders. Art indexes and routes them; it does not need to duplicate every binary asset inside source docs.
