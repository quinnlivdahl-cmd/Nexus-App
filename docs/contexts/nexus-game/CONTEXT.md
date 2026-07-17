# Nexus Game

The product context for the Nexus player experience, including its campaign structure, spatial play, crew progression, encounters, rules, presentation, and game state.

Accepted system-wide decisions for this context are indexed in [`docs/adr/README.md`](../../adr/README.md). The index records status, date, provenance, and the boundary with canonical game source.

## Player and Crew

**Player Character**:
The player's newly created persistent primary character, embodied identity, and leader of the group during spatial play. The Player Character leads from within the action without being required to hold the Captain role or own the campaign Ship.
_Avoid_: Commander avatar, mandatory ship captain

**Player Character Creation**:
The start-of-campaign process in which the player creates a new Player Character's appearance, origin, starting capabilities, personal drive, and optional roles. A surviving Player Character from a completed campaign may enter the Crew Archive as a future Crewmate but never replaces the requirement to create a new campaign leader.
_Avoid_: Archived-character selection, fixed protagonist

**Captain**:
An optional character identity or role representing ownership and command of a Ship. A Captain may be the Player Character or a selected starting Crewmate; a Captain Crewmate may command their Ship in the fiction but does not replace the Player Character as leader of the group.
_Avoid_: Universal Player Character title, party-leader override

**Character Build Stack**:
The mechanical identity layers preserved for Player Character Creation and Crewmates: Bioform, Background/social access, Discipline, Attribute, Skill, Skill Focus, Ability, Traits/Techniques, Installed Cyberware that derives Chassis tier, and equipment/loadout. These foundations, assigned traits, and starting abilities or trees are already populated at level 0; the stack survives the spatial-game transition while remaining open to deliberate improvement.
_Avoid_: Race/class package, freeform mechanical generation

**Nexus Attribute Set**:
The six top-level character Attributes: Combat, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. These familiar development labels replace Strength with Combat and supersede Force, Traverse, Vital, Systems, Insight, and Network as top-level Attribute names without importing the rest of D&D's rules.
_Avoid_: Strength, Force, Traverse, Vital, Systems, Insight, Network

**Installed Cyberware**:
Cyberware physically integrated into an Embodiment and used to derive its current Chassis tier. It persists with that body through former-Player-Character conversion whether selected at creation or added during the campaign; run-earned investment in its upgrade tree resets or rebases to the appropriate campaign baseline, but the implant itself is not treated as carried equipment and removed.
_Avoid_: Carried gear, temporary equipment grant

**Aptitude Trait**:
A persistent individual strength, potential, or characteristic weakness that differentiates a character within the Character Build Stack. Aptitude Traits remain with archived Crewmates across campaigns; Player Characters select theirs during Player Character Creation, while recruited Crewmates arrive with established combinations that the player must have a fair opportunity to reveal before an irreversible Recruitment Offer choice.
_Avoid_: Hidden IV number, replacement Attribute

**Growth Trait**:
A run-specific feat-like quality offered as a player choice from candidates unlocked by meaningful use, training, and campaign decisions. Growth Traits record how a character developed during the current adventure and reset with the Campaign Build; their exact advancement timing and cost remain unresolved.
_Avoid_: Permanent EV total, duplicate Ability rank

**Campaign-Earned Trait**:
An authored persistent trait option available to a Converted Crewmate Package only when validated completed-campaign evidence satisfies its unlock requirements. It is selected and costed within the normal package allowance; a prior Growth Trait may support the evidence but does not automatically carry over or grant it for free.
_Avoid_: Growth Trait carryover, free legacy bonus

**Player Character Profile**:
The freeform backstory and personality entered by the player after the mechanical Character Build Stack and before campaign context is generated. It may inform dialogue, relationships, goals, quests, and Campaign Threads without directly granting mechanics.
_Avoid_: Fixed campaign script, unvalidated mechanical trait

**Character Profile**:
The durable identity of one person across campaigns, roles, and changes of Embodiment, including stable identity and continuity facts referenced by their Player Character Profile or Crew Profile. It persists independently of the current body, archive eligibility, Campaign Build, campaign membership, and live scene state.
_Avoid_: Character sheet, campaign build

**Embodiment**:
The current physical body, sleeve, shell, drone platform, or other substrate through which a Character Profile acts. It owns applicable Bioform, Chassis tier, Installed Cyberware, durable gene modifications, body compatibility, and physical continuity state; replacement changes the body without automatically creating a new person.
_Avoid_: Character identity, Chassis

**Starting Embodiment**:
The authored Embodiment used when a character concept begins in a replaceable body, such as an Upload's Base Sleeve, Maintenance Drone, or Combat Shell. The player selects an eligible option during Player Character Creation, each Starting Crewmate receives a predetermined profile-bound option, and a converted former Player Character retains their current committed Embodiment rather than selecting a new one.
_Avoid_: Starter Chassis, disposable avatar

**Crew Profile**:
The established identity, backstory, relationships, personality, and relevant Archive Memories of a Crewmate. For a converted former Player Character, it is derived from the original Player Character Profile plus validated evidence from custom dialogue, decisions, relationships, and repeated behavior. Profiles for selected Starting Crew and later recruits may supply Backstory Threads to the Campaign Director.
_Avoid_: Mechanical stat block, disposable flavor paragraph

**Personal Canon**:
Lore-compatible player-authored facts accepted from the Player Character Profile, including personal history, relationships, prior experiences, obligations, rivals, and consequences. Personal Canon may be woven into the campaign but cannot rewrite established world canon or grant unvalidated mechanics, status, or possessions.
_Avoid_: Global lore override, flavor text with no effect

