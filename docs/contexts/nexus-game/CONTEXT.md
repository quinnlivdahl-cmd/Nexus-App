# Nexus Game

The product context for the Nexus player experience, including its campaign structure, spatial play, crew progression, encounters, rules, presentation, and game state.

Accepted system-wide decisions for this context are indexed in [`docs/adr/README.md`](../../adr/README.md). The index records status, date, provenance, and the boundary with canonical game source.

## Player and Crew

**Captain**:
The player's persistent primary character and embodied identity during spatial play. The Captain leads the crew from within the action rather than acting as a detached commander.
_Avoid_: Commander avatar, owner-operator

**Captain Creation**:
The start-of-campaign process in which the player creates a new Captain's appearance, origin, starting capabilities, and personal drive. Previous Captains remain campaign history rather than becoming Crewmate starting choices.
_Avoid_: Archived-character selection, fixed protagonist

**Character Build Stack**:
The mechanical identity layers preserved for Captain Creation and Crewmates: Bioform, Background/social access, Discipline, Attribute, Skill, Skill Focus, Ability, Traits/Techniques, creation-point cyberware that derives Chassis tier, and equipment/loadout. The stack survives the spatial-game transition while remaining open to deliberate improvement.
_Avoid_: Race/class package, freeform mechanical generation

**Aptitude Trait**:
A persistent individual strength, potential, or characteristic weakness that differentiates a character within the Character Build Stack. Aptitude Traits remain with archived Crewmates across campaigns; Captains select theirs during Captain Creation, while recruited Crewmates arrive with established combinations that the player must have a fair opportunity to reveal before an irreversible Recruitment Offer choice.
_Avoid_: Hidden IV number, replacement Attribute

**Growth Trait**:
A run-specific feat-like quality offered as a player choice from candidates unlocked by meaningful use, training, and campaign decisions. Growth Traits record how a character developed during the current adventure and reset with the Campaign Build; their exact advancement timing and cost remain unresolved.
_Avoid_: Permanent EV total, duplicate Ability rank

**Captain Profile**:
The freeform backstory and personality entered by the player after the mechanical Character Build Stack and before campaign context is generated. It may inform dialogue, relationships, goals, quests, and Campaign Threads without directly granting mechanics.
_Avoid_: Fixed campaign script, unvalidated mechanical trait

**Crew Profile**:
The established identity, backstory, relationships, personality, and relevant Archive Memories of a Crewmate. Profiles for selected Starting Crew and later recruits may supply Backstory Threads to the Campaign Director.
_Avoid_: Mechanical stat block, disposable flavor paragraph

**Personal Canon**:
Lore-compatible player-authored facts accepted from the Captain Profile, including personal history, relationships, prior experiences, obligations, rivals, and consequences. Personal Canon may be woven into the campaign but cannot rewrite established world canon or grant unvalidated mechanics, status, or possessions.
_Avoid_: Global lore override, flavor text with no effect

**Backstory Thread**:
A light callback to a person, experience, relationship, obligation, or consequence from the Captain's Personal Canon or a Crewmate's Crew Profile. It may color dialogue, a Point of Interest, a Check Opportunity, or a minor consequence, but never owns a Route Node, creates a dedicated questline, or becomes central to the campaign.
_Avoid_: Character quest, central story arc, ignored biography

**Crewmate**:
A persistent recruitable character with an individual identity, capabilities, and growth who can accompany the Captain through the campaign.
_Avoid_: Collectible unit, disposable recruit

**Archive Memory**:
A selective validated memory or piece of knowledge available to a Crewmate across campaign runs. Each Crewmate records no more than three per completed campaign, but whether the character personally retains one after Permanent Loss depends on the recovery or continuity method; the Crew Archive may preserve an event as player-facing history even when the restored character does not remember it.
_Avoid_: Chat history, full episodic memory

**Campaign Build**:
A Crewmate's run-specific level, equipment, temporary upgrades, and selected ability development. Returning Crewmates begin each campaign at level 1 with a new Campaign Build even when Archive Memories persist.
_Avoid_: Lifetime competence, permanent meta-level

**Permanent Loss**:
An irreversible character loss reached only after applicable rescue, stabilization, recovery, and revival avenues are exhausted. Permanent loss of the Captain ends the current campaign run.
_Avoid_: Downed state, single-roll deletion

