import type { ResearchEntry, RuleMapEntry, StructuralModelRow } from "./types";

export const structuralComparison: StructuralModelRow[] = [
  {
    criterion: "Roll clarity",
    broadDomains:
      "Combat + Offense or Charisma + Influence leaves the exact competency underspecified.",
    legacyGranular:
      "Combat + Firearms or Constitution + Medicine communicates the attempted capability quickly.",
    candidateReading:
      "Use bounded concrete Skills for rolls. Keep broad domains as filters and coverage tags.",
  },
  {
    criterion: "Character distinction",
    broadDomains:
      "Focuses must carry nearly all identity, so two experts can look identical before Focus choices.",
    legacyGranular:
      "Concrete competencies distinguish experts immediately, but an uncontrolled catalog fragments identity.",
    candidateReading:
      "A bounded concrete middle layer preserves identity before Focuses without restoring every legacy noun.",
  },
  {
    criterion: "Tree size",
    broadDomains:
      "Compact top level, but each Skill can become a very wide subtree.",
    legacyGranular:
      "Many Skills multiply Focuses and Tier 1 nodes, especially if each Skill must justify the four-layer hierarchy.",
    candidateReading:
      "Prefer roughly three to five bounded Skills per Attribute, then two to four identity-rich Focuses where the content supports them.",
  },
  {
    criterion: "Progression clarity",
    broadDomains:
      "Bottom-up Focus investment reads cleanly, but a broad Skill can become the obvious general-check purchase.",
    legacyGranular:
      "Investment is precise, but adjacent competencies can create duplicate costs and tax choices.",
    candidateReading:
      "Require every Skill to list typical checks and boundaries. Require every Focus to own a distinct fantasy and Ability package.",
  },
  {
    criterion: "Expansion",
    broadDomains:
      "New content usually fits as a Focus or Ability, though overloaded Skills can become incoherent.",
    legacyGranular:
      "New Skills are easy to name but increase mapping, migration, and sheet navigation cost.",
    candidateReading:
      "Add content at Focus or Ability level by default. Add a Skill only when a new repeatable check family and clear exclusions exist.",
  },
  {
    criterion: "Shared trees",
    broadDomains: "Fewer Skill pairs keep hybrids legible.",
    legacyGranular:
      "Many plausible Skill pairs can make shared ownership the normal topology.",
    candidateReading:
      "Use OR for ordinary alternate routes and AND only for a true synthesis that neither parent can own alone.",
  },
  {
    criterion: "Nexus compatibility",
    broadDomains:
      "Supported directly by Skills canon homes such as Offense, Guard, and Command.",
    legacyGranular:
      "Supported directly by Character ability seeds such as Firearms to Precision Fire and Medicine to Combat Triage.",
    candidateReading:
      "The Lab uses a hybrid concrete model as a proposal and preserves both source lineages for later review.",
  },
];

