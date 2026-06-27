---
project: "Nexus"
doc_id: "ART-PROMPT-001"
legacy_ids:
  - 'ART-009'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\19 Art Visual Direction rev0.3\ART-009 - Prompt_Library_and_Variant_Rules.md'
title: "Prompt_Library_and_Variant_Rules"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "visual-direction"
placement_domain: "Art"
content_role: "canon_home"
topic_family: "prompt_library_and_variant_rules"
owns_topics:
  - 'prompt_library_and_variant_rules'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 complete for the Art domain. Prompt-library language now follows the domain-first model while preserving direction-vs-production workflow guidance."
---

# Prompt Library and Variant Rules

<!-- source-slice: art.prompt.purpose -->
## Purpose

This is a seeded prompt library for Art Mode and visual support. It gives reusable prompt structures without locking final art generation workflows.

<!-- source-slice: art.prompt.metadata-block -->
## Prompt metadata block

Use this before important prompts when practical:

```md
Asset use:
Canon status:
Mode owner:
Target folder:
Related source docs:
Prompt version:
Must preserve:
Avoid:
Post-generation review question:
```

<!-- source-slice: art.prompt.base-nexus-style -->
## Base Nexus style prompt

```md
Grounded NASApunk sci-fi tabletop RPG visual, near-future solar-system setting, cyberpunk density with dieselpunk grit, practical NASA-like industrial design, modular spacecraft and habitats, exposed mechanicals, patched hulls, analog switches, glowing diagnostics, thick cables, industrial warning labels, utilitarian crew gear, lived-in dangerous environment, off-white panels, worn orange safety markings, faded teal displays, rusted metal, warning yellow, emergency red, electric cyan accents, readable sourcebook composition.

Avoid glossy Star Trek cleanliness, pure military realism, overdesigned anime armor, medieval motifs, fantasy magic, unreadable UI clutter, generic blue hologram everything.
```

<!-- source-slice: art.prompt.character-concept-skeleton -->
## Character concept prompt skeleton

```md
Create a [character/body type/crew role] concept for Nexus, a grounded NASApunk sci-fi tabletop RPG. Emphasize practical lived-in space gear, visible maintenance burden, body/personhood implications, readable silhouette, and cyberpunk-dieselpunk solar-system grit. Show how the character survives fragile habitats and institutional pressure. Preserve Nexus rule: no fantasy races, only arguments about what still counts as human. Do not invent final mechanics or faction canon.
```

<!-- source-slice: art.prompt.environment-concept-skeleton -->
## Environment concept prompt skeleton

```md
Create a [ship/station/habitat/location] concept for Nexus. Make it practical, modular, worn, and lived-in: pressure doors, service corridors, hazard markings, exposed conduits, patched panels, cargo restraints, analog backups, teal diagnostics, orange safety markings, and signs of corporate/state control. Keep the layout readable enough for tabletop use. Do not overcanonize geography, factions, or exact route structure.
```

## Equipment concept prompt skeleton

```md
Create a [weapon/tool/armor/cyberware/accessory] concept for Nexus. The object should look usable in fragile habitats and constrained station environments, with visible maintenance access, legal/serial markings, warning labels, heat/recoil/seal considerations, and practical repair surfaces. Do not invent final damage values, costs, or rules.
```

## Icon prompt skeleton

```md
Create a simple readable tabletop icon for [concept] in Nexus. Style: NASApunk tactical sourcebook UI, flat high-contrast shape, clear silhouette, minimal details, usable at small size, compatible with node-web TacMaps and dashboard legends. Use restrained teal/orange/yellow/red accents on a neutral industrial base. Include a label/legend version and an unlabeled version if possible.
```

<!-- source-slice: art.prompt.tacmap-diagram-skeleton -->
## TacMap diagram prompt skeleton

```md
Create a tactical sourcebook-style node-web map diagram for a Nexus encounter. Prioritize readability over illustration. Include labeled nodes, movement links, cover, half cover, elevation, hazards, interactables, objective markers, extraction, enemy positions, and a compact legend. Use grounded NASApunk industrial visual language with off-white panels, worn orange markings, teal diagnostics, warning yellow, emergency red, and black void/industrial negative space. Do not add rules not supplied in the encounter data.
```

<!-- source-slice: art.prompt.variant-rules -->
## Variant rules