**Backstory Thread**:
A light callback to a person, experience, relationship, obligation, or consequence from the Player Character's Personal Canon or a Crewmate's Crew Profile. It may color dialogue, a Point of Interest, a Check Opportunity, or a minor consequence, but never owns a Route Node, creates a dedicated questline, or becomes central to the campaign.
_Avoid_: Character quest, central story arc, ignored biography

**Crewmate**:
A persistent recruitable character with an individual identity, capabilities, and growth who can accompany the Player Character through the campaign.
_Avoid_: Collectible unit, disposable recruit

**Archive Memory**:
A selective validated memory or piece of knowledge available to a Crewmate across campaign runs. Each Crewmate records no more than three per completed campaign, but whether the character personally retains one after Permanent Loss depends on the recovery or continuity method; the Crew Archive may preserve an event as player-facing history even when the restored character does not remember it.
_Avoid_: Chat history, full episodic memory

**Campaign Build**:
A character's run-specific level, carried equipment and loadout, temporary upgrades, Skill Focus investment, Ability ranks, cyberware upgrade-tree investment, and other selected Ability development. Installed Cyberware and its resulting Chassis identity persist independently of this reset. Every Player Character and Starting Crewmate begins at level 0 with assigned traits, starting abilities or trees, and a usable Node 0 loadout. A Crewmate recruited after campaign start enters at the current campaign level with a predetermined legal level-appropriate build; only later advancement choices become player-controlled. Before each Route Node N, current campaign characters advance to Level N after that destination is confirmed and before its Deployment Preparation; milestone levels add extra benefits without replacing the normal advancement.
_Avoid_: Lifetime competence, permanent meta-level

**CrewMember**:
One Character Profile's membership in the current campaign, carrying current roster status, campaign relationships, obligations, availability, and its Campaign Build. It can end or change without deleting the Character Profile or Crew Archive Entry.
_Avoid_: Crew Archive Entry, live combatant

**Actor State**:
The live scene embodiment of a character, creature, or other acting entity, including current position, resources, statuses, and transaction-facing state. It resolves actions but does not own persistent identity, archive history, or campaign progression.
_Avoid_: Character Profile, CrewMember

**Level 0**:
The complete starting Campaign Build state used through Node 0. It already contains authored build foundations, assigned traits, starting abilities or populated trees, and a usable loadout; it is not an unbuilt or powerless character state.
_Avoid_: Empty character sheet, character-creation placeholder

**Starting Loadout**:
The complete legal level-0 loadout used for Node 0. The player selects the Player Character's Starting Loadout during Player Character Creation before the Campaign Opening Pipeline, while each Starting Crewmate arrives with a predetermined profile-bound Starting Loadout that expresses their authored build and avoids rebuilding the entire crew before play. Both opening calls receive this complete deployment; later Deployment Preparation may change loadouts under normal rules.
_Avoid_: Empty starter kit, mandatory starting-crew rebuild

**Node 0 Advancement**:
The first instance of the campaign's universal pre-Route-Node advancement cadence: level 0 becomes level 1 after Node 0 Resolution and confirmation of the first Route Choice but before Node 1 Deployment Preparation. Later Route Node N choices similarly advance current campaign characters to Level N before preparation. Exact benefits remain progression-design work, while the timing lets the player prepare the leveled crew for a known destination.
_Avoid_: Mid-node level-up, optional tutorial reward

**Permanent Loss**:
An irreversible character loss reached only after applicable rescue, stabilization, recovery, and revival avenues are exhausted. Permanent loss of the Player Character ends active campaign play and triggers Early Campaign Resolution so committed consequences remain part of a selected Legacy World.
_Avoid_: Downed state, single-roll deletion

**Continuity Checkpoint**:
A Crewmate's subjective memory state at the start of a campaign. By default, a Crewmate restored after Permanent Loss returns with this memory state and does not remember the fatal campaign, even though the Crew Archive preserves its history.
_Avoid_: Save file, complete memory backup

**Consequence-Preserving Save**:
The default campaign save behavior that continuously records committed Game Truth without offering routine reloads to undo Route Choices, Lattice Rolls, Dialogue Outcomes, or Permanent Loss. A separate player setting may enable manual checkpoints and reloads.
_Avoid_: Quickload loop, Crew Archive rollback

**Crew Roster**:
The player's persistent collection of recruited Crewmates within a campaign. A normal run starts with three characters and adds four, ending with seven including the Player Character.
_Avoid_: Recruit list, unit inventory

**Crew Archive**:
The persistent cross-campaign record of Crewmates the player has discovered and recruited plus surviving former Player Characters converted after completed campaigns. It distinguishes presence in the Archive from Starting Crew eligibility and later Recruitment eligibility, and preserves player-facing collection history when Permanent Loss, biological aging, retirement, build allowance, or other continuity rules make a character unavailable for a particular entry path. A retired character remains a living Legacy World person until an explicit death is committed, without guaranteeing that every recorded event remains part of their subjective memory.
_Avoid_: Universal active roster, account inventory

**Crew Archive Entry**:
The cross-campaign record connecting one Character Profile to discovery and recruitment history, Archive Memories, continuity state, age, and current eligibility paths. It can remain present when the character is unavailable and does not itself make the character a member of the current campaign.
_Avoid_: Current CrewMember, character identity

**Former Player Character Conversion**:
The post-campaign transformation of a surviving Player Character into an eligible Crew Archive character. It preserves identity, the current committed Embodiment, all Installed Cyberware including campaign-added implants, the resulting Chassis tier, and other explicitly persistent state; derives a Crew Profile and bounded traits from source-referenced play evidence; resets carried equipment and run-specific mechanical growth to the appropriate campaign-entry baseline; and never transfers group leadership away from the next campaign's newly created Player Character.
_Avoid_: Full-build carryover, personality invented from one line

