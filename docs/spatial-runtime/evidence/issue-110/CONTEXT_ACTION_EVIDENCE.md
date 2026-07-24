# Issue 110 Context Action Evidence

## Automated scenario

The focused `resolve-and-persist-one-authored-context-action` scenario enters the Relay Console through the public runtime path command, then resolves the approved routine actions through `SpatialRuntime.resolveContextAction`.

- `relay.activate` is rejected before the exposed cable feed is isolated with: `Isolate the exposed cable feed before activating the relay.`
- `relay.isolate-cable-feed` has no Check, commits once at its declared revision, and reports: `Cable feed isolated.`
- An injected first checkpoint-write failure retains that committed current truth, leaves the durable revision behind, reports degraded durability without a saved claim, blocks activation, and exposes retry with: `Cable feed isolated. Active in this session, but not saved.` and `Saving is degraded. Retry the checkpoint before activating the relay.`
- Retry persists the existing committed revision without replaying the isolation action. Relay activation then completes the Location objective and persists through the same rolling adapter.
- A new runtime restores the saved state through `continueFromCheckpoint`; the test proves the restored relay/objective facts and persisted transaction without emitting a Context Action commit.
- Same-input duplicates return their existing transaction. Reusing that input identity for a different action is rejected without changing Game Truth.
- Stale, blocked, structurally invalid, and pre-commit serialization failures preserve the complete snapshot.
- Version-1 payloads without Context Action additions decode with safe defaults, while transaction Effects and StateDeltas survive an encode/decode round trip.
- Shell, render, menu, transaction, and Developer projections are immutable.

## Browser evidence

Manual evidence was captured in a fresh Chrome 150 headless window launched at 1440 x 900 against `http://127.0.0.1:5193/?failCheckpoint=once`. The capture viewport was 1424 x 869 after Chrome window chrome and scrollbars. The keyboard-operable DOM path control exercised the same Relay Console selection callback exposed by Pixi.

| Capture | Observed result |
| --- | --- |
| [01 relay menu blocked](./01-relay-menu-blocked.png) | Pathing reached the Relay Console. `Isolate cable feed` was available with no Check; `Activate relay` was blocked by the exposed cable explanation. |
| [02 checkpoint degraded](./02-checkpoint-degraded.png) | Isolation committed at current revision 137 while durable revision remained 0. The UI said the action was active in-session but not saved, exposed Retry, removed the active hazard marker, and blocked activation with the degraded-saving explanation. |
| [03 checkpoint retried](./03-checkpoint-retried.png) | Retry made current and durable revision both 137, retained `Cable feed isolated.` as the latest resolved action, and enabled activation without replay. |
| [04 relay activated](./04-relay-activated.png) | Activation committed and checkpointed at current/durable revision 138. Cable remained isolated, relay became active, latest action became `Relay activated.`, and the completed objective marker left the active marker projection. |
| [05 Continue restored](./05-continue-restored.png) | After reload and Continue, DOM and Developer Mode both reported current/durable revision 138. `lastEvent` was `checkpoint.restored`; the persisted `relay.activate` transaction remained revision 137 to 138 with `check: not-required`, Effects, and StateDeltas. No Context Action commit was emitted during restore. |
| [06 invalid-save recovery](./06-invalid-save-recovery.png) | An invalid rolling checkpoint was neither activated nor deleted. The app started the traversal fixture, displayed the recovery error, and exposed `Start fresh fixture`; the invalid stored bytes remained present during the check. |

`capture-playtest.ps1` is the bounded Chrome DevTools Protocol capture helper used to evaluate the live DOM and save these screenshots. The valid revision-138 envelope was restored after the invalid-save check.

## Validation

- `corepack pnpm run spatial:typecheck`
- `corepack pnpm run spatial:build`
- `corepack pnpm run spatial:test -- --scenario launch-one-spatial-runtime-tracer`
- `corepack pnpm run spatial:test -- --scenario render-and-approve-the-production-intent-seed`
- `corepack pnpm run spatial:test -- --scenario traverse-the-authored-three-area-derelict`
- `corepack pnpm run spatial:test -- --scenario resolve-and-persist-one-authored-context-action`
- `corepack pnpm run validate:workflow`
- `git diff --check`

All commands passed locally. The production build retained the existing non-blocking Vite chunk-size advisory.

## Migration inventory

No legacy implementation input was touched. The implementation extends the existing spatial-runtime seam and additive codec-v1 payload only; see `docs/spatial-runtime/MIGRATION_INVENTORY.md`.
