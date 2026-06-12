---
project: "Nexus"
doc_id: "ART-TRIAL-020"
title: "Nexus Art Style Trial Prompt Series"
doc_status: "working_draft"
working_state: "style_trial_packet"
mode_owner: "Art"
source_role: "reference_input"
canon_status: "non_canon_visual_trial"
placement_domain: "Art"
content_role: "prompt_trial_packet"
topic_family: "art_style_trials"
created: "2026-06-12"
last_updated: "2026-06-12"
metadata_verified: false
metadata_notes: "ChatGPT-created Art-domain style trial packet. Needs Codex/local verification, index regeneration, and live-source promotion review before being treated as source authority."
---

# Nexus Art Style Trial Prompt Series

## Purpose

Prepare a comparable prompt series for testing Nexus visual style, palette, TacMap readability, character identity, equipment/interface consistency, and small-object readability.

This packet is a **non-canon visual trial**. It supports Art Direction and Art Production, but it does not establish final Nexus visual canon by itself.

## Intended placement

- Prompt packet: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/ART-TRIAL-020 - Nexus-Art-Style-Trial-Prompt-Series.md`
- Output image folder: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`
- Output index placeholder: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/README.md`

## Replacement / supplement note

- Replaces: nothing.
- Supplements: `ART-PROMPT-001`, `ART-STYLE-001`, `ART-CHARACTER-001`, `ART-ENVIRONMENT-001`, `ART-EQUIPMENT-001`, `ART-UI-001`, `ART-RUNBOOK-012`, and `ART-REFERENCE-010`.
- Canon status: non-canon visual trial until reviewed and promoted.
- Old files may be deleted: no. This is additive exploration only.

## Source anchors

This packet follows these current Art-domain principles:

- Art owns visual direction, prompt guidance, asset routing, concept-art indexing, image-generation workflows, iconography, TacMap visual readability, and asset promotion paths.
- Art does not own final mechanics, campaign state, live dashboard state, source mechanics, binary asset storage, automation runtime behavior, or content canon outside visual promotion.
- Important prompts should carry metadata: asset use, canon status, mode owner, target folder, related source docs, prompt version, preservation requirements, exclusions, and post-generation review question.
- Variants should change one dimension at a time rather than silently changing source truth.
- Actual image generation belongs to Art Production and should be explicitly invoked.

## Save convention for generated images

Save generated images into:

`docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`

Recommended filenames:

- `trial-01-master-style-grid-5x5.png`
- `trial-02-palette-grid-5x5.png`
- `trial-03-tacmap-focused-grid.png`
- `trial-04-character-focused-grid.png`
- `trial-05-object-and-ui-grid.png`
- `trial-06-selected-style-production-sheet.png`

Do not embed large image binaries directly into Markdown. Store images as separate files and reference them from an output index.

## Global Nexus visual lock

Apply this visual lock to every prompt unless intentionally testing an exception:

Nexus is grounded NASApunk / cyber-noir tactical science fiction. The world should feel practical, modular, militarized, corporate, lived-in, hazardous, and readable as a tactics game. Favor practical NASA-like industrial design, cyberpunk density, dieselpunk grit, exposed mechanicals, patched hulls, analog backups, thick cables, hazard markings, utilitarian crew gear, off-white panels, worn orange safety markings, faded teal diagnostics, emergency red, warning yellow, electric cyan accents, matte armor plates, canvas, polymer, brushed metal, rubberized seals, scuffed paint, tactical webbing, industrial displays, and restrained faction icons.

Avoid fantasy, superhero armor, cyberpunk fashion, punk hair, exaggerated silhouettes, glossy toy-like plastic, overdesigned anime weapons, neon overload, Star Trek cleanliness, military-parade styling, generic blue hologram everything, and fashion-model character styling.

## Default negative prompt

Do not change core asset silhouette between grid cells. No fantasy, no medieval, no magic, no anime, no cartoon comedy, no chibi, no fashion runway poses, no punk mohawks, no exaggerated hair, no giant shoulder pads, no glowing swords, no Warhammer-scale armor, no superhero suit, no random faction swaps, no unreadable clutter, no decorative nonsense, no huge logos, no over-saturated neon cyberpunk, no military parade uniform, no pinup framing, no gore.

## Style columns for grid tests

Use these as columns whenever a prompt asks for a five-column style grid:

1. **Grounded cinematic realism** — tactical sci-fi, gritty, practical, restrained, film-still lighting, real materials.
2. **Clean stylized 3D game art** — readable shapes, polished, modern, slightly simplified, asset-library friendly.
3. **Tactical top-down game asset style** — crisp, functional, UI-ready, strong silhouette readability, map-token practical.
4. **Graphic novel / cel-shaded** — bold controlled linework, high contrast, clean shadow blocks, not cartoon comedy.
5. **Painterly grounded concept art** — hand-painted, atmospheric, still tactical and practical, not abstract.

## Palette columns for palette tests

Use these as columns whenever a prompt asks for a five-column palette grid:

1. **Off-white / orange / teal** — worn off-white panels, safety orange, faded teal diagnostics, dark industrial negative space.
2. **Graphite / amber** — charcoal, gunmetal, warm amber UI, muted tan wear marks.
3. **Naval blue / cyan** — deep blue-gray, low-saturation cyan lights, white stencil marks.
4. **Olive / red hazard** — desaturated olive, black polymer, small emergency red accents.
5. **Sand / oxide / orange** — dusty sand, oxidized metal, burnt orange safety markings.

## Required base asset rows

Use these as default row assets for five-row grids:

1. **Tier 1 Nexus operative** — helmeted or practical tactical operative, basic armor, rifle/sidearm kit, no punk/fashion styling.
2. **TacMap interior** — compact science-vessel or corporate facility room, node-friendly layout, cover sockets, doors, terminal, tactical readability.
3. **Mission terminal / objective console** — waist-high industrial terminal with screen, cable trunk, status light, clear interaction point.
4. **Deployable drone / sensor pod** — compact tactical device, tripod or crawler form, readable camera/sensor function.
5. **Cover/object kit** — modular crate, half-cover barricade, ammo/med case, hazard cylinder, all same design family.

---

# Prompt 01 — Master style comparison grid

Asset use: broad visual direction comparison  
Canon status: non-canon visual trial  
Mode owner: Art  
Target folder: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`  
Related source docs: `ART-PROMPT-001`, `ART-STYLE-001`, `ART-RUNBOOK-012`, `ART-CHARACTER-001`, `ART-EQUIPMENT-001`, `ART-UI-001`  
Prompt version: `ART-TRIAL-020-P01`  
Must preserve: row asset silhouette, function, camera, core layout, and Nexus visual lock  
Avoid: changing source truth through variants  
Post-generation review question: Which column best balances Nexus identity, readability, and production feasibility?

