import type { AbilityRulesImpact, AbilityType, CoverageTag } from "./types";

const has = (tags: CoverageTag[], tag: CoverageTag) => tags.includes(tag);

const RULE_SURFACE_TERM =
  /(?:\bTS\b|\bAP\b|\bMP\b|Lattice|Effective Defense|Defense|Firewall|Health|System Integrity|Shield|Mitigation|\bStatus\b|Disposition|Exposure|Trace|Op Knowledge|Hazard Rating|Injury Severity|Downed|Disabled|result band|Graze|Hit|Direct|Partial|Success|Failure)/i;

export const RULES_EFFECT_MARKER = "Proposed rules effect:";

const RULE_FAMILY_TAGS: CoverageTag[] = [
  "computing-intrusion",
  "combat-offense",
  "support-recovery",
  "medicine-biotech-cybernetics",
  "defense-protection",
  "mobility-exploration",
  "perception-cognition-resolve",
  "engineering-fabrication",
  "command-tactics",
  "identity-body-signal-first-contact",
  "rapport-deception-pressure-networks-exchange",
];

function primaryRulesTag(tags: CoverageTag[]): CoverageTag | undefined {
  return tags.find((tag) => RULE_FAMILY_TAGS.includes(tag));
}

const matches = (effect: string, pattern: RegExp) => pattern.test(effect);

function deriveCandidateResult(
  name: string,
  effect: string,
  type: AbilityType,
  tags: CoverageTag[],
): string {
  const primary = primaryRulesTag(tags);
  const subject = `${name} ${effect}`;

  if (primary === "combat-offense") {
    if (type === "preparation")
      return "The next valid attack described by this Ability gains +2 TS from the Character lane. Clear the preparation after that attack or at the end of the character's next activation; the weapon's normal result bands still apply.";
    return "Add +2 TS from the Character lane to one valid attack or force check that directly performs this Ability's described effect. Apply the weapon or declared action's normal result bands; this Ability adds no free attack or separate damage.";
  }

  if (primary === "defense-protection") {
    if (
      type === "reaction" &&
      matches(subject, /intercept|become the valid target|redirect/i)
    )
      return "Spend the reaction to replace the nearby ally with this character as the legal target of the triggering interceptable effect. Resolve the unchanged incoming result against the new target, including Shield and Mitigation.";
    if (type === "reaction")
      return "Spend the reaction to step the triggering incoming result down one band against the protected target. Shield and Mitigation then resolve normally.";
    if (type === "stance")
      return "Until this character's next activation, the character or route protected by the stated posture gains +2 Effective Defense against the Ability's declared threat family.";
    if (type === "passive")
      return "Add +2 TS to one resistance check per activation when it directly uses this Ability's described protection.";
    return "Grant +2 Effective Defense to the Ability's single declared protected target until the start of this character's next activation.";
  }

  if (
    primary === "support-recovery" ||
    primary === "medicine-biotech-cybernetics"
  ) {
    if (matches(subject, /downed|stabili|golden minute|casualty|deterioration/i))
      return "On Success, pause the one qualifying Downed/Disabled countdown named by this Ability until the end of the subject's next activation. Partial pauses it for the current activation and adds 1 Exposure.";
    if (matches(subject, /status|condition|flush|countermeasure|pain|trauma|acclim|viable|functional|second wind/i))
      return "On Success, suppress one Standard Status named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.";
    return "Add +2 TS to the one relevant care check that directly performs this Ability's described treatment. On Success, preserve the one limited function named by the Ability until the next recovery check.";
  }

  if (primary === "computing-intrusion") {
    if (matches(subject, /firewall|kernel|quarantine|resist|sovereignty|crew authority|against intrusion/i))
      return "Add +2 TS to one system-defense check against the named hostile system effect. On Success, reject that effect; on Partial, reject it and gain 1 Trace.";
    if (matches(subject, /jam|drag|disrupt|interference/i))
      return "On Success, apply the Disrupted System Status to the named valid target until the end of its next activation. On Partial, apply it until the end of the current activation and gain 1 Trace.";
    return "On Success, gain the single bounded access permission described by this Ability. On Direct, also reduce the action's Trace by 1; on Partial, gain the permission and add 1 Trace.";
  }

  if (primary === "mobility-exploration") {
    if (matches(subject, /conceal|quiet|stealth|signature|detection|sensor|surveillance|observation|trail|trace|noise|alarm|ghost|dead angle|between sensors/i))
      return "On Success, reduce Exposure by 1 while completing the Ability's described movement/concealment. Partial completes it without reducing Exposure and adds 1 Exposure.";
    return "On Success, reduce the named route's movement cost by 1 MP for this character while performing the described traversal. Partial completes the traversal at normal MP cost and adds 1 Exposure.";
  }

  if (primary === "engineering-fabrication") {
    if (matches(subject, /diagnos|map|hypothesis|echo|recogn|inspect|infer|weakness/i))
      return "On Success, create one actionable Op Knowledge fact about the Ability's named technical subject. Partial creates the fact with one uncertain fault and adds 1 Exposure.";
    if (matches(subject, /fabricat|assembl|build|salvage|manufact|tool|jig|forge|tolerance|recover one functional component/i))
      return "On Success, reduce the named Material cost by one step for this single task. Partial grants the reduction and adds one exposed fault.";
    return "On Success, restore the one limited technical function named by this Ability until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.";
  }

  if (primary === "command-tactics")
    return "On Success, grant one declared ally +2 TS from the Team lane on the single follow-up that directly uses this Ability's described coordination. Partial grants the bonus and adds 1 Exposure.";

  if (primary === "perception-cognition-resolve") {
    if (matches(subject, /\b(stress|fear|pulse|identity|contact|surrender)\b|compartmentalize|distracting pressure/i))
      return "On Success, suppress the one Standard Status or Signal-pressure effect named by this Ability until the next recovery check. Partial suppresses it until the end of the subject's next activation and adds 1 Exposure.";
    return "On Success, create one actionable Op Knowledge fact of the exact kind described by this Ability. Partial creates the fact with one uncertainty and adds 1 Exposure.";
  }

  if (primary === "identity-body-signal-first-contact")
    return "On Success, suppress the one Standard Status or Signal-pressure effect named by this Ability until the next recovery check while preserving the Ability's stated consent and identity boundary. Partial lasts until the end of the subject's next activation and adds 1 Exposure.";

  if (matches(subject, /value|market|salvage|trade|exchange/i))
    return "On Success, create one actionable Op Knowledge fact establishing the named value or exchange path. Partial creates it with one obligation and adds 1 Exposure.";
  if (matches(subject, /credential|access|procedure|channel|network|context|introduction/i))
    return "On Success, grant the single bounded scene-access permission described by this Ability. Partial grants it with one obligation and adds 1 Exposure.";
  if (matches(subject, /lie|cover|persona|frame|distraction|misdirect/i))
    return "On Success, reduce Exposure by 1 while establishing or preserving the Ability's stated false premise. Partial preserves the premise without reducing Exposure and adds 1 Trace.";
  if (matches(subject, /steady|stabiliz|grounding|morale/i))
    return "On Success, suppress the one pressure-related Standard Status named by this Ability until the target's next recovery check. Partial suppresses it until the end of the target's next activation and adds 1 Exposure.";
  return "On Success, shift the named target's Disposition one step in the Ability's stated direction. Partial makes the shift temporary until the end of the scene and adds 1 Exposure.";
}