**Converted Crewmate Package**:
The single capped mechanical package created when a surviving former Player Character enters the Crew Archive. It targets the normal spend allowance for its entry level, but its traits, Abilities, Installed Cyberware, durable gene modifications, and other selections are rebuilt from validated campaign evidence to represent the character at campaign end rather than copying an old sheet or stacking extra traits. At Campaign Resolution the system proposes an evidence-backed default, and the player may adjust discretionary traits and starting Abilities within validated unlocked options and the same allowance; persistent physical modifications remain fixed. If mandatory modifications exceed the Level-0 allowance, the character cannot be Starting Crew and may instead become a later current-level recruit.
_Avoid_: Original-sheet clone, uncapped legacy bonus

**Conversion Review**:
The post-epilogue Campaign Resolution step in which the player reviews the evidence-backed default Converted Crewmate Package proposed by the existing structured Resolution Brief call and may adjust only its discretionary traits and starting Abilities within validated unlocked options and the capped allowance. It adds no model call and cannot edit persistent physical state, rewrite campaign history, or introduce unsupported choices.
_Avoid_: Free respec, canon veto

**Legacy Allowance**:
A non-discretionary exception used only when a converted former Player Character's mandatory persistent Installed Cyberware and durable gene modifications exceed the normal allowance for the character's entry level. It covers exactly the unavoidable overage, provides no points for other selections, preserves all drawbacks, maintenance, compatibility limits, hack surfaces, and other validated costs, and cannot make an over-budget character eligible for Starting Crew.
_Avoid_: Bonus build points, free legacy power

**Starting Crew Eligibility**:
The deterministic cross-campaign gate deciding whether a Crew Archive character may be selected before Node 0. Archive presence alone does not grant it. A converted former Player Character whose mandatory persistent implants or durable gene modifications exceed the Level-0 creation allowance is ineligible for Starting Crew but may later enter the recruitment candidate pool when the campaign's current level supports a legal build; pool entry does not guarantee appearance.
_Avoid_: Archive ownership, guaranteed recruitment

**Biological Age**:
A character's physically experienced aging, advancing with non-stasis elapsed time rather than raw World Calendar difference. The current simple baseline commits deterministic death at Biological Age 100; the Campaign Director cannot change age or author an earlier off-screen death.
_Avoid_: Calendar timestamp, model-estimated retirement

**Retired Crewmate**:
A former field-eligible Crewmate who remains alive in the Legacy World and recorded in the Crew Archive. They may appear as a contact, mentor, relationship figure, faction participant, or other NPC until deterministic death at Biological Age 100 or a death committed through played events; the Campaign Director cannot kill them off-screen.
_Avoid_: Deleted roster entry, implied death

**Stasis**:
The normal long-Transit state that advances the World Calendar while suspending material Biological Age for the crew. Transit Events may wake or interrupt characters through validated play, but stasis is not itself a detailed survival-management system.
_Avoid_: Time travel, free recovery exploit

**Legacy World**:
An opt-in continuity container for a forward Legacy Sequence of completed and future campaigns that share validated Saga Sources as world history and expose their campaign-level progression through a World Timeline. Starting a Fresh World omits that inherited canon, and selecting one Legacy World never imports another world's history silently.
_Avoid_: Global mandatory canon, provider memory

**Legacy Sequence**:
The forward-only order of campaigns within one Legacy World. Each new campaign begins later on the World Calendar than all previously completed campaigns and inherits their current non-superseded Legacy Consequences; parallel campaigns, prequels, and timeline branches are outside the initial contract.
_Avoid_: Shared-world chronology graph, save-slot ordering

**World Calendar**:
The deterministic literal chronology of one Legacy World. It assigns canonical dates or date ranges to campaign starts, Campaign Resolutions, Saga Sources, Legacy Consequences, and Interval Developments for future lore while coexisting with abstract Campaign Clocks and player-facing Travel Consequences. Calendar age follows this chronology, while Biological Age excludes Stasis. A later campaign's exact start date is proposed after Player Character and Starting Crew selection and cannot invalidate those selected characters.
_Avoid_: Model-estimated timeline, mandatory travel spreadsheet

**World Timeline**:
The main-menu reference view of a Legacy World's authored chronology through the first campaign start plus one dated event tick for each completed campaign and its major public validated world changes. It is available for voluntary review rather than forced into the next campaign opening; secret or character-specific canon remains in Saga Sources for authorized Campaign Director use.
_Avoid_: Mandatory recap, always-injected model context

**Interval Development**:
A bounded validated world-state change occurring between completed campaigns because time passed and an existing Setting Pillar, faction, pressure, Campaign Clock, or Legacy Consequence continued developing. It may evolve or supersede prior state but cannot invent unrelated history, erase the setting, invalidate selected Starting Crew, kill an archived or retired Crewmate, or become universal character knowledge.
_Avoid_: Off-screen world rewrite, frozen timeline

**Saga Source**:
A durable local lore document appended automatically to a Legacy World after Campaign Resolution. Its primary content is a dated compact set of source-referenced Legacy Consequences describing how the world is now different, each with an explicit visibility scope and permitted-reveal policy; a short human-readable chronicle may preserve player history, but future context calls prioritize relevant current consequences and chronicle prose cannot establish additional canon.
_Avoid_: Full transcript, procedural campaign retelling

**Canon Visibility**:
The explicit access scope attached to a Saga Source entry, distinguishing public timeline lore from secret, restricted, and character-specific canon. The Campaign Director may retrieve relevant hidden entries for planning, while Context Broker rules prevent Generated Performance from giving them to unauthorized speakers or scenes. Visibility changes only through an atomic played and validated reveal such as a discovery, confession, leak, or committed consequence.
_Avoid_: Security through prompt wording, universal lore access

