---
name: nexus-issue-closeout-scan
description: Use when scanning Nexus GitHub issues for near-complete work that can be quickly finished, formally closed, and synchronized across GitHub, repo indexes, roadmap/bridge references, and final reports.
metadata:
  short-description: Finish and close near-complete Nexus issues
---

# Nexus Issue Closeout Sprint

Use this skill for Nexus repo issue sweeps where the goal is to quickly finish near-complete issues and unify closure status everywhere the work is tracked.

## Core Distinction

Do not search for "admin issues" as a category. Search for issues where the remaining work is small enough to close in the same batch:

- one or two small acceptance, routing, or wording decisions;
- a small missing doc/code/index edit;
- a quick evidence or cross-link update;
- local validation;
- repo index, roadmap, bridge, skill, or handoff status update;
- commit and push;
- final issue evidence comment;
- GitHub issue close.

If an issue still needs non-trivial design, implementation, source promotion, missing major files, live label/milestone setup, broad validation, or more than two material decisions, leave it open and explain why.

## Required First Pass

1. Inspect the local repo state with `git status --short --branch` and `git remote -v`.
2. Inspect repo instructions before acting: root/workspace `AGENTS.md`, repo `AGENTS.md`, `NEXUS_ISSUE_INDEX.md`, and any transition or handoff file named by the task.
3. Fetch the live open issue list from GitHub. Use `gh`, the GitHub connector, or the GitHub API; do not rely on memory.
4. For likely candidates, read the issue body, comments, local files, and commit history needed to verify acceptance criteria.

## Classification

Classify each likely candidate as one of:

- `quick-close`: one small finishing pass plus closeout mechanics should complete it.
- `closeout-ready`: acceptance criteria are satisfied and only closeout mechanics remain.
- `decision-ready`: acceptance criteria are almost satisfied, but one or two small decisions control completion or closure.
- `not-closeout-ready`: substantive work remains.
- `blocked`: closure depends on missing permissions, unavailable source truth, failed validation, or user decisions larger than the current batch.

Use evidence, not vibes. Quote issue numbers, file paths, commits, and checks.

Prefer closing a small coherent batch over auditing the whole repo forever. When many candidates exist, start with the highest-confidence `quick-close` and `closeout-ready` issues, then report the remaining candidates.

## Decision Prompts

For `decision-ready` issues, present only the blocking decisions and the consequence of each option. Good prompts are route-level:

- keep this as an evolving draft, a preservation packet, or a source-draft candidate;
- close as completed, close as not planned, or leave open;
- update the index only, or also update roadmap/bridge docs.

Do not ask questions that can be answered by inspecting files or GitHub.

## Quick Finishing Work

For `quick-close` issues, finish only the last small piece needed for formal closure. Good examples:

- add a missing cross-link from an index to an already-created artifact;
- add a short bridge, roadmap, skill, or README pointer to already-accepted workflow;
- move an issue from an open table to completed evidence;
- add a final acceptance note or status caveat;
- run a known validation command and record the result.

Do not expand the issue into new design, implementation, cleanup, migration, or source-promotion work. If the issue tries to grow, reclassify it as `not-closeout-ready` or ask for the one controlling decision.

## Closeout Sequence

For each issue approved or verified for closure:

1. Make any required quick finishing edits, keeping them scoped to the issue.
2. Run the relevant validation commands when practical.
3. Update `NEXUS_ISSUE_INDEX.md` and every relevant status surface so the issue state matches reality.
4. Commit and push repo changes before claiming GitHub-visible completion.
5. Add a final GitHub issue comment with evidence: files changed, commit, validation, and why acceptance is satisfied.
6. Close the issue with the correct state reason.
7. Re-fetch the issue or issue list to confirm it is closed.

Relevant status surfaces may include:

- GitHub issue state, labels, milestone, and final comment;
- `NEXUS_ISSUE_INDEX.md`;
- `NEXUS_ISSUE_TRANSITION.md` when it still carries current queue truth;
- `docs/nexus-roadmap/ROADMAP.md` and `ROADMAP-INDEX.md` when roadmap lane issue lists changed;
- `docs/chatgpt-project-bridge` indexes or packets when bridge visibility changed;
- repo-local skills, templates, handoffs, or task packets that name the issue;
- final report and reupload warnings.

If the closeout changed any ChatGPT Project bridge upload-set file under `docs/chatgpt-project-bridge`, the final report must include a visible reupload warning naming the changed upload-set files. Do not call ChatGPT Project current until upload/paste and confirmation have happened.

If push or GitHub write access fails, stop after local commit/validation and report the exact remaining closeout steps.

## Output

Report:

- issues closed;
- quick finishing work performed;
- status surfaces synchronized;
- decision-ready issues still waiting on user choice;
- issues left open and why;
- files changed;
- commits pushed;
- checks run or skipped.
