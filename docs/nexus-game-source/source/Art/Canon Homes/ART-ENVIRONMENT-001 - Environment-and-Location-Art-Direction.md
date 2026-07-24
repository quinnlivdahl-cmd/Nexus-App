---
project: "Nexus"
doc_id: "ART-ENVIRONMENT-001"
legacy_ids:
  - 'ART-005'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\19 Art Visual Direction rev0.3\ART-005 - Environment_and_Location_Art_Direction.md'
title: "Environment_and_Location_Art_Direction"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "visual-direction"
placement_domain: "Art"
content_role: "canon_home"
topic_family: "environment_and_location_art_direction"
owns_topics:
  - 'environment_and_location_art_direction'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-18"
last_reviewed: "2026-07-18"
metadata_verified: true
metadata_notes: "Phase 10 complete for the Art domain. Environment and location visual-direction language now follows domain-first boundaries and preserved-reference handling. The 2026-07-18 review clarified the prototype's implemented projection math and TBE interaction-highlight geometry, while keeping generated camera concepts non-authoritative."
---

# Environment and Location Art Direction

> [!important] Revised vision reconciliation — 2026-07-11
> Production environment art supports a fixed shallow tilted top-down camera and validated modular Locations. Live Illustrations and concept composites may establish mood or depict committed moments, but they never define authoritative geometry, cover, navigation, or state.

## Environment principles

Nexus locations should look like places where people live, work, hide, trade, breathe, and fail. Use the built environment to show economics, faction pressure, maintenance burden, and survival risk.

## Playable environment camera

The accepted Movement + Camera Prototype #13 projection is the authoritative visual reference for playable environment art:

- fixed orthographic view at 10 degrees from true overhead;
- world east/west remains screen left/right and world north/south remains screen up/down;
- no rotated diamond floor plane and no conventional isometric or three-quarter room view;
- the floor plane is not rotated: world-axis-aligned geometry stays screen-axis-aligned, while diagonal or curved authored geometry remains as authored;
- show primarily the tops of actors, furniture, machinery, and architecture, with only shallow vertical extrusion for height and material readability;
- Free Movement and turn-based encounters use the same viewing angle; Tactical Pressure may pull the camera back without changing the projection.

For art and prompt translation, preserve the prototype's implemented projection behavior rather than treating `10 degrees` as generic slight-isometric language:

- world-depth projection is `cos(10 degrees)`, approximately `0.985`, so floor squares remain almost square and there is almost no depth compression;
- vertical extrusion is scaled by `sin(10 degrees) / sin(32 degrees)`, approximately `0.328`, relative to the prototype's conventional shallow-isometric baseline;
- actors read primarily from crown, shoulders, upper back, and top silhouette rather than through portrait-readable frontal torsos;
- furniture, machinery, and walls show overwhelmingly top surfaces with only thin side faces.

Concept sheets intended to represent playable spaces must use this camera. Cinematic Live Illustrations may use other perspectives when they are not being presented as the player's spatial view.

The playable prototype implementation and its projection checks are the sole authority for the exact angle and projection. Generated images cannot prove that they are mechanically true to `10 degrees`; they may illustrate the intended near-plan reading but must not be used to measure, validate, or override the prototype projection.

Illustrative perspective concept, not projection proof: [gameplay environment perspective concept — 2026-07-17](../Reference%20Inputs/concepts/2026-07-17/nexus-gameplay-environment-perspective-concept-2026-07-17.png).

### Turn-based interaction highlighting

During Turn-Based Mode, interactable targets with currently available actions should receive a clear, high-contrast highlight. The highlight marks the usable target object, not its adjacent actor approach destination or canonical `Interaction Position`, and is a gameplay affordance rather than a permanent part of the environment art.

- align brackets or perimeter treatments to the target's projected floor-plane footprint and orientation;
- rotate or skew the treatment with angled equipment instead of placing a screen-aligned rectangle across it;
- keep the perimeter outside the target silhouette with consistent breathing room; if exact footprint alignment is impractical, enlarge the treatment enough that it does not overlap the equipment;
- use slightly enlarged, higher-contrast treatment so availability registers immediately at gameplay scale;
- do not use node paths, movement grids, or unrelated route overlays to communicate availability.