**Continuity Checkpoint**:
A Crewmate's subjective memory state at the start of a campaign. By default, a Crewmate restored after Permanent Loss returns with this memory state and does not remember the fatal campaign, even though the Crew Archive preserves its history.
_Avoid_: Save file, complete memory backup

**Consequence-Preserving Save**:
The default campaign save behavior that continuously records committed Game Truth without offering routine reloads to undo Route Choices, Lattice Rolls, Dialogue Outcomes, or Permanent Loss. A separate player setting may enable manual checkpoints and reloads.
_Avoid_: Quickload loop, Crew Archive rollback

**Crew Roster**:
The player's persistent collection of recruited Crewmates within a campaign. A normal run starts with three characters and adds four, ending with seven including the Captain.
_Avoid_: Recruit list, unit inventory

**Crew Archive**:
The persistent cross-campaign record of Crewmates the player has discovered and recruited. It supplies eligible Crewmates as starting-crew candidates and preserves player-facing collection history without guaranteeing that every recorded event remains part of a character's subjective memory.
_Avoid_: Universal active roster, account inventory

**Starting Crew**:
The Captain and two Crewmates selected from the available Crew Archive pool at the beginning of a campaign, providing a complete three-character Field Team immediately.
_Avoid_: Solo start, tutorial-only party

**Recruitment Offer**:
The Crewmate candidates made available through campaign play. A normal run makes four successful additions across its first nine Route Nodes; some Recruitment Offers require choosing one candidate, and the Campaign Director may adapt the cadence after a death or departure.
_Avoid_: Random unit drop, automatic full-party unlock

**Active Crew**:
The Captain and selected Crewmates currently present and playable within a Location. Crewmates outside the Active Crew remain part of the Crew Roster.
_Avoid_: Entire roster, disposable party

**Field Team**:
The group deployed to a Route Node, normally the Captain and two selected Crewmates. Three is the designed default, while a four-member Field Team remains an intentional future playtest direction.
_Avoid_: Entire Crew Roster

## Campaign Structure

**Ship**:
The crew's persistent mobile home Location throughout a campaign run. Crewmates physically inhabit it, but it is not primarily a ship-combat platform or detailed player-managed ship simulation.
_Avoid_: Hub menu, ship-combat game

**Ship Frame**:
An unlockable Ship identity selected when starting a campaign. Ship Frames share the five-system and Crew Roster model but may differ in explorable layout, visual identity, module-slot biases, starting capability, and one signature support feature.
_Avoid_: Mid-run vehicle swap, combat-class chassis

**Ship Registry**:
The persistent cross-campaign collection of unlocked Ship Frames. The MVP requires one starter Ship Frame; additional frames are target-version meta-progression rather than fleet management.
_Avoid_: Active fleet, Ship inventory

**Ship Time**:
The explorable phase aboard the Ship between Route Nodes for recovery, equipment, Field Team selection, relationships, recruitment, onboard events, and the next Route Choice.
_Avoid_: Downtime menu, intermission screen

**Ship System**:
An upgradable campaign-support capability aboard the Ship that affects Route Choices, preparation, Field Team support, recovery, or Transit Events. Ship Systems do not form a detailed ship-combat or repair-management simulation.
_Avoid_: Ship-combat stat, maintenance chore

**Navigation System**:
The Ship System governing travel reach, backtracking, insertion, extraction, and route-access support.
_Avoid_: Ship movement in tactical combat

**Sensor System**:
The Ship System governing Route Prospect intelligence, reconnaissance, ambush warning, and scan-based Field Team support.
_Avoid_: Omniscient map reveal

**Engineering and Fabrication System**:
The Ship System governing prepared equipment, deployables, environmental countermeasures, fabrication, and relevant Ship Condition Resolution.
_Avoid_: Maintenance minigame

**Medical and Continuity System**:
The Ship System governing recovery preparation, persistent injury support, stabilization assistance, revival, and Crewmate restoration.
_Avoid_: Automatic consequence removal

**Communications and Network System**:
The Ship System governing faction contact, remote access, electronic countermeasures, signal support, and communication-enabled opportunities.
_Avoid_: Universal remote hack