export function hasConcreteCandidateEffect(effect: string): boolean {
  const markerIndex = effect.indexOf(RULES_EFFECT_MARKER);
  if (markerIndex < 0) return false;
  return RULE_SURFACE_TERM.test(
    effect.slice(markerIndex + RULES_EFFECT_MARKER.length),
  );
}

export function concretizeCandidateEffect(
  effect: string,
  rulesImpact: AbilityRulesImpact,
): string {
  if (hasConcreteCandidateEffect(effect)) return effect;
  const concept = effect.replace(/\s*Proposed rules effect:.*$/s, "").trim();
  return `${concept} ${RULES_EFFECT_MARKER} ${rulesImpact.resultBands}`;
}

export function sourceActionCost(type: AbilityType): string {
  if (type === "reaction")
    return "Spend one available reaction only when a stance, Ready action, feature, gear, or scenario rule grants a valid trigger.";
  if (type === "passive")
    return "No AP. Its Character-lane benefit applies only while its stated validation conditions are true.";
  if (type === "stance")
    return "1 AP to establish. It provides only its stated reaction or posture benefit until the character's next activation.";
  if (type === "preparation")
    return "1 AP in Tactical Pressure, or the stated preparation time outside it.";
  if (type === "equipment-interaction")
    return "Use the owning weapon, tool, module, or system action cost; this Ability does not create a free extra action.";
  return "Usually 1 AP when used during Tactical Pressure; outside it, resolve with the stated scene time and cost.";
}