**Legacy Consequence**:
A validated cross-campaign change to world state, such as altered faction leadership or influence, regional control, relationships, public knowledge, institutions, resources, or operations. Its scope follows the committed causal impact rather than the campaign's geographic reach, and it records provenance, applicability, and superseded state while omitting procedural detail unless that history is itself relevant later. Eligible consequences promote automatically at Campaign Resolution without a player canon-veto step.
_Avoid_: Full adventure recap, unbounded setting rewrite

**Campaign Reach**:
The geographic and operational extent of a campaign, ranging from one Region to a system-wide adventure across distant bodies and connected operations. Reach does not determine Legacy Consequence scope; a widely traveled campaign may still leave bounded durable changes.
_Avoid_: Legacy Consequence radius, mandatory local campaign

**Setting Pillar**:
A foundational faction, institution, location, conflict, or lore condition whose continued existence supports future campaigns in the shared setting. A campaign may change its leadership, posture, influence, territory, relationships, or operations but does not normally erase it or solve the setting-wide conflict it represents.
_Avoid_: Invulnerable status quo, disposable campaign villain

**Starting Crew**:
The Player Character and two Crewmates selected from the available Crew Archive pool at the beginning of a campaign, providing a complete three-character Field Team immediately.
_Avoid_: Solo start, tutorial-only party

**Recruitment Offer**:
The Crewmate candidates made available through campaign play from a deterministically eligible candidate pool. Pool membership permits but does not guarantee Campaign Director selection. A normal run makes four successful additions across its first nine Route Nodes; some Recruitment Offers require choosing one candidate, and the Campaign Director may adapt the cadence after a death or departure. An accepted recruit joins at the current campaign level with a predetermined legal level-appropriate Campaign Build, avoiding retroactive reconstruction of missed levels; future advancement choices are controlled by the player.
_Avoid_: Random unit drop, automatic full-party unlock

**Active Crew**:
The Player Character and selected Crewmates currently present and playable within a Location. Crewmates outside the Active Crew remain part of the Crew Roster.
_Avoid_: Entire roster, disposable party

**Field Team**:
The group deployed to a Route Node, normally the Player Character and two selected Crewmates. Three is the designed default, while a four-member Field Team remains an intentional future playtest direction.
_Avoid_: Entire Crew Roster

## Campaign Structure

**Ship**:
The crew's persistent mobile home Location during a campaign. It may begin as the Player Character's selected Ship, come with a Captain starting Crewmate, or be provided through Node 0 when neither is a Captain. Crewmates physically inhabit it, but it is not primarily a ship-combat platform or detailed player-managed ship simulation.
_Avoid_: Hub menu, ship-combat game

**Ship Frame**:
An unlockable Ship identity within the shared five-system and Crew Roster model. A Player Character with the Captain role directly selects an eligible frame; a Captain starting Crewmate brings their profile-bound frame; otherwise the Campaign Director provides an eligible frame through Node 0 fiction. Frames may differ in explorable layout, visual identity, module-slot biases, starting capability, and one signature support feature.
_Avoid_: Mid-run vehicle swap, combat-class chassis

**Lore Ship Class**:
An in-world classification for non-player or background vessels that communicates role, scale, or relative speed for fiction and scenario context. It is not a Player Ship Frame, automatic player speed tier, or progression system; any mechanical effect requires an explicit validated scenario rule.
_Avoid_: Player Ship Frame, hidden travel modifier

**Ship Registry**:
The persistent cross-campaign collection of unlocked Ship Frames. The MVP requires one starter Ship Frame; additional frames are target-version meta-progression rather than fleet management.
_Avoid_: Active fleet, Ship inventory

**Downtime**:
The ownership-neutral phase after Node 0 and between Route Nodes for recovery, equipment, relationships, recruitment, Route Choice, and Deployment Preparation. Route Prospects appear at its start; the player commits the next Route Choice before selecting the Field Team, loadout, and Ship Assignments. Downtime may occur aboard the Ship or from another suitable staging place and remains distinct from the Transit that follows departure.
_Avoid_: Mandatory Ship return, non-spatial administration menu

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
A deliberate attempt during Downtime with access to the Ship to clear or alter a Ship Condition through an appropriate Crewmate, Lattice Check, and any stated resource, equipment, contact, or opportunity cost.
_Avoid_: Routine maintenance, automatic repair bill

**Ship Assignment**:
The post-Route-Choice placement of an undeployed Crewmate at a Ship System for the selected Route Node. The assigned character's relevant skills enable and influence that system's support without permanently becoming part of the Ship.
_Avoid_: Passive roster slot, permanent job class

**Preparation Benefit**:
A concrete advantage applied before deployment by a staffed Ship System, such as improved reconnaissance, an alternate approach, prepared equipment, recovery readiness, or established access.
_Avoid_: Hidden percentage bonus

**Ship Support Action**:
A limited player-invoked capability provided to the Field Team by a staffed Ship System during a Route Node. Availability comes from the system, while the assigned Crewmate's relevant skills may determine its Lattice Check or effectiveness.
_Avoid_: Passive stat aura, fourth Field Team member

**Transit**:
The normally literal open-space Ship journey from one Route Node Location to the next after a Route Choice. Same-orbit travel within one body's Region is common, while journeys between distant bodies may carry greater Travel Consequences and normally use Stasis so World Calendar time does not become equivalent Biological Age; only rare transitions between distinct Locations inside one enormous structure omit open-space travel.
_Avoid_: Automatic long-distance jump, Route Node