```text
Create a 5x5 Nexus concept art style-trial grid.

Purpose: compare art styles, not generate random different assets.

Grid structure:
- Columns = 5 different potential Nexus game art styles.
- Rows = 5 fixed base assets.
- Each row must show the SAME base asset repeated across all 5 columns, re-rendered only in the column's style.
- Do not change the asset's core silhouette, function, layout, camera angle, faction markings, or design language within a row.
- Add small column labels and row labels if possible, but keep them minimal and readable.

Global Nexus visual lock:
Grounded NASApunk / cyber-noir tactical science fiction. Practical NASA-like industrial design, cyberpunk density, dieselpunk grit, modular spacecraft/habitat logic, exposed mechanicals, patched hulls, analog backups, thick cables, hazard markings, utilitarian crew gear, off-white panels, worn orange safety markings, faded teal diagnostics, emergency red, warning yellow, electric cyan accents, matte armor plates, canvas, polymer, brushed metal, rubberized seals, scuffed paint, tactical webbing, industrial displays, restrained faction icons, readable tactics-game composition.

Column styles:
1. Grounded cinematic realism — tactical sci-fi, gritty, practical, restrained, film-still lighting, real materials.
2. Clean stylized 3D game art — readable shapes, polished, modern, slightly simplified, asset-library friendly.
3. Tactical top-down game asset style — crisp, functional, UI-ready, strong silhouette readability, map-token practical.
4. Graphic novel / cel-shaded — bold controlled linework, high contrast, clean shadow blocks, not cartoon comedy.
5. Painterly grounded concept art — hand-painted, atmospheric, still tactical and practical, not abstract.

Rows / fixed base assets:
1. Tier 1 Nexus operative: helmeted or practical tactical operative, basic armor, rifle/sidearm kit, no punk haircut, no fashion-model styling, no exaggerated theme hair.
2. TacMap interior: compact science-vessel or corporate facility room, top-down tactical layout, node-friendly spacing, cover sockets, doors, terminal, clear navigation paths.
3. Mission terminal / objective console: waist-high industrial terminal with screen, cable trunk, status light, clear interaction point, same silhouette across styles.
4. Deployable drone / sensor pod: compact tactical device, tripod or crawler form, camera/sensor head, small antenna, readable function, same silhouette across styles.
5. Cover/object kit: modular crate, half-cover barricade, ammo/med case, hazard cylinder, all in the same design family, same layout across styles.

Lighting and palette:
Use a unified restrained tactical palette across all cells: off-white panels, graphite, gunmetal, muted blue-gray, low-saturation amber/cyan interface lights, worn orange safety markings, restrained red hazard accents. Do not let palette differences dominate the style comparison.

Camera rules:
Character row: consistent 3/4 standing pose.
TacMap row: consistent top-down or slight isometric view.
Object rows: consistent 3/4 product view.

Negative prompt:
Do not change core asset silhouette between grid cells. No fantasy, no medieval, no magic, no anime, no cartoon comedy, no chibi, no fashion runway poses, no punk mohawks, no exaggerated hair, no giant shoulder pads, no glowing swords, no Warhammer-scale armor, no superhero suit, no random faction swaps, no unreadable clutter, no decorative nonsense, no huge logos, no over-saturated neon cyberpunk, no military parade uniform, no pinup framing, no gore.
```