// Retained for editor-created abilities that do not yet have a stable name.
export function deriveRulesImpact(
  type: AbilityType,
  tags: CoverageTag[],
): AbilityRulesImpact {
  const actionEconomy = sourceActionCost(type);

  if (has(tags, "computing-intrusion")) {
    return {
      checkSurface:
        "Lattice system action vs Firewall: TS = 50 + Actor Bonus - (Firewall - 15).",
      actionEconomy,
      stateSurfaces: ["Firewall", "System Integrity", "System Status", "Trace"],
      resultBands:
        "On a successful system action, apply only the permitted access, interference, or status result. Direct effects may improve scope or reduce Trace; they do not grant ownership unless the Ability says so.",
      guardrail:
        "A valid hack surface, link, and target tag are required. This Ability cannot bypass equipment ownership, power, range, or a stated access gate.",
    };
  }

  if (has(tags, "combat-offense")) {
    return {
      checkSurface:
        "Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).",
      actionEconomy,
      stateSurfaces: [
        "Defense and cover",
        "Shield -> Mitigation -> Health/System Integrity",
        "position or route state",
      ],
      resultBands:
        "Miss, Graze, Hit, and Direct use the weapon or declared action profile. A Character-lane benefit is normally a bounded +2 TS, band shaping, or a stated permission—not separate free damage.",
      guardrail:
        "A valid weapon, target, line of effect, ammunition or power state, and normal once-per-activation attack limit still apply.",
    };
  }

  if (
    has(tags, "support-recovery") ||
    has(tags, "medicine-biotech-cybernetics")
  ) {
    return {
      checkSurface:
        "Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or a stated Hazard Rating when a roll is meaningful.",
      actionEconomy,
      stateSurfaces: [
        "Health",
        "System Integrity",
        "Standard Status",
        "Downed/Disabled countdown",
      ],
      resultBands:
        "Success clears or suppresses one stated Standard Status, pauses a Downed/Disabled countdown, or restores one declared limited function—whichever the Ability names. Partial provides that result with a supply, time, exposure, or duration cost.",
      guardrail:
        "This does not create healing or revival beyond its declared scope, and it does not erase persistent consequences without the required recovery rule.",
    };
  }

  if (has(tags, "defense-protection")) {
    return {
      checkSurface:
        "Use the stated trigger, stance, or Lattice defense check against the incoming effect; cover modifies Effective Defense, not base Defense.",
      actionEconomy,
      stateSurfaces: [
        "Defense",
        "cover or Screen state",
        "forced movement",
        "Shield/Mitigation interaction",
      ],
      resultBands:
        type === "reaction"
          ? "On the stated trigger, spend the reaction to step the qualifying incoming result down one band or redirect its legal target as named by the Ability. Shield and Mitigation then resolve normally."
          : "While the stated posture or condition is valid, add +2 TS to the relevant resistance check or +2 Effective Defense against the declared threat family; choose the one named by the Ability.",
      guardrail:
        "Armor is equipment and Mitigation is its stat; a learned Ability may grant posture, reaction, or permission but does not duplicate gear values.",
    };
  }

  if (has(tags, "mobility-exploration")) {
    return {
      checkSurface:
        "Lattice Mobility, Stealth, or traversal check vs Hazard Rating when a route, terrain, or exposure risk is meaningful.",
      actionEconomy,
      stateSurfaces: ["MP", "route cost", "hazard state", "Exposure"],
      resultBands:
        "Success reduces one qualifying route by 1 MP, reveals one safer route as Op Knowledge, or permits the Ability's named traversal. Partial crosses but adds Exposure, a Status, or a stated resource cost.",
      guardrail:
        "Never converts an unsafe route into free movement or bypasses a required body, gear, tether, access, or environmental condition.",
    };
  }

  if (has(tags, "perception-cognition-resolve")) {
    return {
      checkSurface:
        "Lattice standard check vs Hazard Rating, pressure, or the stated information threshold.",
      actionEconomy,
      stateSurfaces: ["Op Knowledge", "Status", "Exposure", "Signal pressure"],
      resultBands:
        "Success creates one actionable Op Knowledge fact or adds +2 TS to the next check that directly exploits the discovered fact. Partial reveals the fact with uncertainty, Exposure, or a stated cost. It does not solve the Gate automatically.",
      guardrail:
        "Obvious risks remain available through normal play; this Ability specializes discovery, resistance, and reliable interpretation rather than monopolizing information.",
    };
  }

  if (has(tags, "engineering-fabrication")) {
    return {
      checkSurface:
        "Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the target system's Firewall when hostile control is involved.",
      actionEconomy,
      stateSurfaces: [
        "System Integrity",
        "System Status",
        "power or structure state",
        "Material cost",
      ],
      resultBands:
        "Success restores one declared limited function, clears one qualifying System Status, or reduces the named Material/time cost by one step. Partial works with a temporary duration, extra Material, or exposed fault.",
      guardrail:
        "The correct tool, access, parts, power state, and equipment tags still apply. This cannot create permanent gear statistics or bypass a hostile Firewall without a valid system action.",
    };
  }

  if (has(tags, "command-tactics")) {
    return {
      checkSurface:
        "Lattice Setup or Assist check against Effective Defense, Hazard Rating, or the scene's tactical pressure when opposition makes coordination uncertain.",
      actionEconomy,
      stateSurfaces: [
        "Team lane",
        "position or route state",
        "Status",
        "objective state",
      ],
      resultBands:
        "Success grants one ally +2 TS from the Team lane on the declared follow-up or changes one named route, target, or objective permission. Partial grants it with a position, reaction, or exposure cost.",
      guardrail:
        "The benefit applies to one declared follow-up and does not grant another character a free full action or stack multiple same-lane bonuses.",
    };
  }

  if (has(tags, "identity-body-signal-first-contact")) {
    return {
      checkSurface:
        "Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or the stated Status severity.",
      actionEconomy,
      stateSurfaces: [
        "Standard Status",
        "Signal pressure",
        "Op Knowledge",
        "identity or body state",
      ],
      resultBands:
        "Success prevents or suppresses one named Standard Status, records one confirmed Op Knowledge fact, or accepts one explicit body-state trade. Partial provides the result with contamination, recovery, or identity cost.",
      guardrail:
        "The Ability cannot invent Contact authority, rewrite identity, or impose body transformation without the stated campaign gate and consent boundary.",
    };
  }

  return {
    checkSurface:
      "Lattice Gate, Pressure, or Setup check against the current scene surface when a meaningful roll is required.",
    actionEconomy,
    stateSurfaces: [
      "Disposition",
      "Standard Status",
      "Exposure",
      "Trace",
      "Op Knowledge",
      "scene-access permission",
    ],
    resultBands:
      "Success shifts Disposition or Exposure by one step, creates one Op Knowledge fact, or grants the named scene permission. Partial grants that result with Trace, an obligation, or another declared After Effect.",
    guardrail:
      "A revealed option is not automatic success. The target, method, resource, and scene state must still validate.",
  };
}

type AbilityRuleOverride = Omit<AbilityRulesImpact, "actionEconomy">;

const CHECK = {
  attack:
    "Lattice attack vs Effective Defense: TS = 50 + Actor Bonus - (Effective Defense - 15).",
  force:
    "Lattice force or control check vs Effective Defense or the target's stated resistance.",
  defense:
    "Use the stated trigger, stance, or Lattice defense check against the incoming effect.",
  tactics:
    "Lattice Setup or Assist check vs Effective Defense, Hazard Rating, or tactical pressure when opposition makes coordination uncertain.",
  mobility:
    "Lattice Mobility or traversal check vs Hazard Rating when the route or interruption is uncertain.",
  stealth:
    "Lattice Stealth check vs the observer, sensor threshold, or Hazard Rating when detection is uncertain.",
  vehicle:
    "Lattice Piloting check vs Hazard Rating, opposing control, or the maneuver's stated threshold.",
  system:
    "Lattice system action vs Firewall: TS = 50 + Actor Bonus - (Firewall - 15).",
  systemDefense:
    "Lattice system-defense check against the hostile effect's Firewall-derived or stated TS.",
  engineering:
    "Lattice Engineering or Fabrication check vs Hazard Rating, Structure, or the stated technical threshold.",
  medical:
    "Lattice Medicine, Biotech, or Cybernetics check vs Injury Severity, System Status, or Hazard Rating when a roll is meaningful.",
  endurance:
    "Lattice Endurance check vs Hazard Rating, Injury Severity, or the stated physical-pressure threshold when a roll is meaningful.",
  knowledge:
    "Lattice observation, analysis, or domain check vs the stated information threshold when uncertainty is meaningful.",
  social:
    "Lattice Gate, Pressure, or Setup check against the target's current social resistance when uncertainty is meaningful.",
  identity:
    "Lattice Resolve, Contact, or body-system check vs Signal pressure, Hazard Rating, or stated Status severity.",
  validation:
    "No separate roll unless the owning action is uncertain; validate the named trigger, target, route, equipment, and scene state.",
} as const;