**Travel Consequence**:
A deterministic player-visible effect caused by a Route transition's abstract duration and conditions, such as advancing a deadline or faction clock, increasing Route Pressure, completing recovery, or changing Transit Event exposure. Route Prospects emphasize these consequences instead of requiring travel math, while deterministic duration mapping may still advance the World Calendar for lore.
_Avoid_: Decorative ETA, model-authored clock change

**Transit Event**:
An optional lightweight situation during Transit, outside the ten-node count. It presents a small number of decisions, Checks, or dialogue consequences without requiring a full explorable Location; an uneventful journey does not require one.
_Avoid_: Route Node, mandatory combat stop

**Route Map**:
The branching campaign-scale progression through ten player-selected Route Nodes numbered 1 through 10. It begins after Director-selected Node 0 introduces the Main Campaign Thread and the crew has obtained its Ship, with ordinary junctures exposing at least three consequential candidate Locations. After Node 7, the three members of the Climax Set become Nodes 8 through 10 in the player's chosen order. Consecutive nodes may commonly remain within the orbital Region of one body, range across distant bodies, or rarely occupy separate sections of one enormous structure, but never use the same exact Location.
_Avoid_: Overworld, node sub-map

**Route Choice**:
The explicitly confirmed and consequence-preserving selection of the next Route Node from at least three candidate destinations presented at the start of Downtime. Each option offers a meaningful distinct incentive and Route Opportunity Cost without exposing a `main story` label. Browsing and preview selection remain reversible, but confirmation atomically commits the destination before Deployment Preparation so the player can choose the Field Team, loadout, and Ship Assignments for a known route.
_Avoid_: Single-click commitment, reversible confirmed route

**Route Prospect**:
A candidate next destination with enough committed identity, Region, Travel Consequences, risk, incentive, Route Opportunity Cost, and campaign relevance to support a meaningful Route Choice. Every set contains at least one path that materially develops the Main Campaign Thread, while several or all prospects may develop it differently and other contributions may prioritize crew, faction, resources, Backstory Threads, or Route Pressure. Main-thread relevance remains hidden from the normal player interface, and a prospect's full Location is assembled only after selection. Unchosen prospects normally lapse; an exceptional resurfacing must be a linked new offer with a grounded, player-visible reduction in benefit or increase in risk or cost.
_Avoid_: Fully built unchosen Location, generic mission card

**Climax Set**:
The internal three-prospect structure established after Node 7 from campaign fronts already grounded in the Main Campaign Thread, prior outcomes, factions, and Route Pressure, then played once each as Nodes 8, 9, and 10 in any player-chosen order. Every member traces to at least one earlier player-observable seed, though one may become clearly actionable only after Node 7. Earlier results materially change the remaining prospects' risks, costs, benefits, or approaches, and every member is designed to host the Playable Finale if played last. Normal play communicates this convergence through fiction rather than displaying `Climax Set` as a tutorial label.
_Avoid_: Three fixed final levels, ordinary lapsing prospect set

**Climax Plan**:
A bounded Director State artifact created with the Climax Set that identifies cross-node dependency hooks, possible advantage and pressure lanes, Playable Finale requirements, and permitted order-effect operations without pre-scripting all six orders. It is dynamically revised from committed climax outcomes while deterministic validation preserves the three locked node identities and effect bounds.
_Avoid_: Six scripted permutations, model-owned ending state

**Finale Node**:
The internal term for the last remaining member of the Climax Set, played as Route Node 10 and adapted to host the Playable Finale. Its Node Brief integrates accumulated Game Truth and order consequences without replacing the Location's established identity or forcing an unrelated culmination into it; normal play lets the player infer this role from the converging campaign rather than announcing it as a system rule.
_Avoid_: Predetermined final Location, generic ending arena

**Playable Finale**:
The campaign's final major objective or operation played inside the Finale Node. It may be a confrontation, rescue, sabotage, escape, negotiation, discovery, decision, or another culmination; deterministic mechanics and validated outcomes resolve it and commit Node 10 Game Truth before the separate Campaign Resolution expresses the aftermath.
_Avoid_: Mandatory boss fight, post-game narration

**Route Opportunity Cost**:
The meaningful benefit, timing, relationship, resource, or alternative development delayed or forgone by confirming one Route Prospect instead of another. Unchosen prospects normally lapse rather than remaining as a standing quest list; any exceptional resurfacing returns with a grounded reduction in benefit or increase in risk or cost. Opportunity cost may arise from limited node slots, changing Campaign Clocks, expiring opportunities, or committed resources, but not from arbitrary punishment added after selection.
_Avoid_: Fake dilemma, invisible penalty

**Deployment Preparation**:
The post-confirmation portion of Downtime in which the player selects the Field Team, character loadouts, and Ship Assignments for the committed destination. Before Route Node 1 preparation, Node 0 Advancement first moves every current campaign character from level 0 to level 1. Finalized deployment context is available to pre-node Director planning before the selected Location begins.
_Avoid_: Blind party selection, reversible Route preview

**Location**:
A persistent spatial play space, such as the campaign Ship or a Route Node destination. Route Node Locations contain multiple connected Areas, and their actors, objects, and world state remain continuous when the game changes movement modes.
_Avoid_: Encounter map, scene container

**Region**:
A broader campaign-scale area, such as the orbit of one body or a sufficiently large station or structure, that may contain multiple distinct playable Locations and therefore more than one Route Node. Remaining in the same Region does not merge those nodes or require that their Locations share authoritative geometry.
_Avoid_: Route Node, explorable Location

**Area**:
A distinct room, exterior section, or other navigable subdivision of a Location.
_Avoid_: Combat room, TacMap node

