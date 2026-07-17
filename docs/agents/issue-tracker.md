# Issue Tracker: GitHub

Issues and PRDs for this repo live as GitHub Issues in `quinnlivdahl-cmd/Nexus-App`. Matt Pocock engineering skills should use that repository as the live execution tracker.

## Authority and supporting surfaces

- GitHub Issues are the live execution packets.
- `NEXUS_ISSUE_INDEX.md` is the AI-readable queue mirror and control surface. Verify it against GitHub before relying on status or count.
- `NEXUS_ISSUE_TRANSITION.md` routes current work and preserves the prior Gate A-F sequence as historical migration context.
- `CORE-PILLARS-001` section 8 in canonical source owns the current spatial vertical-slice target; Spatial Vertical Slice Map #57 coordinates readiness decisions, and Integration Contract #30 will define the exact production boundary.
- `NEXUS_LOCAL_PLAYABLE_ALPHA.md` and `docs/nexus-roadmap/ROADMAP.md` preserve historical DM-chat planning evidence. Neither is a current finish line, task tracker, or game-source authority.
- `docs/nexus-game-source/source` is canonical game source. GitHub Issues describe work; they do not create game canon.

Existing roadmap items and issues remain inputs to the revised Nexus Game vision until they are explicitly retained, revised, split, superseded, or closed. Local commits do not make an issue complete. Reconcile local implementation, validation, pushed state, and live GitHub state before changing issue status.

## Nexus conventions

- Refer to numbered artifacts by a short human-readable name followed by the number, such as `Backend AI Routing #10`. Do not use a bare number in normal prose.
- Preserve issue scope, out-of-scope boundaries, `Do Not Do` constraints, dependencies, validation, review gates, and closeout evidence.
- Show a proposed issue body for review before creation or material rewriting unless the user has explicitly authorized the exact mutation.
- Keep issue state distinct from local, committed, pushed, reviewed, and merged state.
- Do not bulk-close, relabel, or rewrite the existing queue during roadmap or product-direction work.

## Operations

Matt Pocock skills may use the `gh` CLI from this checkout. Connector-enabled clients may use the GitHub app for equivalent operations against the same repository.

- Create: `gh issue create --title "..." --body "..."`
- Read: `gh issue view <number> --comments`
- List: `gh issue list --state open --json number,title,body,labels,comments`
- Comment: `gh issue comment <number> --body "..."`
- Label: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`
- Close: `gh issue close <number> --comment "..."`

Infer the repository from `git remote -v` when running locally.

## Pull requests as a triage surface

**PRs as a request surface: no.**

Pull requests may be used for implementation review and merging, but external PRs do not enter the Matt Pocock triage queue as feature requests. Issues hold requested work; PRs hold proposed changes.

GitHub shares one number space across issues and PRs. If an artifact type is unclear, resolve it before acting.

## Skill vocabulary

- When a skill says **publish to the issue tracker**, create a GitHub Issue after any required approval gate.
- When a skill says **fetch the relevant ticket**, read the GitHub Issue and its comments.
- When a skill says **resolve**, follow Nexus closeout order: validate, independently review when required, commit and push, synchronize the issue index, add closeout evidence, and then close the issue when its acceptance criteria are satisfied.

## Wayfinding

For `$wayfinder`, use one GitHub Issue as the map and linked Issues as children:

- Label the map `wayfinder:map`.
- Label children `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or `wayfinder:task`.
- Prefer GitHub sub-issues and native issue dependencies. If unavailable, use explicit `Part of` and `Blocked by` lines.
- A child is ready only when its blockers are closed and it is unassigned.
- Claim work by assigning the issue before changing project state.
- Resolve a child with evidence, close it, and add its decision or context pointer to the map.
