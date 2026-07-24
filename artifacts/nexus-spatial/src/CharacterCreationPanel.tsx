import {
  PLAYER_CHARACTER_CATALOG,
  type PlayerCharacterAbilityDefinition,
  type PlayerCharacterCreationConfig,
  type PlayerCharacterDraftProjection,
  type SpatialRuntime,
} from "@workspace/spatial-runtime";
import { type FormEvent, useState } from "react";

function AbilityChoice({
  ability,
  selectedAbilityId,
  onSelect,
}: {
  readonly ability: PlayerCharacterAbilityDefinition;
  readonly selectedAbilityId: string;
  readonly onSelect: (abilityId: string) => void;
}) {
  return (
    <label className="ability-choice">
      <input
        type="checkbox"
        name="level-0-ability"
        value={ability.id}
        checked={selectedAbilityId === ability.id}
        onChange={(event) => onSelect(event.target.checked ? ability.id : "")}
      />
      <span>
        <strong>{ability.name}</strong>
        <small>
          Tier {ability.tier} · max rank {ability.maxRank}
          {ability.prerequisiteIds.length > 0
            ? ` · ${ability.prerequisiteLogic} prerequisites: ${ability.prerequisiteIds.join(", ")}`
            : " · no prerequisites"}
        </small>
      </span>
    </label>
  );
}