const STATE = {
  attack: ["Effective Defense", "weapon result bands", "Shield -> Mitigation -> Health/System Integrity"],
  control: ["position or route state", "forced movement", "Standard Status"],
  defense: ["Effective Defense", "cover or Screen state", "forced movement", "Shield/Mitigation interaction"],
  team: ["Team lane", "position or route state", "objective state", "Exposure"],
  mobility: ["MP", "route cost", "hazard state", "Exposure"],
  stealth: ["Exposure", "Trace", "observer or sensor state", "scene-access permission"],
  vehicle: ["vehicle route state", "System Status", "System Integrity", "Exposure"],
  system: ["Firewall", "System Integrity", "System Status", "Trace", "access permission"],
  engineering: ["System Integrity", "System Status", "power or structure state", "Material cost", "tool permission"],
  health: ["Health", "Standard Status", "Downed/Disabled countdown", "recovery state"],
  body: ["body-machine state", "System Integrity", "Standard Status", "Signal pressure"],
  knowledge: ["Op Knowledge", "uncertainty", "Exposure"],
  social: ["Disposition", "Standard Status", "Exposure", "obligation", "scene-access permission"],
  identity: ["identity or Contact boundary", "Signal pressure", "Standard Status", "Op Knowledge"],
} as const satisfies Record<string, string[]>;

const GUARD = {
  attack:
    "Normal weapon, target, line-of-effect, ammunition or power, and once-per-activation attack limits still apply; this grants no free attack or damage.",
  control:
    "This changes only the declared control or position result and does not add weapon damage or bypass size, reach, or target validation.",
  defense:
    "Armor remains equipment and Mitigation remains its stat; the Ability grants only its named posture, Screen, reaction, or resistance result.",
  team:
    "The benefit applies only to the declared actors and follow-up; it grants no free full action and does not stack same-lane bonuses.",
  mobility:
    "The route, body, gear, tether, vehicle, access, and environmental requirements still validate; unsafe movement never becomes free movement.",
  stealth:
    "The effect changes only the named evidence, Exposure, observation, or access state and cannot erase an entire scene or defeat unrelated sensors.",
  vehicle:
    "The craft or vehicle must have a valid route, control link, propulsion, crew state, and capacity; this grants no extra movement action.",
  system:
    "A valid hack surface, link, target tag, access route, and ownership boundary are required; the effect never grants unstated system ownership.",
  engineering:
    "Correct tools, access, parts, power, ownership, and equipment tags remain required; temporary work creates no permanent gear statistics.",
  health:
    "This does not create unstated healing or revival and cannot erase persistent consequences without the owning recovery rule.",
  body:
    "Compatible hardware, informed consent, stop conditions, and recovery boundaries remain required; no identity or body rewrite is imposed.",
  knowledge:
    "The result supplies only the named actionable fact or setup; it does not solve the Gate, reveal hidden specifications, or guarantee the follow-up.",
  social:
    "A revealed option, pressure, premise, or permission is not automatic success; target, method, relationship, evidence, and scene state still validate.",
  identity:
    "The Ability cannot invent Contact authority, rewrite identity, or impose transformation; stated consent, evidence, and campaign gates remain controlling.",
} as const;

const rule = (
  checkSurface: string,
  stateSurfaces: readonly string[],
  resultBands: string,
  guardrail: string,
): AbilityRuleOverride => ({
  checkSurface,
  stateSurfaces: [...stateSurfaces],
  resultBands,
  guardrail,
});