**Ship Module**:
A scarce installable upgrade that changes or unlocks a Ship System capability rather than providing a minor percentage increase. Ship Modules may be salvaged or rewarded at Route Nodes, granted through factions or Campaign Threads, or purchased during Transit Events such as ship stores.
_Avoid_: Incremental stat point, routine repair part

**Shipboard Incursion**:
A rare event in which hostile actors enter the player's persistent Ship Location and create Tactical Pressure there. It uses normal character-scale Turn-Based Mode rather than a separate boarding or Ship-combat system.
_Avoid_: Ship-combat phase, separate boarding minigame

**Ship Condition**:
A persistent campaign trait created by a narrative event or validated outcome that constrains or changes specific play until resolved. A Ship Condition such as damaged engines may block longer-distance Route Prospects, but it is not component health or damage tracked on a Ship System.
_Avoid_: Hull damage, subsystem hit points

**Ship Condition Resolution**:
A deliberate attempt during Ship Time to clear or alter a Ship Condition through an appropriate Crewmate, Lattice Check, and any stated resource, equipment, contact, or opportunity cost.
_Avoid_: Routine maintenance, automatic repair bill

**Ship Assignment**:
The placement of an undeployed Crewmate at a Ship System for the next Route Node. The assigned character's relevant skills enable and influence that system's support without permanently becoming part of the Ship.
_Avoid_: Passive roster slot, permanent job class

**Preparation Benefit**:
A concrete advantage applied before deployment by a staffed Ship System, such as improved reconnaissance, an alternate approach, prepared equipment, recovery readiness, or established access.
_Avoid_: Hidden percentage bonus

**Ship Support Action**:
A limited player-invoked capability provided to the Field Team by a staffed Ship System during a Route Node. Availability comes from the system, while the assigned Crewmate's relevant skills may determine its Lattice Check or effectiveness.
_Avoid_: Passive stat aura, fourth Field Team member

**Transit Event**:
A lightweight FTL-style situation during travel between Route Nodes, outside the ten-node count. It presents a small number of decisions, Checks, or dialogue consequences without requiring a full explorable Location.
_Avoid_: Route Node, mandatory combat stop

**Route Map**:
The branching campaign-scale progression through Route Nodes. A campaign run visits ten Route Nodes, with each juncture exposing at least three consequential candidate destinations rather than placing another travel map inside a node.
_Avoid_: Overworld, node sub-map

**Route Choice**:
The selection of the next Route Node from at least three candidate destinations presented at a campaign juncture.
_Avoid_: Linear mission selection

**Route Prospect**:
A candidate next destination with enough committed identity, risk, opportunity, and campaign relevance to support a meaningful Route Choice. Its full Location is assembled only after selection.
_Avoid_: Fully built unchosen Location, generic mission card

**Location**:
A persistent spatial play space, such as the player's ship or a Route Node destination. Route Node Locations contain multiple connected Areas, and their actors, objects, and world state remain continuous when the game changes movement modes.
_Avoid_: Encounter map, scene container

**Area**:
A distinct room, exterior section, or other navigable subdivision of a Location.
_Avoid_: Combat room, TacMap node

**Point of Interest**:
A discoverable sight, character, object, environmental detail, or optional interaction that rewards Free Movement exploration without existing solely to support Turn-Based Mode.
_Avoid_: Combat prop, filler hotspot

**Location Module**:
A reusable spatial piece with validated geometry, navigation, connection points, interaction sockets, occlusion, and authored Cover Positions.
_Avoid_: Generated map fragment, TacMap node

**Location Blueprint**:
A validated arrangement and connection plan for composing compatible Location Modules into a complete Location. The Campaign Director may select and dress a blueprint but does not improvise authoritative geometry.
_Avoid_: Generated map, flat backdrop

**Route Node**:
One selectable travel destination representing a single playable Location of variable size. Play within it may shift between Free Movement and Turn-Based Mode multiple times.
_Avoid_: Mission node, jump location

**Route Pressure**:
Campaign conditions such as time, resources, access, danger, and faction response that make Route Map choices consequential and may constrain backtracking.
_Avoid_: Arbitrary path lock

