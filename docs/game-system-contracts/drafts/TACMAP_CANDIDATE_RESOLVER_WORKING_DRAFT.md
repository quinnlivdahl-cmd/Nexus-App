# TacMap Candidate Resolver Working Draft

Status: working draft / function contract scaffold  
Date created: 2026-06-10  
Origin chat: `Draft — Game System Schema Continuation — 2026-06-10`  
Primary mode: Draft  
Repository role: app-facing TacMap selection and encounter-activation scaffold  
Canon status: not source canon; not live `00 Source`; not final implementation contract

## 0. Purpose

This document preserves the accepted working definition of the **TacMap Candidate Resolver** function.

It exists because TacMap Encounter activation should not require the API DM to search the full map library or invent tactical geometry during live play.

The resolver is an app/content-side selection function that returns valid TacMap candidates or no valid candidate. It supports the larger game-system schema draft but does not replace it.

## 1. Placement / routing

Intended placement:

- Repo draft path: `docs/game-system-contracts/drafts/TACMAP_CANDIDATE_RESOLVER_WORKING_DRAFT.md`
- Parent draft: `docs/game-system-contracts/drafts/GAME_SYSTEM_SCHEMA_DEFINITION_WORKING_DRAFT.md`
- Future source routing: Draft/Steward Review before promotion into live domain-first source.
- Related issues: #33, #34, #35, #36, #38, #41, and future TacMap/content-library issue work.

What this supplements:

- The game-system schema working draft.
- API DM / rules-core authority split.
- Context Broker contract planning.
- TacMap workbook/build process source context.
- Future Base TacMap Library task.

What this replaces:

- Nothing.

Deletion / archive guidance:

- Do not delete or supersede prior Nexus source based on this draft alone.
- This file should be merged into the parent game-system schema draft or promoted through source review only after Codex/local verification.
- Old files may be deleted only after documented replacement, coverage verification, and source-routing approval.

## 2. Source context used

Repo-side source mirror context used during the originating chat:

- `docs/nexus-domain-source-rebuild-2026-06-10/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md`
- `docs/nexus-domain-source-rebuild-2026-06-10/source/Combat/Reference Inputs/COMBAT-REF-001 - TacMap_Workbook_and_Build_Plate_Process.md`
- `docs/nexus-domain-source-rebuild-2026-06-10/source/Core/Canon Homes/CORE-MISSION-001 - SRC-CORE-006-Mission-Node-Structure.md`

Currentness note:

- These are repo-side source mirror files, not direct live local `00 Source` verification.
- Exact live currentness still requires Codex/local inspection of `C:\Nexus Mother Folder\00 Nexus Obsidian Vault\00 Source`.

## 3. Accepted TacMap activation premise

Accepted working rule:

> A TacMap Encounter requires a workbook-backed node/path frame, not merely a map image.
>
> It may be combat or noncombat.
>
> It becomes active only when the DM/app can present an encounter packet with stakes, objective, actors, relevant node/path data, spatial rules assumptions, and player-facing options.
>
> If those are not available, the scene should remain Freeform or use a Structured Noncombat Step rather than improvising tactical geometry mid-scene.

## 4. Accepted TacMap readiness states

### 4.1 No Map Needed

No TacMap pointer is required.

Use for ordinary rooms, quick conversations, calls, simple shops, transit narration, background locations, and scenes where spatial procedure does not matter.

### 4.2 Abstract Only

The place is meaningful, but no spatial procedure is ready.

It can support Freeform Scene Input or Structured Noncombat Step, but it cannot become a TacMap Encounter unless a base TacMap is later created or selected.

### 4.3 Base TacMap Ready

A reusable TacMap and workbook frame exist.

This includes at minimum:

- base map / visual frame if available;
- workbook-backed node/path frame;
- node IDs;
- node capacities;
- path/edge data;
- relevant cover, visibility, access, door, airlock, elevation, POI, and objective reservation assumptions as needed.

No active encounter packet exists yet.

### 4.4 Encounter-Ready TacMap

The base TacMap has been populated into an encounter instance.

Requires:

- selected base TacMap;
- workbook ID;
- actors;
- starting positions or zones;
- objective or scene goal;
- pressure/hazards if any;
- player-facing options;
- exit or transition condition.

### 4.5 Active TacMap Encounter

The encounter is live.

Requires:

- initialized encounter state;
- live actor positions;
- active objectives;
- active hazards/pressure if any;
- turn/activation or other selected encounter procedure;
- logs and state mutation route;
- exit condition.

## 5. Environment readiness vs encounter instance

Accepted correction:

> The promotion gates are not all live-play promotions.
>
> Environment readiness state and encounter activation flow are different things.

Environment readiness states are mostly content/planning metadata:

1. No Map Needed.
2. Abstract Only.
3. Base TacMap Ready.

Encounter instance states are runtime states:

1. Encounter Instance Proposed.
2. Encounter-Ready TacMap.
3. Active TacMap Encounter.

## 6. Base map vs encounter layer

Accepted working rule:

> The DM populates the encounter layer, not the base map.

The base TacMap should already exist as reusable content or be deliberately created outside live improvisation.

The base map owns:

- node/path workbook;
- node capacities;
- paths/edges;
- cover/visibility/access assumptions;
- POI reservation slots;
- door/elevation/hazard support;
- art/backdrop if available.

The encounter layer selects or proposes:

- which actors are present;
- where actors start;
- which reserved POI/objective slots become active;
- what pressure exists;
- what immediate stakes are live;
- what player-facing options are available.

## 7. TacMap Candidate Resolver function