Expected saved output:

`docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/trial-01-master-style-grid-5x5.png`

---

# Prompt 02 — Unified palette comparison grid

Asset use: palette comparison  
Canon status: non-canon visual trial  
Mode owner: Art  
Target folder: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`  
Related source docs: `ART-PROMPT-001`, `ART-STYLE-001`, `ART-REFERENCE-010`  
Prompt version: `ART-TRIAL-020-P02`  
Must preserve: style, silhouette, camera angle, faction markings, material type, and design language  
Avoid: palette changes turning into asset redesigns  
Post-generation review question: Which palette feels most Nexus while staying readable?

```text
Create a 5x5 Nexus color-palette trial grid.

Purpose: compare color palettes for a unified Nexus tactical sci-fi art direction.

Grid structure:
- Columns = 5 palette families.
- Rows = 5 fixed base assets.
- Each row must show the SAME base asset repeated across all 5 columns, changing only the color palette.
- Keep style, silhouette, camera angle, faction markings, material type, and design language consistent across all cells.
- Use clean labels if possible.

Unified rendering style:
Clean stylized 3D game art with grounded NASApunk tactical materials. Readable shapes, practical surfaces, restrained detailing, modern game asset presentation, not too cartoony.

Palette columns:
1. Off-white / orange / teal — worn off-white panels, safety orange, faded teal diagnostics, dark industrial negative space.
2. Graphite / amber — charcoal, gunmetal, warm amber UI, muted tan wear marks.
3. Naval blue / cyan — deep blue-gray, low-saturation cyan lights, white stencil marks.
4. Olive / red hazard — desaturated olive, black polymer, small emergency red accents.
5. Sand / oxide / orange — dusty sand, oxidized metal, burnt orange safety markings.

