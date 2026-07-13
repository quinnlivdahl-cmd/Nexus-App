import type {
  Ability,
  AbilityRulesImpact,
  AbilityType,
  Attribute,
  CoverageTag,
  LabData,
  ProvenanceCategory,
  ResearchEntry,
  RuleMapEntry,
  SharedBranch,
  Skill,
  SkillFocus,
  SkillOrigin,
  StructuralModelRow,
  ThemeTokens,
} from "./types";
import {
  concretizeCandidateEffect,
  deriveRulesImpact,
  sourceActionCost,
} from "./rules-impact";
import {
  researchEntries,
  rulesMap,
  structuralComparison,
} from "./research-data";
import { NONCANONICAL_NOTICE } from "./lab-state";

type AbilitySpec = {
  name: string;
  type: AbilityType;
  effect: string;
  tags: CoverageTag[];
  tier?: 1 | 2 | 3;
  maxRank?: number;
  rank?: string;
  prerequisites?: string[];
  logic?: "AND" | "OR";
  validation?: string[];
  rationale?: string;
  provenance?: ProvenanceCategory;
  playtest?: string;
  rules?: Partial<AbilityRulesImpact>;
};

type FocusSpec = {
  name: string;
  fantasy: string;
  identity: string;
  uses: string[];
  boundary: string;
  abilities: AbilitySpec[];
  provenance?: ProvenanceCategory;
  tier2?: string;
  tier3?: string;
};

type SkillSpec = {
  name: string;
  definition: string;
  checks: string[];
  boundaries: string[];
  origin: SkillOrigin;
  legacyTerms: string[];
  focuses: FocusSpec[];
  provenance?: ProvenanceCategory;
};

const slug = (value: string) =>
  value
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const base = (id: string, name: string, provenance: ProvenanceCategory) => ({
  id,
  name,
  proposal: true as const,
  status: "proposed" as const,
  provenance,
});

function makeAbility(focusId: string, spec: AbilitySpec): Ability {
  const id = `ability-${slug(focusId)}-${slug(spec.name)}`;
  const supportsAway = spec.tags.includes("away-team");
  const supportsShip = spec.tags.includes("ship-support");
  const rulesImpact = {
    ...deriveRulesImpact(spec.type, spec.tags),
    ...spec.rules,
  };
  return {
    ...base(id, spec.name, spec.provenance ?? "new-original"),
    kind: "ability",
    parentFocusId: focusId,
    tier: spec.tier ?? 1,
    maxRank: spec.maxRank ?? (spec.tier === 3 ? 1 : 3),
    abilityType: spec.type,
    actionCost: sourceActionCost(spec.type),
    rulesImpact,
    applicability:
      supportsAway && supportsShip
        ? "both"
        : supportsAway
          ? "away-team"
          : supportsShip
            ? "ship-support"
            : "general",
    candidateEffect: concretizeCandidateEffect(spec.effect, rulesImpact),
    rankDirection:
      spec.rank ??
      "Improve the same permission or effect by increasing reliability or reducing its intrinsic cost. Do not add an unrelated rider.",
    prerequisiteIds: (spec.prerequisites ?? []).map(
      (name) => `ability-${slug(focusId)}-${slug(name)}`,
    ),
    prerequisiteLogic: spec.logic ?? "AND",
    validationDependencies: spec.validation ?? [
      "timing",
      "target",
      "scene state",
      "current resources",
    ],
    designRationale:
      spec.rationale ??
      "Creates a concrete choice inside this Focus while preserving baseline checks for characters without the Ability.",
    playtestNotes:
      spec.playtest ??
      "Track use frequency, whether the permission is legible, and whether a baseline action feels artificially withheld.",
    coverageTags: spec.tags,
  };
}

function makeFocus(skillId: string, spec: FocusSpec): SkillFocus {
  const id = `focus-${slug(skillId)}-${slug(spec.name)}`;
  return {
    ...base(id, spec.name, spec.provenance ?? "new-original"),
    kind: "focus",
    parentSkillId: skillId,
    characterFantasy: spec.fantasy,
    identity: spec.identity,
    typicalUses: spec.uses,
    boundary: spec.boundary,
    tier2Posture:
      spec.tier2 ??
      "Reveal as a full locked preview. Add a new tactical or narrative option after meaningful Focus investment.",
    tier3Posture:
      spec.tier3 ??
      "Show that a capstone exists, then reveal details at the Tier 2 threshold. The capstone should complete the Focus fantasy.",
    abilities: spec.abilities.map((ability) => makeAbility(id, ability)),
  };
}

function makeSkill(attributeId: string, spec: SkillSpec): Skill {
  const id = `skill-${slug(attributeId)}-${slug(spec.name)}`;
  return {
    ...base(id, spec.name, spec.provenance ?? "new-original"),
    kind: "skill",
    parentAttributeId: attributeId,
    definition: spec.definition,
    typicalChecks: spec.checks,
    boundaries: spec.boundaries,
    origin: spec.origin,
    legacyTerms: spec.legacyTerms,
    focuses: spec.focuses.map((focus) => makeFocus(id, focus)),
  };
}

function makeAttribute(
  name: string,
  identity: string,
  promise: string,
  lineage: string[],
  coverage: string,
  skills: SkillSpec[],
): Attribute {
  const id = `attribute-${slug(name)}`;
  return {
    ...base(id, name, "prior-nexus-proposal"),
    kind: "attribute",
    identity,
    gameplayPromise: promise,
    historicalLineage: lineage,
    coverageNotes: coverage,
    skills: skills.map((skill) => makeSkill(id, skill)),
  };
}

const combat = makeAttribute(
  "Combat",
  "Deliberate control of violence, protection, and coordinated pressure.",
  "Combat investment should create distinct ways to attack, protect, and direct a team without making fighting mandatory for every character.",
  [
    "Force -> Combat",
    "Firearms, Heavy Weapons, Melee, Armor, and Tactics preserved as lineage",
  ],
  "Covers offense, defense, protection, suppression, and small-unit command. Constitution owns endurance and Charisma owns social leadership.",
  [
    {
      name: "Offense",
      definition:
        "Apply weapons and direct force with trained intent, including precision, close pressure, and heavy fire.",
      checks: [
        "place a difficult shot",
        "fight through close contact",
        "control a heavy weapon",
        "exploit an exposed target",
      ],
      boundaries: [
        "Guard owns deliberate protection",
        "Command owns coordinated team effects",
        "Equipment owns weapon tags, ammunition, and legality",
      ],
      origin: "broad",
      legacyTerms: ["Firearms", "Heavy Weapons", "Melee"],
      focuses: [
        {
          name: "Precision Fire",
          fantasy:
            "A patient shooter who turns a narrow sightline into certainty.",
          identity:
            "Rifle reliability, aim, range discipline, and deliberate shot placement.",
          uses: [
            "aimed attacks",
            "long sightlines",
            "called target zones",
            "cover-aware fire",
          ],
          boundary:
            "Sidearms owns close and secondary-weapon handling. Heavy Weapons owns area pressure.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Steady Rifle",
              type: "passive",
              effect:
                "Improve the reliability of a properly aimed rifle attack without changing the weapon's base profile.",
              tags: ["combat-offense", "away-team"],
              provenance: "prior-nexus-proposal",
              validation: [
                "equipped rifle",
                "line of sight",
                "aim or setup state",
                "range",
              ],
              rules: {
                resultBands:
                  "While aimed, add +2 TS from the Character lane to one valid rifle attack. On a Direct, apply the weapon's Direct result; this Ability adds no separate damage.",
                guardrail:
                  "Use the normal once-per-activation attack limit. Cover remains part of Effective Defense and cannot be ignored unless another stated effect permits it.",
              },
            },
            {
              name: "Sightline Discipline",
              type: "preparation",
              effect:
                "Prepare a visible lane so the next valid precision attack can better handle cover or range pressure.",
              tags: ["combat-offense", "away-team"],
              validation: [
                "visible lane",
                "equipped ranged weapon",
                "timing",
                "cover state",
              ],
            },
            {
              name: "Converging Fire",
              type: "permission",
              effect:
                "Tier 2 seed: coordinate a precision attack with an ally who is already pressuring the same target.",
              tags: ["combat-offense", "command-tactics", "away-team"],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Steady Rifle", "Sightline Discipline"],
              validation: [
                "ally state",
                "same target",
                "line of sight",
                "timing",
              ],
            },
          ],
        },
        {
          name: "Sidearms",
          fantasy:
            "A close-range gunfighter who stays useful when space and time collapse.",
          identity:
            "Ready access, close handling, and secondary-weapon follow-through.",
          uses: [
            "close pistol attacks",
            "backup-weapon use",
            "rapid ready",
            "confined spaces",
          ],
          boundary:
            "Precision Fire owns deliberate range. Close Combat owns bodily contact and grappling.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Close Pistol",
              type: "passive",
              effect:
                "Improve sidearm reliability when the target is close or the scene is physically constrained.",
              tags: ["combat-offense", "away-team"],
              provenance: "prior-nexus-proposal",
              validation: [
                "equipped sidearm",
                "range",
                "target",
                "scene geometry",
              ],
              rules: {
                resultBands:
                  "At Close range or in a confined-space scene, add +2 TS from the Character lane to one valid sidearm attack vs Effective Defense. Use the sidearm's normal Graze, Hit, and Direct results.",
                guardrail:
                  "This changes attack reliability only. It does not add damage, ignore cover, waive ammunition, or permit an extra attack.",
              },
            },
            {
              name: "Backup Shot",
              type: "equipment-interaction",
              effect:
                "Improve an equipped sidearm attack made through an already valid Secondary Action. This does not unlock the secondary attack itself.",
              tags: ["combat-offense", "away-team"],
              provenance: "prior-nexus-proposal",
              validation: [
                "equipped sidearm",
                "Secondary Action available",
                "ammunition",
                "target",
              ],
            },
          ],
        },
        {
          name: "Breach Fighting",
          fantasy:
            "A breach fighter who controls the dangerous distance inside arm's reach.",
          identity:
            "Melee reliability, contact control, and physical disruption.",
          uses: ["melee attacks", "grapples", "disarms", "breach entry"],
          boundary:
            "Mobility owns reaching the target. Field Defense owns protecting an ally once contact begins.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Hard Contact",
              type: "passive",
              effect:
                "Improve the reliability or immediate force of a valid close-combat attack.",
              tags: ["combat-offense", "away-team"],
              provenance: "prior-nexus-proposal",
              validation: [
                "melee range",
                "valid weapon or unarmed profile",
                "target",
                "timing",
              ],
            },
            {
              name: "Clinch Control",
              type: "permission",
              effect:
                "Gain a structured option to bind, turn, or displace a nearby target instead of dealing direct harm.",
              tags: ["combat-offense", "defense-protection", "away-team"],
              validation: [
                "adjacency",
                "target scale",
                "free limb or valid tool",
                "scene geometry",
              ],
            },
          ],
        },
        {
          name: "Heavy Weapons Use",
          fantasy:
            "A crew-served weapons specialist who turns mass and recoil into controlled pressure.",
          identity: "Heavy-weapon permission, bracing, and area denial.",
          uses: [
            "heavy attacks",
            "braced fire",
            "breaching fire",
            "area pressure",
          ],
          boundary:
            "Equipment owns weapon classification and ammunition. Suppression owns team-directed denial patterns.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Big Gun Handling",
              type: "equipment-interaction",
              effect:
                "Unlock or improve safe operation of a valid heavy weapon when its carry and mounting requirements are met.",
              tags: ["combat-offense", "away-team", "ship-support"],
              provenance: "prior-nexus-proposal",
              validation: [
                "heavy weapon",
                "mount or body requirement",
                "ammunition",
                "power state",
              ],
            },
            {
              name: "Area Pressure",
              type: "action",
              effect:
                "Use a heavy weapon to pressure a declared zone, trading precision for space control.",
              tags: ["combat-offense", "command-tactics", "away-team"],
              validation: [
                "heavy weapon",
                "declared zone",
                "ammunition",
                "line of effect",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Guard",
      definition:
        "Use armor, position, reactions, and threat placement to keep people, routes, and objectives intact under pressure.",
      checks: [
        "hold a doorway",
        "protect an ally",
        "use armor deliberately",
        "withdraw without collapsing a defense",
      ],
      boundaries: [
        "Constitution owns surviving harm already taken",
        "Dexterity owns pure evasion",
        "Equipment owns armor statistics and condition",
      ],
      origin: "broad",
      legacyTerms: ["Armor", "Defense", "Screen"],
      focuses: [
        {
          name: "Armor Handling",
          fantasy:
            "A defender who makes worn protection an active tool instead of a passive number.",
          identity: "Bracing, impact management, and trained armored posture.",
          uses: [
            "resist forced movement",
            "manage impact",
            "defensive stance",
            "armored objective work",
          ],
          boundary:
            "Equipment owns armor tags, values, damage, and repair. Endurance owns unarmored bodily resilience.",
          abilities: [
            {
              name: "Brace Protocol",
              type: "stance",
              effect:
                "Enter a defensive posture that improves resistance to impact, forced movement, or knockdown while maintained.",
              tags: ["defense-protection", "away-team"],
              validation: [
                "posture available",
                "movement state",
                "timing",
                "incoming effect",
              ],
            },
            {
              name: "Controlled Impact",
              type: "reaction",
              effect:
                "When struck, reduce or reshape one immediate physical consequence without negating the attack itself.",
              tags: ["defense-protection", "away-team"],
              validation: [
                "reaction available",
                "incoming physical harm",
                "armor or braced state",
                "timing",
              ],
            },
          ],
        },
        {
          name: "Interposition",
          fantasy:
            "A protector who steps into the line of consequence before it reaches someone else.",
          identity: "Screening people, routes, and short windows of movement.",
          uses: [
            "screen a node",
            "cover an ally",
            "protect a passage",
            "intercept immediate harm",
          ],
          boundary:
            "Command coordinates a team-wide plan. Interposition personally creates the protection.",
          abilities: [
            {
              name: "Screen Watch",
              type: "stance",
              effect:
                "Establish a Screen over a valid node, route, or nearby subject and gain the protection permission defined by that Screen.",
              tags: ["defense-protection", "command-tactics", "away-team"],
              provenance: "prior-nexus-proposal",
              validation: [
                "declared screen subject",
                "position",
                "line of effect",
                "stance upkeep",
              ],
            },
            {
              name: "Guarded Passage",
              type: "preparation",
              effect:
                "Declare a short route or opening that allies can cross under your protection while the passage remains valid.",
              tags: ["defense-protection", "mobility-exploration", "away-team"],
              validation: [
                "declared route",
                "ally movement",
                "line of effect",
                "timing",
              ],
            },
            {
              name: "Take the Hit",
              type: "reaction",
              effect:
                "Become the valid target of immediate harm aimed at a nearby ally when position and effect type allow interception.",
              tags: ["defense-protection", "support-recovery", "away-team"],
              validation: [
                "reaction available",
                "nearby ally",
                "interceptable effect",
                "position",
              ],
            },
            {
              name: "Defended Corridor",
              type: "stance",
              effect:
                "Tier 2 seed: maintain a Screen across a route while allowing protected allies to reposition through it.",
              tags: ["defense-protection", "command-tactics", "away-team"],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Screen Watch", "Guarded Passage"],
              validation: [
                "declared route",
                "allies",
                "stance upkeep",
                "line of effect",
              ],
            },
          ],
        },
        {
          name: "Defensive Positioning",
          fantasy:
            "A tactical anchor who makes important ground costly to take.",
          identity: "Cover, controlled withdrawal, and boundary defense.",
          uses: [
            "use cover",
            "hold an objective",
            "withdraw safely",
            "deny a crossing",
          ],
          boundary:
            "Mobility owns fast traversal. Suppression owns ranged area pressure.",
          abilities: [
            {
              name: "Cover Drill",
              type: "passive",
              effect:
                "Improve the normal protection gained from valid cover after moving into it or taking a defensive action.",
              tags: ["defense-protection", "away-team"],
              validation: [
                "valid cover",
                "position",
                "defensive action or movement",
                "line of effect",
              ],
            },
            {
              name: "Fighting Withdrawal",
              type: "permission",
              effect:
                "Reposition away from a threat while retaining part of an already established defensive posture.",
              tags: ["defense-protection", "mobility-exploration", "away-team"],
              validation: [
                "valid route",
                "established posture",
                "movement available",
                "threat position",
              ],
            },
            {
              name: "Anchor Point",
              type: "stance",
              effect:
                "Guard a node, doorway, route, or objective and gain a reaction when a threat crosses the declared boundary.",
              tags: ["defense-protection", "command-tactics", "away-team"],
              validation: [
                "declared boundary",
                "reaction available",
                "position",
                "hostile crossing",
              ],
            },
            {
              name: "Hold the Line",
              type: "stance",
              effect:
                "Tier 3 seed: turn one defended boundary into a temporary crew anchor that resists collapse while you remain committed to it.",
              tags: ["defense-protection", "command-tactics", "away-team"],
              tier: 3,
              maxRank: 1,
              prerequisites: ["Cover Drill", "Anchor Point"],
              validation: [
                "declared boundary",
                "position",
                "stance upkeep",
                "crew state",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Command",
      definition:
        "Shape the team's combat tempo through suppression, target information, and concise direction.",
      checks: [
        "coordinate fire",
        "call a threat",
        "direct a reposition",
        "stabilize a tactical plan",
      ],
      boundaries: [
        "Charisma owns trust and persuasion",
        "Field Defense owns personal protection",
        "Weapon Skills own the attack itself",
      ],
      origin: "broad",
      legacyTerms: ["Tactics", "Suppression", "Target Calling", "Direction"],
      focuses: [
        {
          name: "Suppression",
          fantasy: "A controller who makes enemy movement and exposure costly.",
          identity:
            "Temporary area denial and pressure through valid attacks or systems.",
          uses: [
            "suppress a route",
            "cover movement",
            "delay an advance",
            "force a choice",
          ],
          boundary:
            "Heavy Weapons Use owns the weapon. Suppression owns the denial pattern.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Support Gunner",
              type: "action",
              effect:
                "Unlock or improve a suppressive action that pressures a valid route or zone without requiring direct damage.",
              tags: ["command-tactics", "combat-offense", "away-team"],
              provenance: "prior-nexus-proposal",
              validation: [
                "valid weapon or system",
                "declared zone",
                "ammunition or power",
                "line of effect",
              ],
            },
            {
              name: "Denial Pattern",
              type: "preparation",
              effect:
                "Prepare overlapping pressure against one route so an ally can act with a clearer movement window.",
              tags: ["command-tactics", "defense-protection", "away-team"],
              validation: [
                "declared route",
                "ally intent",
                "valid attack source",
                "timing",
              ],
            },
          ],
        },
        {
          name: "Target Calling",
          fantasy:
            "A spotter who turns scattered observations into one shared threat picture.",
          identity: "Marks, priority calls, and attack-ready information.",
          uses: [
            "mark a target",
            "call a route",
            "identify a threat",
            "share an opening",
          ],
          boundary:
            "Perception discovers information. Target Calling makes it tactically actionable for the crew.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Call Angle",
              type: "action",
              effect:
                "Mark a visible target, route, or threat so an ally can act on the shared tactical information.",
              tags: [
                "command-tactics",
                "combat-offense",
                "away-team",
                "ship-support",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "visible or sensor-confirmed subject",
                "communication path",
                "target state",
                "timing",
              ],
            },
            {
              name: "Threat Ledger",
              type: "passive",
              effect:
                "Maintain one additional confirmed tactical fact about an active threat without losing the earlier call.",
              tags: [
                "command-tactics",
                "perception-cognition-resolve",
                "away-team",
                "ship-support",
              ],
              validation: [
                "confirmed information",
                "communication path",
                "scene state",
                "attention",
              ],
            },
          ],
        },
        {
          name: "Field Direction",
          fantasy:
            "A coordinator whose short instruction helps another specialist execute under pressure.",
          identity:
            "Immediate crew direction, repositioning, and tempo recovery.",
          uses: [
            "direct an ally",
            "repair a broken plan",
            "time a crew action",
            "reposition a specialist",
          ],
          boundary:
            "Rapport owns morale and trust. Field Direction owns immediate tactical execution.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Command Line",
              type: "action",
              effect:
                "Give a concise direction that improves an ally's already valid execution of a declared task.",
              tags: [
                "command-tactics",
                "support-recovery",
                "away-team",
                "ship-support",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "willing ally",
                "communication path",
                "declared task",
                "timing",
              ],
            },
            {
              name: "Split-Second Reposition",
              type: "reaction",
              effect:
                "When a nearby ally's position becomes unsafe, signal a short valid reposition before the consequence fully resolves.",
              tags: [
                "command-tactics",
                "mobility-exploration",
                "defense-protection",
                "away-team",
              ],
              validation: [
                "reaction available",
                "ally movement available",
                "communication path",
                "valid route",
              ],
            },
            {
              name: "Coordinated Tempo",
              type: "preparation",
              effect:
                "Tier 2 seed: prepare two crew actions as a linked sequence with an explicit handoff and failure boundary.",
              tags: [
                "command-tactics",
                "support-recovery",
                "away-team",
                "ship-support",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Command Line", "Split-Second Reposition"],
              validation: [
                "two willing allies",
                "declared sequence",
                "communication path",
                "timing",
              ],
            },
          ],
        },
      ],
    },
  ],
);