**Inactive Area**:
An Area containing no participating actor and outside the active scope of every Timing Entry while Turn-Based Mode governs the Location. Its consequential simulation pauses at committed Game Truth, while ambient presentation may continue without changing state.
_Avoid_: Unloaded room, background simulation

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
One selectable campaign destination representing one distinct playable Location of variable size. Multiple Route Nodes may share a Region, and rare nodes may use separate playable sections of one enormous structure, but they never use the same exact Location; revisiting an existing Location is backtracking rather than a new numbered Route Node. Play within a node may shift between Free Movement and Turn-Based Mode multiple times.
_Avoid_: Mission node, jump location

**Node 0**:
The Director-selected opening Location played at level 0 after Player Character Creation and Starting Crew selection but before the Route Map. It introduces the Main Campaign Thread through play and ends with the player understanding the central problem, why it matters to the group, and why action is needed, while deeper causes, antagonists, and full stakes may remain hidden. When neither the Player Character nor a starting Crewmate is a Captain, its fiction also provides the crew an eligible Ship by resolution without making ship acquisition the node's primary premise. It then leads to the first Route Prospects and Node 0 Advancement before Route Node 1 Deployment Preparation, and does not count among the ten selectable Route Nodes.
_Avoid_: Route Node 1, character-creation prologue, ship-acquisition mission

**Route Pressure**:
Campaign conditions such as time, resources, access, danger, and faction response that make Route Map choices consequential and coax the Main Campaign Thread forward without forcing one path. The Campaign Director may propose bounded developments tied to existing facts and Campaign Clocks, but deterministic systems own their advancement and consequences.
_Avoid_: Arbitrary path lock

**Campaign Director**:
The hidden AI-supported system that maintains the developing campaign arc, pressures, mysteries, factions, and unresolved threads; creates Route Prospects; and supplies current dramatic context to Generated Performance. It adapts future play to committed outcomes but cannot invent rules, bypass mechanics, retcon Game Truth, or force a predetermined plot result.
_Avoid_: DM persona, narrator chatbot

**Context Broker**:
The Campaign Director Harness layer that assembles compact traceable model context from permitted Game Truth, rules, lore, recent verbatim exchanges, targeted recall, and current constraints. It controls model visibility but cannot resolve mechanics, mutate state, or create Game Truth.
_Avoid_: Model memory, mechanical authority

**Context Packet**:
The bounded task-specific material assembled by the Context Broker for one logically stateless model request, paired with a local manifest of its source revisions, selections, summaries, omissions, and budget. It conveys permitted context without becoming authority or provider-owned memory.
_Avoid_: Full save dump, persistent model conversation

**Campaign Director Harness**:
The deterministic stateful runtime surrounding the Model Runtime, including the Context Broker, authoritative state, Director State, character records, validation, transcript, recovery, and evaluation. It provides continuity and governance while individual model calls remain logically stateless and task-specific.
_Avoid_: Single persistent chat, agent prompt

**Model Runtime**:
The replaceable provider-neutral generative-model connection used by the Campaign Director, Player Intent interpretation, Generated Performance, and optional Live Illustrations. Task profiles may route work to different compatible hosted or local models without giving a provider custody of conversation state or Game Truth.
_Avoid_: Browser-owned API key, model-owned Game Truth

**Model Task Profile**:
A named generation responsibility, such as Director planning, dialogue, narration, intent interpretation, summarization, or repair, with its own model routing, Context Budget, fallback, and quality boundary. Profiles may use different configured models without becoming separate persistent agents.
_Avoid_: Agent persona, fixed vendor pathway

**Context Budget**:
The independently configurable input target, input hard maximum, reserved output, and maximum output assigned to a Model Task Profile. The selected model's usable context window is the final technical ceiling, while fixture evidence and relevance determine how much context a call should actually receive.
_Avoid_: One global token cap, fill-the-window quota

**Scene Completion Reserve**:
The protected portion of a player-configured model-spend cap available only to resolve the active model-dependent scene and reach a durable consequence-preserving checkpoint. It prevents a cap from stranding play mid-scene and never permits spending beyond that cap.
_Avoid_: Extra credit beyond the cap, optional generation budget

**Director State**:
The private persistent planning lane containing bounded possibilities, pacing intent, candidate developments, and unresolved future opportunities used by the Campaign Director. It may guide proposals but does not establish that an event occurred.
_Avoid_: Game Truth, model memory

**Planning Checkpoint**:
A deterministic campaign event that may trigger a bounded sequence of Director planning calls. Baseline checkpoints are campaign initialization, material scene resolution, Node 0 Resolution, Route Node Resolution, and pre-node preparation; ordinary movement and dialogue do not cause continuous background planning.
_Avoid_: Continuous model loop, provider-owned Director chat

**Node Transition Pipeline**:
The provisional four-stage Campaign Director sequence between ordinary Route Nodes: update campaign priorities, generate Route Prospects, plan the confirmed node, and adapt its Node Brief to the finalized deployment. Each stage is independently validated, traced, and removable or mergeable when evaluation shows it does not justify its cost or latency.
_Avoid_: Persistent Director chat, permanent four-call quota

**Campaign Opening Pipeline**:
The two-call Campaign Director sequence after Player Character Creation and Starting Crew selection: jointly propose the World Calendar start date and bounded Interval Developments when applicable, Main Campaign Thread, initial Director State, and Node 0 selection, then build the Node 0 plan from the validated result and already-known starting deployment. Deterministic validation applies interval changes to a candidate snapshot and cannot accept a start date or development that invalidates the selected crew. Route Prospect and deployment-adaptation calls begin only after Node 0 Resolution.
_Avoid_: Initial Route Choice, four-stage Node 0 transition, forced world recap