**Campaign Director**:
The hidden AI-supported system that maintains the developing campaign arc, pressures, mysteries, factions, and unresolved threads; creates Route Prospects; and supplies current dramatic context to Generated Performance. It adapts future play to committed outcomes but cannot invent rules, bypass mechanics, retcon Game Truth, or force a predetermined plot result.
_Avoid_: DM persona, narrator chatbot

**Context Broker**:
The Campaign Director Harness layer that assembles compact traceable model context from permitted Game Truth, rules, lore, recent verbatim exchanges, targeted recall, and current constraints. It controls model visibility but cannot resolve mechanics, mutate state, or create Game Truth.
_Avoid_: Model memory, mechanical authority

**Campaign Director Harness**:
The stateful runtime surrounding the Model Runtime, including the Context Broker, authoritative state, Director state, character records, validation, transcript, recovery, and evaluation. It provides continuity and governance while individual model calls remain logically stateless.
_Avoid_: Single persistent chat, agent prompt

**Model Runtime**:
The replaceable generative-model connection used by the Campaign Director, Player Intent interpretation, Generated Performance, and optional Live Illustrations. GPT-5.5 is the initial primary driver; local Ollama models are a future compatibility experiment rather than an initial parity requirement.
_Avoid_: Browser-owned API key, model-owned Game Truth

**Campaign Thread**:
A persistent unresolved relationship, promise, threat, mystery, lead, faction pressure, or consequence that the Campaign Director may develop across dialogue, Locations, and Route Choices.
_Avoid_: Predetermined quest step

**Campaign Fixture**:
A fixed development scenario used to test rules, dialogue continuity, Campaign Director behavior, state recovery, and regression cases. Existing Rook and Nexus Primer campaigns remain fixtures and modular content sources rather than shipping as canned default campaigns.
_Avoid_: Default campaign, fixed story canon

**Local Aftermath**:
The persistent consequences applied within a Location when Tactical Pressure ends, including actor, object, hazard, access, evidence, and environmental state changes.
_Avoid_: Encounter results, victory screen

**Route Node Resolution**:
The campaign-facing consolidation of a Route Node's outcomes when the Field Team leaves its Location or returns to the ship. It summarizes rather than postpones Local Aftermath that is already Game Truth.
_Avoid_: Encounter summary, post-combat report

## Modes of Play

**Free Movement**:
The default non-turn-based state for ordinary spatial exploration, conversation, searching, interaction, and unopposed action aboard the ship and within Locations.
_Avoid_: Overworld mode, narrative mode

**Control Swap**:
The Free Movement action that transfers direct player control between members of the Active Crew. It changes the controlled character without transferring the Captain's narrative role.
_Avoid_: Possession, delegation

**Turn-Based Mode**:
The Location-wide ordered time state entered when Tactical Pressure makes position, timing, and action order consequential. Relevant actors, hazards, and objectives participate in turns while inactive parts of the Location pause consistently.
_Avoid_: Encounter mode, combat mode

**Tactical Pressure**:
A dangerous or contested situation in which position, timing, and action order can materially change the outcome. Tactical Pressure triggers Turn-Based Mode whether or not the situation involves combat.
_Avoid_: Combat trigger

## Interaction and Presentation

**Tilted Top-Down**:
The fixed camera perspective shared by Free Movement and Turn-Based Mode. It reads primarily as top-down, using only a shallow tilt to reveal environmental volume and depth; tactical play may pull back without changing the viewing angle.
_Avoid_: Full isometric, free-rotation camera

**Context Action Menu**:
The list of currently available actions opened by clicking a world object. Selecting a proximity-bound action automatically paths the controlled character to a valid Interaction Position before validation and execution.
_Avoid_: Universal action bar, text-adventure command list

**Management Menu**:
A conventional game menu for efficiently handling inventory, equipment, character progression, Crew Roster, Field Team selection, Crew Archive, Route Map, saves, and settings. Ship objects may open relevant menus, and frequently used menus may also have keyboard shortcuts.
_Avoid_: Fully physicalized administration, player-facing dashboard

**Developer Mode**:
An optional non-player diagnostic surface exposing Campaign Director briefs and outputs, Context Broker packets, proposed and committed state changes, Lattice history, Location assembly data, validation failures, Campaign Threads, hidden state, and save inspection.
_Avoid_: Primary game interface, player-facing DM dashboard