const dexterity = makeAttribute(
  "Dexterity",
  "Control of movement, stealth, and vehicles through timing and physical precision.",
  "Dexterity should make routes, infiltration, and piloting as decision-rich as direct combat.",
  [
    "Traverse -> Dexterity",
    "Mobility, Stealth, Security, Survival, and Vehicles preserved as lineage",
  ],
  "Covers personal traversal, concealed access, and piloting. Combat owns attacking; Wisdom owns noticing; Constitution owns enduring hazards.",
  [
    {
      name: "Mobility",
      definition:
        "Move through difficult spaces with speed, control, and route awareness.",
      checks: [
        "cross hazardous terrain",
        "reach an objective quickly",
        "control a fall",
        "maneuver in microgravity",
      ],
      boundaries: [
        "Field Defense owns protection while holding ground",
        "Endurance owns prolonged exertion",
        "Piloting owns vehicle-scale movement",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Mobility", "Survival", "EVA"],
      focuses: [
        {
          name: "Rapid Transit",
          fantasy:
            "A runner who reaches the point that matters before the window closes.",
          identity:
            "Short-burst speed, objective running, and movement efficiency.",
          uses: [
            "dash",
            "objective run",
            "crew extraction",
            "rapid reposition",
          ],
          boundary:
            "Sustained Exertion owns long-duration effort. Fighting Withdrawal owns defensive retreat.",
          abilities: [
            {
              name: "Quick Mover",
              type: "passive",
              effect:
                "Improve a valid movement action used to reach a declared objective or position.",
              tags: ["mobility-exploration", "away-team"],
              provenance: "prior-nexus-proposal",
              validation: [
                "movement available",
                "valid route",
                "declared destination",
                "scene geometry",
              ],
            },
            {
              name: "Momentum Reserve",
              type: "reaction",
              effect:
                "After a movement route is interrupted, preserve enough momentum to finish a shorter valid reposition.",
              tags: ["mobility-exploration", "defense-protection", "away-team"],
              validation: [
                "interrupted movement",
                "remaining valid route",
                "reaction available",
                "hazard state",
              ],
            },
            {
              name: "Impossible Route",
              type: "permission",
              effect:
                "Tier 2 seed: attempt a route normally unavailable because of timing or geometry, provided a plausible physical line exists.",
              tags: ["mobility-exploration", "away-team"],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Quick Mover", "Momentum Reserve"],
              validation: [
                "plausible route",
                "scene geometry",
                "movement available",
                "hazards",
              ],
            },
          ],
        },
        {
          name: "Terrain Movement",
          fantasy:
            "A climber and pathfinder who treats hostile terrain as a solvable surface.",
          identity:
            "Climbing, difficult terrain, controlled drops, and physical route choice.",
          uses: [
            "climb",
            "cross unstable ground",
            "descend",
            "lead a physical route",
          ],
          boundary:
            "Search and Tracking finds the route. Terrain Movement executes it.",
          abilities: [
            {
              name: "Power Traverse",
              type: "passive",
              effect:
                "Reduce the movement penalty or failure exposure of a valid climb or difficult-terrain crossing.",
              tags: ["mobility-exploration", "away-team"],
              provenance: "prior-nexus-proposal",
              validation: [
                "terrain feature",
                "movement route",
                "body or gear state",
                "hazard",
              ],
            },
            {
              name: "Soft Landing",
              type: "reaction",
              effect:
                "Turn a valid fall, drop, or hard descent into a more controlled arrival when a landing option exists.",
              tags: ["mobility-exploration", "defense-protection", "away-team"],
              validation: [
                "fall or descent",
                "landing surface",
                "reaction available",
                "body state",
              ],
            },
          ],
        },
        {
          name: "Zero-G Maneuvering",
          fantasy: "An EVA mover who thinks in vectors instead of floors.",
          identity:
            "Microgravity orientation, tether use, and controlled inertial movement.",
          uses: [
            "EVA movement",
            "tether recovery",
            "reorientation",
            "microgravity rescue",
          ],
          boundary:
            "Small Craft owns piloted vehicles. Hazard Adaptation owns environmental survival.",
          abilities: [
            {
              name: "Vector Tuck",
              type: "reaction",
              effect:
                "Adjust body orientation during microgravity movement to reduce collision or exposure at arrival.",
              tags: [
                "mobility-exploration",
                "defense-protection",
                "away-team",
                "ship-support",
              ],
              validation: [
                "microgravity",
                "reaction available",
                "trajectory",
                "body or suit state",
              ],
            },
            {
              name: "Tether Logic",
              type: "equipment-interaction",
              effect:
                "Use a valid tether or anchor point to redirect movement, secure an ally, or create a recoverable route.",
              tags: [
                "mobility-exploration",
                "support-recovery",
                "away-team",
                "ship-support",
              ],
              validation: [
                "tether or anchor",
                "range",
                "attachment point",
                "trajectory",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Infiltration",
      definition:
        "Enter, cross, or leave controlled spaces without creating the expected evidence or alarm.",
      checks: [
        "move quietly",
        "bypass a physical lock",
        "avoid surveillance",
        "erase a trail",
      ],
      boundaries: [
        "Computing owns software intrusion",
        "Perception owns detecting surveillance",
        "Deception owns social cover stories",
      ],
      origin: "broad",
      legacyTerms: ["Stealth", "Security", "Infiltration"],
      focuses: [
        {
          name: "Concealment",
          fantasy:
            "An infiltrator who controls noise, silhouette, heat, and timing.",
          identity: "Physical stealth and concealed positioning.",
          uses: [
            "quiet movement",
            "hide",
            "ambush position",
            "avoid visual detection",
          ],
          boundary:
            "Counter-Surveillance owns sensors and evidence. Deception owns being seen under a false premise.",
          abilities: [
            {
              name: "Quiet Approach",
              type: "passive",
              effect:
                "Improve stealth movement or positioning when speed and equipment state stay within a controlled profile.",
              tags: ["mobility-exploration", "away-team", "noncombat"],
              provenance: "prior-nexus-proposal",
              validation: [
                "movement speed",
                "noise state",
                "visibility",
                "equipment profile",
              ],
            },
            {
              name: "Thermal Patience",
              type: "stance",
              effect:
                "Hold a low-signature posture that reduces detection from heat or motion until you move or act aggressively.",
              tags: ["mobility-exploration", "away-team", "noncombat"],
              validation: [
                "concealment opportunity",
                "sensor type",
                "stance upkeep",
                "body or suit heat",
              ],
            },
          ],
        },
        {
          name: "Breachcraft",
          fantasy:
            "A quiet entry specialist who opens the boundary instead of destroying it.",
          identity: "Physical locks, access barriers, and controlled entry.",
          uses: [
            "pick or decode a lock",
            "open a sealed panel",
            "bypass an alarmed door",
            "prepare an entry",
          ],
          boundary:
            "Engineering owns structural repair. Computing owns networked credentials and software access.",
          abilities: [
            {
              name: "Silent Entry",
              type: "action",
              effect:
                "Open or bypass a valid physical barrier while minimizing noise, visible damage, or obvious alarm evidence.",
              tags: ["mobility-exploration", "away-team", "noncombat"],
              validation: [
                "physical barrier",
                "tool access",
                "time",
                "alarm state",
              ],
            },
            {
              name: "Lock Bypass",
              type: "equipment-interaction",
              effect:
                "Use a valid security tool to gain temporary access without rewriting the lock or taking system control.",
              tags: [
                "mobility-exploration",
                "computing-intrusion",
                "away-team",
                "noncombat",
              ],
              validation: [
                "security tool",
                "lock type",
                "access point",
                "time",
              ],
            },
          ],
        },
        {
          name: "Counter-Surveillance",
          fantasy:
            "A ghost who knows what the observer expects to see and leaves something else.",
          identity: "Sensor avoidance, evidence control, and route hygiene.",
          uses: [
            "cross a camera field",
            "avoid a patrol pattern",
            "scrub a trail",
            "spot a blind interval",
          ],
          boundary:
            "Electronic Warfare disrupts systems. Counter-Surveillance avoids or misdirects them without direct control.",
          abilities: [
            {
              name: "Dead Angle",
              type: "preparation",
              effect:
                "Identify and prepare a short route through a surveillance gap that remains valid until the observation pattern changes.",
              tags: [
                "mobility-exploration",
                "perception-cognition-resolve",
                "away-team",
                "noncombat",
              ],
              validation: [
                "observed surveillance pattern",
                "route",
                "timing",
                "sensor coverage",
              ],
            },
            {
              name: "Trail Scrub",
              type: "action",
              effect:
                "Remove or confuse one recent physical or routine sensor trace without erasing the entire scene.",
              tags: ["mobility-exploration", "away-team", "noncombat"],
              validation: [
                "recent trace",
                "tool or plausible method",
                "time",
                "observer capability",
              ],
            },
            {
              name: "Between Sensors",
              type: "permission",
              effect:
                "Tier 2 seed: move across two different observation systems by exploiting the handoff gap between them.",
              tags: [
                "mobility-exploration",
                "computing-intrusion",
                "away-team",
                "noncombat",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Dead Angle", "Trail Scrub"],
              validation: [
                "two observation systems",
                "handoff interval",
                "route",
                "timing",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Piloting",
      definition:
        "Control vehicles, small craft, and remote platforms through changing routes and system states.",
      checks: [
        "thread a hazardous route",
        "dock under pressure",
        "control a remote platform",
        "recover from loss of traction",
      ],
      boundaries: [
        "Engineering repairs the vehicle",
        "Computing owns software control",
        "Mobility owns personal movement",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Vehicles", "Drive Systems", "Drone Control"],
      focuses: [
        {
          name: "Surface Vehicles",
          fantasy: "A driver who finds a stable line through unstable ground.",
          identity:
            "Ground and surface vehicle control, traction, and hazard routing.",
          uses: [
            "drive",
            "recover a skid",
            "cross rough ground",
            "vehicle extraction",
          ],
          boundary: "Terrain Movement owns the same problem at personal scale.",
          abilities: [
            {
              name: "Drift Correction",
              type: "reaction",
              effect:
                "Recover a valid surface vehicle from a developing skid, slide, or traction loss before the route fully collapses.",
              tags: ["mobility-exploration", "away-team"],
              validation: [
                "surface vehicle",
                "control access",
                "reaction available",
                "traction state",
              ],
            },
            {
              name: "Hazard Line",
              type: "preparation",
              effect:
                "Choose a deliberate vehicle line through visible terrain hazards, trading speed, exposure, or system strain explicitly.",
              tags: ["mobility-exploration", "away-team", "noncombat"],
              validation: [
                "surface vehicle",
                "visible route",
                "hazards",
                "vehicle state",
              ],
            },
          ],
        },
        {
          name: "Small Craft",
          fantasy:
            "A pilot who treats burns, docking, and relative motion as one continuous problem.",
          identity:
            "Shuttles, cutters, landing craft, and close-range spaceflight.",
          uses: ["dock", "land", "pursue", "evade", "match vectors"],
          boundary:
            "Ship systems remain crew-scale operations. Zero-G Maneuvering owns unpiloted personal EVA.",
          abilities: [
            {
              name: "Burn Window",
              type: "preparation",
              effect:
                "Prepare a short acceleration or vector-change window so the craft can commit with a known risk boundary.",
              tags: ["mobility-exploration", "ship-support", "noncombat"],
              validation: [
                "small craft",
                "propulsion state",
                "trajectory",
                "crew readiness",
              ],
            },
            {
              name: "Docking Nerve",
              type: "passive",
              effect:
                "Improve close docking or landing control when space, time, or platform stability is constrained.",
              tags: ["mobility-exploration", "ship-support", "noncombat"],
              validation: [
                "small craft",
                "docking or landing target",
                "relative motion",
                "control access",
              ],
            },
            {
              name: "Crew-Coupled Maneuver",
              type: "action",
              effect:
                "Tier 2 seed: link pilot intent with one supporting crew station so both contribute to a single declared maneuver.",
              tags: ["mobility-exploration", "command-tactics", "ship-support"],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Burn Window", "Docking Nerve"],
              validation: [
                "small craft",
                "supporting crew station",
                "communication path",
                "declared maneuver",
              ],
            },
          ],
        },
        {
          name: "Remote Platforms",
          fantasy:
            "An operator who acts through machines without confusing remote reach with personal presence.",
          identity: "Drones, remote manipulators, and split attention.",
          uses: [
            "pilot a drone",
            "operate a remote arm",
            "scout a route",
            "perform distant tool work",
          ],
          boundary:
            "Computing owns intrusion into unowned systems. Engineering owns platform repair and modification.",
          abilities: [
            {
              name: "Proxy Hands",
              type: "equipment-interaction",
              effect:
                "Use a linked remote platform to perform a valid tool or interaction task at the platform's location.",
              tags: [
                "mobility-exploration",
                "engineering-fabrication",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "owned or authorized platform",
                "link quality",
                "tool fit",
                "remote scene state",
              ],
            },
            {
              name: "Multi-Feed Control",
              type: "stance",
              effect:
                "Maintain two compatible remote information feeds without losing basic control of the active platform.",
              tags: [
                "perception-cognition-resolve",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "two compatible feeds",
                "link quality",
                "attention",
                "platform state",
              ],
            },
            {
              name: "No Safe Angle",
              type: "permission",
              effect:
                "Tier 3 seed: reposition a linked platform and your own viewpoint as one coordinated observation problem.",
              tags: [
                "mobility-exploration",
                "perception-cognition-resolve",
                "away-team",
                "ship-support",
              ],
              tier: 3,
              maxRank: 1,
              prerequisites: ["Proxy Hands", "Multi-Feed Control"],
              validation: [
                "linked platform",
                "communication path",
                "two valid routes",
                "scene geometry",
              ],
            },
          ],
        },
      ],
    },
  ],
);

const intelligence = makeAttribute(
  "Intelligence",
  "Deliberate understanding and transformation of software, machines, and manufactured systems.",
  "Intelligence should let technical characters solve urgent problems, create new options, and support ship play without becoming a universal answer stat.",
  [
    "Systems -> Intelligence",
    "Computing, Engineering, Electronics, and Fabrication preserved as lineage",
  ],
  "Covers computation, repair, power systems, and making. Wisdom owns interpretation under uncertainty; Dexterity owns operating vehicles.",
  [
    {
      name: "Computing",
      definition:
        "Read, defend, disrupt, and alter software-controlled systems through authorized or hostile interfaces.",
      checks: [
        "intrude into a system",
        "trace a process",
        "defend a network",
        "disrupt a hostile signal",
      ],
      boundaries: [
        "Infiltration owns physical access",
        "Engineering owns hardware repair",
        "Networks owns social credentials and contacts",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Computing", "Cyberwarfare", "Electronics"],
      focuses: [
        {
          name: "Intrusion",
          fantasy:
            "A system intruder who turns one legitimate foothold into controlled access.",
          identity:
            "Offensive hacking, access escalation, and bounded system control.",
          uses: [
            "gain access",
            "read protected data",
            "alter a process",
            "open a digital route",
          ],
          boundary:
            "Electronic Warfare disrupts operation without control. Faction Access obtains legitimate pathways.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Clean Intrusion",
              type: "action",
              effect:
                "Perform a basic offensive hack while minimizing trace, noise, or collateral process disruption.",
              tags: [
                "computing-intrusion",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "interface or link",
                "target system",
                "access state",
                "trace pressure",
              ],
              rules: {
                stateSurfaces: [
                  "Firewall",
                  "access state",
                  "System Status",
                  "Trace",
                ],
                resultBands:
                  "Roll vs the target Firewall. Success creates one bounded access or process change; Partial succeeds with Trace or a reduced scope; Direct improves scope or keeps the action clean.",
              },
            },
            {
              name: "Privilege Step",
              type: "permission",
              effect:
                "Use an established foothold to request one narrowly higher permission without taking full system ownership.",
              tags: [
                "computing-intrusion",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "existing foothold",
                "target permission",
                "system state",
                "trace pressure",
              ],
            },
            {
              name: "Cascading Access",
              type: "permission",
              effect:
                "Tier 2 seed: carry one verified access path into a directly dependent subsystem while preserving a clear trace boundary.",
              tags: ["computing-intrusion", "ship-support", "noncombat"],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Clean Intrusion", "Privilege Step"],
              validation: [
                "verified access",
                "dependent subsystem",
                "trace pressure",
                "link state",
              ],
            },
          ],
        },
        {
          name: "Firewall",
          fantasy:
            "A defender who contains hostile code before it becomes trusted state.",
          identity:
            "System resistance, quarantine, and recovery from hostile access.",
          uses: [
            "resist a hack",
            "isolate a process",
            "verify integrity",
            "restore trusted operation",
          ],
          boundary:
            "Engineering repairs physical damage. Resolve resists cognitive or identity pressure.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Shielded Kernel",
              type: "passive",
              effect:
                "Improve resistance to a hostile hack or system effect that targets a protected local process.",
              tags: [
                "computing-intrusion",
                "defense-protection",
                "away-team",
                "ship-support",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "protected system",
                "hostile digital effect",
                "firewall state",
                "power",
              ],
              rules: {
                checkSurface:
                  "Lattice resistance against a hostile system action using the protected surface's Firewall.",
                resultBands:
                  "Once per qualifying hostile effect, add +2 TS from the Character lane to the resistance. A successful resistance prevents the stated System Status; it does not repair prior System Integrity damage.",
              },
            },
            {
              name: "Quarantine Thread",
              type: "reaction",
              effect:
                "Isolate one suspicious process or data channel before it can propagate into another trusted subsystem.",
              tags: [
                "computing-intrusion",
                "defense-protection",
                "ship-support",
              ],
              validation: [
                "reaction available",
                "suspicious process",
                "system boundary",
                "timing",
              ],
            },
          ],
        },
        {
          name: "Electronic Warfare",
          fantasy:
            "A signal operator who degrades an enemy's picture without pretending disruption is control.",
          identity:
            "Jamming, signal deception, and temporary systems interference.",
          uses: [
            "jam a link",
            "degrade sensors",
            "delay a command",
            "mask a transmission",
          ],
          boundary:
            "Intrusion takes system permissions. Electronic Warfare produces temporary interference only.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Signal Drag",
              type: "action",
              effect:
                "Temporarily degrade, delay, or scramble a valid system link without shutting down or taking ownership of it.",
              tags: [
                "computing-intrusion",
                "command-tactics",
                "away-team",
                "ship-support",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "signal path",
                "target system",
                "transmission power",
                "range",
              ],
              rules: {
                stateSurfaces: [
                  "Firewall",
                  "signal link state",
                  "System Status",
                  "targeting or sensor state",
                ],
                resultBands:
                  "Roll vs Firewall. Success applies a temporary Jammed or Degraded Link status; Partial applies it with a shorter duration or counter-trace; Direct improves duration or affected link scope.",
                guardrail:
                  "Jamming degrades, delays, or scrambles a tagged link. It never grants shutdown, data theft, permanent disable, or ownership.",
              },
            },
            {
              name: "Ghost Channel",
              type: "preparation",
              effect:
                "Prepare a low-confidence communications path that can carry one short exchange before it becomes easy to isolate.",
              tags: [
                "computing-intrusion",
                "mobility-exploration",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "communications equipment",
                "spectrum access",
                "range",
                "listener state",
              ],
            },
            {
              name: "Systems Sovereignty",
              type: "stance",
              effect:
                "Tier 3 seed: establish temporary crew authority over one owned system cluster against intrusion, jamming, and conflicting control.",
              tags: [
                "computing-intrusion",
                "defense-protection",
                "command-tactics",
                "ship-support",
              ],
              tier: 3,
              maxRank: 1,
              prerequisites: ["Signal Drag", "Ghost Channel"],
              validation: [
                "owned system cluster",
                "control access",
                "power",
                "crew authority",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Engineering",
      definition:
        "Diagnose and restore physical systems while respecting load, structure, and safety boundaries.",
      checks: [
        "repair a damaged system",
        "reroute power",
        "diagnose a failure",
        "stabilize a structure",
      ],
      boundaries: [
        "Fabrication creates or adapts parts",
        "Computing owns software state",
        "Cybernetic Care owns body-machine interfaces",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Engineering", "Electronics", "Field Repair"],
      focuses: [
        {
          name: "Field Repair",
          fantasy:
            "A crisis mechanic who gets one critical function back before ideal parts arrive.",
          identity:
            "Fast repair, component exchange, and temporary restoration.",
          uses: [
            "restore a device",
            "patch a vehicle",
            "repair under pressure",
            "replace a failed component",
          ],
          boundary:
            "Precision Manufacture creates exact parts. Field Repair restores immediate function.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Field Restore",
              type: "action",
              effect:
                "Restore one valid damaged function temporarily using available tools and compatible materials.",
              tags: [
                "engineering-fabrication",
                "support-recovery",
                "away-team",
                "ship-support",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "damaged system",
                "tool access",
                "compatible material",
                "time",
              ],
            },
            {
              name: "Hot Swap",
              type: "equipment-interaction",
              effect:
                "Exchange a compatible component while the larger system remains in a constrained operating state.",
              tags: [
                "engineering-fabrication",
                "support-recovery",
                "ship-support",
              ],
              validation: [
                "compatible component",
                "system access",
                "load state",
                "safety window",
              ],
            },
            {
              name: "Restore Under Load",
              type: "action",
              effect:
                "Tier 2 seed: repair a critical subsystem while it remains active, accepting one declared risk instead of shutting it down.",
              tags: [
                "engineering-fabrication",
                "support-recovery",
                "ship-support",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Field Restore", "Hot Swap"],
              validation: [
                "active subsystem",
                "declared risk",
                "tools",
                "crew coordination",
              ],
            },
          ],
        },
        {
          name: "Power and Systems",
          fantasy:
            "An operator who keeps the whole machine coherent when demand exceeds comfort.",
          identity: "Power routing, load management, and emergency bypass.",
          uses: [
            "reroute power",
            "shed load",
            "bring a reserve online",
            "isolate a failing subsystem",
          ],
          boundary:
            "Command sets priorities. Power and Systems executes the physical routing safely.",
          abilities: [
            {
              name: "Load Balance",
              type: "action",
              effect:
                "Redistribute available power or system load among valid subsystems without creating additional capacity.",
              tags: ["engineering-fabrication", "ship-support", "noncombat"],
              validation: [
                "system controls",
                "available capacity",
                "subsystem states",
                "priority order",
              ],
            },
            {
              name: "Emergency Bypass",
              type: "equipment-interaction",
              effect:
                "Create a temporary alternate connection around one failed component when the surrounding system can tolerate it.",
              tags: [
                "engineering-fabrication",
                "support-recovery",
                "away-team",
                "ship-support",
              ],
              validation: [
                "failed component",
                "alternate path",
                "tools",
                "load tolerance",
              ],
            },
          ],
        },
        {
          name: "Structural Diagnostics",
          fantasy:
            "A systems reader who finds the failure chain before the obvious symptom becomes catastrophe.",
          identity:
            "Failure mapping, stress analysis, and damage interpretation.",
          uses: [
            "locate a fault",
            "predict a break",
            "read structural stress",
            "prioritize repairs",
          ],
          boundary:
            "Perception notices the symptom. Structural Diagnostics explains the physical system behind it.",
          abilities: [
            {
              name: "Failure Map",
              type: "preparation",
              effect:
                "Build a local map of connected failures so the crew can identify which repair would restore the most function.",
              tags: [
                "engineering-fabrication",
                "perception-cognition-resolve",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "diagnostic access",
                "system data",
                "time",
                "physical access",
              ],
            },
            {
              name: "Stress Echo",
              type: "passive",
              effect:
                "Infer a hidden load or structural weakness from repeated vibration, heat, deformation, or performance drift.",
              tags: [
                "engineering-fabrication",
                "perception-cognition-resolve",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "observable symptoms",
                "relevant system knowledge",
                "time",
                "scene state",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Fabrication",
      definition:
        "Create, adapt, and integrate physical solutions from plans, tools, and available material.",
      checks: [
        "assemble a field tool",
        "adapt salvage",
        "manufacture a precise part",
        "prepare a modular kit",
      ],
      boundaries: [
        "Engineering restores existing systems",
        "Exchange acquires materials",
        "Equipment owns final item profiles",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Fabrication", "Salvage", "Field Refit"],
      focuses: [
        {
          name: "Field Assembly",
          fantasy:
            "A maker who converts a clear need into a temporary working object.",
          identity:
            "Rapid jigs, modular builds, and purpose-limited field tools.",
          uses: [
            "assemble a tool",
            "build a brace",
            "prepare a kit",
            "make a temporary fixture",
          ],
          boundary:
            "Field Repair fixes something that exists. Field Assembly creates a limited new object.",
          abilities: [
            {
              name: "Rapid Jig",
              type: "preparation",
              effect:
                "Assemble a temporary fixture that makes one declared repair, extraction, or handling task safer or repeatable.",
              tags: [
                "engineering-fabrication",
                "support-recovery",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: ["materials", "tools", "declared task", "time"],
            },
            {
              name: "Modular Build",
              type: "action",
              effect:
                "Combine compatible standard modules into a purpose-limited device with one clear function.",
              tags: [
                "engineering-fabrication",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "compatible modules",
                "tools",
                "declared function",
                "time",
              ],
            },
          ],
        },
        {
          name: "Salvage Integration",
          fantasy:
            "A scavenger-engineer who sees compatibility hiding inside wreckage.",
          identity: "Reuse, adaptation, and foreign-component integration.",
          uses: [
            "recover a component",
            "adapt foreign hardware",
            "bridge incompatible fittings",
            "extend scarce supplies",
          ],
          boundary:
            "Faction Access interprets ownership and provenance. Salvage Integration handles physical compatibility.",
          abilities: [
            {
              name: "Useful Ruin",
              type: "permission",
              effect:
                "Recover one functional component or material property from a damaged object without treating the whole object as intact.",
              tags: ["engineering-fabrication", "away-team", "noncombat"],
              validation: [
                "damaged object",
                "time",
                "tools",
                "recoverable component",
              ],
            },
            {
              name: "Foreign Interface",
              type: "equipment-interaction",
              effect:
                "Create a reversible adapter between two physically incompatible systems without claiming full long-term reliability.",
              tags: [
                "engineering-fabrication",
                "computing-intrusion",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "two systems",
                "adapter materials",
                "power and signal bounds",
                "tools",
              ],
            },
          ],
        },
        {
          name: "Precision Manufacture",
          fantasy:
            "A fabricator who turns measured tolerances into trustworthy parts.",
          identity:
            "Exact components, controlled process, and repeatable production.",
          uses: [
            "manufacture a replacement",
            "calibrate a part",
            "produce a small run",
            "verify material tolerances",
          ],
          boundary:
            "Field Assembly favors speed and temporary utility. Precision Manufacture favors fit and repeatability.",
          abilities: [
            {
              name: "Clean Tolerance",
              type: "passive",
              effect:
                "Improve the reliability of a manufactured replacement when measurements, material, and process stay within a verified plan.",
              tags: ["engineering-fabrication", "ship-support", "noncombat"],
              validation: [
                "verified plan",
                "material",
                "fabrication equipment",
                "measurement data",
              ],
            },
            {
              name: "Microforge Plan",
              type: "preparation",
              effect:
                "Translate a validated component need into a fabrication-ready plan that another qualified station can execute.",
              tags: ["engineering-fabrication", "ship-support", "noncombat"],
              validation: [
                "component specification",
                "fabricator capability",
                "material profile",
                "design time",
              ],
            },
            {
              name: "Adaptive Toolchain",
              type: "permission",
              effect:
                "Tier 2 seed: reconfigure one fabrication workflow to accept a constrained substitute material or machine process.",
              tags: ["engineering-fabrication", "ship-support", "noncombat"],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Clean Tolerance", "Microforge Plan"],
              validation: [
                "fabrication workflow",
                "substitute material",
                "machine capability",
                "declared tradeoff",
              ],
            },
          ],
        },
      ],
    },
  ],
);

const constitution = makeAttribute(
  "Constitution",
  "Sustained viability of bodies, patients, and body-machine systems under hostile conditions.",
  "Constitution should make endurance and care active play paths, while keeping body modification powerful, legible, and costly enough to create choices.",
  [
    "Vital -> Constitution",
    "Medicine, Biotechnology, Cybernetics, and Adaptation preserved as lineage",
  ],
  "Covers endurance, medicine, biotechnology, and cybernetic care. Combat owns preventing harm; Wisdom owns psychological continuity.",
  [
    {
      name: "Endurance",
      definition:
        "Remain functional through environmental, physical, and workload pressure without confusing resilience with immunity.",
      checks: [
        "endure a hazard",
        "continue under strain",
        "resist physical shock",
        "pace a long operation",
      ],
      boundaries: [
        "Field Defense prevents or redirects harm",
        "Medicine treats injury",
        "Resolve manages stress and identity pressure",
      ],
      origin: "newly-proposed",
      legacyTerms: ["Adaptation", "Survival", "Vital"],
      focuses: [
        {
          name: "Hazard Adaptation",
          fantasy:
            "A field survivor who learns the environment's rhythm before it breaks the body.",
          identity:
            "Environmental acclimation, suit discipline, and exposure management.",
          uses: [
            "endure heat or cold",
            "work in contamination",
            "manage suit limits",
            "adapt to gravity",
          ],
          boundary:
            "Engineering maintains life-support systems. Hazard Adaptation manages the body's use of them.",
          abilities: [
            {
              name: "Environmental Acclimation",
              type: "preparation",
              effect:
                "Prepare the body and routine for one known environmental pressure, reducing exposure risk while conditions remain comparable.",
              tags: [
                "support-recovery",
                "mobility-exploration",
                "away-team",
                "noncombat",
              ],
              validation: [
                "known hazard",
                "preparation time",
                "body state",
                "protective equipment",
              ],
            },
            {
              name: "Seal Discipline",
              type: "passive",
              effect:
                "Improve the safe use of sealed gear, air reserves, and contamination procedures during extended field work.",
              tags: [
                "support-recovery",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "sealed equipment",
                "resource state",
                "environment",
                "duration",
              ],
            },
            {
              name: "Hostile World Routine",
              type: "stance",
              effect:
                "Tier 2 seed: establish a repeatable crew routine that reduces accumulated exposure during one declared operation.",
              tags: [
                "support-recovery",
                "command-tactics",
                "away-team",
                "noncombat",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Environmental Acclimation", "Seal Discipline"],
              validation: [
                "known hazard",
                "crew participation",
                "procedure",
                "duration",
              ],
            },
          ],
        },
        {
          name: "Trauma Resistance",
          fantasy:
            "A survivor who keeps one useful choice available after the body is shocked.",
          identity:
            "Immediate physical shock, pain management, and function under injury.",
          uses: [
            "stay conscious",
            "act while injured",
            "resist shock",
            "control pain",
          ],
          boundary:
            "Medicine restores or stabilizes damage. Trauma Resistance preserves temporary function only.",
          abilities: [
            {
              name: "Stay Functional",
              type: "reaction",
              effect:
                "When physical trauma would immediately remove all useful action, preserve one constrained response before the consequence settles.",
              tags: ["support-recovery", "defense-protection", "away-team"],
              validation: [
                "incoming trauma",
                "reaction available",
                "body state",
                "consequence timing",
              ],
            },
            {
              name: "Pain Partition",
              type: "stance",
              effect:
                "Temporarily isolate pain-driven interference from one declared task while tracking the unresolved bodily cost.",
              tags: ["support-recovery", "away-team", "noncombat"],
              validation: [
                "pain condition",
                "declared task",
                "stance upkeep",
                "body state",
              ],
            },
          ],
        },
        {
          name: "Sustained Exertion",
          fantasy:
            "A crew member who can keep useful pace through the long middle of an operation.",
          identity:
            "Pacing, workload, fatigue management, and repeated effort.",
          uses: [
            "carry a workload",
            "march or climb for hours",
            "hold a shift",
            "pace repeated physical tasks",
          ],
          boundary:
            "Rapid Transit owns bursts of speed. Resolve owns mental persistence under meaning or fear pressure.",
          abilities: [
            {
              name: "Second Wind",
              type: "action",
              effect:
                "Recover a limited amount of short-term exertion capacity by pausing, breathing, and resetting pace when the scene permits.",
              tags: ["support-recovery", "away-team", "noncombat"],
              validation: [
                "short pause",
                "fatigue state",
                "safe enough scene",
                "body state",
              ],
            },
            {
              name: "Work Rhythm",
              type: "passive",
              effect:
                "Reduce accumulated strain from repeating one familiar physical task under stable conditions.",
              tags: [
                "support-recovery",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "repeated task",
                "stable conditions",
                "duration",
                "body state",
              ],
            },
            {
              name: "Remain Viable",
              type: "passive",
              effect:
                "Tier 3 seed: when exposure, fatigue, and injury converge, keep one declared survival function operating until immediate safety is reached.",
              tags: [
                "support-recovery",
                "identity-body-signal-first-contact",
                "away-team",
              ],
              tier: 3,
              maxRank: 1,
              prerequisites: ["Second Wind", "Work Rhythm"],
              validation: [
                "combined pressures",
                "declared survival function",
                "body state",
                "route to safety",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Medicine",
      definition:
        "Assess, stabilize, and support recovery of living patients within the limits of available care.",
      checks: [
        "triage an injury",
        "stabilize a patient",
        "diagnose a condition",
        "manage recovery",
      ],
      boundaries: [
        "Biotechnology changes biological tools or processes",
        "Cybernetic Care treats interfaces and implants",
        "Endurance belongs to the patient",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Medicine", "Field Medicine", "Combat Triage"],
      focuses: [
        {
          name: "Combat Triage",
          fantasy:
            "A field medic who finds the one intervention that matters in the next minute.",
          identity:
            "Fast assessment, immediate treatment, and condition control under pressure.",
          uses: [
            "assess casualties",
            "apply a fast patch",
            "control bleeding",
            "choose treatment priority",
          ],
          boundary:
            "Stabilization owns preventing collapse after triage. Field Recovery owns longer care.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Fast Patch",
              type: "action",
              effect:
                "Spend 1 AP on a touch treatment that controls one immediate injury consequence or restores limited function.",
              tags: [
                "medicine-biotech-cybernetics",
                "support-recovery",
                "away-team",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "patient in reach",
                "medical tool or supply",
                "1 AP available",
                "condition",
              ],
              rules: {
                actionEconomy:
                  "1 AP touch treatment during Tactical Pressure; it is not a free micro-interaction.",
                resultBands:
                  "Roll only when treatment quality, speed, complication, or a status-clear attempt is meaningful. Success controls one stated Standard Status or restores the declared limited function; Partial works with a cost or reduced duration.",
              },
            },
            {
              name: "Condition Read",
              type: "permission",
              effect:
                "Ask one actionable triage question about a visible patient's immediate risks before committing treatment.",
              tags: [
                "medicine-biotech-cybernetics",
                "perception-cognition-resolve",
                "away-team",
                "noncombat",
              ],
              validation: [
                "patient access",
                "observable condition",
                "time",
                "medical context",
              ],
            },
          ],
        },
        {
          name: "Stabilization",
          fantasy:
            "A responder who keeps the patient from crossing the irreversible line.",
          identity:
            "Downed-state control, safe movement, and short-term life support.",
          uses: [
            "stabilize",
            "prepare transport",
            "maintain airway",
            "prevent deterioration",
          ],
          boundary:
            "Combat Triage acts fast on the immediate problem. Stabilization preserves the patient across time and movement.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Keep Them Breathing",
              type: "action",
              effect:
                "Improve stabilization quality for a patient at immediate risk of deterioration or death.",
              tags: [
                "medicine-biotech-cybernetics",
                "support-recovery",
                "away-team",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "patient at risk",
                "medical access",
                "time",
                "care supplies",
              ],
              rules: {
                checkSurface:
                  "No roll for basic stabilization when the helper has patient access, time, and a broad medical tool. Use Lattice Medicine vs Injury Severity only for quality, speed, complication, or a special hazard.",
                resultBands:
                  "Basic stabilization pauses the Downed/Disabled countdown. A successful quality check improves the recovery window or transport safety; it does not revive the patient or erase persistent consequences.",
              },
            },
            {
              name: "Safe Transfer",
              type: "preparation",
              effect:
                "Prepare a stabilized patient for movement so the declared transport route is less likely to worsen the condition.",
              tags: [
                "medicine-biotech-cybernetics",
                "support-recovery",
                "mobility-exploration",
                "away-team",
              ],
              validation: [
                "stabilized patient",
                "transport method",
                "route",
                "medical support",
              ],
            },
            {
              name: "Golden Minute",
              type: "reaction",
              effect:
                "Tier 2 seed: interrupt immediate deterioration with one rapid procedure before normal treatment timing resumes.",
              tags: [
                "medicine-biotech-cybernetics",
                "support-recovery",
                "away-team",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Keep Them Breathing", "Safe Transfer"],
              validation: [
                "reaction available",
                "immediate deterioration",
                "patient access",
                "medical supply",
              ],
            },
          ],
        },
        {
          name: "Field Recovery",
          fantasy:
            "A clinician who turns limited safety into the best possible recovery window.",
          identity: "Recovery planning, rest quality, and post-crisis care.",
          uses: [
            "plan recovery",
            "monitor healing",
            "manage limited supplies",
            "return a patient to duty",
          ],
          boundary:
            "Sustained Exertion manages active workload. Field Recovery uses downtime and care resources.",
          abilities: [
            {
              name: "Recovery Plan",
              type: "preparation",
              effect:
                "Create a patient-specific recovery sequence that names the needed rest, supplies, monitoring, and stop conditions.",
              tags: [
                "medicine-biotech-cybernetics",
                "support-recovery",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "patient assessment",
                "available supplies",
                "safe location",
                "time",
              ],
            },
            {
              name: "Controlled Rest",
              type: "passive",
              effect:
                "Improve the benefit of a valid rest period by managing pain, monitoring, hydration, and interruption boundaries.",
              tags: [
                "medicine-biotech-cybernetics",
                "support-recovery",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "rest period",
                "care environment",
                "medical supplies",
                "patient state",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Biointegration",
      definition:
        "Maintain or deliberately alter the boundary between living bodies, engineered biology, and installed machinery.",
      checks: [
        "care for an implant",
        "apply a biological countermeasure",
        "manage a body modification",
        "interpret an interface rejection",
      ],
      boundaries: [
        "Medicine owns general patient care",
        "Engineering owns nonliving machinery",
        "Resolve owns subjective identity continuity",
      ],
      origin: "broad",
      legacyTerms: ["Biotechnology", "Cybernetics", "Adaptation"],
      focuses: [
        {
          name: "Adaptive Biotech",
          fantasy:
            "A biosystems specialist who uses living processes as precise tools.",
          identity:
            "Engineered cultures, biological countermeasures, and organic systems handling.",
          uses: [
            "prepare a culture",
            "neutralize a biological hazard",
            "support an organic tool",
            "analyze a living system",
          ],
          boundary:
            "Medicine treats a patient. Biotechnology manipulates a biological process or tool.",
          abilities: [
            {
              name: "Adaptive Culture",
              type: "preparation",
              effect:
                "Prepare a living culture for one declared detection, processing, or remediation task under controlled conditions.",
              tags: [
                "medicine-biotech-cybernetics",
                "engineering-fabrication",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "biological sample",
                "culture equipment",
                "time",
                "containment",
              ],
            },
            {
              name: "Living Countermeasure",
              type: "equipment-interaction",
              effect:
                "Deploy a prepared biological agent to oppose one compatible toxin, contaminant, or hostile organism process.",
              tags: [
                "medicine-biotech-cybernetics",
                "support-recovery",
                "away-team",
                "ship-support",
              ],
              validation: [
                "prepared agent",
                "compatible hazard",
                "delivery method",
                "containment",
              ],
            },
          ],
        },
        {
          name: "Cybernetic Care",
          fantasy:
            "An interface medic who treats the place where body and machine disagree.",
          identity:
            "Implant diagnostics, body-machine repair, and interface stabilization.",
          uses: [
            "repair an implant",
            "clear interface noise",
            "manage rejection",
            "restore body-machine function",
          ],
          boundary:
            "Engineering repairs the device alone. Cybernetic Care treats the coupled person-system.",
          provenance: "prior-nexus-proposal",
          abilities: [
            {
              name: "Sleeve Tech",
              type: "action",
              effect:
                "Restore or stabilize one body-machine function when both the implant and patient are accessible.",
              tags: [
                "medicine-biotech-cybernetics",
                "support-recovery",
                "away-team",
                "ship-support",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "patient access",
                "implant access",
                "interface tool",
                "body state",
              ],
              rules: {
                stateSurfaces: [
                  "System Integrity",
                  "cybernetic System Status",
                  "Health",
                  "Firewall",
                ],
                resultBands:
                  "Success restores the declared body-machine function or clears one stated cybernetic Standard Status. If the fault is hostile, Firewall validation still applies before treatment can take control of the surface.",
              },
            },
            {
              name: "Interface Flush",
              type: "reaction",
              effect:
                "Interrupt a harmful feedback, desynchronization, or control loop before it propagates through the coupled system.",
              tags: [
                "medicine-biotech-cybernetics",
                "defense-protection",
                "identity-body-signal-first-contact",
                "away-team",
              ],
              validation: [
                "reaction available",
                "active interface fault",
                "patient access",
                "implant state",
              ],
              rules: {
                resultBands:
                  "On a valid trigger, spend the reaction to prevent one propagating cybernetic Standard Status or contain it to the current implant. It cannot reverse System Integrity damage already committed.",
              },
            },
          ],
        },
        {
          name: "Body Modulation",
          fantasy:
            "A transhuman operator who changes function deliberately without treating the body as cost-free hardware.",
          identity:
            "Temporary metabolic, sensory, and performance shifts with explicit recovery costs.",
          uses: [
            "shift metabolism",
            "tune a sense",
            "overclock an implant",
            "adapt body function",
          ],
          boundary:
            "Endurance manages ordinary bodily effort. Body Modulation intentionally changes the operating state.",
          abilities: [
            {
              name: "Metabolic Shift",
              type: "stance",
              effect:
                "Temporarily prioritize one bodily demand such as wakefulness, cold response, oxygen use, or recovery while accepting a declared after-cost.",
              tags: [
                "medicine-biotech-cybernetics",
                "identity-body-signal-first-contact",
                "away-team",
                "noncombat",
              ],
              validation: [
                "body state",
                "selected demand",
                "after-cost",
                "duration",
              ],
              rules: {
                stateSurfaces: [
                  "Hazard tolerance",
                  "Standard Status",
                  "Health recovery",
                  "declared after-cost",
                ],
                resultBands:
                  "While active, convert one named environmental or bodily pressure into the declared after-cost. At expiry, commit that cost as a stated status, recovery need, or resource consequence.",
              },
            },
            {
              name: "Controlled Overclock",
              type: "stance",
              effect:
                "Push one compatible implant or augmented body function beyond its normal safe profile for a short declared window.",
              tags: [
                "medicine-biotech-cybernetics",
                "identity-body-signal-first-contact",
                "away-team",
              ],
              validation: [
                "compatible augmentation",
                "declared function",
                "heat or strain",
                "duration",
              ],
            },
            {
              name: "Symbiotic Interface",
              type: "permission",
              effect:
                "Tier 2 seed: allow a compatible biological and cybernetic system to share one bounded sensing or regulation function.",
              tags: [
                "medicine-biotech-cybernetics",
                "identity-body-signal-first-contact",
                "ship-support",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Metabolic Shift", "Controlled Overclock"],
              validation: [
                "compatible systems",
                "interface state",
                "body consent",
                "duration",
              ],
            },
          ],
        },
      ],
    },
  ],
);

const wisdom = makeAttribute(
  "Wisdom",
  "Sound judgment under uncertainty, including perception, interpretation, stress, identity, and contact with the unknown.",
  "Wisdom should reward careful observation and stable judgment without becoming a vague catch-all for every clue or resistance check.",
  [
    "Insight -> Wisdom",
    "Cognition, Perception, Willpower, Resolve, and continuity-adjacent effects preserved as lineage",
  ],
  "Covers observation, analysis under uncertainty, resolve, identity continuity, and first-contact grounding. Intelligence owns formal systems work.",
  [
    {
      name: "Perception",
      definition:
        "Notice relevant signals, threats, traces, and environmental changes before interpretation becomes certainty.",
      checks: [
        "spot a hidden threat",
        "read sensor noise",
        "track a route",
        "notice a change in behavior",
      ],
      boundaries: [
        "Cognition explains patterns",
        "Target Calling distributes tactical information",
        "Empathy interprets another person's emotional state",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Perception", "Surveillance", "Tracking"],
      focuses: [
        {
          name: "Threat Awareness",
          fantasy:
            "A watchkeeper who notices the attack forming before the first obvious move.",
          identity: "Pre-contact cues, ambush awareness, and defensive watch.",
          uses: [
            "detect an ambush",
            "notice hostile intent",
            "maintain watch",
            "identify immediate danger",
          ],
          boundary:
            "Target Calling turns a noticed threat into crew-ready information. Threat Awareness notices it first.",
          abilities: [
            {
              name: "Pre-Contact Read",
              type: "reaction",
              effect:
                "When a scene shifts toward immediate danger, ask for one observable cue before choosing the first response.",
              tags: [
                "perception-cognition-resolve",
                "defense-protection",
                "away-team",
                "noncombat",
              ],
              validation: [
                "observable cue",
                "scene transition",
                "reaction available",
                "attention",
              ],
            },
            {
              name: "Watchful Rest",
              type: "stance",
              effect:
                "Maintain a reduced but meaningful watch during a valid rest period without treating the character as fully active.",
              tags: [
                "perception-cognition-resolve",
                "defense-protection",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "rest period",
                "declared watch area",
                "attention",
                "fatigue",
              ],
            },
          ],
        },
        {
          name: "Sensor Interpretation",
          fantasy:
            "A sensor reader who knows when a clean display is lying by omission.",
          identity:
            "Cross-sensor comparison, noise analysis, and uncertain detection.",
          uses: [
            "compare sensors",
            "separate signal from noise",
            "read partial contacts",
            "detect spoofing",
          ],
          boundary:
            "Computing changes sensor software. Sensor Interpretation reasons from the output available.",
          abilities: [
            {
              name: "Cross-Sensor Picture",
              type: "preparation",
              effect:
                "Combine two compatible observation sources into one bounded picture that preserves their uncertainty and disagreement.",
              tags: [
                "perception-cognition-resolve",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "two observation sources",
                "time",
                "data quality",
                "compatible reference frame",
              ],
            },
            {
              name: "Noise Floor",
              type: "passive",
              effect:
                "Recognize when a weak signal is meaningful because the background noise has changed rather than because the signal is strong.",
              tags: [
                "perception-cognition-resolve",
                "identity-body-signal-first-contact",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "sensor data",
                "baseline context",
                "attention",
                "signal conditions",
              ],
            },
            {
              name: "Distributed Watch",
              type: "stance",
              effect:
                "Tier 2 seed: maintain a coherent watch picture from multiple crew stations without flattening conflicting reports.",
              tags: [
                "perception-cognition-resolve",
                "command-tactics",
                "ship-support",
                "noncombat",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Cross-Sensor Picture", "Noise Floor"],
              validation: [
                "multiple stations",
                "communication path",
                "attention",
                "shared reference frame",
              ],
            },
          ],
        },
        {
          name: "Search and Tracking",
          fantasy:
            "An investigator who keeps continuity across broken scenes and interrupted trails.",
          identity: "Physical search, trace continuity, and route evidence.",
          uses: [
            "search a scene",
            "follow a trail",
            "reconstruct movement",
            "identify a route change",
          ],
          boundary:
            "Counter-Surveillance removes or confuses a trace. Search and Tracking recovers the remaining continuity.",
          abilities: [
            {
              name: "Trace Continuity",
              type: "passive",
              effect:
                "Preserve one meaningful connection between separated pieces of physical or sensor evidence when the trail is interrupted.",
              tags: [
                "perception-cognition-resolve",
                "mobility-exploration",
                "away-team",
                "noncombat",
              ],
              validation: [
                "related evidence",
                "scene access",
                "time",
                "environmental change",
              ],
            },
            {
              name: "Route Sign",
              type: "permission",
              effect:
                "Ask one concrete question about how a subject entered, crossed, or left a searched space.",
              tags: [
                "perception-cognition-resolve",
                "mobility-exploration",
                "away-team",
                "noncombat",
              ],
              validation: [
                "searched space",
                "available traces",
                "time",
                "subject context",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Cognition",
      definition:
        "Build useful models from evidence, memory, and competing explanations while keeping uncertainty visible.",
      checks: [
        "analyze a failure",
        "recall a dossier",
        "connect anomalies",
        "compare explanations",
      ],
      boundaries: [
        "Intelligence owns formal technical execution",
        "Perception gathers observations",
        "Faction Access owns live social pathways",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Cognition", "Faction Lore", "Culture"],
      focuses: [
        {
          name: "Analysis",
          fantasy:
            "An analyst who turns incomplete evidence into the next useful test.",
          identity: "Hypotheses, operational models, and explicit uncertainty.",
          uses: [
            "form a hypothesis",
            "identify a test",
            "compare explanations",
            "find a missing variable",
          ],
          boundary:
            "Pattern Synthesis connects multiple domains. Analysis works one bounded problem deeply.",
          abilities: [
            {
              name: "Failure Hypothesis",
              type: "preparation",
              effect:
                "Name one plausible cause for an observed failure and the next observation that would support or weaken it.",
              tags: [
                "perception-cognition-resolve",
                "engineering-fabrication",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "observed failure",
                "available evidence",
                "time",
                "testable next step",
              ],
            },
            {
              name: "Operational Model",
              type: "permission",
              effect:
                "Create a simplified model of one active situation so the crew can reason about a declared variable or tradeoff.",
              tags: [
                "perception-cognition-resolve",
                "command-tactics",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "bounded situation",
                "available evidence",
                "declared variable",
                "communication path",
              ],
            },
          ],
        },
        {
          name: "Recall and Dossiers",
          fantasy:
            "A prepared specialist whose stored context makes unfamiliar details actionable.",
          identity: "Faction, equipment, cultural, and procedural recall.",
          uses: [
            "recall a faction norm",
            "recognize equipment",
            "remember a protocol",
            "place a cultural cue",
          ],
          boundary:
            "Networks gains current access. Recall and Dossiers provides contextual knowledge that may be stale.",
          abilities: [
            {
              name: "Faction Recall",
              type: "permission",
              effect:
                "Ask one sourced question about a known faction's procedures, incentives, or visible signatures.",
              tags: [
                "perception-cognition-resolve",
                "rapport-deception-pressure-networks-exchange",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "known faction",
                "relevant dossier",
                "observable context",
                "source currency",
              ],
            },
            {
              name: "Equipment Recognition",
              type: "passive",
              effect:
                "Identify the likely class, purpose, or operating assumptions of visible equipment without claiming hidden specifications.",
              tags: [
                "perception-cognition-resolve",
                "engineering-fabrication",
                "away-team",
                "noncombat",
              ],
              validation: [
                "visible equipment",
                "relevant knowledge",
                "time",
                "condition",
              ],
            },
          ],
        },
        {
          name: "Pattern Synthesis",
          fantasy:
            "A synthesist who notices when separate anomalies are one system viewed from different angles.",
          identity:
            "Cross-domain patterns, predictive branches, and anomaly chains.",
          uses: [
            "connect clues",
            "forecast a branch",
            "identify a shared cause",
            "spot a systemic pattern",
          ],
          boundary:
            "Analysis stays bounded and testable. Pattern Synthesis ranges wider but must preserve uncertainty.",
          abilities: [
            {
              name: "Anomaly Chain",
              type: "preparation",
              effect:
                "Link two or more verified anomalies into one candidate chain while naming the weakest connection explicitly.",
              tags: [
                "perception-cognition-resolve",
                "identity-body-signal-first-contact",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "verified anomalies",
                "available context",
                "time",
                "uncertainty record",
              ],
            },
            {
              name: "Predictive Branch",
              type: "permission",
              effect:
                "State two plausible near-term branches from the current evidence and name what would distinguish them.",
              tags: [
                "perception-cognition-resolve",
                "command-tactics",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "current evidence",
                "bounded horizon",
                "distinguishing signal",
                "uncertainty",
              ],
            },
            {
              name: "Counterfactual Map",
              type: "preparation",
              effect:
                "Tier 2 seed: compare the active model with one explicit alternative and expose which decision changes under each.",
              tags: [
                "perception-cognition-resolve",
                "command-tactics",
                "noncombat",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Anomaly Chain", "Predictive Branch"],
              validation: [
                "active model",
                "alternative model",
                "decision point",
                "evidence",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Resolve",
      definition:
        "Maintain agency, continuity, and chosen priorities under stress, coercion, identity disruption, and first-contact uncertainty.",
      checks: [
        "resist panic",
        "hold a chosen priority",
        "verify identity continuity",
        "remain grounded during contact",
      ],
      boundaries: [
        "Endurance owns physical strain",
        "Firewall owns digital intrusion",
        "Rapport supports others emotionally",
      ],
      origin: "legacy-derived",
      legacyTerms: ["Willpower", "Resolve", "Identity", "Signal"],
      focuses: [
        {
          name: "Stress Control",
          fantasy:
            "A steady operator who can acknowledge pressure without letting it choose the next action.",
          identity:
            "Panic control, compartmentalization, and immediate emotional regulation.",
          uses: [
            "resist panic",
            "act under fear",
            "defer distraction",
            "recover composure",
          ],
          boundary:
            "Morale supports the group. Stress Control governs the character's own immediate state.",
          abilities: [
            {
              name: "Steady Pulse",
              type: "reaction",
              effect:
                "When stress would force an immediate uncontrolled response, preserve one deliberate constrained choice.",
              tags: [
                "perception-cognition-resolve",
                "identity-body-signal-first-contact",
                "away-team",
                "ship-support",
              ],
              validation: [
                "reaction available",
                "acute stress",
                "chosen response",
                "scene state",
              ],
            },
            {
              name: "Compartmentalize",
              type: "stance",
              effect:
                "Temporarily set aside one distracting pressure while tracking that it must return during later recovery or reflection.",
              tags: [
                "perception-cognition-resolve",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "identified pressure",
                "declared task",
                "stance upkeep",
                "later recovery",
              ],
            },
          ],
        },
        {
          name: "Identity Continuity",
          fantasy:
            "A transhuman self who can tell the difference between change, coercion, and loss of authorship.",
          identity:
            "Memory checks, self-authorship, and continuity across altered body or cognition.",
          uses: [
            "verify a memory",
            "resist identity overwrite",
            "integrate a body change",
            "name a chosen self",
          ],
          boundary:
            "Biointegration manages body-machine function. Identity Continuity manages subjective authorship and memory trust.",
          abilities: [
            {
              name: "Self-Anchor",
              type: "preparation",
              effect:
                "Define a personal continuity anchor that can later help test whether a memory, priority, or identity claim remains self-authored.",
              tags: [
                "identity-body-signal-first-contact",
                "perception-cognition-resolve",
                "noncombat",
              ],
              validation: [
                "chosen anchor",
                "private or trusted record",
                "consent",
                "later comparison",
              ],
            },
            {
              name: "Memory Checksum",
              type: "permission",
              effect:
                "Compare a contested memory against one independent anchor or trusted witness without proving every detail true.",
              tags: [
                "identity-body-signal-first-contact",
                "perception-cognition-resolve",
                "noncombat",
              ],
              validation: [
                "contested memory",
                "independent anchor",
                "trusted access",
                "time",
              ],
            },
          ],
        },
        {
          name: "First-Contact Grounding",
          fantasy:
            "A contact specialist who stays curious without pretending the unknown is harmless or already understood.",
          identity:
            "Unknown-agency protocol, meaning hazards, and safe epistemic restraint.",
          uses: [
            "approach an unknown intelligence",
            "contain a meaning hazard",
            "separate observation from interpretation",
            "maintain consent boundaries",
          ],
          boundary:
            "Rapport handles recognizable social exchange. First-Contact Grounding begins before shared assumptions exist.",
          abilities: [
            {
              name: "Unknown Protocol",
              type: "preparation",
              effect:
                "Establish observation, consent, retreat, and contamination boundaries before engaging an unknown intelligence or agency.",
              tags: [
                "identity-body-signal-first-contact",
                "perception-cognition-resolve",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "unknown agency",
                "crew agreement",
                "retreat route",
                "containment boundary",
              ],
            },
            {
              name: "Meaning Quarantine",
              type: "reaction",
              effect:
                "Pause the spread of one destabilizing interpretation until the crew can separate observed fact from inferred meaning.",
              tags: [
                "identity-body-signal-first-contact",
                "defense-protection",
                "perception-cognition-resolve",
                "away-team",
                "ship-support",
              ],
              validation: [
                "destabilizing interpretation",
                "communication path",
                "reaction available",
                "crew state",
              ],
            },
            {
              name: "Continuity Under Contact",
              type: "stance",
              effect:
                "Tier 2 seed: maintain a shared crew record of observations, interpretations, and identity checks throughout one contact sequence.",
              tags: [
                "identity-body-signal-first-contact",
                "command-tactics",
                "perception-cognition-resolve",
                "ship-support",
                "noncombat",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Unknown Protocol", "Meaning Quarantine"],
              validation: [
                "contact sequence",
                "crew record",
                "communication path",
                "identity checks",
              ],
            },
            {
              name: "Witness Without Surrender",
              type: "permission",
              effect:
                "Tier 3 seed: remain open to a genuinely alien model while preserving a chosen boundary that the contact cannot define for you.",
              tags: [
                "identity-body-signal-first-contact",
                "perception-cognition-resolve",
                "noncombat",
              ],
              tier: 3,
              maxRank: 1,
              prerequisites: ["Unknown Protocol", "Meaning Quarantine"],
              validation: [
                "active contact",
                "chosen boundary",
                "self-anchor",
                "consent",
              ],
            },
          ],
        },
      ],
    },
  ],
);

const charisma = makeAttribute(
  "Charisma",
  "The ability to create alignment, pressure, cover, and exchange among people and institutions.",
  "Charisma should create consequential noncombat options, crew cohesion, and network play without replacing evidence, consent, or material leverage.",
  [
    "Network -> Charisma",
    "Diplomacy, Deception, Coercion, Empathy, Performance, Streetwise, Culture, Faction Lore, and Commerce preserved as lineage",
  ],
  "Covers rapport, influence, informal networks, and exchange. Wisdom reads; Charisma changes the social situation.",
  [
    {
      name: "Rapport",
      definition:
        "Build enough mutual understanding, trust, or morale to make cooperation possible.",
      checks: [
        "negotiate terms",
        "read and respond to emotion",
        "steady a crew",
        "build initial trust",
      ],
      boundaries: [
        "Influence applies pressure or cover",
        "Resolve stabilizes the self",
        "First-Contact Grounding handles pre-assumption contact",
      ],
      origin: "broad",
      legacyTerms: ["Diplomacy", "Empathy", "Performance", "Command"],
      focuses: [
        {
          name: "Terms and Accord",
          fantasy:
            "A negotiator who finds terms both sides can actually carry into the next scene.",
          identity: "Common terms, leverage windows, and explicit commitments.",
          uses: [
            "make a deal",
            "clarify terms",
            "trade concessions",
            "de-escalate a dispute",
          ],
          boundary:
            "Exchange values goods and access. Negotiation builds the agreement around them.",
          abilities: [
            {
              name: "Common Terms",
              type: "permission",
              effect:
                "Identify one interest or constraint that both sides can acknowledge as a basis for a bounded agreement.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "support-recovery",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "communicating parties",
                "recognizable interest",
                "time",
                "good-faith possibility",
              ],
            },
            {
              name: "Leverage Window",
              type: "action",
              effect:
                "Use real, relevant leverage to improve a proposed bargain while making the consequence of refusal explicit.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "noncombat",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "real leverage",
                "interested party",
                "clear terms",
                "communication path",
              ],
            },
            {
              name: "Bridge the Divide",
              type: "preparation",
              effect:
                "Tier 2 seed: structure a negotiation between parties whose assumptions or procedures do not align.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "identity-body-signal-first-contact",
                "noncombat",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Common Terms", "Leverage Window"],
              validation: [
                "two parties",
                "identified mismatch",
                "communication method",
                "time",
              ],
            },
          ],
        },
        {
          name: "Emotional Read",
          fantasy:
            "A listener who makes another person's state easier to name without claiming mind reading.",
          identity:
            "Emotional reading, stabilizing presence, and motive-aware support.",
          uses: [
            "read the room",
            "support distress",
            "notice a social rupture",
            "understand a motive",
          ],
          boundary:
            "Perception notices cues. Empathy interprets them relationally and remains fallible.",
          abilities: [
            {
              name: "Read the Room",
              type: "permission",
              effect:
                "Ask one bounded question about the visible emotional pressure or social alignment in the current group.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "perception-cognition-resolve",
                "noncombat",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "observable group",
                "time",
                "social cues",
                "context",
              ],
            },
            {
              name: "Stabilizing Presence",
              type: "action",
              effect:
                "Help a willing person name and reduce one immediate social or emotional pressure enough to choose their next action.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "support-recovery",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "willing person",
                "communication path",
                "time",
                "immediate pressure",
              ],
            },
          ],
        },
        {
          name: "Morale",
          fantasy:
            "A crew voice that helps people remember why the next difficult action still belongs to them.",
          identity:
            "Crew pressure relief, shared purpose, and recovery of collective tempo.",
          uses: [
            "rally an ally",
            "steady a group",
            "restore purpose",
            "mark a shared success",
          ],
          boundary:
            "Field Direction gives immediate tactical instruction. Morale supports willingness and cohesion.",
          abilities: [
            {
              name: "Steady Voice",
              type: "action",
              effect:
                "Reduce one immediate ally pressure through a credible reminder, callout, or grounding statement.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "support-recovery",
                "command-tactics",
                "away-team",
                "ship-support",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "willing ally",
                "communication path",
                "credible message",
                "pressure state",
              ],
            },
            {
              name: "Shared Purpose",
              type: "preparation",
              effect:
                "Name the crew's immediate purpose and the boundary it will not cross, creating a reference for later pressure checks.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "command-tactics",
                "identity-body-signal-first-contact",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "crew participation",
                "declared purpose",
                "declared boundary",
                "communication path",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Influence",
      definition:
        "Change another party's available social picture through cover, pressure, or controlled performance.",
      checks: [
        "maintain a cover",
        "apply a credible threat",
        "direct attention",
        "frame a choice",
      ],
      boundaries: [
        "Rapport seeks cooperation",
        "Networks provides access and context",
        "Influence changes the immediate social pressure",
      ],
      origin: "broad",
      legacyTerms: ["Deception", "Coercion", "Performance"],
      focuses: [
        {
          name: "Cover and Misdirection",
          fantasy:
            "A cover operator who keeps one false premise coherent under scrutiny.",
          identity: "Cover stories, selective truth, and identity performance.",
          uses: [
            "maintain a cover",
            "misdirect a question",
            "impersonate a role",
            "hide intent",
          ],
          boundary:
            "Counter-Surveillance controls physical evidence. Deception controls the social interpretation offered.",
          abilities: [
            {
              name: "Clean Lie",
              type: "action",
              effect:
                "Maintain one plausible false premise through a direct challenge when the available facts do not already disprove it.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "noncombat",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "plausible premise",
                "audience",
                "known facts",
                "communication path",
              ],
            },
            {
              name: "Layered Cover",
              type: "preparation",
              effect:
                "Prepare a cover identity with one supporting detail, one behavioral rule, and one failure response.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "away-team",
                "noncombat",
              ],
              validation: [
                "preparation time",
                "supporting detail",
                "context",
                "identity boundary",
              ],
            },
          ],
        },
        {
          name: "Credible Threat",
          fantasy:
            "An operator who makes consequences legible without confusing fear with trust.",
          identity:
            "Credible threats, constrained choices, and controlled escalation.",
          uses: [
            "coerce",
            "set an ultimatum",
            "force priority",
            "expose a cost",
          ],
          boundary:
            "Negotiation trades terms. Pressure narrows the choice through credible consequences.",
          abilities: [
            {
              name: "Terms of Pressure",
              type: "action",
              effect:
                "State a credible consequence and a clear path to avoid it, making the pressure explicit rather than implied.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "command-tactics",
                "noncombat",
              ],
              provenance: "prior-nexus-proposal",
              validation: [
                "credible consequence",
                "target understanding",
                "available alternative",
                "communication path",
              ],
            },
            {
              name: "Controlled Threat",
              type: "stance",
              effect:
                "Maintain a threat posture without accidental escalation while the target's response remains within declared bounds.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "defense-protection",
                "away-team",
                "noncombat",
              ],
              validation: [
                "credible capability",
                "declared bounds",
                "target response",
                "stance upkeep",
              ],
            },
          ],
        },
        {
          name: "Performance",
          fantasy:
            "A social technician who directs attention and emotional tempo through an intentional persona.",
          identity:
            "Distraction, public presence, impersonation, and morale performance.",
          uses: [
            "draw attention",
            "perform a role",
            "control a room's tempo",
            "create a distraction",
          ],
          boundary:
            "Deception protects a false premise. Performance shapes attention even when the identity is known.",
          abilities: [
            {
              name: "Commanding Persona",
              type: "stance",
              effect:
                "Adopt a deliberate social presence that improves attention control for one declared audience and purpose.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "command-tactics",
                "noncombat",
              ],
              validation: [
                "audience",
                "declared purpose",
                "social context",
                "stance upkeep",
              ],
            },
            {
              name: "Directed Distraction",
              type: "action",
              effect:
                "Pull an audience's attention toward one plausible focal point long enough to create a short opening elsewhere.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "mobility-exploration",
                "away-team",
                "noncombat",
              ],
              validation: [
                "audience",
                "plausible focal point",
                "opening",
                "timing",
              ],
            },
            {
              name: "Controlled Frame",
              type: "permission",
              effect:
                "Tier 2 seed: define which question or interpretation dominates a public exchange until contrary evidence breaks the frame.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "command-tactics",
                "noncombat",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Commanding Persona", "Directed Distraction"],
              validation: [
                "public exchange",
                "plausible frame",
                "audience",
                "contrary evidence",
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Networks",
      definition:
        "Navigate informal systems of access, exchange, obligation, and faction context.",
      checks: [
        "find a local channel",
        "value a trade",
        "use a credential",
        "call on a faction pathway",
      ],
      boundaries: [
        "Cognition recalls known context",
        "Computing owns technical access",
        "Negotiation owns the terms of a specific agreement",
      ],
      origin: "broad",
      legacyTerms: [
        "Streetwise",
        "Commerce",
        "Faction Lore",
        "Culture",
        "Contact",
      ],
      focuses: [
        {
          name: "Streetwise",
          fantasy:
            "A local navigator who knows how informal systems actually move people and favors.",
          identity: "Quiet channels, local procedure, and underworld context.",
          uses: [
            "find a fixer",
            "read an informal boundary",
            "avoid a local mistake",
            "locate an off-book service",
          ],
          boundary:
            "Faction Access handles named institutions. Streetwise handles local informal practice.",
          abilities: [
            {
              name: "Quiet Channels",
              type: "permission",
              effect:
                "Locate one plausible informal path to information, transport, goods, or introduction in the current community.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "mobility-exploration",
                "noncombat",
              ],
              validation: [
                "local context",
                "time",
                "plausible community",
                "exposure risk",
              ],
            },
            {
              name: "Local Procedure",
              type: "passive",
              effect:
                "Recognize one unwritten local rule that would affect access, safety, or reputation before violating it.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "perception-cognition-resolve",
                "away-team",
                "noncombat",
              ],
              validation: [
                "local context",
                "observable practice",
                "relevant experience",
                "time",
              ],
            },
          ],
        },
        {
          name: "Exchange",
          fantasy:
            "A trader who sees value, scarcity, and obligation in the same transaction.",
          identity:
            "Valuation, requisition, salvage conversion, and resource terms.",
          uses: [
            "value salvage",
            "trade supplies",
            "requisition access",
            "structure compensation",
          ],
          boundary:
            "Negotiation handles relationship and commitment. Exchange handles value and resource movement.",
          abilities: [
            {
              name: "Fair Value",
              type: "permission",
              effect:
                "Estimate a defensible value range for a known good, service, risk, or access right in the current market context.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "engineering-fabrication",
                "noncombat",
              ],
              validation: [
                "known item or service",
                "market context",
                "time",
                "available comparisons",
              ],
            },
            {
              name: "Salvage Broker",
              type: "action",
              effect:
                "Convert verified salvage into a credible trade, credit, or requisition path without assuming immediate liquidity.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "engineering-fabrication",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "verified salvage",
                "interested channel",
                "ownership context",
                "time",
              ],
            },
          ],
        },
        {
          name: "Faction Access",
          fantasy:
            "A boundary reader who knows which credential, obligation, or introduction opens the next door.",
          identity:
            "Institutional pathways, credentials, favors, and procedural context.",
          uses: [
            "use a credential",
            "request access",
            "call in context",
            "identify a faction pathway",
          ],
          boundary:
            "Recall and Dossiers knows the faction. Faction Access changes the crew's live relationship to it.",
          abilities: [
            {
              name: "Credential Read",
              type: "permission",
              effect:
                "Determine what one visible credential plausibly authorizes, who can verify it, and where its authority likely ends.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "perception-cognition-resolve",
                "away-team",
                "noncombat",
              ],
              validation: [
                "visible credential",
                "faction context",
                "verification path",
                "time",
              ],
            },
            {
              name: "Call in Context",
              type: "action",
              effect:
                "Invoke a real prior obligation, affiliation, or introduction to request one bounded access or response.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "support-recovery",
                "away-team",
                "ship-support",
                "noncombat",
              ],
              validation: [
                "real relationship",
                "bounded request",
                "communication path",
                "reputation state",
              ],
            },
            {
              name: "Reciprocal Network",
              type: "preparation",
              effect:
                "Tier 2 seed: create a durable two-way channel by naming what each side can request and what ends the relationship.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "support-recovery",
                "ship-support",
                "noncombat",
              ],
              tier: 2,
              maxRank: 2,
              prerequisites: ["Credential Read", "Call in Context"],
              validation: [
                "two parties",
                "reciprocal value",
                "communication path",
                "exit terms",
              ],
            },
            {
              name: "Accord Under Fire",
              type: "permission",
              effect:
                "Tier 3 seed: preserve one negotiated boundary between hostile or frightened parties through an immediate crisis.",
              tags: [
                "rapport-deception-pressure-networks-exchange",
                "identity-body-signal-first-contact",
                "command-tactics",
                "noncombat",
              ],
              tier: 3,
              maxRank: 1,
              prerequisites: ["Credential Read", "Call in Context"],
              validation: [
                "existing accord",
                "immediate crisis",
                "communication path",
                "mutual boundary",
              ],
            },
          ],
        },
      ],
    },
  ],
);

type ReframedSkillSpec = Omit<SkillSpec, "focuses" | "provenance"> & {
  focusNames: string[];
};

function reframeAttribute(
  attribute: Attribute,
  specs: ReframedSkillSpec[],
): Attribute {
  const availableFocuses = attribute.skills.flatMap((skill) => skill.focuses);
  return {
    ...attribute,
    skills: specs.map((spec) => {
      const id = `skill-${slug(attribute.id)}-${slug(spec.name)}`;
      const focuses = spec.focusNames.map((focusName) => {
        const focus = availableFocuses.find(
          (candidate) => candidate.name === focusName,
        );
        if (!focus) {
          throw new Error(
            `Missing Focus ${focusName} while reframing ${attribute.name}`,
          );
        }
        return { ...focus, parentSkillId: id };
      });
      return {
        ...base(id, spec.name, "new-original"),
        kind: "skill",
        parentAttributeId: attribute.id,
        definition: spec.definition,
        typicalChecks: spec.checks,
        boundaries: spec.boundaries,
        origin: spec.origin,
        legacyTerms: spec.legacyTerms,
        focuses,
      };
    }),
  };
}

const combatCandidate = reframeAttribute(combat, [
  {
    name: "Firearms",
    definition:
      "Use carried ranged weapons that depend on sightline, handling, and ammunition rather than heavy mounting.",
    checks: [
      "place a difficult rifle shot",
      "control a sidearm in close space",
      "identify a firearm handling problem",
    ],
    boundaries: [
      "Heavy Weapons owns crew-served or mounted-scale handling",
      "Tactics owns coordinated pressure",
      "Equipment owns weapon statistics",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Firearms", "Rifles", "Sidearms"],
    focusNames: ["Precision Fire", "Sidearms"],
  },
  {
    name: "Close Combat",
    definition:
      "Control bodily contact, melee attacks, grapples, and breach-range physical pressure.",
    checks: [
      "land a melee attack",
      "grapple or disarm",
      "control a breach-range target",
    ],
    boundaries: [
      "Mobility owns reaching contact",
      "Field Defense owns protection",
      "Equipment owns weapon profiles",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Melee", "Close Combat"],
    focusNames: ["Breach Fighting"],
  },
  {
    name: "Heavy Weapons",
    definition:
      "Operate weapons whose recoil, mounting, area, or power demands create a distinct action and equipment family.",
    checks: [
      "operate a heavy weapon",
      "brace a firing platform",
      "manage area pressure safely",
    ],
    boundaries: [
      "Firearms owns personal ranged weapons",
      "Tactics owns the suppression plan",
      "Equipment owns mounting and ammunition",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Heavy Weapons", "Support Weapons"],
    focusNames: ["Heavy Weapons Use"],
  },
  {
    name: "Field Defense",
    definition:
      "Create deliberate protection through armor handling, interposition, cover, and defended position.",
    checks: [
      "hold a route",
      "protect an ally",
      "use armor actively",
      "withdraw without losing protection",
    ],
    boundaries: [
      "Endurance owns surviving harm",
      "Mobility owns pure evasion",
      "Equipment owns armor and shield values",
    ],
    origin: "newly-proposed",
    legacyTerms: ["Armor", "Guard", "Defense", "Screen"],
    focusNames: ["Armor Handling", "Interposition", "Defensive Positioning"],
  },
  {
    name: "Tactics",
    definition:
      "Read and shape an engagement through suppression, target information, timing, and field direction.",
    checks: [
      "plan a maneuver",
      "call a target",
      "coordinate timing",
      "create a protected window",
    ],
    boundaries: [
      "Firearms and Heavy Weapons own attacks",
      "Rapport owns morale",
      "Perception discovers the threat picture",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Tactics", "Command", "Suppression", "Target Calling"],
    focusNames: ["Suppression", "Target Calling", "Field Direction"],
  },
]);

const constitutionCandidate = reframeAttribute(constitution, [
  {
    name: "Endurance",
    definition:
      "Remain functional through environmental, physical, and workload pressure without treating resilience as immunity.",
    checks: ["endure a hazard", "resist physical shock", "pace sustained work"],
    boundaries: [
      "Field Defense prevents harm",
      "Medicine treats injury",
      "Resolve manages identity and fear pressure",
    ],
    origin: "newly-proposed",
    legacyTerms: ["Adaptation", "Survival", "Vital"],
    focusNames: [
      "Hazard Adaptation",
      "Trauma Resistance",
      "Sustained Exertion",
    ],
  },
  {
    name: "Medicine",
    definition:
      "Assess, stabilize, and support recovery of living patients within available care.",
    checks: [
      "triage an injury",
      "stabilize a patient",
      "diagnose a condition",
      "manage recovery",
    ],
    boundaries: [
      "Biotechnology manipulates biological processes",
      "Cybernetics treats installed interfaces",
      "Endurance belongs to the patient",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Medicine", "Combat Triage", "Field Medicine"],
    focusNames: ["Combat Triage", "Stabilization", "Field Recovery"],
  },
  {
    name: "Biotechnology",
    definition:
      "Use engineered biological processes, cultures, and countermeasures as controlled tools.",
    checks: [
      "prepare a culture",
      "analyze an organic system",
      "apply a biological countermeasure",
    ],
    boundaries: [
      "Medicine treats a patient",
      "Fabrication creates nonliving devices",
      "Cybernetics owns body-machine interfaces",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Biotechnology", "Biotech"],
    focusNames: ["Adaptive Biotech"],
  },
  {
    name: "Cybernetics",
    definition:
      "Maintain and deliberately operate the coupled system formed by a person and installed machinery.",
    checks: [
      "diagnose an implant",
      "manage rejection",
      "tune a body-machine function",
      "stabilize feedback",
    ],
    boundaries: [
      "Engineering repairs the device alone",
      "Resolve owns subjective identity",
      "Medicine owns general care",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Cybernetics", "Cybernetic Care", "Body Modulation"],
    focusNames: ["Cybernetic Care", "Body Modulation"],
  },
]);

const charismaCandidate = reframeAttribute(charisma, [
  {
    name: "Negotiation",
    definition:
      "Create bounded agreements through terms, interests, leverage, and explicit commitments.",
    checks: [
      "make a deal",
      "trade concessions",
      "clarify terms",
      "de-escalate a dispute",
    ],
    boundaries: [
      "Exchange owns valuation",
      "Pressure narrows a choice",
      "Empathy reads emotional state",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Diplomacy", "Negotiation"],
    focusNames: ["Terms and Accord"],
  },
  {
    name: "Empathy",
    definition:
      "Read and support emotional or group state without claiming mind reading or compulsory personality control.",
    checks: [
      "read the room",
      "stabilize distress",
      "restore morale",
      "notice a relational rupture",
    ],
    boundaries: [
      "Perception notices cues",
      "Resolve stabilizes the self",
      "Tactics directs immediate execution",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Empathy", "Morale", "Rally"],
    focusNames: ["Emotional Read", "Morale"],
  },
  {
    name: "Deception",
    definition:
      "Control a social interpretation through cover, selective truth, misdirection, or intentional performance.",
    checks: [
      "maintain a cover",
      "misdirect a question",
      "impersonate a role",
      "direct attention",
    ],
    boundaries: [
      "Counter-Surveillance controls evidence",
      "Pressure uses credible consequences",
      "Negotiation seeks agreement",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Deception", "Performance", "Cover Identity"],
    focusNames: ["Cover and Misdirection", "Performance"],
  },
  {
    name: "Pressure",
    definition:
      "Make credible consequences legible and narrow a choice through controlled escalation.",
    checks: [
      "set an ultimatum",
      "apply a credible threat",
      "force priority",
      "expose a cost",
    ],
    boundaries: [
      "Negotiation trades terms",
      "Tactics shapes combat tempo",
      "Deception changes the offered interpretation",
    ],
    origin: "legacy-derived",
    legacyTerms: ["Coercion", "Pressure"],
    focusNames: ["Credible Threat"],
  },
  {
    name: "Networks",
    definition:
      "Navigate informal access, exchange, obligation, and faction pathways in the current social environment.",
    checks: [
      "find a local channel",
      "value a trade",
      "use a credential",
      "call on a faction pathway",
    ],
    boundaries: [
      "Cognition recalls stored context",
      "Computing owns technical access",
      "Negotiation owns specific agreements",
    ],
    origin: "broad",
    legacyTerms: [
      "Streetwise",
      "Commerce",
      "Faction Lore",
      "Culture",
      "Contact",
    ],
    focusNames: ["Streetwise", "Exchange", "Faction Access"],
  },
]);

const candidateAttributes: Attribute[] = [
  combatCandidate,
  dexterity,
  intelligence,
  constitutionCandidate,
  wisdom,
  charismaCandidate,
];

function findSkillId(name: string): string {
  const skill = candidateAttributes
    .flatMap((attribute) => attribute.skills)
    .find((item) => item.name === name);
  if (!skill) throw new Error(`Missing Skill ${name}`);
  return skill.id;
}

function findAbilityId(name: string): string {
  const ability = candidateAttributes
    .flatMap((attribute) => attribute.skills)
    .flatMap((skill) => skill.focuses)
    .flatMap((focus) => focus.abilities)
    .find((item) => item.name === name);
  if (!ability) throw new Error(`Missing Ability ${name}`);
  return ability.id;
}

function makeSharedBranch(
  name: string,
  skillNames: string[],
  logic: "AND" | "OR",
  rationale: string,
  abilitySpec: AbilitySpec,
  prerequisiteNames: string[],
): SharedBranch {
  const id = `shared-${slug(name)}`;
  const ability = makeAbility(`focus-${id}`, {
    ...abilitySpec,
    tier: abilitySpec.tier ?? 2,
  });
  return {
    ...base(id, name, "new-original"),
    kind: "shared-branch",
    skillIds: skillNames.map(findSkillId),
    prerequisiteLogic: logic,
    rationale,
    abilities: [
      {
        ...ability,
        id: `ability-${id}-${slug(abilitySpec.name)}`,
        parentFocusId: undefined,
        sharedBranchId: id,
        prerequisiteIds: prerequisiteNames.map(findAbilityId),
        prerequisiteLogic: logic,
      },
    ],
  };
}

const sharedBranches: SharedBranch[] = [
  makeSharedBranch(
    "Interlock Drill",
    ["Firearms", "Tactics"],
    "AND",
    "A true synthesis of individual shot discipline and crew timing. Neither parent alone owns the coordinated effect.",
    {
      name: "Crossing Window",
      type: "preparation",
      effect:
        "Prepare a coordinated firing window in which one character creates the opening and another converts it, while both actions retain standalone utility.",
      tags: ["combat-offense", "command-tactics", "away-team"],
      maxRank: 2,
      validation: [
        "two willing actors",
        "communication path",
        "shared target or route",
        "timing",
      ],
    },
    ["Steady Rifle", "Call Angle"],
  ),
  makeSharedBranch(
    "Extraction Window",
    ["Mobility", "Medicine"],
    "AND",
    "Combines safe patient handling with route execution. It should not replace either movement or stabilization expertise.",
    {
      name: "Moving Casualty",
      type: "action",
      effect:
        "Move a stabilized patient through one hazardous route while preserving the treatment state and naming the route's medical risk.",
      tags: [
        "mobility-exploration",
        "support-recovery",
        "medicine-biotech-cybernetics",
        "away-team",
      ],
      maxRank: 2,
      validation: [
        "stabilized patient",
        "valid route",
        "transport method",
        "medical support",
      ],
    },
    ["Quick Mover", "Safe Transfer"],
  ),
  makeSharedBranch(
    "Mutual Cover Protocol",
    ["Field Defense", "Tactics"],
    "AND",
    "Combines personal protection with team direction. It exists only when protection and timing are both authored.",
    {
      name: "Leapfrog Guard",
      type: "stance",
      effect:
        "Two allies alternate protected movement and screening across a declared short route without granting either a free attack.",
      tags: [
        "defense-protection",
        "command-tactics",
        "mobility-exploration",
        "away-team",
      ],
      maxRank: 2,
      validation: [
        "two willing allies",
        "declared route",
        "valid screens",
        "movement and reaction state",
      ],
    },
    ["Screen Watch", "Command Line"],
  ),
  makeSharedBranch(
    "Borrowed Authority",
    ["Computing", "Networks"],
    "OR",
    "Represents one access effect reachable through either a technical foothold or a legitimate social pathway. It is not a hybrid power spike.",
    {
      name: "Provisional Credential",
      type: "permission",
      effect:
        "Create or obtain a short-lived credential for one bounded access request while leaving its technical or social provenance visible.",
      tags: [
        "computing-intrusion",
        "rapport-deception-pressure-networks-exchange",
        "noncombat",
      ],
      maxRank: 2,
      validation: [
        "technical foothold or real relationship",
        "bounded access",
        "verification path",
        "expiry",
      ],
    },
    ["Clean Intrusion", "Credential Read"],
  ),
  makeSharedBranch(
    "Self-Authored Form",
    ["Cybernetics", "Resolve"],
    "AND",
    "A body and identity synthesis that requires both interface competence and explicit continuity safeguards.",
    {
      name: "Consent-Locked Modulation",
      type: "preparation",
      effect:
        "Prepare a body-machine operating change with a self-anchor, an explicit stop condition, and a trusted recovery path.",
      tags: [
        "medicine-biotech-cybernetics",
        "identity-body-signal-first-contact",
        "noncombat",
      ],
      maxRank: 2,
      validation: [
        "compatible augmentation",
        "informed consent",
        "self-anchor",
        "recovery path",
      ],
    },
    ["Controlled Overclock", "Self-Anchor"],
  ),
  makeSharedBranch(
    "Field Requisition",
    ["Fabrication", "Networks"],
    "OR",
    "Offers two routes to the same prepared capability: build the needed tool or source it through a live exchange network.",
    {
      name: "Right Tool, Right Window",
      type: "preparation",
      effect:
        "Secure one purpose-limited tool for a declared upcoming task through fabrication or requisition, with its expiry and ownership clear.",
      tags: [
        "engineering-fabrication",
        "rapport-deception-pressure-networks-exchange",
        "away-team",
        "ship-support",
        "noncombat",
      ],
      maxRank: 2,
      validation: [
        "declared upcoming task",
        "materials or network access",
        "time",
        "ownership and expiry",
      ],
    },
    ["Modular Build", "Fair Value"],
  ),
];

export const themePresets: ThemeTokens[] = [
  {
    preset: "Ion Pearl",
    canvas: "#edf4f8",
    surface: "#f8fbfd",
    surfaceStrong: "#ffffff",
    text: "#112431",
    textMuted: "#526975",
    line: "#b8cad3",
    accent: "#0778b8",
    accentStrong: "#045f96",
    glow: "rgba(0, 156, 232, 0.24)",
    radius: 12,
    density: 8,
  },
  {
    preset: "Clinical Silver",
    canvas: "#e9eef1",
    surface: "#f4f7f8",
    surfaceStrong: "#fbfcfc",
    text: "#17262d",
    textMuted: "#5b6b72",
    line: "#b5c0c5",
    accent: "#176fa4",
    accentStrong: "#0c527b",
    glow: "rgba(32, 137, 199, 0.20)",
    radius: 8,
    density: 9,
  },
  {
    preset: "Frostline",
    canvas: "#f3f7fa",
    surface: "#ffffff",
    surfaceStrong: "#f9fcff",
    text: "#10283a",
    textMuted: "#566c7a",
    line: "#c1d2dc",
    accent: "#006fca",
    accentStrong: "#004e91",
    glow: "rgba(0, 119, 214, 0.18)",
    radius: 16,
    density: 7,
  },
];

export const seedLabData: LabData = {
  schemaVersion: 1,
  title: "Nexus Skill Tree Lab",
  noncanonicalNotice: NONCANONICAL_NOTICE,
  candidateModel: "Bounded concrete Skills with identity-rich Focuses",
  modelDecision:
    "Research favors concrete roll-facing Skills and broad domains as non-owning coverage lenses. This remains a proposal because current Nexus source directly supports both models.",
  generatedAt: "2026-07-09",
  attributes: candidateAttributes,
  sharedBranches,
  research: researchEntries,
  structuralComparison,
  rulesMap,
  theme: themePresets[0],
};
