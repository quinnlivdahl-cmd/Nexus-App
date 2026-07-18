# Lattice_Opportunities_Ticker_and_Partial_Consequences_Contract_rev0.1

Controlling issue: Define Lattice opportunities, ticker, and partial consequences #19
Parent map: Spatial Vertical Slice Map #57
Date opened: 2026-07-17
Scope: spatial vertical-slice behavior and canonical-source reconciliation; no production implementation

## 1. Purpose

This contract defines how the spatial vertical slice makes Lattice Check Opportunities legible, resolves visible and hidden Checks, reports results through a nonmodal Lattice Ticker, and applies only consequences that Rules Core can validate from existing mechanics and Game Truth.

It specializes accepted [ADR-0011](../../adr/0011-lattice-100-and-visible-rolls-remain-core.md), [ADR-0076](../../adr/0076-freeform-actions-use-existing-rules-beyond-authored-actions.md), and the [Spatial Action Validation and Commit Transaction Contract](Spatial_Action_Validation_and_Commit_Transaction_Contract_rev0.1.md). Lattice-100 remains visible and authoritative. Rules Core remains the only authority that selects final mechanics, resolves a Check, authorizes Effects and StateDeltas, and commits Game Truth.

## 2. Check Opportunity

A **Check Opportunity** is a currently available or discoverable way to act that may require Lattice-100 resolution if uncertainty and meaningful stakes remain. It is not a promise that selecting the interaction will cause a roll. Thresholds, equipment, prior preparation, or current fiction may make the action routine.

An object with at least one known action remains visually recognizable as something the player can inspect or use even when optional interaction markers are disabled. The spatial surface may also show an optional general interaction marker. Hovering the recognizable object or its general marker reveals the known action indicators. Selecting the object opens its detailed Context Action Menu.

The marker answers only, “Is there something known to do here?” The detailed action surface answers what the actions are and whether any currently require a Check.

Known but currently unavailable actions may remain visible in a disabled state when the reason is useful, correctable, and safe to reveal, such as needing power, a tool, or another qualified character. Secret or undiscovered actions remain absent.

If a discovery adds the first known action to an object, the object gains the general interaction affordance. If the object already has one, the new action joins the known hover and detail surfaces. Exact marker shapes, icon families, counters, tiny ticks, animations, and screen layout belong to later UI work.

## 3. Team-aware deliberate Checks

Opportunity recognition considers the deployed Field Team rather than requiring the player to cycle characters to find possible actions.

When a deliberate Check is needed:

- the currently controlled eligible character is the default lead;
- the player may choose another eligible lead;
- the system never silently substitutes the character with the best odds;
- qualified assistance is shown as an optional player choice, including its known mechanical benefit and risk; and
- each Check uses one lead attempt, not one attempt per party member.

The ordinary preview shows the selected lead, Skill or approach, final Target Score or equivalent success chance, obvious or known modifiers, and broad known stakes. The shown chance of success includes both clean and Partial Success because both accomplish the main objective. The clean-versus-partial split remains hidden unless an ability, equipment rule, or other validated information effect reveals it.

Abilities and equipment may reveal more than the baseline, including a hidden modifier, specific defense, broad After Effect family, exact consequence, or safer route. A lower-information effect may reveal only the type of After Effect; a stronger effect may reveal the exact validated effect. Issue #31 owns the actual ability designs.

## 4. Adaptive Check proposals

The Campaign Director may respond like a good DM by proposing a situation-specific Check when the player attempts a grounded action that authored options did not anticipate. A proposal may include:

- the interpreted approach or Skill;
- the relevant target or obstacle;
- why uncertainty warrants a Check; and
- proposed success, failure, and consequence meanings.

The proposal cannot create a new mechanic, state type, object, item, ability, permission, or effect. Rules Core must translate the proposal into existing Check families, Target Score rules, result bands, Effects, and StateDeltas, validate them against current Game Truth, and reject or revise anything unsupported before the roll.

Freeform Dialogue may offer grounded suggested approaches while still accepting freeform player input. Suggestions are never the only legal choices. Generated Performance occurs only after the validated result commits and may not change it.

## 5. Hidden Passive Checks

Each eligible Field Team member rolls once for a hidden Passive Check opportunity. Eligibility may differ because of senses, knowledge, status, equipment, position, or another rules-native fact. The vertical slice normally keeps the deployed crew together, so all three are commonly eligible; this contract does not define a broader production split-crew policy.

If every eligible member fails, the Lattice Ticker creates one grouped `Opportunity missed` entry. It reveals no Skill, Target Score, character name, roll count, or secret content. This notice is visible by default and may be hidden by a player setting.

If anyone succeeds, the ticker creates one grouped discovery entry. Its compact form identifies a discoverer and the revealed result. Once the information is no longer secret, the expanded history may show all eligible rolls.

A hidden Passive Check failure creates no additional negative Effect. An unseen hazard may later cause trouble through its own rules, but not because the crew failed a discovery roll.

Each eligible actor rolls only once per opportunity state. Leaving and returning, changing the controlled character, or reopening the same object does not create another roll. A new roll requires a meaningful state change, newly eligible actor, newly arrived actor, or materially changed opportunity.

Discovered knowledge automatically becomes shared crew knowledge when the discoverer can communicate with the others. If communication is blocked, only the discoverer knows it until a validated action shares it.

## 6. Deliberate retries and Extended Checks

A failed deliberate Check cannot be repeated merely by switching the lead. Another attempt requires a materially different method, tool, information state, time commitment, or world state.