**Free Movement Input**:
Keyboard-and-mouse control in which WASD directly moves the controlled character in eight normalized directions, including simultaneous diagonal inputs such as W+A for northwest, while the mouse selects world objects and interface targets. Controller support is outside the initial product scope.
_Avoid_: Controller-first input, click-to-move primary control

**Automatic Facing**:
The presentation rule that characters face their movement direction, selected interaction, or chosen target without mouse-directed body control. Facing becomes mechanically significant only for an explicit directional tactical state or ability.
_Avoid_: Twin-stick facing, constant facing micromanagement

**Follower Baseline**:
The minimum Free Movement behavior that lets uncontrolled Field Team members follow the controlled character without blocking one another and preserves their actual positions when Turn-Based Mode begins. Additional formation or companion-navigation complexity is deferred unless playtesting proves it necessary.
_Avoid_: Formation simulation, bespoke follower tactics

**World Sprite**:
The animated 2D in-world representation of a character, built on shared eight-direction movement, cover, weapon, interaction, and reaction animation frameworks. Modular visual layers and selective signature animations distinguish characters without requiring a unique animation set for every Crewmate.
_Avoid_: Individual 3D model, static token

**Character Portrait**:
The higher-detail 2D identity image used in Freeform Dialogue, Crew Roster and Crew Archive surfaces, Recruitment Offers, and compact character UI. Portraits are static assets with discrete emotional variants and simple transitions rather than lip-sync or fluid animation; dialogue portraits remain at the edge so the current Location stays visible.
_Avoid_: Full-screen visual-novel cutaway, constant HUD decoration

**Tactical Bark**:
A short authored voice line for a common action, warning, acknowledgment, or reaction during spatial play. Tactical Barks add character and responsiveness without voicing Generated Performance.
_Avoid_: Generated dialogue voice-over

**Live Illustration**:
An optional non-authoritative image generated asynchronously to illustrate play without defining geometry, mechanics, identity, or Game Truth. Approved initial uses are Route Prospect previews and Major Moment Illustrations; generation is cached, never blocks play, and has a pre-produced fallback or no-image state.
_Avoid_: Runtime gameplay asset, generated map truth

**Major Moment Illustration**:
A Live Illustration created after a validated discovery, recruitment, relationship development, campaign turn, Route Node Resolution highlight, or finale and preserved in the campaign log or Crew Archive.
_Avoid_: Uncommitted event image, disposable chat image

**Player Intent**:
Freeform text expressing exact speech, a desired message, a supported physical action, or a combination of them. Interpretation proposes actions or Generated Performance; validation and execution are required before any result becomes Game Truth.
_Avoid_: Chat prompt, narrated command

**Freeform Action**:
A physically plausible action derived from Player Intent when no authored action matches exactly and resolved through existing rules, state, costs, Checks, Effects, and StateDeltas. It is used primarily during Free Movement and may be entered during Turn-Based Mode through Improvise.
_Avoid_: Generic Improvise, custom command

**Intent Bar**:
The contextual game-native field for entering Player Intent. It is deliberately summoned during Free Movement, embedded in Freeform Dialogue, and opened by the Improvise action during Turn-Based Mode rather than remaining as a permanent chat panel.
_Avoid_: Chat box, command console

**Freeform Dialogue**:
A game-native conversation in which the player may type exact words or describe what they want the controlled character to communicate. Generated Performance translates described intent into character-appropriate speech; suggested responses may assist but never define the only available choices.
_Avoid_: DM chat, prompt box

**Dialogue Outcome**:
A structured campaign consequence proposed from Freeform Dialogue and validated before becoming Game Truth. It may change relationships, factions, leads, Campaign Threads, or future Route Prospects.
_Avoid_: Uncommitted narration, hidden model assumption

**Improvise**:
A Turn-Based Mode action that opens the Intent Bar to enter a Freeform Action, then previews and validates its mechanical interpretation and action cost before execution.
_Avoid_: Freeform free action

**Area Introduction**:
A concise non-voiced text block shown when the player enters or reveals a Location or meaningful area. It provides selective exposition, atmosphere, and sensory context without becoming a continuing chat transcript.
_Avoid_: DM narration, exposition dump

