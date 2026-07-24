import { immutableCopy } from "./immutable.js";
import { PLAYER_CHARACTER_CATALOG } from "./playerCharacterCatalog.generated.js";
import type {
  PlayerCharacterCreationConfig,
  PlayerCharacterDraft,
  PlayerCharacterDraftProjection,
} from "./types.js";

export interface PlayerCharacterDraftValidationResult {
  readonly ok: boolean;
  readonly issues: readonly string[];
}

type CatalogAbility = {
  readonly id: string;
  readonly name: string;
  readonly prerequisiteIds: readonly string[];
  readonly prerequisiteLogic: "AND" | "OR";
};

const CATALOG_ABILITIES: CatalogAbility[] = [];
for (const attribute of PLAYER_CHARACTER_CATALOG.attributes)
  for (const skill of attribute.skills)
    for (const focus of skill.focuses)
      for (const ability of focus.abilities)
        CATALOG_ABILITIES.push(ability as CatalogAbility);
for (const branch of PLAYER_CHARACTER_CATALOG.sharedBranches)
  for (const ability of branch.abilities)
    CATALOG_ABILITIES.push(ability as CatalogAbility);
const ABILITY_BY_ID = new Map(
  CATALOG_ABILITIES.map((ability) => [ability.id, ability] as const),
);

export function validatePlayerCharacterCreation(
  config: PlayerCharacterCreationConfig,
  draft: PlayerCharacterDraft | null | undefined,
): PlayerCharacterDraftValidationResult {
  const issues: string[] = [];
  if (config.catalogId !== PLAYER_CHARACTER_CATALOG.catalogId)
    issues.push(`Unknown player-character catalog ${config.catalogId}.`);
  if (config.catalogVersion !== PLAYER_CHARACTER_CATALOG.catalogVersion)
    issues.push(`Unsupported player-character catalog version ${config.catalogVersion}.`);
  if (
    !Number.isInteger(config.level0AbilityAllowance) ||
    config.level0AbilityAllowance < 1
  )
    issues.push("Level-0 Ability allowance must be a positive integer.");
  const loadoutIds = new Set<string>();
  for (const loadout of config.startingLoadouts) {
    if (!loadout.id || !loadout.label.trim() || loadout.itemIds.length < 1)
      issues.push("Each Starting Loadout requires an id, label, and at least one item.");
    if (loadoutIds.has(loadout.id))
      issues.push(`Starting Loadout ${loadout.id} is duplicated.`);
    loadoutIds.add(loadout.id);
  }
  if (config.startingLoadouts.length < 1)
    issues.push("Character Creation requires at least one Starting Loadout.");

  if (draft == null) return { ok: issues.length === 0, issues };
  if (!draft.draftId || !draft.displayName.trim())
    issues.push("A Player Character draft requires an id and display name.");
  if (draft.level !== 0) issues.push("This tracer accepts only Level-0 drafts.");
  if (draft.catalogId !== config.catalogId)
    issues.push("Draft catalogId does not match Character Creation configuration.");
  if (draft.catalogVersion !== config.catalogVersion)
    issues.push("Draft catalogVersion does not match Character Creation configuration.");
  if (!Array.isArray(draft.selectedAbilityIds))
    issues.push("Draft selectedAbilityIds must be an array.");
  else {
    const selected = new Set<string>();
    for (const abilityId of draft.selectedAbilityIds) {
      if (typeof abilityId !== "string" || !ABILITY_BY_ID.has(abilityId))
        issues.push(`Unknown Ability identity ${String(abilityId)}.`);
      if (selected.has(abilityId))
        issues.push(`Ability identity ${abilityId} is selected more than once.`);
      selected.add(abilityId);
    }
    if (selected.size !== config.level0AbilityAllowance)
      issues.push(
        `Level-0 draft must select exactly ${config.level0AbilityAllowance} Ability identity.`,
      );
    for (const abilityId of selected) {
      const ability = ABILITY_BY_ID.get(abilityId);
      if (!ability || ability.prerequisiteIds.length === 0) continue;
      const satisfied =
        ability.prerequisiteLogic === "AND"
          ? ability.prerequisiteIds.every((id) => selected.has(id))
          : ability.prerequisiteIds.some((id) => selected.has(id));
      if (!satisfied)
        issues.push(`Ability ${ability.name} has unmet prerequisites.`);
    }
  }
  if (!loadoutIds.has(draft.startingLoadoutId))
    issues.push(`Unknown Starting Loadout ${draft.startingLoadoutId}.`);

  return { ok: issues.length === 0, issues };
}

export function projectPlayerCharacterDraft(
  config: PlayerCharacterCreationConfig,
  draft: PlayerCharacterDraft | null | undefined,
): PlayerCharacterDraftProjection | null {
  if (!draft) return null;
  const validation = validatePlayerCharacterCreation(config, draft);
  if (!validation.ok)
    throw new Error(
      `Cannot project invalid Player Character draft: ${validation.issues.join(" ")}`,
    );
  const loadout = config.startingLoadouts.find(
    (candidate) => candidate.id === draft.startingLoadoutId,
  )!;
  return immutableCopy({
    draftId: draft.draftId,
    displayName: draft.displayName,
    level: draft.level,
    selectedAbilityIds: draft.selectedAbilityIds,
    selectedAbilityNames: draft.selectedAbilityIds.map(
      (abilityId) => ABILITY_BY_ID.get(abilityId)!.name,
    ),
    startingLoadoutId: draft.startingLoadoutId,
    startingLoadoutLabel: loadout.label,
    catalogId: draft.catalogId,
    catalogVersion: draft.catalogVersion,
  }) as PlayerCharacterDraftProjection;
}