An Extended Check is not an exception. It is staged progress in which each authorized roll resolves a new meaningful beat with changed progress, pressure, risk, or state. If nothing relevant changed, there is no new roll.

## 7. Lattice Ticker

The Lattice Ticker is compact, nonmodal, and never pauses or blocks play. This contract does not select its exact screen position or its relationship to other HUD elements.

For a visible result, the compact entry communicates the acting character and Skill, followed by the roll, Target Score, and result band. Example:

```text
Mara — Engineering
42 vs 61 — Success
```

An expanded entry or history view may show the complete known modifier breakdown, bonuses, penalties, stakes, and committed changes. A small recent-results stack remains available after the brief result display, and the player can open normal readable history without pausing. Developer Mode may show the complete technical record, including hidden inputs and validation diagnostics.

The visible roll animation quickly cycles random numbers in place for less than one second, then settles on the already-resolved roll. Rules Core determines the result before the animation begins. The animation cannot influence, delay, reroll, or gate the commit.

Hidden consequences disclose the roll and band plus only the changes the character can currently observe. Secret causes, hidden Effects, or unrevealed future consequences remain concealed from ordinary play until discovered. Developer Mode retains the full record, and validated abilities or equipment may reveal information early.

## 8. Validated result bands

The five-band noncombat Lattice ladder remains the starting result-band set for a Check:

```text
Strong Success
Success
Partial Success
Failure
Hard Failure
```

The ladder does not require every Check to invent a distinct special outcome for every band. Before the roll, Rules Core validates the outcome attached to each special band. If the current action and scene do not support a real result for that band, it collapses into the nearest basic anchor:

| Unsupported special band | Resolves as |
|---|---|
| Strong Success without a meaningful added benefit | Success |
| Partial Success without a valid adverse After Effect | Success |
| Hard Failure without a valid serious adverse After Effect | Failure |

Ordinary Success means the objective is achieved. Ordinary Failure means it is not achieved. Neither requires an added After Effect.

This rule does not alter combat Graze. Attack Checks continue using the combat result-band set and the applicable weapon, action, defense, and effect rules.

## 9. Partial Success and After Effects

A valid noncombat Partial Success means the main objective succeeds and exactly one adverse After Effect applies. The effect must already be supported by current Game Truth and existing After Effect mechanics, including:

- Tag Bite;
- Cost Bite: Tempo, Material, Obligation, or Trace;
- Counter Bite;
- Route Bite; or
- Op / Adverse Operating Bite.

The Campaign Director may propose how the player's approach connects to an After Effect, but Rules Core validates the source, scope, trigger, mechanical effect, and authorized StateDeltas before the roll. By default, the system applies the valid After Effect most directly caused by the player's approach and current scene. It does not choose the harshest option or a random punishment, and the player is not forced to choose a negative effect after the roll.

An explicit ability or equipment rule may let the player reduce, replace, redirect, or choose among validated After Effects.

If the roll lands in the Partial Success band but the prepared After Effect fails final validation and no replacement was validated before the roll, the Check resolves as ordinary Success. The runtime records the validation failure in Developer Mode and does not invent a replacement consequence after seeing the roll.

## 10. State and authority boundary

The runtime records enough Check state to reproduce and explain resolution:

- opportunity and action references;
- eligible actors and selected lead;
- assistance choice;
- Check family, Skill or approach, Target Score, and modifier provenance;
- result-band set and any prevalidated band collapses;
- roll, margin, and final band;
- player-visible and hidden information projections;
- validated Effects and StateDeltas; and
- applicable rules-policy revision.

Rules Core owns this mechanical record and the committed changes. React owns the ticker and interaction presentation through the accepted runtime boundary. Campaign Director and Generated Performance may propose or describe but do not own Game Truth.

## 11. Acceptance scenarios

The vertical slice must support these cases:

1. With markers off, a recognizable terminal still reveals known actions on hover. Selecting it opens the detailed action surface without forcing a Check.
2. The terminal exposes one known available action, one useful disabled action with a grounded reason, and no indication of an undiscovered action.
3. A deliberate Check defaults to the controlled eligible character, lets the player select another eligible lead and optional qualified assistance, and never auto-selects the best odds.
4. A freeform plan produces a Campaign Director Check proposal that Rules Core maps entirely to existing mechanics before rolling.
5. Three eligible crew members fail the same hidden Passive Check and produce one anonymous `Opportunity missed` entry with no new negative Effect.
6. One crew member discovers an opportunity; the grouped entry names a discoverer, reveals the result, and shares it with communicable teammates.
7. A Check has no grounded Hard Failure or Strong Success effect, so those bands resolve as ordinary Failure and Success while the rest of the ladder remains valid.
8. A Partial Success applies one prevalidated After Effect directly caused by the approach. A later failed validation with no prepared replacement instead resolves as Success and records a Developer Mode diagnostic.
9. The ticker cycles numbers briefly, settles on the pre-resolved roll, remains nonmodal, and provides readable history without deciding a permanent HUD position.

## 12. Deferred work

This contract deliberately leaves the following to their owners:

- exact HUD placement, icon art, marker counts, tiny tick grammar, and final interaction layout;
- concrete abilities and equipment that reveal or alter hidden Check information or After Effects (#31);
- production assistance math beyond the selected-lead boundary;
- production split-crew participation beyond the vertical slice;
- Local Aftermath and save contracts (#28); and
- final vertical-slice integration contract (#30).