Illustrative interaction-treatment concept, not camera validation: [prototype-informed FREE/TBE interaction view — 2026-07-18](../Reference%20Inputs/concepts/2026-07-18/nexus-prototype-camera-tbe-interaction-concept-2026-07-18.png).

Approved interaction-treatment composite, not camera validation: [FREE/TBE robot-highlight composite — 2026-07-23](../Reference%20Inputs/concepts/2026-07-23/nexus-free-tbe-robot-highlight-composite-2026-07-23.png). In this reference, the actor remains upright in screen space, the robot retains an authored floor-plane rotation, and the TBE perimeter follows that rotation outside the robot silhouette. Its pale grid is a review diagnostic, not gameplay UI.

## Ships

Ships should be modular, maintained, patched, and compartmentalized:

- narrow corridors;
- cargo quarantine partitions;
- pressure doors;
- exposed service runs;
- detachable modules;
- tool lockers;
- makeshift isolation areas;
- shipboard diagnostic panels.

Player ships should feel like mobile homes, workshops, shelters, and liabilities at the same time.

## Orbital stations and habitats

Station environments should mix corporate order with resident adaptation:

- official signage layered over local fixes;
- emergency markings and faded station maps;
- constrained public corridors;
- cargo zones and sealed maintenance levels;
- improvised markets;
- restricted medical or evidence spaces;
- surveillance and checkpoint geometry.

## Asteroid mines and industrial sites

Use mass, dust, vibration, hazard, and low-margin survival:

- drill housings;
- pressure tents;
- ore bags;
- exposed rock and pressure-foam patches;
- emergency shelters;
- radiation and vacuum signage;
- worn suits and cargo lifts.

## Mars, Europa, Earth orbit, and major centers

Do not over-finalize location visuals beyond active lore. Use broad cues only:

- Earth orbit: dense infrastructure, old prestige, surveillance, ports, legal density;
- Mars: industrial expansion, habitat engineering, dust, pressure culture;
- Europa: cold, ice logistics, oceanic research echoes, station tension;
- belt/mines: improvisation, distance, patched survival, autonomy pressure.

## Corporate/state/station life

Everyday visuals matter:

- ration labels;
- worn public kiosks;
- childcare or clinic corners;
- maintenance shifts;
- cheap food in service corridors;
- access badges and temporary permits;
- safety posters nobody trusts;
- personal shrines, stickers, graffiti, and workstation decoration.

## Contact and alien-signal scenes

Alien-signal scenes should begin in familiar environments: a clinic, comms room, sensor bay, evidence locker, or maintenance corridor. The uncanny element should be the way normal systems behave incorrectly.

## Map and location art boundary

Stable system maps, faction displays, route-node maps, and location diagrams should be treated as play aids until Lore confirms exact geography and faction control. Art can clarify presentation, but Lore owns setting truth and Play Aids owns play-facing specification.
## Environment reference update - 2026-05-15

### Asteroid mine / low-G industrial site direction

The uploaded 64-node asteroid mine TacMap prototype is useful as visual evidence for:

- airlock choke points.
- pressure-boundary contrast between exterior vacuum and interior atmosphere.
- mining machinery, gantries, exposed conduits, dust, regolith, and hazard signage.
- bypass routes, service crawls, maintenance ducts, and alternate pressure routes.
- an engulfing environmental treatment around the clear, fixed 10-degree-from-overhead authored Location view.

This image is not canonical playable Location data until useful topology and content are rebuilt as authored geometry, objects, objectives, Interaction Positions, Cover Positions, and validated state.

### Orbital/station exterior visual reference

The uploaded orbital/station exterior image is useful as visual reference for lived-in industrial orbital architecture: modular hulls, exposed service infrastructure, patched surfaces, dock arms, pressure systems, warning bands, and maintenance history. It is not a named canon location unless later promoted through source review.