**Node Brief**:
A bounded Director State artifact prepared after Node 0 is selected or a Route Prospect is committed and before that Location begins. It identifies relevant goals, constraints, Campaign Threads, characters, opportunities, and pacing guidance without scripting outcomes, owning geometry, or establishing future events as Game Truth.
_Avoid_: Fixed mission script, generated Location truth

**Character Knowledge Record**:
The explicit account of what a character knows, believes, suspects, or mistakenly believes. A character's recorded belief constrains Generated Performance without making the belief true about the world.
_Avoid_: Full transcript, omniscient character memory

**Campaign Thread**:
A persistent unresolved relationship, promise, threat, mystery, lead, faction pressure, or consequence that the Campaign Director may develop across dialogue, Locations, and Route Choices. At Campaign Resolution, each material thread is recorded as resolved, changed, or unresolved rather than being forced closed for the epilogue.
_Avoid_: Predetermined quest step

**Main Campaign Thread**:
The central campaign-scale pressure, mystery, conflict, or unresolved question established by the Campaign Director and introduced through play in Node 0. Its observable problem and actionable importance become clear by Node 0 Resolution, while its deeper cause, antagonist, or full stakes may remain concealed. It gives the run continuity across Route Choices; multiple prospects may develop it in different non-obvious ways, declared pressure can continue developing when the player prioritizes something else, its Playable Finale occurs in the last player-ordered member of the Climax Set, and Campaign Resolution follows Node 10. It may support system-wide Campaign Reach while remaining a bounded story rather than a default mandate to eradicate a Setting Pillar or resolve the setting itself.
_Avoid_: Fixed main quest, Backstory Thread

**Campaign Clock**:
A bounded deterministic progress track for a declared pressure, deadline, faction action, or developing consequence. It advances only through committed triggers such as Route Choices, Travel Consequences, node outcomes, or validated state changes; the Campaign Director may propose developments around it but cannot advance it by model fiat.
_Avoid_: Hidden arbitrary timer, Director mood

**Campaign Fixture**:
A fixed development scenario used to test rules, dialogue continuity, Campaign Director behavior, state recovery, and regression cases. Existing Rook and Nexus Primer campaigns remain fixtures and modular content sources rather than shipping as canned default campaigns.
_Avoid_: Default campaign, fixed story canon

**Local Aftermath**:
The persistent consequences applied within a Location when Tactical Pressure ends, including actor, object, hazard, access, evidence, and environmental state changes.
_Avoid_: Encounter results, victory screen

**Route Node Resolution**:
The campaign-facing consolidation of a Route Node's outcomes when the Field Team leaves its Location. It summarizes rather than postpones Local Aftermath that is already Game Truth and does not require an immediate return to the Ship.
_Avoid_: Encounter summary, post-combat report

**Campaign Resolution**:
The story-closure process entered after the Node 10 Playable Finale or an earlier terminal end. It first commits a validated Resolution Brief from accumulated campaign state, then uses a separate narration call to present the epilogue. When the Player Character survived, that first call also proposes conversion evidence and a default Converted Crewmate Package; Conversion Review follows the epilogue without adding a third call. Campaign Resolution records each material Campaign Thread as resolved, changed, or unresolved and gives every surviving Crew Roster member a compact ending status, while expanding narration only for threads and characters that materially shaped the run. In a Legacy World it automatically promotes eligible bounded Legacy Consequences into a new Saga Source without a separate canon-approval gate. It preserves campaign history without changing the outcome, erasing consequences, forcing artificial closure, or pretending an early ending reached a Playable Finale.
_Avoid_: Finale Node, model-authored outcome

**Early Campaign Resolution**:
Campaign Resolution triggered when Player Character Permanent Loss ends active play before Node 10. It records the terminal cause, surviving crew, accumulated world changes, unresolved threads, and eligible Legacy Consequences without inventing a Playable Finale or discarding the failed campaign from Legacy World history.
_Avoid_: Deleted failed run, improvised victory epilogue

**Resolution Brief**:
The structured, source-referenced closure artifact produced after the Playable Finale or an earlier terminal end from committed Game Truth, approved history, relevant Campaign Threads, any applicable Climax Plan outcomes, crew and faction state, Ship state, and archive rules. It classifies every material Campaign Thread as resolved, changed, or unresolved, gives every surviving Crew Roster member a compact ending status, marks materially campaign-shaping subjects for epilogue coverage, and proposes only bounded world-state changes as Legacy Consequences. When the Player Character survived, it also contains the validated conversion evidence and default Converted Crewmate Package proposal used after the epilogue. It is the sole factual basis for closing narration, conversion options, and cross-campaign canon promotion.
_Avoid_: Epilogue prose, model-invented ending

## Modes of Play

**Free Movement**:
The default non-turn-based state for ordinary spatial exploration, conversation, searching, interaction, and unopposed action aboard the ship and within Locations.
_Avoid_: Overworld mode, narrative mode

**Control Swap**:
The Free Movement action that transfers direct player control between members of the Active Crew. It changes the controlled character without transferring the Player Character's narrative role.
_Avoid_: Possession, delegation

**Turn-Based Mode**:
The Location-wide ordered time state entered when Tactical Pressure makes position, timing, and action order consequential. Relevant actors, hazards, and objectives participate in turns while inactive parts of the Location pause consistently.
_Avoid_: Encounter mode, combat mode

**Tactical Pressure**:
A dangerous or contested situation in which position, timing, and action order can materially change the outcome. Tactical Pressure triggers Turn-Based Mode whether or not the situation involves combat and ends only after committed Game Truth clears every active Tactical Pressure Trigger. A trigger activated after that full clear begins a new Tactical Pressure period with rebuilt participation, fresh Initiative, round 1, and a fresh Surprise Evaluation.
_Avoid_: Combat trigger