export const researchEntries: ResearchEntry[] = [
  {
    id: "research-cyberpunk-red",
    source: "Cyberpunk RED",
    genre: "Tabletop RPG",
    mechanic: "Concrete Skills and Role Abilities",
    pattern:
      "Checks pair a concrete Skill with a Stat while identity-defining Role Abilities progress separately.",
    strength:
      "The player can tell what competence is being tested and professional identity remains visible.",
    risk: "A flat catalog grows long, and narrow specialties can duplicate investment.",
    nexusAdaptation:
      "Keep roll-facing Skills concrete and reserve distinct exceptions for Abilities or rare parallel lanes.",
    avoid: "Do not create a broad superclass only to hold identity powers.",
    candidateApplication:
      "Every proposed Skill lists representative checks, exclusions, and legacy terms.",
    citationLabel: "R. Talsorian Games Single Shot Pack",
    citationUrl:
      "https://rtalsoriangames.com/wp-content/uploads/2021/02/RTG-CPRed-SingleShotPackv1.1.pdf",
    sourceType: "official",
  },
  {
    id: "research-traveller",
    source: "Traveller",
    genre: "Tabletop RPG",
    mechanic: "Baseline Skill plus specialties",
    pattern:
      "A broad Skill can grant baseline competence before separately advanced specialties restore precision.",
    strength:
      "The parent remains usable while specialties create operational identity.",
    risk: "Broad parents can overshadow narrow neighbors, and zero-rank language can be confusing.",
    nexusAdaptation:
      "Let a Skill cover a coherent action family and use Focuses for different fantasies and unlocks.",
    avoid:
      "Avoid a hidden rank-zero state or one general Technical or Social Skill.",
    candidateApplication:
      "Focuses deepen a Skill without withholding ordinary baseline attempts.",
    citationLabel: "Traveller SRD Skills",
    citationUrl: "https://www.traveller-srd.com/core-rules/skills/",
    sourceType: "secondary",
  },
  {
    id: "research-eclipse-phase",
    source: "Eclipse Phase Second Edition",
    genre: "Tabletop RPG",
    mechanic: "Reduced Skill list, specializations, and body separation",
    pattern:
      "Learned competence persists across bodies while morphs and equipment carry physical capabilities.",
    strength:
      "Identity, embodiment, defense, social capital, technical work, and medicine remain distinct.",
    risk: "A dedicated defense Skill can become mandatory, while technical granularity can overload the sheet.",
    nexusAdaptation:
      "Keep body and equipment dependencies as validation metadata rather than forcing them into learned Skills.",
    avoid: "Do not sell baseline survival as a required defense purchase.",
    candidateApplication:
      "Every Ability records equipment, body, network, scene, and timing dependencies.",
    citationLabel: "Eclipse Phase 2e Quick-Start",
    citationUrl:
      "https://www.eclipsephase.com/wp-content/uploads/2022/01/EclipsePhaseSecondEdition_QuickStartRulesAcrimony_Jan2022_creativecommons.pdf",
    sourceType: "official",
  },
  {
    id: "research-shadowrun",
    source: "Shadowrun Sixth World",
    genre: "Tabletop RPG",
    mechanic: "Skill-list compression with specialization",
    pattern:
      "The publisher reduced a very large Skill list and explicitly identified loss of distinction as the tradeoff.",
    strength:
      "It provides direct first-party evidence for the broad-versus-granular question.",
    risk: "If a base Skill becomes too broad, Focuses become mandatory repairs rather than exciting choices.",
    nexusAdaptation:
      "Bound the Skill count, then ask whether two experts already look different before Focuses.",
    avoid:
      "Do not choose superdomain Skills only because the top level becomes smaller.",
    candidateApplication:
      "The structural comparison treats Offense and Guard as coverage lenses, not automatic roll owners.",
    citationLabel: "Shadowrun Sixth World developer overview",
    citationUrl:
      "https://shadowrunsixthworld.com/2019/05/15/shadowrun-sixth-world-developer-overview/",
    sourceType: "official",
  },
  {
    id: "research-pathfinder",
    source: "Pathfinder Second Edition",
    genre: "Tabletop RPG",
    mechanic: "Visible mastery gates and mixed prerequisites",
    pattern:
      "Proficiency and level gates are explicit, and some options combine OR feeder routes with an AND mastery requirement.",
    strength: "Lock reasons and mastery posture are inspectable.",
    risk: "Large prerequisite catalogs hide the practical route and turn early nodes into taxes.",
    nexusAdaptation:
      "Show Requires, Why, and the shortest valid route on every locked Ability.",
    avoid:
      "Avoid combining level, Skill rank, Focus tier, and several feeder nodes on routine options.",
    candidateApplication:
      "Prerequisite logic is structured as AND or OR rather than buried in prose.",
    citationLabel: "Archives of Nethys Skills",
    citationUrl: "https://2e.aonprd.com/Rules.aspx?ID=2134",
    sourceType: "official",
  },
  {
    id: "research-disco-elysium",
    source: "Disco Elysium",
    genre: "CRPG",
    mechanic: "Noncombat Skills as active voices and checks",
    pattern:
      "A broad set of social, mental, perceptual, and bodily Skills participates actively through passive and active checks.",
    strength:
      "Noncombat competence receives as much authorship and dramatic identity as combat.",
    risk: "The model is exceptionally content-intensive and strong voice can prescribe personality.",
    nexusAdaptation:
      "Give social and technical Focuses concrete permissions, temptations, and failure modes.",
    avoid:
      "Do not promise bespoke interjections at a scale the project cannot author.",
    candidateApplication:
      "Social Focuses are separated by intent, information, permission, and risk.",
    citationLabel: "Disco Elysium on skill checks",
    citationUrl: "https://discoelysium.com/devblog/2016/09/19/on-skill-checks",
    sourceType: "primary",
  },
  {
    id: "research-star-trek-adventures",
    source: "Star Trek Adventures",
    genre: "Tabletop RPG",
    mechanic: "Approach Attributes, Disciplines, Focuses, and Talents",
    pattern:
      "Broad professional Disciplines stay flexible because approach, specialty, and distinct Talents are represented separately.",
    strength:
      "Science, medicine, engineering, command, piloting, and security share one resolution structure.",
    risk: "Professional labels can become occupational boxes and broad pairing invites table negotiation.",
    nexusAdaptation:
      "Every Skill and Focus should state what it includes, excludes, and normally checks.",
    avoid: "Do not assume a broad Skill label defines its own boundary.",
    candidateApplication:
      "Away-team and ship-support applicability is explicit on every Ability.",
    citationLabel: "Modiphius developer blog",
    citationUrl:
      "https://modiphius.net/en-us/blogs/news/star-trek-adventures-developers-blog-001",
    sourceType: "official",
  },
  {
    id: "research-lancer",
    source: "Lancer",
    genre: "Tabletop tactical RPG",
    mechanic: "Three-rank Talents and modular licenses",
    pattern:
      "Three sequential ranks deepen a stable fantasy while modular equipment enables hybrids outside a rigid class tree.",
    strength:
      "Vertical growth is legible and cross-license combinations support experimentation.",
    risk: "Weak feeder ranks become taxes and unrestricted combinations create a large validation surface.",
    nexusAdaptation:
      "Rank 1 grants the defining permission, Rank 2 deepens expression, and Rank 3 changes scale or team interaction.",
    avoid: "Do not pad a chain with a weak numeric prerequisite.",
    candidateApplication:
      "Every rank direction must deepen the same Ability and remain independently useful.",
    citationLabel: "Massif Press free player core",
    citationUrl: "https://massif-press.itch.io/corebook-pdf-free",
    sourceType: "official",
  },
  {
    id: "research-xcom2",
    source: "XCOM 2",
    genre: "Tactical game",
    mechanic: "Class role, paired specializations, and visible action budget",
    pattern:
      "Role and branch identity are immediate, and contextual actions are tied to a small visible action economy.",
    strength:
      "Ability value is anchored to the same economy as movement, attacks, and interaction.",
    risk: "Paired branches create false binaries when one side is generally useful and the other situational.",
    nexusAdaptation:
      "Record action, reaction, equipment, range, target, and scene dependencies on every Ability.",
    avoid:
      "Avoid irreversible promotion pairs and combat-only branch identity.",
    candidateApplication:
      "Defense Abilities offer brace, intercept, positioning, and cover fantasies rather than one best path.",
    citationLabel: "2K XCOM 2 extended manual",
    citationUrl:
      "https://downloads.2kgames.com/xcom2/manuals/asia/XCOM_2_Extended_Manual_%28English%29_XB1%28For_SG.HK.KR%29.pdf",
    sourceType: "official",
  },
  {
    id: "research-deus-ex",
    source: "Deus Ex: Mankind Divided",
    genre: "Immersive sim",
    mechanic: "Permission-changing augmentations and layered hacking",
    pattern:
      "Progression changes traversal, stealth, combat, and technical permissions while hacking separates entry gates from in-challenge tools.",
    strength:
      "Multiple approaches feed the same advancement system and lock causes can be explained.",
    risk: "Resource-efficiency upgrades become taxes, and a single numerical gate can invalidate creative play.",
    nexusAdaptation:
      "List alternate approaches separately from the prerequisite that opens one specific route.",
    avoid: "Avoid one universal hacking score and unexplained lock icons.",
    candidateApplication:
      "Locked nodes state the missing requirement and runtime validation remains separate from purchase eligibility.",
    citationLabel: "Feral official manual",
    citationUrl:
      "https://www.feralinteractive.com/en/manuals/deusexmd/latest/linux/",
    sourceType: "official",
  },
  {
    id: "research-prey",
    source: "Prey (2017)",
    genre: "Immersive sim",
    mechanic: "Observed capability research and route-changing permissions",
    pattern:
      "Strange capabilities are learned through observation while ordinary and nonhuman branches create different environmental options.",
    strength:
      "Progression ties to setting, exploration, knowledge, and identity.",
    risk: "Repeated scanning becomes a chore and an exotic branch can eclipse mundane competence.",
    nexusAdaptation:
      "Gate first-contact capabilities behind varied observations, bounded tests, and previewed consequences.",
    avoid:
      "Avoid repetitive research bars or copying observed powers without limits.",
    candidateApplication:
      "First-contact Abilities use observation, hypothesis, test, response, and revised-model loops.",
    citationLabel: "Direct Arkane designer interview",
    citationUrl:
      "https://www.everyeye.it/articoli/intervista-prey-intervista-raphael-colantonio-ricardo-bare-30433.html",
    sourceType: "primary",
  },
  {
    id: "research-mass-effect-3",
    source: "Mass Effect 3",
    genre: "Action RPG",
    mechanic: "Sequential ranks with previewed later forks",
    pattern:
      "Early ranks advance in order and later ranks split into visible evolutions that can be undone before commitment.",
    strength:
      "A compact tree gains recognizable depth and future branch choices are visible.",
    risk: "Late forks can hide incompatibility and percentage-only evolutions look larger than they play.",
    nexusAdaptation:
      "Keep one stable Ability identity and let later ranks change scope, timing, target pattern, or interaction.",
    avoid: "Avoid surprise exclusivity and ladders made only of small bonuses.",
    candidateApplication:
      "Rank direction is visible on every Ability card before purchase.",
    citationLabel: "EA Mass Effect 3 manual",
    citationUrl:
      "https://eaassets-a.akamaihd.net/eahelp/manuals/mass-effect-3-manuals_PC.pdf",
    sourceType: "official",
  },
  {
    id: "research-starfield",
    source: "Starfield",
    genre: "Science-fiction RPG",
    mechanic: "Category rows, use challenges, and ship-away coverage",
    pattern:
      "Broad categories hold Skills, rank one often grants permission, and technical or social paths cover both away and ship play.",
    strength:
      "Macro navigation is clear and the same taxonomy supports several play surfaces.",
    risk: "Repetition challenges become grinding and category thresholds force irrelevant purchases.",
    nexusAdaptation:
      "Tag every Ability Away, Ship, Both, or General and allow consequential use or training evidence for later eligibility tests.",
    avoid:
      "Avoid use-this-fifty-times advancement and point spending only to reach a row.",
    candidateApplication:
      "Coverage Lab compares away-team and ship-support depth by branch.",
    citationLabel: "Bethesda skill guide",
    citationUrl:
      "https://help.bethesda.net/app/answers/detail/a_id/60948/~/skill-points---skills---starfield",
    sourceType: "official",
  },
  {
    id: "research-warframe",
    source: "Warframe",
    genre: "Action game",
    mechanic: "Branch-identity rework and active posture",
    pattern:
      "A major rework reduced passive drain choices, emphasized active abilities, clarified branch playstyles, and refunded investment.",
    strength:
      "Each branch states a fantasy and systemic redesign remains recoverable for existing builds.",
    risk: "Universal passives erode identity and live-service trees accumulate layers.",
    nexusAdaptation:
      "Give every Focus a one-sentence promise and two or three active Tier 1 options, then version and migrate candidate data.",
    avoid: "Avoid passive-only lanes or baseline survival hidden in one Focus.",
    candidateApplication:
      "Reset-to-seed, JSON export, and local undo make proposal migrations safe.",
    citationLabel: "Digital Extremes Focus rework",
    citationUrl: "https://www.warframe.com/en/news/focus-school-rework",
    sourceType: "official",
  },
  {
    id: "research-cyberpunk-2077",
    source: "Cyberpunk 2077 Update 2.0",
    genre: "Action RPG",
    mechanic: "Fewer consequential perks, planner, and free refunds",
    pattern:
      "The redesign reduced perk count, emphasized changed play, added a browser planner, and allowed individual refunds outside combat.",
    strength:
      "Low-friction comparison encourages experimentation and repairs systemic migrations.",
    risk: "A sparse tree can still neglect noncombat play, and shared builds can accelerate a dominant meta.",
    nexusAdaptation:
      "Compare builds by verbs, permissions, contexts, and coverage rather than only totals.",
    avoid:
      "Avoid permanent prototype choices or popularity as proof of balance.",
    candidateApplication:
      "The Lab offers undo, duplicate, export, and reset outside any gameplay encounter.",
    citationLabel: "CD Projekt Red Update 2.0",
    citationUrl: "https://www.cyberpunk.net/en/news/49060/update-2-0",
    sourceType: "official",
  },
  {
    id: "research-gears-tactics",
    source: "Gears Tactics",
    genre: "Tactical game",
    mechanic: "Quadrant tree and active support abilities",
    pattern:
      "Spatial branches advertise role directions while support nodes expose action cost, cooldown, target, and rank development.",
    strength: "Support is a tactical job rather than a passive bonus source.",
    risk: "Symmetric geometry invents dependencies and extra-action effects become universally optimal.",
    nexusAdaptation:
      "Draw an edge only for a real prerequisite, variant, or shared concept and keep support options diverse.",
    avoid:
      "Avoid decorative connections, healer taxes, and mandatory action-grant engines.",
    candidateApplication:
      "Tree Explorer uses progressive branches and textual prerequisite logic instead of decorative graph edges.",
    citationLabel: "Gears developer guide",
    citationUrl:
      "https://www.gearsofwar.com/en-us/news/developer-blog-jack-skills/",
    sourceType: "official",
  },
  {
    id: "research-neuromancer",
    source: "Neuromancer",
    genre: "Cyberpunk fiction",
    mechanic: "Conceptual inspiration: network intrusion and identity risk",
    pattern:
      "Technical reach can create exposure, dependency, and identity pressure rather than functioning as a clean superpower.",
    strength: "Capability and consequence remain inseparable.",
    risk: "Source-specific terminology or cyberspace metaphysics would become imitation.",
    nexusAdaptation:
      "Give intrusion and Signal proposals trace, attention, consent, or contamination dependencies.",
    avoid: "Do not import names, factions, lore, or signature devices.",
    candidateApplication:
      "Electronic Warfare and First-Contact Focuses record exposure and interpretation boundaries.",
    citationLabel: "Penguin Random House title page",
    citationUrl:
      "https://www.penguinrandomhouse.com/books/293994/neuromancer-by-william-gibson/",
    sourceType: "official",
  },
  {
    id: "research-ancillary-justice",
    source: "Ancillary Justice",
    genre: "Space opera / transhuman fiction",
    mechanic: "Conceptual inspiration: distributed embodiment and continuity",
    pattern:
      "Agency can operate across bodies, systems, and institutional roles while identity continuity remains contested.",
    strength:
      "It supports body, ship, and selfhood questions without reducing them to hardware upgrades.",
    risk: "Copying its specific civilization or distributed-mind premise would import lore.",
    nexusAdaptation:
      "Separate learned identity continuity from body, chassis, and ship-system lanes.",
    avoid: "Do not convert a fiction premise into mandatory Nexus metaphysics.",
    candidateApplication:
      "Identity Continuity uses self-authorship and independent anchors, not a copied identity technology.",
    citationLabel: "Orbit title page",
    citationUrl:
      "https://www.hachettebookgroup.com/titles/ann-leckie/ancillary-justice-10th-anniversary-edition/9780316574266/",
    sourceType: "official",
  },
  {
    id: "research-annihilation",
    source: "Annihilation",
    genre: "Body-horror fiction",
    mechanic:
      "Conceptual inspiration: environmental and interpretive contamination",
    pattern:
      "Knowledge, environment, and bodily change can be entangled, incomplete, and dangerous to interpret.",
    strength:
      "Horror capabilities can reveal and expose instead of adding a generic fear bonus.",
    risk: "Unpreviewed transformation removes player agency and can make nonparticipation impossible.",
    nexusAdaptation:
      "Preview body and identity consequences and preserve opt-out routes through required content.",
    avoid: "Do not import the setting, phenomenon, or terminology.",
    candidateApplication:
      "Meaning Quarantine separates observation from interpretation and preserves consent boundaries.",
    citationLabel: "Jeff VanderMeer title page",
    citationUrl: "https://www.jeffvandermeer.com/book/annihilation",
    sourceType: "primary",
  },
  {
    id: "research-forever-war",
    source: "The Forever War",
    genre: "Military science-fiction",
    mechanic:
      "Conceptual inspiration: operational skill across changing context",
    pattern:
      "Military competence can remain technically valid while social, temporal, and institutional context changes around it.",
    strength:
      "It separates trained procedure from cultural understanding and personal continuity.",
    risk: "Copying plot or military structures would narrow Nexus to one source model.",
    nexusAdaptation:
      "Let dossiers, local procedure, and morale matter beside tactics and weapons.",
    avoid: "Do not import named wars, institutions, or technologies.",
    candidateApplication:
      "Recall and Dossiers explicitly warns that stored context may be stale.",
    citationLabel: "Macmillan title page",
    citationUrl: "https://us.macmillan.com/books/9780312536633/theforeverwar/",
    sourceType: "official",
  },
  {
    id: "research-blindsight",
    source: "Blindsight",
    genre: "First-contact fiction",
    mechanic: "Conceptual inspiration: intelligence without shared assumptions",
    pattern:
      "Observation and successful prediction do not guarantee shared consciousness, values, or communicative intent.",
    strength:
      "First contact becomes iterative model revision instead of one social roll.",
    risk: "Treating a particular philosophical claim as Nexus truth would overreach.",
    nexusAdaptation:
      "Separate confirmed facts, working models, and contaminated interpretations.",
    avoid: "Do not import the novel's conclusion, entities, or terminology.",
    candidateApplication:
      "Unknown Protocol and Continuity Under Contact maintain fact-model boundaries.",
    citationLabel: "Macmillan title page",
    citationUrl: "https://us.macmillan.com/books/9781250237484/blindsight/",
    sourceType: "official",
  },
  {
    id: "research-stories-of-your-life",
    source: "Stories of Your Life and Others",
    genre: "First-contact fiction",
    mechanic:
      "Conceptual inspiration: language, interpretation, and changed cognition",
    pattern:
      "Understanding an unfamiliar communicative system can alter the interpreter's model of self and causality.",
    strength:
      "Contact becomes a sequence of learning, reciprocal testing, and personal consequence.",
    risk: "A copied language mechanic or deterministic metaphysics would be derivative.",
    nexusAdaptation:
      "Make contact research optional, bounded, and explicit about identity consequences.",
    avoid: "Do not copy story concepts, terminology, or outcomes.",
    candidateApplication:
      "First-Contact Grounding treats interpretation as fallible and preserves self-authored boundaries.",
    citationLabel: "Pan Macmillan collection page",
    citationUrl:
      "https://www.panmacmillan.com/authors/ted-chiang/stories-of-your-life-and-others/9781035038596",
    sourceType: "official",
  },
];

