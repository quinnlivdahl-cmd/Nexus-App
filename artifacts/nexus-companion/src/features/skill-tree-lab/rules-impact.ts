import type { AbilityRulesImpact, AbilityType, CoverageTag } from "./types";

const has = (tags: CoverageTag[], tag: CoverageTag) => tags.includes(tag);

const RULE_SURFACE_TERM =
  /(?:\bTS\b|\bAP\b|\bMP\b|Lattice|Effective Defense|Defense|Firewall|Health|System Integrity|Shield|Mitigation|\bStatus\b|Disposition|Exposure|Trace|Op Knowledge|Hazard Rating|Injury Severity|Downed|Disabled|result band|Graze|Hit|Direct|Partial|Success|Failure)/i;

export const RULES_EFFECT_MARKER = "Proposed rules effect:";

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
    stateSurfaces: ["Disposition", "Exposure", "Trace", "Op Knowledge"],
    resultBands:
      "Success shifts Disposition or Exposure by one step, creates one Op Knowledge fact, or grants the named scene permission. Partial grants that result with Trace, an obligation, or another declared After Effect.",
    guardrail:
      "A revealed option is not automatic success. The target, method, resource, and scene state must still validate.",
  };
}