export function CharacterCreationPanel({
  runtime,
  configuration,
  committedDraft,
}: {
  readonly runtime: SpatialRuntime;
  readonly configuration: PlayerCharacterCreationConfig;
  readonly committedDraft: PlayerCharacterDraftProjection | null;
}) {
  const [displayName, setDisplayName] = useState("Relay Scout");
  const [selectedAbilityId, setSelectedAbilityId] = useState("");
  const [startingLoadoutId, setStartingLoadoutId] = useState(
    configuration.startingLoadouts[0]?.id ?? "",
  );
  const [status, setStatus] = useState<string | null>(null);

  let abilityCount = 0;
  for (const attribute of PLAYER_CHARACTER_CATALOG.attributes)
    for (const skill of attribute.skills)
      for (const focus of skill.focuses) abilityCount += focus.abilities.length;
  for (const branch of PLAYER_CHARACTER_CATALOG.sharedBranches)
    abilityCount += branch.abilities.length;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAbilityId) {
      setStatus("Select one Level-0 Ability before creating the draft.");
      return;
    }
    const shell = runtime.getShellProjection();
    const result = runtime.dispatch({
      type: "player-character.create-draft",
      commandId: `player-draft-at-revision-${shell.revision}`,
      expectedRevision: shell.revision,
      draft: {
        draftId: "player-character-draft",
        displayName,
        level: 0,
        catalogId: PLAYER_CHARACTER_CATALOG.catalogId,
        catalogVersion: PLAYER_CHARACTER_CATALOG.catalogVersion,
        selectedAbilityIds: [selectedAbilityId],
        startingLoadoutId,
      },
    });
    setStatus(
      result.accepted
        ? "Level-0 Player Character draft committed to campaign state."
        : result.event.type === "command.rejected"
          ? result.event.reason
          : "Draft was not committed.",
    );
  };

  return (
    <section className="character-creation" aria-labelledby="character-creation-heading">
      <div className="character-creation-heading">
        <div>
          <p className="eyebrow">Character Creation · Level 0 tracer</p>
          <h2 id="character-creation-heading">Provisional Skill Tree</h2>
        </div>
        <p>
          {PLAYER_CHARACTER_CATALOG.attributes.length} Attributes · {abilityCount} Abilities ·{" "}
          {PLAYER_CHARACTER_CATALOG.sharedBranches.length} Shared Branches
        </p>
      </div>
      <p id="catalog-version" className="catalog-version">
        Catalog <code>{PLAYER_CHARACTER_CATALOG.catalogId}</code> at immutable version{" "}
        <code>{PLAYER_CHARACTER_CATALOG.catalogVersion}</code>. The Issue #112 fixture allows exactly{" "}
        {configuration.level0AbilityAllowance} selected Ability.
      </p>

      <form onSubmit={submit} aria-describedby="catalog-version character-creation-status">
        <div className="draft-fields">
          <label>
            Character name
            <input
              required
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </label>
          <label>
            Starting Loadout
            <select
              value={startingLoadoutId}
              onChange={(event) => setStartingLoadoutId(event.target.value)}
            >
              {configuration.startingLoadouts.map((loadout) => (
                <option key={loadout.id} value={loadout.id}>
                  {loadout.label} · {loadout.itemIds.join(" + ")}
                </option>
              ))}
            </select>
          </label>
        </div>

        <section className="skill-catalog" aria-labelledby="skill-catalog-heading">
          <h3 id="skill-catalog-heading" className="catalog-heading">
            Complete provisional Skill Tree catalog
          </h3>
          {PLAYER_CHARACTER_CATALOG.attributes.map((attribute) => (
            <section key={attribute.id} className="attribute-branch">
              <h3>{attribute.name}</h3>
              {attribute.skills.map((skill) => (
                <section key={skill.id} className="skill-branch">
                  <h4>{skill.name}</h4>
                  {skill.focuses.map((focus) => (
                    <fieldset key={focus.id}>
                      <legend>{focus.name}</legend>
                      {focus.abilities.map((ability) => (
                        <AbilityChoice
                          key={ability.id}
                          ability={ability}
                          selectedAbilityId={selectedAbilityId}
                          onSelect={setSelectedAbilityId}
                        />
                      ))}
                    </fieldset>
                  ))}
                </section>
              ))}
            </section>
          ))}
          <section className="attribute-branch shared-branches">
            <h3>Shared Branches</h3>
            {PLAYER_CHARACTER_CATALOG.sharedBranches.map((branch) => (
              <fieldset key={branch.id}>
                <legend>{branch.name}</legend>
                <p className="branch-requirement">
                  {branch.prerequisiteLogic} skills: {branch.skillIds.join(", ")}
                </p>
                {branch.abilities.map((ability) => (
                  <AbilityChoice
                    key={ability.id}
                    ability={ability}
                    selectedAbilityId={selectedAbilityId}
                    onSelect={setSelectedAbilityId}
                  />
                ))}
              </fieldset>
            ))}
          </section>
        </section>

        <button type="submit" className="commit-draft">Commit Level-0 draft</button>
        <p id="character-creation-status" role="status" aria-live="polite">
          {status}
        </p>
      </form>

      <section className="committed-draft" aria-label="Committed Player Character draft">
        <h3>Campaign Build</h3>
        {committedDraft ? (
          <dl>
            <div><dt>Draft ID</dt><dd>{committedDraft.draftId}</dd></div>
            <div><dt>Name</dt><dd>{committedDraft.displayName}</dd></div>
            <div><dt>Level</dt><dd>{committedDraft.level}</dd></div>
            <div><dt>Ability</dt><dd>{committedDraft.selectedAbilityNames.join(", ")}</dd></div>
            <div><dt>Ability ID</dt><dd>{committedDraft.selectedAbilityIds.join(", ")}</dd></div>
            <div><dt>Loadout</dt><dd>{committedDraft.startingLoadoutLabel}</dd></div>
            <div><dt>Loadout ID</dt><dd>{committedDraft.startingLoadoutId}</dd></div>
            <div><dt>Loadout items</dt><dd>{committedDraft.startingLoadoutItemIds.join(", ")}</dd></div>
            <div><dt>Catalog</dt><dd>{committedDraft.catalogId}</dd></div>
            <div><dt>Version</dt><dd>{committedDraft.catalogVersion}</dd></div>
          </dl>
        ) : (
          <p>No Player Character draft has been committed.</p>
        )}
      </section>
    </section>
  );
}