const ABILITY_RULE_OVERRIDES: Record<string, AbilityRuleOverride> = {
  "Converging Fire": rule(CHECK.tactics, STATE.team, "On Success, grant the declared allied precision attack +2 TS from the Team lane against the same pressured target. Partial grants the bonus and adds 1 Exposure; the ally still spends and resolves the normal attack.", GUARD.team),
  "Clinch Control": rule(CHECK.force, STATE.control, "On Success, bind, turn, or displace the adjacent target by one legal position step instead of dealing damage. Partial achieves the control with 1 Exposure or a weaker position.", GUARD.control),
  "Big Gun Handling": rule(CHECK.validation, STATE.attack, "When carry, mounting, recoil, and equipment requirements validate, operate the declared heavy weapon without its named handling/setup penalty. Resolve any attack normally.", GUARD.attack),
  "Area Pressure": rule(CHECK.attack, STATE.control, "On Hit, apply Suppressed to the declared zone or increase its route cost by 1 MP until the end of the target side's next activation; Graze lasts through the current activation and Direct affects one adjacent route.", GUARD.attack),
  "Brace Protocol": rule(CHECK.defense, STATE.defense, "While braced, add +2 TS to resistance against impact, forced movement, or knockdown; if no roll is made, step one qualifying forced-movement result down by one band.", GUARD.defense),
  "Screen Watch": rule(CHECK.validation, STATE.defense, "Establish one Screen over a valid nearby subject, node, or route until the character's next activation; its stated interception trigger may use the character's available reaction.", GUARD.defense),
  "Guarded Passage": rule(CHECK.tactics, STATE.defense, "On Success, establish a short protected route; up to two declared allies crossing it gain +2 Effective Defense until arrival. Partial protects one ally and adds 1 Exposure.", GUARD.defense),
  "Cover Drill": rule(CHECK.validation, STATE.defense, "After entering valid cover or taking the owning defensive action, improve that cover's Effective Defense benefit by +2 against one declared threat family until the next activation.", GUARD.defense),
  "Fighting Withdrawal": rule(CHECK.mobility, STATE.defense, "On Success, cross one short route away from the threat while preserving the existing cover or Screen benefit through arrival. Partial repositions but ends the posture and adds 1 Exposure.", GUARD.defense),
  "Anchor Point": rule(CHECK.validation, STATE.defense, "Establish a defended boundary until the next activation and gain one reaction trigger when a threat crosses it; resolve the reaction with the declared defense or control action.", GUARD.defense),
  "Hold the Line": rule(CHECK.defense, STATE.team, "While committed to the declared boundary, prevent one route or objective collapse or grant the crew +2 TS against forced withdrawal once per activation.", GUARD.team),
  "Support Gunner": rule(CHECK.attack, STATE.control, "On Success, apply Suppressed to one declared route or zone until the end of its next activation. Partial applies it through the current activation and adds 1 Exposure; no direct damage is added.", GUARD.attack),
  "Threat Ledger": rule(CHECK.validation, STATE.knowledge, "Maintain one additional confirmed tactical Op Knowledge fact about an active threat; a later target call may reference either maintained fact.", GUARD.knowledge),
  "Split-Second Reposition": rule(CHECK.validation, STATE.team, "On the unsafe-position trigger, spend the reaction to let one nearby ally cross one short valid route before the consequence resolves. The ally pays normal MP; if the route is hazardous, add 1 Exposure.", GUARD.team),
  "Coordinated Tempo": rule(CHECK.tactics, STATE.team, "On Success, link two declared crew actions in order; the second gains +2 TS from the Team lane only if the first reaches its handoff condition. Partial links them but failure of the first adds 1 Exposure.", GUARD.team),
  "Crossing Window": rule(CHECK.tactics, STATE.team, "After the opener performs the declared setup, the converter's next valid attack against the shared target gains +2 TS from the Team lane. Both actors spend and resolve their normal actions.", GUARD.team),
  "Leapfrog Guard": rule(CHECK.tactics, STATE.defense, "Two declared allies may alternate movement and Screen duty across one short route; the active mover gains +2 Effective Defense while the other maintains the Screen, using normal MP and reactions.", GUARD.team),

  "Momentum Reserve": rule(CHECK.validation, STATE.mobility, "When a movement route is interrupted, spend the reaction to complete one shorter adjacent valid reposition at normal MP cost before the interruption settles.", GUARD.mobility),
  "Impossible Route": rule(CHECK.mobility, STATE.mobility, "Attempt one route normally unavailable because of timing or geometry. Success permits the traversal at normal MP; Partial permits it and adds 1 Exposure or one stated Status.", GUARD.mobility),
  "Soft Landing": rule(CHECK.defense, STATE.health, "On a valid landing option, spend the reaction to step the fall or collision Injury/Status result down one band. This does not cancel an impossible landing or prior damage.", GUARD.mobility),
  "Vector Tuck": rule(CHECK.defense, STATE.mobility, "During microgravity arrival, spend the reaction to add +2 TS against collision or arrival Exposure, or step one qualifying collision result down one band.", GUARD.mobility),
  "Tether Logic": rule(CHECK.validation, STATE.mobility, "Choose one use when attaching the tether: redirect the user's movement to the anchor, secure one adjacent ally against one forced-movement result, or establish one recoverable route until detached.", GUARD.mobility),
  "Quiet Approach": rule(CHECK.stealth, STATE.stealth, "While speed and equipment remain within the controlled profile, reduce Exposure by 1 on one valid stealth movement or add +2 TS against the observing surface.", GUARD.stealth),
  "Thermal Patience": rule(CHECK.validation, STATE.stealth, "While stationary and nonaggressive, gain +2 TS against heat- or motion-based detection and prevent the first 1 Exposure from that sensor family; the stance ends on movement or aggression.", GUARD.stealth),
  "Silent Entry": rule(CHECK.stealth, STATE.stealth, "On Success, gain one bounded physical-barrier access permission and reduce resulting evidence or Exposure by 1. Partial opens the barrier but leaves evidence and adds 1 Exposure.", GUARD.stealth),
  "Lock Bypass": rule(CHECK.stealth, STATE.stealth, "On Success, use the valid security tool to gain one bounded physical access permission. Partial opens the lock but leaves evidence or consumes the tool and adds 1 Exposure.", GUARD.stealth),
  "Between Sensors": rule(CHECK.stealth, STATE.stealth, "On Success, cross the named handoff gap between two observation systems and reduce Exposure by 1. Partial crosses without the reduction and adds 1 Exposure.", GUARD.stealth),
  "Drift Correction": rule(CHECK.vehicle, STATE.vehicle, "On the developing skid or traction-loss trigger, spend the reaction to step the vehicle Hazard result down one band or prevent one Skid/Loss-of-Control System Status.", GUARD.vehicle),
  "Hazard Line": rule(CHECK.vehicle, STATE.vehicle, "Before traversal, choose one trade: reduce route cost by 1 MP and accept 1 Exposure or System strain, or keep normal speed and gain +2 TS against the declared hazard. Partial adds the unchosen cost.", GUARD.vehicle),
  "Burn Window": rule(CHECK.vehicle, STATE.vehicle, "On Success, gain +2 TS on the declared craft acceleration or vector-change maneuver. Partial completes it and adds one System strain Status or 1 Exposure.", GUARD.vehicle),
  "Docking Nerve": rule(CHECK.vehicle, STATE.vehicle, "Add +2 TS from the Character lane to one constrained docking or landing check when space, time, or platform stability creates pressure.", GUARD.vehicle),
  "Crew-Coupled Maneuver": rule(CHECK.tactics, STATE.team, "On Success, the supporting station grants +2 TS from the Team lane to the declared piloting maneuver. Partial grants the bonus and adds 1 Exposure or one supporting-system cost.", GUARD.team),
  "Proxy Hands": rule(CHECK.validation, STATE.engineering, "Use the linked remote platform to perform one valid tool or interaction action at its location, paying the platform's normal action, range, link, and tool costs.", GUARD.engineering),
  "Multi-Feed Control": rule(CHECK.validation, STATE.knowledge, "Maintain two compatible remote information feeds while retaining basic control of the active platform; once per activation, prevent one Overload or Disrupted Status caused only by the second feed.", GUARD.knowledge),
  "No Safe Angle": rule(CHECK.vehicle, STATE.knowledge, "On Success, reposition the linked platform and create one actionable Op Knowledge fact from the combined viewpoint. Partial repositions or creates the fact, not both, and adds 1 Exposure.", GUARD.vehicle),
  "Moving Casualty": rule(CHECK.mobility, [...STATE.mobility, ...STATE.health], "On Success, move the stabilized patient through the named route and preserve the current stabilization/Downed countdown through arrival. Partial completes the move but advances the countdown or adds the declared medical risk.", GUARD.health),

  "Quick Mover": rule(CHECK.validation, STATE.mobility, "When performing a valid movement action toward a declared objective or position, reduce one qualifying route cost by 1 MP; do not roll the passive separately.", GUARD.mobility),
  "Power Traverse": rule(CHECK.validation, STATE.mobility, "When performing a valid climb or difficult-terrain movement, reduce that route's movement penalty by 1 MP or prevent the first 1 Exposure caused by the terrain; do not roll the passive separately.", GUARD.mobility),

  "Quarantine Thread": rule(CHECK.systemDefense, STATE.system, "On the suspicious-process trigger, spend the reaction to isolate it from one trusted subsystem and apply Quarantined System Status until the end of the next activation. A failed defense leaves the channel open; Partial contains it and adds 1 Trace.", GUARD.system),
  "Systems Sovereignty": rule(CHECK.systemDefense, STATE.system, "While the stance protects one owned system cluster, add +2 TS to resist intrusion, jamming, or conflicting control; once per activation, Success rejects one such effect and Partial rejects it with 1 Trace.", GUARD.system),
  "Field Restore": rule(CHECK.engineering, STATE.engineering, "On Success, restore one declared damaged technical function until normal repair can occur. Partial restores it for the current scene and adds one exposed fault.", GUARD.engineering),
  "Load Balance": rule(CHECK.engineering, STATE.engineering, "On Success, move one declared unit of available power or load from a donor subsystem to a recipient subsystem until the next reconfiguration. Partial succeeds and adds one System strain Status.", GUARD.engineering),
  "Stress Echo": rule(CHECK.knowledge, STATE.knowledge, "On Success, create one actionable Op Knowledge fact locating a hidden load or structural weakness. Partial creates the fact with one uncertain connection and adds 1 Exposure.", GUARD.knowledge),
  "Rapid Jig": rule(CHECK.engineering, STATE.team, "On Success, the temporary fixture grants +2 TS from the Team lane to the one declared repair, extraction, or handling task while it remains installed. Partial grants the bonus and adds one exposed fault.", GUARD.engineering),
  "Modular Build": rule(CHECK.engineering, STATE.engineering, "On Success, create one temporary purpose-limited device with one declared function until the end of the scene. Partial creates it with one exposed fault or extra Material cost.", GUARD.engineering),
  "Useful Ruin": rule(CHECK.engineering, STATE.engineering, "On Success, recover one compatible component or reduce one later declared Material requirement by one step. Partial recovers it with one exposed fault.", GUARD.engineering),
  "Foreign Interface": rule(CHECK.engineering, STATE.engineering, "On Success, grant one reversible compatibility permission between the two named systems for the scene. Partial grants it for the current activation and adds one exposed fault.", GUARD.engineering),
  "Clean Tolerance": rule(CHECK.validation, STATE.engineering, "When the verified plan, measurement, material, and process all validate, prevent one exposed fault in the manufactured replacement or add +2 TS to its first validation check.", GUARD.engineering),
  "Microforge Plan": rule(CHECK.knowledge, STATE.knowledge, "On Success, create one fabrication-ready Op Knowledge plan; one qualified station executing it gains +2 TS from the Team lane. Partial creates the plan with one uncertain tolerance or extra Material cost.", GUARD.knowledge),
  "Adaptive Toolchain": rule(CHECK.engineering, STATE.engineering, "On Success, waive one declared material or process compatibility gate for the single workflow. Partial permits the substitution and adds one exposed fault, quality loss, or time step.", GUARD.engineering),
  "Provisional Credential": rule("Use Lattice system action vs Firewall for a technical foothold, or a Lattice Gate/Setup check against social resistance for a real-relationship route.", [...STATE.system, ...STATE.social], "On Success, gain one bounded access permission until the declared expiry. A technical Partial adds 1 Trace; a social Partial adds one obligation and 1 Exposure. Provenance remains visible.", "The chosen technical or social route must independently validate; the credential cannot bypass ownership, verification, expiry, or a stated access gate."),
  "Right Tool, Right Window": rule("Use Lattice Fabrication vs the technical threshold when building, or Lattice Gate/Setup vs social resistance when requisitioning.", [...STATE.engineering, ...STATE.social], "On Success, secure one purpose-limited tool for the declared task until its expiry. Partial secures it with an exposed fault, extra Material, obligation, or delayed availability matching the chosen route.", "The tool grants only its declared function; materials or network access, ownership, expiry, equipment tags, and the task's normal action still validate."),

  "Seal Discipline": rule(CHECK.endurance, [...STATE.health, ...STATE.mobility], "While valid sealed gear and procedures are maintained, add +2 TS against decompression, contamination, or reserve-pressure hazards, or prevent the first 1 Exposure from that hazard per scene.", GUARD.health),
  "Hostile World Routine": rule(CHECK.endurance, [...STATE.health, ...STATE.team], "While the declared crew routine remains valid, reduce the crew's accumulated environmental Exposure by 1 per operation phase or grant +2 Team TS against that one pressure.", GUARD.health),
  "Stay Functional": rule(CHECK.validation, STATE.health, "When trauma would immediately remove all useful action, spend the reaction to take one constrained response before the Downed/Disabled or trauma consequence commits. The response cannot include a full attack unless normally permitted.", GUARD.health),
  "Second Wind": rule(CHECK.endurance, STATE.health, "After a valid pause, Success clears or suppresses one Fatigue/Exertion Standard Status until the next recovery check. Partial suppresses it through the next activation and adds 1 Exposure.", GUARD.health),
  "Condition Read": rule(CHECK.knowledge, STATE.knowledge, "On Success, ask and receive one actionable medical Op Knowledge answer about the visible patient's immediate risk or triage priority. Partial answers with one uncertainty or time cost.", GUARD.knowledge),
  "Golden Minute": rule(CHECK.validation, STATE.health, "On immediate deterioration, spend the reaction to pause the patient's Downed/Disabled countdown through their next activation or step that deterioration result down one band before normal treatment resumes.", GUARD.health),
  "Recovery Plan": rule(CHECK.medical, STATE.health, "On Success, record a patient-specific recovery plan that grants +2 TS to the next relevant recovery check or reduces one stated rest, supply, or time requirement by one step. Partial grants the benefit with one added requirement.", GUARD.health),
  "Controlled Rest": rule(CHECK.validation, STATE.health, "When a valid rest period completes under the stated monitoring and supply conditions, add +2 TS to its recovery check or improve one normal Health/Status recovery result by one step.", GUARD.health),
  "Adaptive Culture": rule(CHECK.medical, [...STATE.health, ...STATE.knowledge, ...STATE.engineering], "Choose one declared task when preparing the culture: detection creates one biological Op Knowledge fact, processing reduces one compatible Material/time cost, or remediation suppresses one compatible contaminant Status. Partial adds contamination or supply cost.", GUARD.health),
  "Living Countermeasure": rule(CHECK.medical, STATE.health, "On Success, suppress one compatible toxin, contaminant, or hostile-organism Standard Status until the next recovery check. Partial suppresses it through the next activation and consumes one additional supply.", GUARD.health),
  "Controlled Overclock": rule(CHECK.identity, STATE.body, "While active, grant +2 TS to one declared compatible augmented function. At the end of the declared window, commit the named Body or System Status after-cost; Partial shortens the window or worsens that cost.", GUARD.body),
  "Symbiotic Interface": rule(CHECK.identity, STATE.body, "On Success, grant one bounded shared sensing or regulation permission between the compatible biological and cybernetic systems until the next recovery check. Partial lasts through the scene and adds one Body/System Status.", GUARD.body),
  "Consent-Locked Modulation": rule(CHECK.identity, [...STATE.body, ...STATE.identity], "On Success, prepare one declared body-machine operating state with a self-anchor, explicit stop condition, duration, and after-cost. Partial prepares a shorter window or adds one recovery cost; activation remains self-authorized.", GUARD.body),

  "Watchful Rest": rule(CHECK.knowledge, [...STATE.knowledge, ...STATE.health], "While the reduced watch is maintained during a valid rest, add +2 TS to notice one approaching threat without ending Rest state. Direct preserves the full rest benefit; Partial notices it but ends Rest.", GUARD.knowledge),
  "Noise Floor": rule(CHECK.knowledge, STATE.knowledge, "On Success, create one actionable Op Knowledge fact distinguishing a weak signal from a changed background-noise pattern. Partial creates it with one uncertainty and adds 1 Exposure.", GUARD.knowledge),
  "Trace Continuity": rule(CHECK.knowledge, STATE.knowledge, "Maintain one verified connection between separated evidence; the next tracking check may continue across that interruption and gains +2 TS. Partial preserves the link with one uncertainty.", GUARD.knowledge),
  "Compartmentalize": rule(CHECK.identity, STATE.identity, "While the stance supports one declared task, suppress one pressure or distraction Standard Status. The Status returns at the next recovery/reflection boundary; Partial adds 1 Exposure.", GUARD.identity),
  "Self-Anchor": rule(CHECK.validation, STATE.identity, "Record one personal continuity anchor; the next identity, memory, or priority check that directly tests it gains +2 TS and may compare the claim against the anchor.", GUARD.identity),
  "Memory Checksum": rule(CHECK.knowledge, [...STATE.knowledge, ...STATE.identity], "On Success, create one bounded Op Knowledge finding—consistent, inconsistent, or uncertain—by comparing the contested memory with one independent anchor or trusted witness. Partial leaves one named uncertainty.", GUARD.identity),
  "Unknown Protocol": rule(CHECK.identity, STATE.identity, "On Success, establish the observation, consent, retreat, and contamination boundaries for one Contact sequence; following them reduces the first resulting Exposure by 1. Partial establishes them with one unresolved boundary.", GUARD.identity),
  "Continuity Under Contact": rule(CHECK.validation, [...STATE.identity, ...STATE.team], "Maintain one shared crew Contact log of observations, interpretations, and identity checks; once per activation, a crew member using a current entry gains +2 Team TS on a continuity check.", GUARD.identity),
  "Witness Without Surrender": rule(CHECK.identity, STATE.identity, "On Success, preserve the declared identity boundary while engaging one alien model and gain +2 TS against its next boundary imposition. Partial preserves the boundary through the current activation and adds 1 Exposure.", GUARD.identity),

  "Pre-Contact Read": rule(CHECK.validation, STATE.knowledge, "When the scene shifts toward immediate danger, spend the reaction to receive one observable threat cue before choosing the first response; do not roll the reaction separately.", GUARD.knowledge),
  "Distributed Watch": rule(CHECK.knowledge, [...STATE.knowledge, ...STATE.team], "While the stance is maintained, once per activation combine reports from two compatible crew stations into one actionable Op Knowledge fact; disagreement remains recorded as uncertainty.", GUARD.knowledge),

  "Common Terms": rule(CHECK.social, [...STATE.knowledge, ...STATE.social], "On Success, create one negotiation Op Knowledge fact naming an interest or constraint both sides acknowledge; the next bargain that uses it gains +2 TS. Partial creates it with one disputed boundary.", GUARD.social),
  "Bridge the Divide": rule(CHECK.social, STATE.social, "On Success, create a negotiation Setup between the named parties that grants +2 TS to the next bounded agreement check. Partial grants it and adds one obligation or 1 Exposure.", GUARD.social),
  "Read the Room": rule(CHECK.knowledge, STATE.knowledge, "On Success, receive one bounded Op Knowledge answer about visible emotional pressure or group alignment. Partial answers with one uncertainty or overlooked subgroup.", GUARD.knowledge),
  "Stabilizing Presence": rule(CHECK.social, STATE.social, "On Success, suppress one willing target's immediate emotional-pressure Standard Status until the next recovery check. Partial suppresses it through the next activation and adds 1 Exposure.", GUARD.social),
  "Shared Purpose": rule(CHECK.social, [...STATE.social, ...STATE.team], "On Success, establish the crew's immediate purpose and boundary; one later crew pressure check that invokes it gains +2 TS from the Team lane. Partial grants the bonus and adds 1 Exposure.", GUARD.team),
  "Clean Lie": rule(CHECK.social, STATE.social, "On Success, preserve the one plausible false premise through the challenge and reduce Exposure by 1. Partial preserves it without reducing Exposure and adds 1 Trace.", GUARD.social),
  "Directed Distraction": rule(CHECK.social, STATE.social, "On Success, grant one declared ally a short scene-access opening or reduce that ally's Exposure by 1 on the immediate action. Partial grants the opening and adds 1 Exposure.", GUARD.social),
  "Controlled Frame": rule(CHECK.social, STATE.social, "On Success, establish one dominant public question or interpretation until contrary evidence breaks it; the next aligned social check gains +2 TS. Partial establishes it and adds 1 Exposure.", GUARD.social),
  "Terms of Pressure": rule(CHECK.social, STATE.social, "On Success, the target may take the stated compliance path or accept the declared credible consequence; their Disposition shifts one step toward compliance. Partial makes the shift temporary and adds escalation or 1 Exposure.", GUARD.social),
  "Local Procedure": rule(CHECK.knowledge, STATE.knowledge, "On Success, create one Op Knowledge fact identifying an unwritten local rule and its access, safety, or reputation consequence before it is violated. Partial identifies the rule with one uncertainty.", GUARD.knowledge),
  "Salvage Broker": rule(CHECK.social, STATE.social, "On Success, convert verified salvage into one bounded trade, credit, or requisition permission. Partial creates the path with delayed liquidity, one obligation, or 1 Exposure.", GUARD.social),
  "Credential Read": rule(CHECK.knowledge, STATE.knowledge, "On Success, create one Op Knowledge fact naming what the visible credential plausibly authorizes, who verifies it, and where its authority ends. It grants no access by itself; Partial leaves one boundary uncertain.", GUARD.knowledge),
  "Accord Under Fire": rule(CHECK.social, STATE.social, "On Success, preserve one existing negotiated boundary between the hostile or frightened parties through the immediate crisis. Partial preserves it through the current activation and adds 1 Exposure or escalation.", GUARD.social),

  "Commanding Persona": rule(CHECK.validation, STATE.social, "While the stance addresses the declared audience and purpose, the next attention-control or aligned social Setup check gains +2 TS; contrary evidence or a changed audience ends the stance.", GUARD.social),
};

export const ABILITY_RULE_OVERRIDE_NAMES: ReadonlySet<string> = new Set(
  Object.keys(ABILITY_RULE_OVERRIDES),
);

export function deriveAbilityRulesImpact(
  name: string,
  effect: string,
  type: AbilityType,
  tags: CoverageTag[],
): AbilityRulesImpact {
  const primaryTag = primaryRulesTag(tags);
  const generic = deriveRulesImpact(
    type,
    primaryTag ? [primaryTag] : tags,
  );
  const derived: AbilityRulesImpact = {
    ...generic,
    resultBands: deriveCandidateResult(name, effect, type, tags),
  };
  const override = ABILITY_RULE_OVERRIDES[name];
  return override ? { ...derived, ...override } : derived;
}
