# Issue #108 raster asset provenance

Status: canon candidate

These assets form a reusable gameplay-scale sample set for the production-intent seed. They are not final game-wide textures, a complete environment kit, a sprite family, or a canonical visual source. Promotion requires Quintin's human art gate.

## Reference lock

Art review baseline: 2ca033bb81f9b77497a5d420b2584434fa185238

The generation pass used two committed style/readability references:

- [Material reference C](art-direction/production-intent-style-material-c.png): primary material and focal-detail reference.
- [Readability reference B](art-direction/production-intent-style-readability-b.png): secondary floor-plane readability reference.

The references constrain camera, palette, material hierarchy, and gameplay readability only. Decorative details in them do not establish topology, cover, routes, interactables, or Game Truth.

## Production path

1. Generate isolated raster candidates with the built-in image generator against the two references.
2. Use a uniform #00FF00 field for isolated alpha-bearing assets.
3. Remove chroma with the image-generation helper using border keying, a soft matte, transparent threshold 12, opaque threshold 220, and despill.
4. Trim transparent padding and add a four-pixel transparent safety border with ImageMagick. This preserves a stable anchor while preventing generated canvas padding from shrinking the asset at gameplay scale.
5. Load through the Vite/Pixi asset path with nearest-neighbor sampling. The runtime maps authored pixels to explicit world dimensions; it does not infer scale from the source canvas.
6. Draw the three accessibility markers as authored SVGs so silhouette and internal glyph remain deterministic and non-color-only.

The raw image-generation outputs and correction variants are retained outside the repository's shipping asset tree. Only the selected, trimmed files and deterministic markers are committed.

## Shipping inventory

| File | Native pixels | SHA-256 |
|---|---:|---|
| environment/industrial-floor-tile.png | 1254 × 1254 | 2c91cb4502bd40c38eaac05c1f5e9831beca7825ee2407fbdacda4866f768589 |
| environment/pressure-bulkhead-wall.png | 1717 × 158 | 62cbaf9b515f6f9c9b9037db1b682b14303618d5352a80b89545a7f2a82f9a5b |
| environment/pressure-door-slab.png | 377 × 1453 | aabb78b8fd419cbbbc23c04afe41b8dd1ad2be8e8b92b5142629bb87d69ce3a4 |
| environment/service-channel-live-conduit.png | 1322 × 377 | 5f118722e0ad19f78e7b9ee9ed879ed6ca1613654191e6fccb69cba214003e77 |
| focal/field-lead-east-idle.png | 271 × 459 | 519b00410d35f71030bba96a241c9a0392717ce913563a3970f429ed0e00d137 |
| focal/relay-console.png | 808 × 622 | 1993f46f8b66ce431f2344384207e78dbf1c5ac5b2f7af091d12d2ef9558cbe4 |
| markers/marker-interactable.svg | 96 × 96 | 2e548270d7b21e0d01e71bbba6609740b20b8899dc10143493db2ceeaa999f94 |
| markers/marker-hazard.svg | 96 × 96 | 28f471899eee5ec37cfcbca866da26f1c344618e5fc4523e5a98d834c5b52e5c |
| markers/marker-objective.svg | 96 × 96 | bebb2e5d0551958ee8d02fdff5a1de2c6c60c9e40a705d5f53c9b2d02af2264e |

## Exact generation prompts

### Industrial floor tile

~~~text
Use case: stylized-concept. Asset type: a tileable game-environment raster texture for Nexus #108. Input images: the two most recent images are style references only; use the first for broad readable floor plates and the second for the locked dark industrial material/detail treatment. Primary request: create one square opaque seamless-looking industrial floor tile with no isolated props. Scene/backdrop: a full-frame top-down to very shallow 10-degree near-overhead surface, entirely filled by the tile. Style/medium: crisp hand-authored pixel art, chunky pixel clusters, restrained selective detail. Composition: square repeatable plate pattern with broad calm medium dirty-gray steel panels, subtle seams, sparse rivets and maintenance scuffs, quiet service wear, no border frame. Color palette: charcoal and dirty medium gray with rare muted brown-orange maintenance marks only. Materials: worn painted steel, panel seams, small bolts. Constraints: completely opaque square image; edges must visually continue into copies; no objects, no doors, no wall pieces, no UI, no iconography, no characters, no text, no labels, no watermark, no dramatic lighting or cast shadow.
~~~

### Pressure-bulkhead wall

~~~text
Use case: stylized-concept. Asset type: isolated reusable shallow pressure-bulkhead wall strip sprite for Nexus #108. Input images: prior images are style references only for dark modular pixel-art material language. Primary request: create exactly ONE horizontal shallow pressure-bulkhead STRIP, approximately 4:1 width-to-height, NOT a room, NOT a framed panel, and NOT a wall enclosing an interior. Scene/backdrop: perfectly flat uniform #00FF00 chroma-key background with no floor plane. Subject: a thin horizontal axis-aligned wall edge/profile only, dark gray industrial steel, a single recessed service channel, sparse small orange warning bands, bolts and panel joints; the strip must have no large central gray floor/panel field and no vertical side columns. Composition: centered with generous green padding; subject fully visible; roughly four times wider than tall. Style/medium: crisp chunky pixel art, fixed shallow 10-degree near-overhead camera. Constraints: completely uniform #00FF00 absent from subject; no floor, room, doorway, door, ceiling, character, marker, UI, text, symbol, watermark, cast shadow, contact shadow, reflection, glow, gradient, fog, clipping, or diamond/isometric rotation.
~~~

### Pressure-door slab