Rows / fixed base assets:
1. Tier 1 Nexus operative: helmeted or practical tactical operative, basic armor, rifle/sidearm kit, no punk haircut, no fashion-model styling, no exaggerated theme hair.
2. TacMap interior: compact science-vessel or corporate facility room, top-down tactical layout, node-friendly spacing, cover sockets, doors, terminal, clear navigation paths.
3. Mission terminal / objective console: waist-high industrial terminal with screen, cable trunk, status light, clear interaction point.
4. Deployable drone / sensor pod: compact tactical device, tripod or crawler form, camera/sensor head, small antenna, readable function.
5. Cover/object kit: modular crate, half-cover barricade, ammo/med case, hazard cylinder, all in the same design family.

Camera rules:
Character row: consistent 3/4 standing pose.
TacMap row: consistent top-down or slight isometric view.
Object rows: consistent 3/4 product view.

Negative prompt:
Do not alter silhouettes or object functions between palettes. No neon cyberpunk overload, no rainbow palettes, no fantasy colors, no bright toy plastic, no luxury fashion color blocking, no faction redesigns, no extra props that appear only in one palette column.
```

Expected saved output:

`docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/trial-02-palette-grid-5x5.png`

---

# Prompt 03 — TacMap-focused style grid

Asset use: TacMap visual-readability comparison  
Canon status: non-canon visual trial  
Mode owner: Art  
Target folder: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`  
Related source docs: `ART-RUNBOOK-012`, `ART-ENVIRONMENT-001`, `ART-UI-001`  
Prompt version: `ART-TRIAL-020-P03`  
Must preserve: topology, wall layout, doorway positions, cover sockets, terminal location, stairs, elevation markers, and objective location  
Avoid: beauty over tactical readability  
Post-generation review question: Which style keeps the map most usable at game-table size?

```text
Create a 5-column Nexus TacMap style-comparison grid.

Purpose: compare whether different art styles can support a readable tactical map.

Grid structure:
- One row only, five columns.
- Each column shows the SAME compact TacMap room rendered in a different style.
- Do not change room topology, wall layout, doorway positions, cover sockets, terminal location, stairs, elevation markers, or objective location between columns.
- Keep tactical readability higher priority than beauty.

TacMap base asset:
A compact science-vessel interior room with a south entry hatch, narrow central corridor, small side alcoves, a central atrium-like fighting space, two half-cover crates, one full-cover machinery block, one waist-high objective terminal, one closed door to the north, one raised side platform with stairs, clear navigable paths, node-friendly floor spacing, and subtle circular node-placement hints integrated into the floor.

Column styles:
1. Grounded cinematic realism — tactical sci-fi, gritty, practical, restrained.
2. Clean stylized 3D game art — readable shapes, polished, modern, slightly simplified.
3. Tactical top-down game asset style — crisp, functional, UI-ready, strong shape readability.
4. Graphic novel / cel-shaded — bold linework, high contrast, controlled color blocks.
5. Painterly grounded concept art — hand-painted, atmospheric, still grounded sci-fi.

Palette:
Worn off-white panels, graphite, gunmetal, blue-gray, muted amber/cyan interface lights, small red hazard marks, worn orange safety markings. Keep the palette consistent across columns.

Camera:
Top-down with very slight isometric depth. Same camera in all columns.

Negative prompt:
No random room redesigns, no changed topology, no different door positions, no decorative clutter blocking navigation, no unreadable floor detail, no fantasy architecture, no giant machinery that destroys the node web, no cyberpunk neon flood, no cinematic camera angle that hides gameplay layout.
```

Expected saved output:

`docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/trial-03-tacmap-focused-grid.png`

---

# Prompt 04 — Character-focused style grid

Asset use: character style comparison  
Canon status: non-canon visual trial  
Mode owner: Art  
Target folder: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`  
Related source docs: `ART-CHARACTER-001`, `ART-STYLE-001`, `ART-PROMPT-001`  
Prompt version: `ART-TRIAL-020-P04`  
Must preserve: silhouette, armor layout, weapon type, pose, equipment loadout, faction marking placement, and body type  
Avoid: hero-skin drift  
Post-generation review question: Which style makes the operative feel baseline, believable, and distinctive?

```text
Create a 5-column Nexus character style-comparison grid.