Accepted function to add:

> The API DM should not select TacMaps from the full library.
>
> A TacMap Candidate Resolver or equivalent app/content function should use the current environment, mission, scene tags, and map registry to return valid base TacMap candidates.
>
> The API DM may frame and populate an encounter layer only from those supplied candidates.
>
> If no valid candidate exists, the scene cannot become a TacMap Encounter during live play.

## 8. TacMap Candidate Resolver role

The TacMap Candidate Resolver is an app/content-side function.

It receives current scene/environment/mission context and returns valid base TacMap candidates or none.

It does not narrate.

It does not resolve rules.

It does not create live encounter state.

It does not invent new tactical geometry during live play.

## 9. Inputs

Likely resolver inputs:

- current environment ID;
- environment readiness state;
- current scene ID;
- mission/node ID if any;
- location tags;
- encounter pressure tags;
- current actor set;
- required encounter type if known;
- objective type if known;
- available map registry entries;
- allowed hidden/internal state slice if relevant;
- current player position/location if relevant.

## 10. Outputs

The resolver returns one of:

1. **No valid TacMap candidate**
   - scene must remain Freeform or Structured Noncombat Step;
   - API DM may not activate TacMap play.

2. **Single valid base TacMap candidate**
   - may proceed to Encounter Instance Proposed.

3. **Shortlist of valid candidates**
   - API DM, mission system, or app selection logic may choose from supplied candidates;
   - final activation still requires app/rules validation.

Candidate output should include:

- `base_tacmap_id`;
- `workbook_id`;
- readiness state;
- supported encounter types;
- supported objective/POI slots;
- supported actor capacity assumptions;
- known restrictions;
- confidence/ranking note if multiple candidates are returned.

## 11. Field ownership after resolver selection

| Field | Filled by | Validator |
|---|---|---|
| `base_tacmap_id` | Map Registry / TacMap Candidate Resolver / mission content | App |
| `workbook_id` | Map Registry | App |
| `scene_id` | Game State / mission system | App |
| `encounter_type` | Mission content or API DM proposal from supplied options | Rules/app |
| `active_actors` | Game State + mission content + allowed DM proposal | Rules/app |
| `starting_positions_or_zones` | Mission template, current location, entry zones, or DM proposal | Rules/app against workbook |
| `objective` | Mission content or API DM proposal | Rules/app |
| `pressure_or_hazards` | Mission content, environment state, or API DM proposal | Rules/app |
| `available_action_surfaces` | Workbook + encounter template + rules derivation | Rules/app |
| `visibility_cover_access_assumptions` | Workbook/base TacMap | Rules/app |
| `exit_conditions` | Mission content or API DM proposal | Rules/app |

## 12. Relation to Context Broker

The Context Broker assembles relevant context for the API DM.

The TacMap Candidate Resolver selects/ranks valid base TacMap candidates from map registry and scene/mission/environment metadata.

The resolver may be implemented inside the same app-side context assembly layer at first, but its authority is distinct:

- Context Broker decides what relevant context the API DM sees.
- TacMap Candidate Resolver decides which base TacMap candidates are valid for this scene.
- API DM frames/proposes an encounter layer using supplied candidates.
- Rules/App validates activation.
- Game State Store commits live encounter state.

Short boundary:

> Context Broker assembles context. TacMap Candidate Resolver returns valid map candidates. API DM frames the encounter. Rules/App validates activation.

## 13. Practical cases

### 13.1 Planned mission encounter

Mission content already specifies:

- base TacMap;
- objective slots;
- encounter template;
- actor placement presets or entry zones.

The resolver confirms and returns the specified candidate.

### 13.2 Recurring / hub environment

The current environment has one or more default TacMap pointers.

The resolver returns compatible map candidates based on the current environment and scene pressure.

Example supported modes might include:

- checkpoint;
- crowd scene;
- chase;
- hazard response;
- security response;
- rescue;
- investigation;
- social standoff.

### 13.3 Emergent pressure in a map-ready environment

The player starts trouble in a location with Base TacMap Ready status.

The resolver checks whether the current environment has a usable base TacMap and whether the scene can support an encounter instance.

If yes, it returns candidates.

If no, the scene stays Freeform or Structured Noncombat Step.

### 13.4 Emergent pressure in a no-map environment

No valid candidate exists.

The system must not panic-generate live tactical geometry.

Resolve through Freeform Scene Input or Structured Noncombat Step.

## 14. Base TacMap Library task

Parked task:

> Create a library of reusable main hub / common environment base TacMaps with workbook templates.

The library should include both:

- reusable visuals/backdrops when useful;
- structured workbook templates.

A main hub environment without node/path/workbook data is not ready to become a TacMap Encounter.

Candidate environment families:

- market deck;
- medbay / clinic;
- cargo bay;
- station checkpoint;
- ship corridor cluster;
- maintenance bay;
- bar / social hub;
- docking concourse;
- administrative office;
- crew quarters block;
- engineering room;
- transit platform;
- street / alley cluster;
- lab floor;
- warehouse.

## 15. Open questions

1. Should TacMap Candidate Resolver live as a distinct service/module, or as a named function inside Context Broker / encounter planning at first?
2. What tags are required on base TacMap registry entries?
3. What minimum workbook completeness level qualifies as Base TacMap Ready?
4. How should candidate ranking work when multiple base maps fit?
5. Which common hub/base TacMap families should be built first?

## 16. Next recommended decision

Define the minimum **TacMap registry entry schema**.

That should include enough metadata for the resolver to select candidates without requiring the API DM to inspect the whole workbook.