**Tactical Pressure Trigger**:
A validated authored or rules-derived condition over committed Game Truth whose inactive-to-active transition begins one source of Tactical Pressure and whose clear condition ends that source. It belongs to an actor, hazard, objective, or committed state change; Generated Performance may propose one but cannot establish or clear it.
_Avoid_: Narrative cue, inferred dramatic tension, Encounter start

**Tactical Participation**:
The temporary projection of existing Location actors plus hazard and objective timing entries selected by active Tactical Pressure Triggers. It references authoritative Location entities without copying their state and changes only after committed transactions; proximity may be a selector but never enrolls nearby entities automatically.
_Avoid_: Encounter roster, proximity bubble, duplicate actor state

**Passive Bystander**:
A non-acting Location actor that remains outside Tactical Participation during Tactical Pressure. A Passive Bystander cowers without receiving Initiative, remains present and vulnerable to rules-native effects, and may leave through a committed interaction such as rescue without first becoming a tactical participant.
_Avoid_: Civilian turn, automatic civilian enrollment

**Tactical State**:
The active Location's persisted ordered-time record containing trigger, participant, Initiative, round, cursor, Timing Entry, active-Area, and rules-policy references. Campaign Save serializes it with the Location, while actor, object, hazard, objective, geometry, and consequence state remain on their existing owners.
_Avoid_: Encounter state, standalone save, runtime-only turn cache

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

**Model Trace**:
The local diagnostic record connecting one model request to its task profile, Context Packet manifest, provider route, normalized output and usage, validation, recovery, transaction, release, and final status. It supports replay and cause analysis without becoming Game Truth or granting a replay authority to commit.
_Avoid_: Provider telemetry, campaign history

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

**Dialogue Session**:
The locally owned active conversation record containing its participants, verbatim exchange, current scene, and relevant committed outcomes. It supplies continuity to logically stateless dialogue calls without becoming provider-owned memory. During Free Movement it softly pauses consequential simulation while ambient presentation may continue; during Turn-Based Mode it follows normal turn and action rules.
_Avoid_: Provider chat, permanent full-context transcript

**Dialogue Outcome**:
A structured campaign consequence proposed from Freeform Dialogue and validated before becoming Game Truth. It may change relationships, factions, leads, Campaign Threads, or future Route Prospects.
_Avoid_: Uncommitted narration, hidden model assumption

**Structured Proposal**:
A typed, non-authoritative request from a generated system for interpretation, dialogue consequence, Director planning, Route Prospect creation, or tactical intent. It identifies its starting truth revision and relevant dependencies, must pass its owning validator against current truth, and cannot directly patch state.
_Avoid_: Arbitrary state JSON, narrated mutation

**Proposal Transaction**:
The atomic commit unit binding one generated performance to all of its linked validated effects, approved change history, and releasable performance record. It commits exactly once or not at all, so linked consequences cannot be partially applied or presented as fact before they are durable.
_Avoid_: Independent state patches, best-effort partial commit

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
The authoritative current state of validated lore, rules, inventory, relationships, consequences, character knowledge, and world state. Anything that can affect future mechanics, choices, knowledge, or continuity belongs here; generated prose may express Game Truth but does not establish it.
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
An individual Lattice-100 roll made once by every participating actor with a standard activation during Tactical Pressure. The d100 maps to a four-step value—01–25 = 4, 26–50 = 3, 51–75 = 2, and 76–100 = 1—which is added to the actor's Dexterity modifier and Initiative bonuses; actors are ordered from highest Initiative Score to lowest. Opposing ties favor higher Dexterity, then use visible unmodified d100 tie-break rolls where lower wins and only an exact tie rerolls. A late entrant joins at its normal ranked slot without interrupting the current activation and acts in the current round only when that slot has not passed, while hazards and objectives use deterministic timing entries instead.
_Avoid_: Side initiative, alternating-side activation

**Shared Initiative Block**:
A consecutive group of same-alliance actors in the ordered sequence whose individual activations may be interleaved by that alliance's controller before play advances beyond the group. The rule applies symmetrically to every alliance; each actor retains its own action resources, and a block never crosses another alliance or a hazard or objective timing entry.
_Avoid_: Side initiative, pooled activation, simultaneous turn

**Timing Entry**:
A deterministic ordered-time entry for an active Location hazard or objective, resolving at the end of the round by default or at another authored rank or cadence. It uses existing rules, Effects, StateDeltas, and commit boundaries without making an Initiative Roll or receiving actor action resources.
_Avoid_: Environment actor, bespoke Encounter script

**Surprise Evaluation**:
A deterministic check performed when a Tactical Pressure Trigger first selects an actor, comparing that trigger with committed awareness state to decide whether to apply Surprised. It is never inferred from narration and never creates a side-wide surprise round.
_Avoid_: Narrative surprise, automatic side-wide condition

**Surprised**:
An individual condition applied by Surprise Evaluation when an actor lacks the required awareness. From application until the end of its skipped first activation, the actor remains in Initiative but cannot act or react; awareness, traits, equipment, or explicit immunity may prevent the condition.
_Avoid_: Side-wide surprise round, omitted Initiative

**Tactical Directive**:
A bounded enemy-group intent proposed when Tactical Pressure begins, using approved machine-readable goals, postures, priorities, restraints, and authored contingencies for deterministic enemy execution. An optional rationale may explain the intent but cannot select or resolve individual actions.
_Avoid_: Per-turn model control, cosmetic combat flavor

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