export const rulesMap: RuleMapEntry[] = [
  {
    id: "rule-hierarchy",
    classification: "existing-rule",
    title: "Working hierarchy",
    detail:
      "Attribute -> Skill -> Skill Focus -> Ability is the active source-facing relationship, while older Skills files preserve top-layer terminology drift.",
    sourcePath:
      "docs/nexus-game-source/source/Characters/Applied Rules/CHAR-ABILITY-001 - Ability_Taxonomy_and_Level_Up_Working_Model.md",
  },
  {
    id: "rule-attributes",
    classification: "prior-proposal",
    title: "Six playable-draft Attributes",
    detail:
      "Combat, Dexterity, Intelligence, Constitution, Wisdom, and Charisma are accepted planning labels, not promoted canon.",
    sourcePath:
      "docs/chatgpt-project-bridge/synced-chats/2026-06-28-issue-31-skill-ability-planning-exchange.md",
  },
  {
    id: "rule-action-economy",
    classification: "existing-rule",
    title: "Combat action economy",
    detail:
      "A standard activation currently uses 2 AP, Speed-derived MP, one reaction permission when available, and one micro-interaction.",
    sourcePath:
      "docs/nexus-game-source/source/Combat/Canon Homes/COMBAT-ACTION-001 - Action_Economy_and_Reactions.md",
  },
  {
    id: "rule-resolution",
    classification: "existing-rule",
    title: "Lattice-100 resolution",
    detail:
      "Skills and Focuses are capability or modifier inputs. Attack, standard, and extended are check families, while medical, social, hacking, and similar terms are domains or tags.",
    sourcePath:
      "docs/nexus-game-source/source/Skills/Canon Homes/SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md",
  },
  {
    id: "rule-tier-rank",
    classification: "existing-rule",
    title: "Tier and Rank are distinct",
    detail:
      "Tier controls access. Rank deepens one Ability and should not add unrelated riders. Exact thresholds remain parked.",
    sourcePath:
      "docs/nexus-game-source/source/Characters/Applied Rules/CHAR-ABILITY-001 - Ability_Taxonomy_and_Level_Up_Working_Model.md",
  },
  {
    id: "rule-focus-start",
    classification: "prior-proposal",
    title: "Two or three Tier 1 Abilities per Focus",
    detail:
      "The playable-first exchange proposes two or three visible Tier 1 choices and full locked Tier 2 previews.",
    sourcePath:
      "docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md",
  },
  {
    id: "rule-cascade-math",
    classification: "prior-proposal",
    title: "Playable-first totals cascade",
    detail:
      "The planning packet proposes that purchased Ability ranks and direct Focus increases feed Skill Focus Total, then Skill Total, then Attribute Total. Exact modifier formulas remain deferred.",
    sourcePath:
      "docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md",
  },
  {
    id: "rule-rank-cost",
    classification: "prior-proposal",
    title: "One progression point per rank",
    detail:
      "For the first playable draft, every Ability rank and each direct Focus increase costs one shared progression point. Currency name, award cadence, and final economy remain open.",
    sourcePath:
      "docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md",
  },
  {
    id: "rule-tier-visibility",
    classification: "prior-proposal",
    title: "Locked tiers stay legible",
    detail:
      "Tier 2 uses full locked previews with exact requirements. Tier 3 first shows that content exists, then reveals detail at the Focus Tier 2 threshold. Threshold values remain deferred.",
    sourcePath:
      "docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md",
  },
  {
    id: "rule-roll-boundary",
    classification: "prior-proposal",
    title: "General and Ability-granted checks",
    detail:
      "The planning packet proposes Attribute Modifier plus Skill Modifier for general checks, and Attribute Modifier plus the relevant Skill Focus Modifier when an Ability-granted use requires a roll.",
    sourcePath:
      "docs/chatgpt-project-bridge/task-packets/2026-06-30-issue-31-skill-focus-tile-progression-math.md",
  },
  {
    id: "rule-equipment",
    classification: "existing-rule",
    title: "Equipment remains a parallel authority",
    detail:
      "Armor, weapons, tools, cyberware, modules, and mounted systems can grant permissions or Ability lanes. Learned Skills do not own gear statistics.",
    sourcePath:
      "docs/nexus-game-source/source/Equipment/Canon Homes/EQUIP-LOADOUT-001 - Loadout_Core_Rules.md",
  },
  {
    id: "rule-armor",
    classification: "existing-rule",
    title: "Armor is equipment, Mitigation is the stat",
    detail:
      "Any Armor-related Focus must describe trained handling, posture, or interaction rather than duplicate protection values.",
    sourcePath:
      "docs/nexus-game-source/source/Equipment/Canon Homes/EQUIP-DEF-001 - Armor_Shields_and_Defense_Gear.md",
  },
  {
    id: "rule-validation",
    classification: "prior-proposal",
    title: "Draft transaction validation separates acquisition from use",
    detail:
      "The draft contract proposes validating timing, target, range, line of effect, resource, status, equipment, installation, power, and scene state before acquired content can be used. It is not source canon or current implementation.",
    sourcePath:
      "docs/game-system-contracts/drafts/Turn_Transaction_Contract_rev0.1.md",
  },
  {
    id: "rule-ship-support",
    classification: "open-question",
    title: "Ship-support actions remain undeveloped",
    detail:
      "Communications, engineering, medical support, scans, routing, and countermeasures are supported concepts, but final action and modifier rules remain open.",
    sourcePath:
      "docs/nexus-game-source/source/Core/Canon Homes/CORE-SHIP-001 - SRC-CORE-005-Ship-Phase-and-Crew-Operations.md",
  },
  {
    id: "rule-model",
    classification: "open-question",
    title: "Broad versus concrete Skill ownership",
    detail:
      "Both source models have direct support. This Lab's concrete-middle recommendation is research synthesis, not an accepted decision.",
    sourcePath:
      "docs/nexus-game-source/source/Skills/Canon Homes/SKILL-LIST-001 - SRC-SKILL-002-Skills-List-and-Definitions.md",
  },
  {
    id: "rule-identity",
    classification: "open-question",
    title: "Identity, Signal, and first-contact content",
    detail:
      "The themes are known gaps. Body transformations, Contact powers, campaign history, and cyberware remain parallel or campaign-gated lanes.",
    sourcePath:
      "docs/nexus-game-source/source/Characters/Open Questions/CHAR-OPEN-001 - Character_Open_Questions.md",
  },
];
