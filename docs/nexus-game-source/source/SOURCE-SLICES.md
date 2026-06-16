# Nexus Golden Truth Source Slice Catalog

Repository: `quinnlivdahl-cmd/Nexus-App`
Base path: `docs/nexus-game-source/source`
Indexed source slices: 111

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
| Core | 21 |
| Lore | 25 |
| Play Aids | 6 |
| Skills | 9 |

## Source Slices

| Slice ID | Document | Heading | Exact repo path | Lines | Content SHA-256 |
|---|---|---|---|---:|---|
| `art.prompt.art-mode-behavior-note` | ART-PROMPT-001 | Art Mode behavior note | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 120-126 | `cc200e9ac505...` |
| `art.prompt.art-production-packet-format` | ART-PROMPT-001 | Art Production Packet format - 2026-05-15 | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 127-131 | `3bf58f6b8a22...` |
| `art.prompt.base-nexus-style` | ART-PROMPT-001 | Base Nexus style prompt | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 52-60 | `16288ba9c34f...` |
| `art.prompt.character-concept-skeleton` | ART-PROMPT-001 | Character concept prompt skeleton | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 61-67 | `62c482f6b285...` |
| `art.prompt.environment-concept-skeleton` | ART-PROMPT-001 | Environment concept prompt skeleton | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 68-73 | `93ae4f7c9d9b...` |
| `art.prompt.metadata-block` | ART-PROMPT-001 | Prompt metadata block | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 35-51 | `5f6d49d61ede...` |
| `art.prompt.purpose` | ART-PROMPT-001 | Purpose | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 30-34 | `c0767e40e519...` |
| `art.prompt.tacmap-diagram-skeleton` | ART-PROMPT-001 | TacMap diagram prompt skeleton | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 87-93 | `741e4d7b2e28...` |
| `art.prompt.tacmap-prompt-additions` | ART-PROMPT-001 | TacMap prompt additions - 2026-05-15 | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 162-189 | `d56190c8baae...` |
| `art.prompt.variant-rules` | ART-PROMPT-001 | Variant rules | `docs/nexus-game-source/source/Art/Canon Homes/ART-PROMPT-001 - Prompt-Library-and-Variant-Rules.md` | 94-108 | `db986c9606fb...` |
| `automation.context-broker.source-backed-packets` | AUTO-DATA-003 | 4.1 Context Broker and source-backed packets | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 87-111 | `499817bec013...` |
| `automation.context-broker.visibility-layers` | AUTO-DATA-003 | 6. Player-visible and hidden layers | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 131-142 | `2be7699d65b8...` |
| `automation.runtime.conflict-handling` | AUTO-DATA-003 | 7. Conflict handling | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 143-152 | `fa0130a49ad2...` |
| `automation.runtime.creative-source-versus-runtime-instance` | AUTO-DATA-003 | 4. Creative source versus runtime instance | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 67-86 | `4cb34f51b807...` |
| `automation.runtime.source-hierarchy` | AUTO-DATA-003 | 2. Source hierarchy | `docs/nexus-game-source/source/Automation/Canon Homes/AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md` | 34-44 | `9c0f920d02ab...` |
| `combat.core.app-authority-state-mutation-boundary` | COMBAT-CORE-001 | 9.1 App-facing authority and state mutation boundary | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 165-197 | `aa90e41338e9...` |
| `combat.core.combat-state-to-track` | COMBAT-CORE-001 | 6. Combat state to track | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 78-89 | `3fe22b730610...` |
| `combat.core.defensive-display-spine` | COMBAT-CORE-001 | 7. Defensive display spine | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 90-113 | `d1c7ee6b2464...` |
| `combat.core.durability-application-order` | COMBAT-CORE-001 | 9. Durability application order | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 141-197 | `5b3c4d979a03...` |
| `combat.core.encounter-start-procedure` | COMBAT-CORE-001 | 2. Encounter start procedure | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 41-55 | `0b1c0046f0fd...` |
| `combat.core.end-conditions` | COMBAT-CORE-001 | 11. Combat end conditions | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 205-208 | `253370fb6a39...` |
| `combat.core.purpose-and-tactical-principles` | COMBAT-CORE-001 | 1. Purpose | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 34-40 | `8c8cc941dd34...` |
| `combat.core.turn-and-activation-baseline` | COMBAT-CORE-001 | 5. Turn and activation baseline | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-CORE-001 - Combat_Core_Rules.md` | 67-77 | `a73a029d1f2e...` |
| `combat.tacmap.core-definition` | COMBAT-TACMAP-001 | 1. Core TacMap definition | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 33-44 | `f80a7451e1f3...` |
| `combat.tacmap.core-numeric-movement-rule` | COMBAT-TACMAP-001 | 2. Core numeric movement rule | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 45-69 | `b9bcb0677e8f...` |
| `combat.tacmap.in-transit-state` | COMBAT-TACMAP-001 | 10. In-transit state | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 159-164 | `207b159a5b7b...` |
| `combat.tacmap.map-scale-and-movement-support` | COMBAT-TACMAP-001 | 13. Map scale and movement support | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 176-181 | `d9bf84472a0f...` |
| `combat.tacmap.node-capacity-and-character-size` | COMBAT-TACMAP-001 | 6. Node capacity and character size | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 110-123 | `9b7cd644cdbb...` |
| `combat.tacmap.node-status-and-path-status` | COMBAT-TACMAP-001 | 4. Node status and path status | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 83-96 | `69c778bbaec9...` |
| `combat.tacmap.nodes` | COMBAT-TACMAP-001 | 3. Nodes | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 70-82 | `eb39d1225f7d...` |
| `combat.tacmap.paths-and-line-of-sight` | COMBAT-TACMAP-001 | 5. Paths and line of sight | `docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-TACMAP-001 - TacMap_Node_Movement_and_Positioning.md` | 97-109 | `fbad2574132a...` |
| `content.encounter.library-growth-rule` | CONTENT-ENCOUNTER-001 | Library growth rule | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 152-155 | `aaa1d1d7fc8b...` |
| `content.encounter.pattern-custody-legal-pressure-node` | CONTENT-ENCOUNTER-001 | Pattern: Custody/Legal Pressure Node | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 120-139 | `47c792caa074...` |
| `content.encounter.pattern-dead-drop-investigation-node` | CONTENT-ENCOUNTER-001 | Pattern: Dead-Drop Investigation Node | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 105-119 | `cd3b03dd1a82...` |
| `content.encounter.pattern-hazard-clock-room` | CONTENT-ENCOUNTER-001 | Pattern: Hazard Clock Room | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 72-95 | `19b00e2cfa05...` |
| `content.encounter.pattern-node-path-hazard` | CONTENT-ENCOUNTER-001 | Pattern: Node/Path Hazard Pattern | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 159-169 | `4b18d4fd2cdd...` |
| `content.encounter.pattern-objective-runner` | CONTENT-ENCOUNTER-001 | Pattern: Objective Runner | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 37-54 | `e962dc90396d...` |
| `content.encounter.pattern-requirement-escape` | CONTENT-ENCOUNTER-001 | Pattern: Requirement Escape | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 96-104 | `b77c8d3937a3...` |
| `content.encounter.pattern-salvage-vs-delay-choice` | CONTENT-ENCOUNTER-001 | Pattern: Salvage vs Delay Choice | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 140-151 | `5d1d043d422a...` |
| `content.encounter.pattern-system-vulnerable-machine` | CONTENT-ENCOUNTER-001 | Pattern: System-Vulnerable Machine | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 55-71 | `51f023115cf0...` |
| `content.encounter.pattern-tacmap-ready-requirement-escape` | CONTENT-ENCOUNTER-001 | Pattern: TacMap-Ready Requirement Escape | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 181-186 | `2535c26449c8...` |
| `content.encounter.status-and-use` | CONTENT-ENCOUNTER-001 | Status | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ENCOUNTER-001 - SRC-CONTENT-008-Encounter-Content-Library.md` | 30-36 | `59ae17c1ca3b...` |
| `content.route-node.campaign-specific-node-caution` | CONTENT-ROUTE-001 | Campaign-specific node caution | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 107-111 | `f5091d45ea8b...` |
| `content.route-node.content-fields` | CONTENT-ROUTE-001 | Node content fields | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 37-62 | `df8c40f8edcb...` |
| `content.route-node.node-end-report` | CONTENT-ROUTE-001 | Node end report | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 87-101 | `308a5d692752...` |
| `content.route-node.objectives-and-opportunities` | CONTENT-ROUTE-001 | Objectives and opportunities | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 76-86 | `307f662e0cd8...` |
| `content.route-node.pre-node-procedure` | CONTENT-ROUTE-001 | Pre-node procedure | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 63-75 | `8efc07366f5c...` |
| `content.route-node.purpose` | CONTENT-ROUTE-001 | Purpose | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 30-36 | `5fd4a9fb19d8...` |
| `content.route-node.route-consequences` | CONTENT-ROUTE-001 | Node content and route consequences | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 112-128 | `d5dace88f38f...` |
| `content.route-node.route-node-end-report-fields` | CONTENT-ROUTE-001 | Mass-intake alignment: Route Node End Report fields | `docs/nexus-game-source/source/Content/Canon Homes/CONTENT-ROUTE-001 - SRC-CONTENT-005-Route-Node-Content-Framework.md` | 129-150 | `ff7efaef9e74...` |
| `core.campaign.core-loop` | CORE-CAMPAIGN-001 | 2. Core Loop | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 34-51 | `037fddf4b353...` |
| `core.campaign.node-definition` | CORE-CAMPAIGN-001 | 5. Node Definition | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 68-88 | `bf22705c5fdc...` |
| `core.campaign.pre-node-timing` | CORE-CAMPAIGN-001 | 3. C1 Clarification - Pre-Node Timing | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 52-60 | `c23227926ad8...` |
| `core.campaign.route-choice-display` | CORE-CAMPAIGN-001 | 7. Route Choice Display | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 104-109 | `233ae1ac633e...` |
| `core.campaign.route-node-end-report` | CORE-CAMPAIGN-001 | 12. Route Node End Report and Save Workflow | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 146-169 | `929ed2f95544...` |
| `core.campaign.route-structure` | CORE-CAMPAIGN-001 | 4. Route Structure | `docs/nexus-game-source/source/Core/Canon Homes/CORE-CAMPAIGN-001 - SRC-CORE-004-Campaign-Loop-and-Route-Structure.md` | 61-67 | `1253127ff6bb...` |
| `core.glossary.crew` | CORE-GLOSSARY-001 | Crew | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 53-57 | `d432f1ce0531...` |
| `core.glossary.encounter-start-packet` | CORE-GLOSSARY-001 | Encounter Start Packet | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 132-136 | `c5fdc2d6faa8...` |
| `core.glossary.mission-node` | CORE-GLOSSARY-001 | Mission Node | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 78-82 | `0b0c06478738...` |
| `core.glossary.nexus` | CORE-GLOSSARY-001 | Nexus | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 36-39 | `37e496cb2203...` |
| `core.glossary.node` | CORE-GLOSSARY-001 | Node | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 68-72 | `41e2f74d6209...` |
| `core.glossary.pre-node-procedure` | CORE-GLOSSARY-001 | Pre-Node Procedure | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 73-77 | `7a004252aae9...` |
| `core.glossary.route` | CORE-GLOSSARY-001 | Route | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 63-67 | `fa735cf3309c...` |
| `core.glossary.ship-phase` | CORE-GLOSSARY-001 | Ship Phase | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 58-62 | `ef4d3ffa0543...` |
| `core.glossary.structured-tacmap-data` | CORE-GLOSSARY-001 | Structured TacMap Data | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 137-140 | `cf32ea9f578a...` |
| `core.glossary.tacmap` | CORE-GLOSSARY-001 | TacMap | `docs/nexus-game-source/source/Core/Canon Homes/CORE-GLOSSARY-001 - SRC-CORE-007-Core-Terminology-and-Source-Glossary.md` | 83-86 | `3a9dcc2d7151...` |
| `core.pillars.campaign-scale` | CORE-PILLARS-001 | 7. Campaign Scale | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 108-117 | `6e161698d47f...` |
| `core.pillars.campaign-structure` | CORE-PILLARS-001 | 5. Core Campaign Structure | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 58-68 | `e5e44b0e2110...` |
| `core.pillars.core-pitch` | CORE-PILLARS-001 | 1. Core Pitch | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 30-37 | `34f00eaa4686...` |
| `core.pillars.design-pillars` | CORE-PILLARS-001 | 6. Design Pillars | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 69-107 | `3e529a4140e0...` |
| `core.pillars.setting-boundary` | CORE-PILLARS-001 | 3. Setting Boundary at Core Level | `docs/nexus-game-source/source/Core/Canon Homes/CORE-PILLARS-001 - SRC-CORE-002-Nexus-Core-Game-Pillars.md` | 43-48 | `0f2a770dd362...` |
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
| `playaid.overview.aid-categories` | PLAYAID-OVERVIEW-001 | 4. Aid categories | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 63-76 | `6f699442a86c...` |
| `playaid.overview.definition` | PLAYAID-OVERVIEW-001 | 1. Definition | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 30-36 | `63fe07ff2ae2...` |
| `playaid.overview.encounter-start-packet` | PLAYAID-OVERVIEW-001 | 6. Encounter Start Packet | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 94-110 | `099f03a1852a...` |
| `playaid.overview.non-authority-rule` | PLAYAID-OVERVIEW-001 | 2. Non-authority rule | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 37-49 | `e07b577e37d6...` |
| `playaid.overview.required-source-pointers` | PLAYAID-OVERVIEW-001 | 8. Required source pointers | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 123-137 | `7da79e7d2daa...` |
| `playaid.overview.trigger-rules` | PLAYAID-OVERVIEW-001 | 5. Trigger rules | `docs/nexus-game-source/source/Play Aids/Canon Homes/PLAYAID-OVERVIEW-001 - SRC-AUX-002-Auxiliary-Play-Aids-Overview.md` | 77-93 | `926054a39302...` |
| `skills.resolution.check-families-and-domain-tags` | SKILL-RESOLUTION-001 | 5.1 Check families and domain tags | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 119-163 | `f03901d60f81...` |
| `skills.resolution.combat-outcome-bands` | SKILL-RESOLUTION-001 | 4. Combat / attack outcome bands | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 88-101 | `3d469b79583f...` |
| `skills.resolution.core-check-flow` | SKILL-RESOLUTION-001 | 6. Core check flow | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 164-175 | `b4392f20936e...` |
| `skills.resolution.dm-mode-required-use` | SKILL-RESOLUTION-001 | 14. DM Mode required-use note | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 280-290 | `0f88b455e5fe...` |
| `skills.resolution.gate-pressure-setup-split` | SKILL-RESOLUTION-001 | 9. Gate / Pressure / Setup check split | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 203-214 | `1b194a040e64...` |
| `skills.resolution.lattice-100-core-roll-call` | SKILL-RESOLUTION-001 | 3. Lattice-100 core roll call | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 59-87 | `e9d5fdf0becb...` |
| `skills.resolution.noncombat-outcome-bands` | SKILL-RESOLUTION-001 | 5. Noncombat / general check outcome bands | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 102-118 | `19acec273e8f...` |
| `skills.resolution.purpose-and-scope` | SKILL-RESOLUTION-001 | 1. Purpose | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 30-45 | `d5743507657e...` |
| `skills.resolution.thresholds-for-competence` | SKILL-RESOLUTION-001 | 7. Thresholds for competence, rolls for uncertainty | `docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md` | 176-195 | `0be44d556484...` |
