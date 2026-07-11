# Nexus Golden Truth Source Slice Catalog

Repository: `quinnlivdahl-cmd/Nexus-App`
Base path: `docs/nexus-game-source/source`
Indexed source slices: 122

## Authority Note

Generated broker-facing catalog of embedded source-slice IDs in Golden Truth Markdown. Source slices are retrievable context units, not new source authority.

The runtime app context pack should reference these slice IDs; this catalog does not decide which slices are selected for a prompt.

## Maintenance

Regenerate after embedded source-slice markers change: `corepack pnpm run source:slices`.

Check that the committed catalog is current: `corepack pnpm run source:slices:check`.

Marker format:

```md
<!-- source-slice: domain.topic.slice-id -->
## Indexed Heading
```

## Domain Counts

| Domain | Slices |
|---|---:|
| Art | 10 |
| Automation | 5 |
| Combat | 16 |
| Content | 19 |
| Core | 32 |
| Lore | 25 |
| Play Aids | 6 |
| Skills | 9 |

## Source Slices

| Slice ID | Document | Heading | Exact repo path | Lines | Content SHA-256 |
|---|---|---|---|---:|---|
| `art.prompt.art-mode-behavior-note` | ART-PROMPT-001 | Art Mode behavior note | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 130-137 | `f24b9a3d6307...` |
| `art.prompt.art-production-packet-format` | ART-PROMPT-001 | Art Production Packet format - 2026-05-15 | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 138-143 | `9dc18f73d5a2...` |
| `art.prompt.base-nexus-style` | ART-PROMPT-001 | Base Nexus style prompt | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 57-66 | `48fc22487133...` |
| `art.prompt.character-concept-skeleton` | ART-PROMPT-001 | Character concept prompt skeleton | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 67-74 | `379d11d7befa...` |
| `art.prompt.environment-concept-skeleton` | ART-PROMPT-001 | Environment concept prompt skeleton | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 75-81 | `8af0486628c6...` |
| `art.prompt.metadata-block` | ART-PROMPT-001 | Prompt metadata block | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 39-56 | `151b05bbcba3...` |
| `art.prompt.purpose` | ART-PROMPT-001 | Purpose | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 33-38 | `c89e64e2aa98...` |
| `art.prompt.tacmap-diagram-skeleton` | ART-PROMPT-001 | TacMap diagram prompt skeleton | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 95-102 | `0ac3de1e2d75...` |
| `art.prompt.tacmap-prompt-additions` | ART-PROMPT-001 | TacMap prompt additions - 2026-05-15 | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 174-200 | `9f2cd48844d7...` |
| `art.prompt.variant-rules` | ART-PROMPT-001 | Variant rules | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 103-118 | `067c57cc2b71...` |
| `automation.context-broker.source-backed-packets` | AUTO-DATA-003 | 4.1 Context Broker and source-backed packets | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 87-111 | `499817bec013...` |
| `automation.context-broker.visibility-layers` | AUTO-DATA-003 | 6. Player-visible and hidden layers | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 131-142 | `2be7699d65b8...` |
| `automation.runtime.conflict-handling` | AUTO-DATA-003 | 7. Conflict handling | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 143-152 | `fa0130a49ad2...` |
| `automation.runtime.creative-source-versus-runtime-instance` | AUTO-DATA-003 | 4. Creative source versus runtime instance | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 67-86 | `4cb34f51b807...` |
| `automation.runtime.source-hierarchy` | AUTO-DATA-003 | 2. Source hierarchy | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 34-44 | `9c0f920d02ab...` |
| `combat.core.app-authority-state-mutation-boundary` | COMBAT-CORE-001 | 9.1 App-facing authority and state mutation boundary | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 174-207 | `5ef0266e3a90...` |
| `combat.core.combat-state-to-track` | COMBAT-CORE-001 | 6. Combat state to track | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 84-96 | `3d3420df8338...` |
| `combat.core.defensive-display-spine` | COMBAT-CORE-001 | 7. Defensive display spine | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 97-121 | `3175d2ab49c2...` |
| `combat.core.durability-application-order` | COMBAT-CORE-001 | 9. Durability application order | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 149-207 | `55a762cec18a...` |
| `combat.core.encounter-start-procedure` | COMBAT-CORE-001 | 2. Encounter start procedure | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 45-60 | `0efa7ea2e733...` |
| `combat.core.end-conditions` | COMBAT-CORE-001 | 11. Combat end conditions | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 215-219 | `4e48db32ae52...` |
| `combat.core.purpose-and-tactical-principles` | COMBAT-CORE-001 | 1. Purpose | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 37-44 | `4a62da41f47f...` |
| `combat.core.turn-and-activation-baseline` | COMBAT-CORE-001 | 5. Turn and activation baseline | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 72-83 | `434b42de6192...` |
| `combat.tacmap.core-definition` | COMBAT-TACMAP-001 | 1. Core TacMap definition | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 36-48 | `79f50e2c82b6...` |
| `combat.tacmap.core-numeric-movement-rule` | COMBAT-TACMAP-001 | 2. Core numeric movement rule | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 49-74 | `510d55e59ca0...` |
| `combat.tacmap.in-transit-state` | COMBAT-TACMAP-001 | 10. In-transit state | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 168-174 | `e169f39219f8...` |
| `combat.tacmap.map-scale-and-movement-support` | COMBAT-TACMAP-001 | 13. Map scale and movement support | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 186-192 | `8c022ef57d75...` |
| `combat.tacmap.node-capacity-and-character-size` | COMBAT-TACMAP-001 | 6. Node capacity and character size | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 118-132 | `ef4a620245ff...` |
| `combat.tacmap.node-status-and-path-status` | COMBAT-TACMAP-001 | 4. Node status and path status | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 89-103 | `d31adca7ba8d...` |
| `combat.tacmap.nodes` | COMBAT-TACMAP-001 | 3. Nodes | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 75-88 | `b77f0889a8b2...` |
| `combat.tacmap.paths-and-line-of-sight` | COMBAT-TACMAP-001 | 5. Paths and line of sight | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 104-117 | `a40658563fe3...` |
| `content.encounter.library-growth-rule` | CONTENT-ENCOUNTER-001 | Library growth rule | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 163-167 | `abac7e957d66...` |
| `content.encounter.pattern-custody-legal-pressure-node` | CONTENT-ENCOUNTER-001 | Pattern: Custody/Legal Pressure Node | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 129-149 | `48345ce59d93...` |
| `content.encounter.pattern-dead-drop-investigation-node` | CONTENT-ENCOUNTER-001 | Pattern: Dead-Drop Investigation Node | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 113-128 | `b4635abf1f14...` |
| `content.encounter.pattern-hazard-clock-room` | CONTENT-ENCOUNTER-001 | Pattern: Hazard Clock Room | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 78-102 | `79eb2ffeee6a...` |
| `content.encounter.pattern-node-path-hazard` | CONTENT-ENCOUNTER-001 | Pattern: Node/Path Hazard Pattern | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 171-182 | `ce79b0db305c...` |
| `content.encounter.pattern-objective-runner` | CONTENT-ENCOUNTER-001 | Pattern: Objective Runner | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 41-59 | `96f81797e700...` |
| `content.encounter.pattern-requirement-escape` | CONTENT-ENCOUNTER-001 | Pattern: Requirement Escape | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 103-112 | `bda840cb766b...` |
| `content.encounter.pattern-salvage-vs-delay-choice` | CONTENT-ENCOUNTER-001 | Pattern: Salvage vs Delay Choice | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 150-162 | `3f241712e95f...` |
| `content.encounter.pattern-system-vulnerable-machine` | CONTENT-ENCOUNTER-001 | Pattern: System-Vulnerable Machine | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 60-77 | `863d6ed48fbd...` |
| `content.encounter.pattern-tacmap-ready-requirement-escape` | CONTENT-ENCOUNTER-001 | Pattern: TacMap-Ready Requirement Escape | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 194-198 | `36d40698ff1f...` |
| `content.encounter.status-and-use` | CONTENT-ENCOUNTER-001 | Status | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 33-40 | `f238f77d917f...` |
| `content.route-node.campaign-specific-node-caution` | CONTENT-ROUTE-001 | Campaign-specific node caution | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 115-120 | `be45821a63f6...` |
| `content.route-node.content-fields` | CONTENT-ROUTE-001 | Node content fields | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 41-67 | `4e46ef6a0bb8...` |
| `content.route-node.node-end-report` | CONTENT-ROUTE-001 | Node end report | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 94-109 | `9c8629c25b28...` |
| `content.route-node.objectives-and-opportunities` | CONTENT-ROUTE-001 | Objectives and opportunities | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 82-93 | `0c24828d07ef...` |
| `content.route-node.pre-node-procedure` | CONTENT-ROUTE-001 | Pre-node procedure | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 68-81 | `d60c2d2b0d1d...` |
| `content.route-node.purpose` | CONTENT-ROUTE-001 | Purpose | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 33-40 | `3309eecfa100...` |
| `content.route-node.route-consequences` | CONTENT-ROUTE-001 | Node content and route consequences | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 121-138 | `340c331b48d6...` |
| `content.route-node.route-node-end-report-fields` | CONTENT-ROUTE-001 | Mass-intake alignment: Route Node End Report fields | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 139-159 | `daddc487460c...` |
| `core.campaign.core-loop` | CORE-CAMPAIGN-001 | 2. Core Loop | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 37-55 | `4d9b55765fa1...` |
| `core.campaign.node-definition` | CORE-CAMPAIGN-001 | 5. Node Definition | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 74-95 | `40ac46d4ed12...` |
| `core.campaign.pre-node-timing` | CORE-CAMPAIGN-001 | 3. C1 Clarification - Pre-Node Timing | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 56-65 | `2eb6b038dd62...` |
| `core.campaign.route-choice-display` | CORE-CAMPAIGN-001 | 7. Route Choice Display | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 111-117 | `a13fd19938d0...` |
| `core.campaign.route-node-end-report` | CORE-CAMPAIGN-001 | 12. Route Node End Report and Save Workflow | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 154-178 | `1512ea3243f3...` |
| `core.campaign.route-structure` | CORE-CAMPAIGN-001 | 4. Route Structure | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 66-73 | `8b63e9a279b4...` |
| `core.glossary.crew` | CORE-GLOSSARY-001 | Crew | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 57-62 | `14314419fa95...` |
| `core.glossary.encounter-start-packet` | CORE-GLOSSARY-001 | Encounter Start Packet | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 143-148 | `de217067d422...` |
| `core.glossary.mission-node` | CORE-GLOSSARY-001 | Mission Node | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 87-92 | `dcd6fac3804a...` |
| `core.glossary.nexus` | CORE-GLOSSARY-001 | Nexus | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 39-43 | `7b1c9230f463...` |
| `core.glossary.node` | CORE-GLOSSARY-001 | Node | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 75-80 | `841789bc630a...` |
| `core.glossary.pre-node-procedure` | CORE-GLOSSARY-001 | Pre-Node Procedure | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 81-86 | `1d4d8877be81...` |
| `core.glossary.route` | CORE-GLOSSARY-001 | Route | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 69-74 | `708caa5301ee...` |
| `core.glossary.ship-phase` | CORE-GLOSSARY-001 | Ship Phase | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 63-68 | `2a32ae43ca90...` |
| `core.glossary.structured-tacmap-data` | CORE-GLOSSARY-001 | Structured TacMap Data | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 149-153 | `5b21d8e3c69e...` |
| `core.glossary.tacmap` | CORE-GLOSSARY-001 | TacMap | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 93-97 | `48bbc3e18b23...` |
| `core.pillars.campaign-scale` | CORE-PILLARS-001 | 7. Campaign Scale | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 115-125 | `b82115c7e2c9...` |
| `core.pillars.campaign-structure` | CORE-PILLARS-001 | 5. Core Campaign Structure | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 63-74 | `a6377d39212c...` |
| `core.pillars.core-pitch` | CORE-PILLARS-001 | 1. Core Pitch | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 33-41 | `689d92061555...` |
| `core.pillars.design-pillars` | CORE-PILLARS-001 | 6. Design Pillars | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 75-114 | `1f29e4c428ca...` |
| `core.pillars.setting-boundary` | CORE-PILLARS-001 | 3. Setting Boundary at Core Level | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 47-53 | `0e7d01fe33ee...` |
| `core.spatial.authority-and-purpose` | CORE-SPATIAL-001 | 1. Authority and purpose | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 35-43 | `f857eb590813...` |
| `core.spatial.campaign-director` | CORE-SPATIAL-001 | 6. Campaign Director boundary | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 85-91 | `66fd38c16f1c...` |
| `core.spatial.campaign-fixtures` | CORE-SPATIAL-001 | 9. Campaign Fixtures | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 117-123 | `70e373538f5d...` |
| `core.spatial.campaign-loop` | CORE-SPATIAL-001 | 2. Campaign and Location loop | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 44-57 | `cd6602fc2e9e...` |
| `core.spatial.family-reconciliation` | CORE-SPATIAL-001 | 11. Source-family reconciliation | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 141-158 | `dad2eb17f741...` |
| `core.spatial.interaction-and-generated-performance` | CORE-SPATIAL-001 | 5. In-world interaction and generated performance | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 78-84 | `7bf5af8a9d06...` |
| `core.spatial.movement-and-position` | CORE-SPATIAL-001 | 3. Movement, interaction, and cover | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 58-68 | `3e6a70446ff0...` |
| `core.spatial.preserved-systems` | CORE-SPATIAL-001 | 8. Preserved systems | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 101-116 | `0fcd2052cfb4...` |
| `core.spatial.ship-time` | CORE-SPATIAL-001 | 7. Ship Time | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 92-100 | `4640521ba165...` |
| `core.spatial.tactical-pressure` | CORE-SPATIAL-001 | 4. Tactical Pressure and initiative | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 69-77 | `2d1e2cb86226...` |
| `core.spatial.unresolved` | CORE-SPATIAL-001 | 10. Explicit unresolved questions | `docs/nexus-game-source/source/Core/Canon Homes/CORE-SPATIAL-001 - Spatial_Gameplay_and_Location_Model.md` | 124-140 | `c8ed9158d69d...` |
| `lore.faction.campaign-derived-lore-caution` | LORE-FACTION-001 | Campaign-derived lore caution | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 135-140 | `e2b9fe9aa169...` |
| `lore.faction.choir-collective-placeholder` | LORE-FACTION-001 | The Choir and the Collective placeholder | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 92-109 | `1f9734d88e65...` |
| `lore.faction.corporate-sovereignties` | LORE-FACTION-001 | Corporate sovereignties | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 83-91 | `aa84be61c834...` |
| `lore.faction.cpoh-human-continuity-power` | LORE-FACTION-001 | C-POH / human-continuity power | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 53-68 | `8994a95c2621...` |
| `lore.faction.cpoh-sacred-boundary-refinement` | LORE-FACTION-001 | C-POH sacred-boundary refinement | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 69-82 | `38f4fb2ac0f6...` |
| `lore.faction.frontier-independent-habitats` | LORE-FACTION-001 | Frontier and independent habitats | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 128-134 | `05fbd3491ae0...` |
| `lore.faction.implant-megacorp-outbreak-seed` | LORE-FACTION-001 | Implant megacorp / outbreak seed | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 110-118 | `215f1d1d172f...` |
| `lore.faction.present-day-power-map` | LORE-FACTION-001 | Present-day power map | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 30-34 | `c96739ff95a9...` |
| `lore.faction.treaty-order-system-authority` | LORE-FACTION-001 | Treaty Order / System Authority | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 35-52 | `735266fcf5a4...` |
| `lore.faction.upload-persons-and-polities` | LORE-FACTION-001 | Upload persons and upload polities | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-FACTION-001 - SRC-LORE-004-Factions-Polities-and-Power-Structures.md` | 119-127 | `ec9272478c28...` |
| `lore.location.campaign-derived-place-names` | LORE-LOCATION-001 | Campaign-derived place names | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-LOCATION-001 - SRC-LORE-005-Locations-Solar-System-and-Travel.md` | 91-95 | `a896a98c6cea...` |
| `lore.location.earth` | LORE-LOCATION-001 | Earth | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-LOCATION-001 - SRC-LORE-005-Locations-Solar-System-and-Travel.md` | 45-50 | `5268caf64838...` |
| `lore.location.frontier-habitats` | LORE-LOCATION-001 | Frontier habitats | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-LOCATION-001 - SRC-LORE-005-Locations-Solar-System-and-Travel.md` | 67-72 | `c75a65a69db0...` |
| `lore.location.habitat-body-fit-notes` | LORE-LOCATION-001 | Habitat and body-fit location notes | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-LOCATION-001 - SRC-LORE-005-Locations-Solar-System-and-Travel.md` | 73-90 | `f969bf134b29...` |
| `lore.location.jupiter-moons-outer-system` | LORE-LOCATION-001 | Jupiter moons / outer system | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-LOCATION-001 - SRC-LORE-005-Locations-Solar-System-and-Travel.md` | 60-66 | `a8170aaaa045...` |
| `lore.location.known-location-guidance` | LORE-LOCATION-001 | Known location guidance | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-LOCATION-001 - SRC-LORE-005-Locations-Solar-System-and-Travel.md` | 42-72 | `c6c25c39778b...` |
| `lore.location.location-scale` | LORE-LOCATION-001 | Location scale | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-LOCATION-001 - SRC-LORE-005-Locations-Solar-System-and-Travel.md` | 30-41 | `2a516b363259...` |
| `lore.location.travel-tone` | LORE-LOCATION-001 | Travel tone | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-LOCATION-001 - SRC-LORE-005-Locations-Solar-System-and-Travel.md` | 96-101 | `f3bc90fdd757...` |
| `lore.setting.body-origin-infrastructure-pressure` | LORE-SETTING-001 | Body, origin, and infrastructure as setting pressure | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-SETTING-001 - SRC-LORE-002-Setting-Overview-and-Themes.md` | 72-85 | `cfe3bfdc2b27...` |
| `lore.setting.core-premise` | LORE-SETTING-001 | Core premise | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-SETTING-001 - SRC-LORE-002-Setting-Overview-and-Themes.md` | 30-40 | `bf026b88eec7...` |
| `lore.setting.mechanics-aware-lore-principle` | LORE-SETTING-001 | Mechanics-aware lore principle | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-SETTING-001 - SRC-LORE-002-Setting-Overview-and-Themes.md` | 86-90 | `f954ec48370a...` |
| `lore.setting.player-facing-scale` | LORE-SETTING-001 | Player-facing scale | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-SETTING-001 - SRC-LORE-002-Setting-Overview-and-Themes.md` | 64-71 | `d2fe5e9357bf...` |
| `lore.setting.primary-theme` | LORE-SETTING-001 | Primary theme | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-SETTING-001 - SRC-LORE-002-Setting-Overview-and-Themes.md` | 41-47 | `c69986c1306e...` |
| `lore.setting.setting-pressures` | LORE-SETTING-001 | Setting pressures | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-SETTING-001 - SRC-LORE-002-Setting-Overview-and-Themes.md` | 48-63 | `52fa615d5a8c...` |
| `lore.setting.source-handling` | LORE-SETTING-001 | Source handling | `docs/nexus-game-source/source/Lore/Canon Homes/LORE-SETTING-001 - SRC-LORE-002-Setting-Overview-and-Themes.md` | 91-96 | `416c2eeac260...` |
| `playaid.overview.aid-categories` | PLAYAID-OVERVIEW-001 | 4. Aid categories | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 66-79 | `6f699442a86c...` |
| `playaid.overview.definition` | PLAYAID-OVERVIEW-001 | 1. Definition | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 33-39 | `63fe07ff2ae2...` |
| `playaid.overview.encounter-start-packet` | PLAYAID-OVERVIEW-001 | 6. Encounter Start Packet | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 97-114 | `22e6c9a0ed8b...` |
| `playaid.overview.non-authority-rule` | PLAYAID-OVERVIEW-001 | 2. Non-authority rule | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 40-52 | `e07b577e37d6...` |
| `playaid.overview.required-source-pointers` | PLAYAID-OVERVIEW-001 | 8. Required source pointers | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 127-140 | `7da79e7d2daa...` |
| `playaid.overview.trigger-rules` | PLAYAID-OVERVIEW-001 | 5. Trigger rules | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 80-96 | `926054a39302...` |
| `skills.resolution.check-families-and-domain-tags` | SKILL-RESOLUTION-001 | 5.1 Check families and domain tags | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 122-166 | `f03901d60f81...` |
| `skills.resolution.combat-outcome-bands` | SKILL-RESOLUTION-001 | 4. Combat / attack outcome bands | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 91-104 | `3d469b79583f...` |
| `skills.resolution.core-check-flow` | SKILL-RESOLUTION-001 | 6. Core check flow | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 167-178 | `b4392f20936e...` |
| `skills.resolution.dm-mode-required-use` | SKILL-RESOLUTION-001 | 14. DM Mode required-use note | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 283-294 | `b4998bdaae38...` |
| `skills.resolution.gate-pressure-setup-split` | SKILL-RESOLUTION-001 | 9. Gate / Pressure / Setup check split | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 206-217 | `1b194a040e64...` |
| `skills.resolution.lattice-100-core-roll-call` | SKILL-RESOLUTION-001 | 3. Lattice-100 core roll call | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 62-90 | `e9d5fdf0becb...` |
| `skills.resolution.noncombat-outcome-bands` | SKILL-RESOLUTION-001 | 5. Noncombat / general check outcome bands | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 105-121 | `19acec273e8f...` |
| `skills.resolution.purpose-and-scope` | SKILL-RESOLUTION-001 | 1. Purpose | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 33-48 | `d5743507657e...` |
| `skills.resolution.thresholds-for-competence` | SKILL-RESOLUTION-001 | 7. Thresholds for competence, rolls for uncertainty | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 179-198 | `0be44d556484...` |