**Generated Performance**:
AI-produced dialogue or narration presented through the same game-native forms and editorial constraints as authored content. It may improvise expression within established knowledge, voice, and state but cannot create Game Truth.
_Avoid_: AI response, assistant message

**Game Truth**:
Lore, rules, inventory, relationships, consequences, and world state validated and committed by the game's authoritative systems. Generated prose may express Game Truth but does not establish it.
_Avoid_: Narrated state, model memory

## Spatial Tactics

**Action Point**:
A Turn-Based Mode resource spent on attacks, abilities, interactions, Improvise, and other deliberate tactical actions. A standard activation begins with two Action Points unless a specific rule modifies the baseline.
_Avoid_: Movement distance

**Movement Point**:
A Turn-Based Mode resource representing continuous navigable path distance. Movement Points are not tiles, nodes, or grid steps.
_Avoid_: Node cost, grid step

**Reaction**:
A limited tactical response triggered outside a character's normal activation by a valid event or condition.
_Avoid_: Free action

**Initiative Roll**:
An individual Lattice-100 roll made once by every relevant combatant when Tactical Pressure begins to establish a fixed ordered turn sequence until that pressure ends. Character builds, traits, abilities, equipment, awareness, and circumstances may support a deliberately fast-acting crew.
_Avoid_: Side initiative, alternating-side activation

**Micro-Interaction**:
One free small interaction available during a standard activation, such as using an unlocked door control, picking up or handing off a small item, or pressing a simple button. Full hacks, scans, stabilization, attacks, and meaningful objective work still cost Action Points.
_Avoid_: Free objective action, free hack

**Interaction Position**:
An authored navigable position adjacent to an object from which a character can perform its proximity-bound actions.
_Avoid_: Interaction tile, arbitrary distance threshold

**Cover Position**:
An authored position immediately adjacent to a protective surface where a character can deliberately take directional cover. Movement may softly align a character to it; merely having a low barrier somewhere between attacker and target does not grant cover.
_Avoid_: Cover tile, cover node

**Cover**:
Directional protection gained by occupying a valid Cover Position against an attack crossing that position's protected arc.
_Avoid_: Intervening-object bonus

**Occlusion**:
Physical geometry that blocks sight or a shot independently of whether either character occupies a Cover Position.
_Avoid_: Cover

## Resolution

**Lattice-100**:
The authoritative d100 resolution system for uncertain actions in combat, exploration, dialogue, and other play. Its rolls remain visibly presented and mechanically prevalent to preserve Nexus's tabletop-RPG feel.
_Avoid_: Hidden percentage engine, narrated roll

**Check**:
An uncertain action resolved through a visible or appropriately concealed Lattice-100 roll, relevant modifiers, and an outcome band. Checks remain common but are not required for routine actions whose outcomes are already established.
_Avoid_: Arbitrary friction roll, model judgment

**Passive Check**:
A Check rolled independently for each eligible Field Team member when noticing, recalling, intuiting, or otherwise reacting without a declared lead action.
_Avoid_: Party-wide best-stat check

**Deliberate Check**:
A Check led by one selected character for an intentional action. Qualified Crewmates may assist or modify its terms, but the obstacle receives one primary roll rather than repeated party attempts.
_Avoid_: One attempt per Crewmate

**Check Opportunity**:
A moment when character capabilities, approach, Crewmates, equipment, knowledge, or circumstances enable or call for a meaningful Lattice-100 Check. Nexus aims for a high frequency of Check Opportunities across its modes of play.
_Avoid_: Role-play option, routine-action tax

**Lattice Roll**:
The committed result of rolling d100 for a Check, presented without interrupting play through the Lattice Ticker.
_Avoid_: Modal dice screen, AI-selected outcome

**Lattice Ticker**:
The compact non-modal corner display that shows Lattice Rolls, relevant modifiers, Target Scores, and outcome bands as play continues.
_Avoid_: Dice screen, primary combat log

**Hidden-Roll Visibility**:
A player setting controlling whether failed Checks for concealed information appear in the Lattice Ticker. It defaults to visible as an unidentified failed opportunity without revealing the hidden content.
_Avoid_: Secret-content reveal