Purpose: compare how a Tier 1 Nexus operative reads across art styles.

Grid structure:
- One row only, five columns.
- Each column shows the SAME Tier 1 Nexus operative rendered in a different style.
- Do not change silhouette, armor layout, weapon type, pose, equipment loadout, faction marking placement, or body type between columns.
- The operative should feel like a baseline unit, not a hero skin.

Character base asset:
A practical helmeted tactical operative in grounded near-future armor. Medium build, standing 3/4 view, compact rifle held low-ready, sidearm holster, chest rig, knee pads, gloves, small comms module, backpack plate or battery pack, restrained Nexus faction marking on shoulder or chest, scuffed matte materials, no exposed fashion styling.

Column styles:
1. Grounded cinematic realism — tactical sci-fi, gritty, practical, restrained.
2. Clean stylized 3D game art — readable shapes, polished, modern, slightly simplified.
3. Tactical top-down game asset style — crisp, functional, UI-ready, strong silhouette readability.
4. Graphic novel / cel-shaded — bold linework, high contrast, controlled color blocks.
5. Painterly grounded concept art — hand-painted, atmospheric, still grounded sci-fi.

Palette:
Graphite armor, muted blue-gray fabric, black polymer, small amber/cyan device lights, subtle tan wear marks, restrained red emergency tab.

Negative prompt:
No punk hair, no uncovered fashion-model head, no superhero suit, no bulky power armor, no fantasy armor, no giant weapon, no cape, no glowing sword, no anime proportions, no attractive character posing, no random insignia changes, no faction redesigns.
```

Expected saved output:

`docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/trial-04-character-focused-grid.png`

---

# Prompt 05 — Object and UI-readability grid

Asset use: small object and UI readability comparison  
Canon status: non-canon visual trial  
Mode owner: Art  
Target folder: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`  
Related source docs: `ART-EQUIPMENT-001`, `ART-UI-001`, `ART-PROMPT-001`  
Prompt version: `ART-TRIAL-020-P05`  
Must preserve: object function, row silhouette, tactical readability, and design family  
Avoid: object drift and prop clutter  
Post-generation review question: Which style gives the clearest small-object language?

```text
Create a 5x5 Nexus object-readability style grid.

Purpose: test how small tactical objects, UI-adjacent props, and interaction points read across styles.

Grid structure:
- Columns = the five Nexus style directions.
- Rows = five fixed object types.
- Each row must preserve the same object silhouette across all columns.
- Keep all objects in the same design family: practical, modular, corporate tactical sci-fi.

Column styles:
1. Grounded cinematic realism — tactical sci-fi, gritty, practical, restrained.
2. Clean stylized 3D game art — readable shapes, polished, modern, slightly simplified.
3. Tactical top-down game asset style — crisp, functional, UI-ready, strong shape readability.
4. Graphic novel / cel-shaded — bold linework, high contrast, controlled color blocks.
5. Painterly grounded concept art — hand-painted, atmospheric, still grounded sci-fi.

Rows / fixed objects:
1. Half-cover crate: modular waist-high tactical crate, reinforced corners, small white stencil, same dimensions in every column.
2. Full-cover machine block: tall industrial machinery cabinet, vents, cables, hazard strip, same dimensions in every column.
3. Objective terminal: waist-high console with angled screen, small handle, cable trunk, clear interaction light.
4. Deployable sensor pod: compact tripod/crawler sensor device with camera head, antenna, battery pack.
5. Status token set: small overhead game tokens for operative, enemy, hazard, objective, unknown contact; same icon shapes in every column.

Palette:
Off-white panels, graphite, gunmetal, muted blue-gray, amber/cyan lights, worn orange safety markings, tiny red hazard marks.

Camera:
Object rows: consistent 3/4 product view.
Token row: top-down flat or slightly beveled game-token view.

Negative prompt:
No unrelated props, no different object shapes within a row, no unreadable clutter, no decorative sci-fi nonsense, no toy-like bright plastic, no fantasy symbols, no huge logos, no random weapon piles.
```

