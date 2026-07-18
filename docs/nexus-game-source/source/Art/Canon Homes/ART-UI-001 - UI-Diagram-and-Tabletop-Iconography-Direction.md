---
project: "Nexus"
doc_id: "ART-UI-001"
legacy_ids:
  - 'ART-007'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\19 Art Visual Direction rev0.3\ART-007 - UI_Diagram_and_Tabletop_Iconography_Direction.md'
title: "UI_Diagram_and_Tabletop_Iconography_Direction"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "canon_home"
canon_status: "visual-direction"
placement_domain: "Art"
content_role: "canon_home"
topic_family: "ui_diagram_and_tabletop_iconography_direction"
owns_topics:
  - 'ui_diagram_and_tabletop_iconography_direction'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-07-17"
last_reviewed: "2026-07-17"
metadata_verified: true
metadata_notes: "Phase 10 complete for the Art domain. UI, diagram, and iconography language now follows domain-first boundaries and keeps visual guidance distinct from mechanics and play-aid ownership. 2026-07-17 issue #19 reconciliation added the recognizable-interactable and optional-marker visual boundary."
---

# UI Diagram and Tabletop Iconography Direction

## UI and diagram principle

Nexus table aids should be tactical-sourcebook readable. The visual system should help players understand choices quickly, especially on phone or in a compact chat display.

## Default diagram style

Use:

- high-contrast sourcebook diagrams;
- labeled Location and tactical overlays;
- simple icons;
- route arrows and path tags;
- terrain/cover/elevation symbols;
- compact callout boxes;
- limited palette accents;
- clear title, legend, and current-state markers.

Avoid decorative overlays that hide the play information.

## TacMap visual grammar

TacMap images and diagrams should represent the underlying TacMap data. Core visual elements:

- nodes as tactical positions;
- links as routes or movement paths;
- cover and half-cover markers;
- high ground/elevation markers;
- hazards and exposed zones;
- terminals/interactables;
- objectives;
- extraction points;
- actor/enemy positions;
- visible clocks/counters when useful.

Core owns Location authority. Combat owns tactical spatial rules. Play Aids owns play-aid specifications. Art owns visual and iconography style.

## Route-node map visual grammar

Route maps should show:

- current route position;
- known nodes;
- unknown/hidden branches;
- danger/cost indicators;
- opportunities;
- major factions or control zones only when lore supports them;
- selected next node and unresolved clocks.

## Existing icon concept package

A preserved DM Mode Encounter-Play Icon Concept Package exists in the old asset folder. It is concept material only and includes icon groups for:

1. TacMap / Battlefield.
2. Combat Flow.
3. Checks / Resolution.

Preserved icon concepts include TacMap, Node, Connected Route, Cover, Half Cover, High Ground, Hazard, Interactable, Objective, Extraction, Initiative, Turn Order, Move, Attack, Ability, Reaction, Overwatch, Suppress, Aim, Assist, Skill Check, Opposed Check, Hidden Option Revealed, and Consequence.

This icon concept package is not final. It should be used as preservation/reference material for future Art Mode, DM Mode, TacMap, and interface drafting.

## Character sheets and dashboards

Character sheets, crew cards, dashboards, and handouts should be built around readable play state:

- current resources;
- wounds/recovery;
- skills/focus/ability tree;
- loadout;
- relationships;
- permissions/credentials;
- campaign notes;
- open questions and next decisions where appropriate.

Art supports this; it should not overpower it.

## Accessibility and phone usability

Any visual aid likely to be used on phone should:

- survive small-screen viewing;
- have readable labels;
- avoid tiny icon-only meanings without a legend;
- use simple shapes;
- make interactive/clickable or decision-relevant elements obvious.

## Spatial interaction affordance boundary

Objects with known actions should remain consistently recognizable as inspectable or usable even when optional interaction markers are disabled. A general marker may make that affordance more explicit, while hover reveals indicators for the actions the crew currently knows and selection opens the detailed action surface.

The visual system must distinguish a general “something known can be done here” affordance from specific known actions without implying that every action requires a Check. Secret actions remain visually absent. Useful disabled actions may be shown only when their correctable restriction is safe to reveal.

Exact marker shapes, icon families, counts, tiny ticks, animation, and screen placement remain future UI decisions. Skills owns what is known and available; Art owns the eventual recognizable visual language. This applies [ADR-0090](../../../../adr/0090-check-opportunities-are-team-aware-and-knowledge-safe.md).

## TacMap iconography and SVG system update - 2026-05-15

### Sprite sheet / collage-system direction

Reusable SVG sprite sheets and icon kits are preferred for repeatable TacMap assets. The visual system should support:

- reusable node markers.
- reusable path/status markers.
- reusable cover/visibility/line-of-fire markers.
- fast replacement or state-change during play.
- consistent visual language across generated maps and hand-built maps.

### Top-down TacMap icon requirement

TacMap icons are top-down play symbols. They do not need to look like literal physical cover or literal terrain as long as they clearly represent play state. Cover icons must work beside or on the same node as a character/token marker.

### Node-edge marker grammar

Cover, visibility, and line modifiers may sit tangent to node rims or at path endpoints. Marker orientation must make the protected, exposed, blocked, or relevant side clear even when the marker is rotated.

This supports directional and relative cover:

- shooter and target on same side of a cover surface may not grant cover.
- shooter and target on opposite sides may grant cover.
- some surfaces may be one-sided or path-limited regardless of relative position.

Combat owns the mechanical rule. Art owns the visual marker direction.

### Path marker grammar

Path lines may carry route/path status, including electrical, smoke, breach, locked, hazardous, suppressed, sealed, vacuum, difficult, exposed, or unknown. Path status should not be confused with node status.

### Small-scale readability rules

- thick simple silhouettes.
- minimal interior detail.
- transparent background for standalone icons.
- strong shape contrast.
- no text labels inside icons unless unavoidable.
- icon reads at token scale before it reads as an illustration.

### Priority icon families

- half cover.
- full cover.
- directional cover.
- visibility blocked.
- high ground / vertical transition.
- terminal.
- objective.
- hazard.
- locked route.
- entry / exit.
- unknown contact.
- ally / enemy / elite / reinforcement.