When requesting variants, vary one dimension at a time:

- composition;
- palette intensity;
- level of grit;
- faction/institution marking;
- silhouette;
- diagram density;
- icon abstraction;
- camera distance.

Do not use variants to silently change source truth.

## Repair rules

For image repair prompts:

1. State what must remain unchanged.
2. State the exact defect to fix.
3. State what may be altered.
4. Preserve asset metadata and prompt version.
5. If a repair changes source content, route it as a source decision.

<!-- source-slice: art.prompt.art-mode-behavior-note -->
## Art Mode behavior note

Art Mode has two lanes. Art Direction is the default text-only lane for prompts, edit prompts, variants, critique, style locks, and routing. Art Production is the explicit execution lane for image generation or image editing.

Actual image generation should occur only when the user explicitly invokes Art Production, `Execute Prompt`, `generate now`, `render this`, `edit this image`, or equivalent execution language. `Do not generate`, `prompt-only`, `plan here`, and equivalent language always keep the chat in Art Direction.

<!-- source-slice: art.prompt.art-production-packet-format -->
## Art Production Packet format - 2026-05-15

Use this packet when an Art Direction chat prepares a separate Art Production chat. It is designed to keep source context centralized while preventing accidental image generation in planning chats.

```md
# Art Production Packet

## Purpose
What this image or edit test is for.

## Source Anchors
Relevant Nexus source constraints, style rules, canon boundaries, domain references, and dashboard/routing notes.

## Preserve
Elements that must remain unchanged, including attached-image features, symbol grammar, node/path truth, layout, labels, character identity, or source-specific constraints.

## Change
The specific visual changes or generated elements requested.

## Do Not Include
Hard exclusions, style violations, canon risks, and tool behaviors to avoid.

## Execution Prompt
The exact prompt to paste into Art Production.

## Success Criteria
How to judge the result: readability, source accuracy, style fit, tactical clarity, prompt compliance, and asset-routing readiness.

## Post-Production Routing
Where the output goes in Obsidian; whether it is visual prototype, prompt exploration, session visual, canon candidate, or canon visual source; and what old files may be deleted only after verification.
```

Production packets should be specific enough that Art Production can execute without redesigning the concept. If a production chat discovers a conflict, it should report the conflict rather than silently inventing a new design.

<!-- source-slice: art.prompt.tacmap-prompt-additions -->
## TacMap prompt additions - 2026-05-15

### Top-down TacMap icon prompt skeleton

Create a simple SVG-compatible tabletop TacMap icon for `[ICON PURPOSE]` in a NASApunk sci-fi RPG style. Transparent background. Use thick simple industrial line art, practical hazard-stencil geometry, clean silhouettes, and no fantasy or glossy UI styling. The icon must remain readable at small token scale and should work as a top-down tabletop symbol.

### Node-edge marker prompt skeleton

Create a compact SVG-compatible node-edge TacMap marker for `[COVER/VISIBILITY/LINE EFFECT]`. It should sit tangent to the rim of a node circle. The protected, blocked, or relevant side must be visually obvious even when small or rotated. Use top-down schematic geometry rather than literal object illustration. Transparent background.

### Path status marker prompt skeleton

Create an SVG-compatible path-line TacMap marker for `[PATH STATUS]`. It should overlay or attach to a route/path line without hiding the line. Use simple industrial NASApunk schematic language, readable at small scale, transparent background, no text labels.

### Sprite sheet prompt skeleton

Create a cohesive SVG-compatible sprite sheet of tabletop TacMap icons for Nexus, including `[ICON LIST]`. Use consistent stroke weight, simple industrial hazard-stencil geometry, transparent icon cells, and high readability at phone/tabletop scale.

### TacMap collage prototype prompt skeleton

Create a top-down/slight-isometric NASApunk TacMap prototype for `[LOCATION]`. Show a clear node-web tactical skeleton over an engulfing environmental backdrop. Tactical readability is more important than illustration polish. Include clear nodes, paths, objectives, hazards, exits, and route/status markers. Do not crop for phone display. Preserve structured tactical truth if provided.

### Repair prompt rule

Repair prompts must say what tactical truth may not change: node count, node labels, path connections, objective labels, hazard placement, faction positions, and route status. Visual polish may improve only after tactical readability is preserved.