Expected saved output:

`docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/trial-05-object-and-ui-grid.png`

---

# Prompt 06 — Selected-style production sheet template

Asset use: selected-style consolidation sheet  
Canon status: non-canon visual trial unless reviewed/promoted  
Mode owner: Art  
Target folder: `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`  
Related source docs: `ART-PROMPT-001`, `ART-STYLE-001`, `ART-CHARACTER-001`, `ART-EQUIPMENT-001`, `ART-UI-001`, `ART-RUNBOOK-012`  
Prompt version: `ART-TRIAL-020-P06`  
Must preserve: selected style/palette and unified game identity  
Avoid: silently establishing final canon  
Post-generation review question: Is this coherent enough to become a promoted style candidate?

```text
Create a Nexus production-style asset sheet using the selected art direction.

Selected style:
[INSERT SELECTED STYLE: e.g. clean stylized 3D game art with grounded tactical materials]

Selected palette:
[INSERT SELECTED PALETTE: e.g. off-white / orange / teal with graphite equipment and small cyan interface lights]

Purpose:
Create a coherent first-pass visual language sheet for Nexus game assets. This is not a final asset sheet. It should test whether characters, maps, props, tokens, and UI-adjacent objects feel like one unified game.

Sheet layout:
- 3 rows x 4 columns.
- Keep each asset isolated on a neutral background.
- Use small labels if possible.
- Maintain consistent materials, faction markings, scale logic, and design language.

Assets:
1. Tier 1 Nexus operative, 3/4 standing view.
2. Tier 1 Nexus operative, top-down tactical token view.
3. Basic enemy guard, same tech level but visually distinct from Nexus operative.
4. Compact drone/sensor pod.
5. Half-cover crate.
6. Full-cover machinery block.
7. Objective terminal.
8. Closed bulkhead door.
9. TacMap room thumbnail, top-down tactical layout.
10. Hazard cylinder or leaking power cell.
11. Med/ammo utility case.
12. UI token/icon set: operative, enemy, hazard, objective, unknown contact.

Global Nexus visual lock:
Grounded NASApunk / cyber-noir tactical science fiction. Practical, modular, militarized, corporate, lived-in, tactics-game readable. Materials: matte armor plates, canvas, polymer, brushed metal, rubberized seals, scuffed paint, tactical webbing, industrial displays, small hazard markings, restrained faction icons, believable wear, off-white panels, worn orange safety markings, faded teal diagnostics, emergency red, warning yellow, electric cyan accents.

Negative prompt:
No fantasy, no anime, no punk styling, no superhero armor, no giant weapons, no cyberpunk neon overload, no decorative clutter, no random faction marks, no inconsistent scale, no unrelated design families.
```

Expected saved output:

`docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/trial-06-selected-style-production-sheet.png`

## Recommended run order

1. Run Prompt 01 first to choose leading style direction.
2. Run Prompt 02 second to choose leading palette.
3. Run Prompt 03 to verify TacMap readability.
4. Run Prompt 04 to verify character identity.
5. Run Prompt 05 to verify small-object and UI readability.
6. Run Prompt 06 only after picking a leading style/palette.

## Review rubric

Score each output from 1-5:

- Tactical readability
- Unified Nexus identity
- Character believability
- TacMap usability
- Small-object readability
- Production feasibility
- Palette restraint
- Distinctiveness from generic sci-fi

## Next Codex/local action

1. Confirm this folder path is acceptable in the repo source mirror.
2. Regenerate the source index with `corepack pnpm run source:index`.
3. Validate with `corepack pnpm run validate:workflow`.
4. Generate or manually save images into `docs/nexus-domain-source-rebuild-2026-06-10/source/Art/Style Trials/outputs/2026-06-12/`.
5. Add output filenames and review notes to the output README after images exist.
6. Do not delete older visual trials without explicit review.