~~~text
Use case: stylized-concept. Asset type: isolated narrow vertical closed pressure-door slab sprite for Nexus #108. Input images: prior images are style references only for dark industrial chunky pixel-art materials. Primary request: create exactly ONE narrow vertical pressure-door SLAB module, approximately 1:2.5 width-to-height, NOT a full corridor deck, NOT a room, and with no surrounding floor or wall field. Scene/backdrop: perfectly flat uniform #00FF00 chroma-key background, no floor plane. Subject: a compact tall closed metal door slab only with a crisp central vertical seam, small latches, two sparse muted-orange warning bands, and tiny amber status lights; dark gray steel outer edges but no extended surrounding architecture. Composition: centered, entirely visible, generously padded with green; clearly narrow and vertical. Style/medium: crisp chunky pixel art at fixed shallow 10-degree near-overhead camera. Constraints: background completely uniform #00FF00 absent from subject; no room, floor, corridor, wall, character, marker, UI, text, symbols, watermark, cast shadow, contact shadow, reflection, glow, fog, gradient, clipping, or diamond/isometric rotation.
~~~

### Service-channel live conduit

~~~text
Use case: stylized-concept. Asset type: isolated horizontal environment sprite module for Nexus #108. Input images: prior images set the locked dark industrial pixel-art material/detail style. Primary request: create one exposed service-channel live-conduit trench module only, designed as a horizontal 4-world-unit modular segment. Scene/backdrop: perfectly flat uniform #00FF00 chroma-key background with no floor plane. Subject: a wide low horizontal axis-aligned rectangular recessed conduit trench, dark steel framing, visible bundled orange cable accents and small service hardware, readable at game scale; it is substrate only, not a hazard marker. Style/medium: crisp chunky pixel art, broad modular shapes and restrained fine detail, shallow 10-degree near-overhead view. Composition: centered and fully visible with generous #00FF00 padding on all sides. Constraints: background is completely uniform and #00FF00 must be absent from subject; no hazard triangle, exclamation, marker, UI, text, label, character, door, wall, cast shadow, contact shadow, reflection, glow, fog, gradient, watermark, clipping, or diamond/isometric rotation.
~~~

### Field Lead actor

~~~text
Use case: stylized-concept
Asset type: canon-candidate single static Field Lead sprite for a fixed camera only 10 degrees from true overhead.
Input images: Image 1 and Image 2 are style references only: use their dark charcoal industrial palette, tiny cyan status accents, muted orange service detail, and crisp chunky technical-mosaic pixel clusters.
Scene/backdrop: perfectly flat solid pure #00FF00 chroma-key background, uniform to every edge.
Subject: exactly one compact Field Lead crew member, idle, facing east (right). CAMERA IS NEAR-VERTICAL ORTHOGRAPHIC TOP-DOWN: look almost straight down. The sprite must look like an overhead tactical-game token: helmet crown, shoulders, backpack top, arms, and boots are seen mainly from above. The body and feet align to the screen vertical axis, with the east-facing faceplate only a shallow right-side/front feature. No side-profile human figure. No diagonal stance, no diamond-shaped isometric pose, no tilted 3/4 depth. The visible front/side extrusion is minimal, less than a few pixels compared with the top surfaces. Gray-black work armor, compact pack/harness, dark east-facing faceplate focal detail, tiny cyan equipment light, minimal orange service trim.
Style/medium: crisp hard-edged chunky technical-mosaic pixel art, production gameplay sprite, no smooth painterly gradients.
Composition/framing: centered with generous even padding; whole top-down silhouette plus a compact uncut dark contact shadow inside canvas. No cropping.
Constraints: no visible weapon, lore markings, logos, UI, text, labels, icons, selection marker, extra people, floor plane, scenery, props, or green in subject/shadow. Single sprite, no animation strip. Background only #00FF00 with no texture/gradient/reflection/lighting variation.
Avoid: 3/4 isometric character, diagonal perspective, side view, human portrait, poster composition, watermark.
~~~

### Relay console

~~~text
Use case: stylized-concept
Asset type: canon-candidate compact relay-console floor prop for a fixed camera only 10 degrees from true overhead.
Input images: Image 1 and Image 2 are style references only: retain their crisp chunky technical-mosaic pixel clusters, dark charcoal industrial materials, cyan status lighting, and restrained orange service accents.
Scene/backdrop: perfectly flat solid pure #00FF00 chroma-key background, uniform to every edge.
Subject: exactly one low physical relay-console floor prop. CAMERA IS ALMOST VERTICAL ORTHOGRAPHIC TOP-DOWN: look nearly straight down. The console footprint is a compact SCREEN-AXIS-ALIGNED rectangle, edges parallel to the image horizontal and vertical axes. It must NOT be a diagonal diamond, tilted isometric crate, or angled 3/4 prop. We see mostly its flat top surface, with only a narrow shallow front extrusion along its lower horizontal edge. Top surface has one cyan abstract status screen, an orange service latch/detail, and connector logic/ports integrated along the shallow bottom/front edge. It reads as a solid floor object, not UI.
Style/medium: crisp hard-edged chunky technical-mosaic pixel art, production game prop, no smooth painterly gradients.
Composition/framing: centered with even generous padding; whole screen-axis rectangle and compact uncut dark contact shadow inside canvas. No cropping.
Constraints: no UI overlay, popup, hologram, text, letters, numbers, logo, icon, selection marker, extra objects, floor plane, scenery, or green in prop/shadow. Single prop only, no animation strip. Background only #00FF00 with no texture/gradient/reflection/lighting variation.
Avoid: diagonal perspective, isometric diamond, 3/4 product render, poster composition, labels, watermark.
~~~

## Human gate

The runtime review decides whether this set is good enough to establish the production-intent sample and pipeline direction. A pass does not silently expand these six generated assets into final textures for the rest of Nexus.
