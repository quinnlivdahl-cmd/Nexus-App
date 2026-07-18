# Retired Drive Context Bundle contract

The planned Drive mirror of current Nexus repo documentation is **retired**. GPT retrieves current context directly from GitHub through the repo bridge. The machine-readable compatibility record lives at `app/data/drive-context-bundle-manifest.json` and intentionally has no publication entries.

Drive remains the owner for bulky payloads, exports, workbench outputs, and handoff bundles named by the maintained distributed-surfaces registry. It is not a mirror for canonical source, ADRs, issue state, or repo instructions.

## Publication rules

1. Do not publish current repo documentation into a Drive context bundle.
2. Retrieve canonical source, ADRs, instructions, and issue state from GitHub.
3. Use Drive only when a task explicitly needs an off-repo bulky payload.
4. Any Drive mutation still requires explicit owner approval and exact target verification.

The legacy manifest remains only so the timestamped dashboard schema can report the lane as retired without silently dropping provenance.
