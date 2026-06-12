---
name: nexus-issue-closeout-scan
description: Use when scanning Nexus GitHub issues to find issues whose substantive work is complete and only closeout mechanics remain, or whose closure is blocked by one or two small routing or acceptance decisions.
metadata:
  short-description: Close closeout-ready Nexus issues
---

# Nexus Issue Closeout Scan

Use this skill for Nexus repo issue sweeps where the goal is to formally close issues that are already done in substance.

## Core Distinction

Do not search for "admin issues" as a category. Search for any issue whose only remaining work is administrative closeout:

- local validation;
- repo index or roadmap update;
- commit and push;
- final issue evidence comment;
- GitHub issue close;
- one or two small user decisions about routing, acceptance, or closeout wording.

If an issue still needs design, implementation, source promotion, missing files, live labels/milestones, validation, or more than two material decisions, leave it open and explain why.

## Required First Pass

1. Inspect the local repo state with `git status --short --branch` and `git remote -v`.
2. Inspect repo instructions before acting: root/workspace `AGENTS.md`, repo `AGENTS.md`, `NEXUS_ISSUE_INDEX.md`, and any transition or handoff file named by the task.
3. Fetch the live open issue list from GitHub. Use `gh`, the GitHub connector, or the GitHub API; do not rely on memory.
4. For likely candidates, read the issue body, comments, local files, and commit history needed to verify acceptance criteria.

## Classification

Classify each likely candidate as one of:

- `closeout-ready`: acceptance criteria are satisfied and only closeout mechanics remain.
- `decision-ready`: acceptance criteria are almost satisfied, but one or two small decisions control closure.
- `not-closeout-ready`: substantive work remains.
- `blocked`: closure depends on missing permissions, unavailable source truth, failed validation, or user decisions larger than the current batch.

Use evidence, not vibes. Quote issue numbers, file paths, commits, and checks.

## Decision Prompts

For `decision-ready` issues, present only the blocking decisions and the consequence of each option. Good prompts are route-level:

- keep this as an evolving draft, a preservation packet, or a source-draft candidate;
- close as completed, close as not planned, or leave open;
- update the index only, or also update roadmap/bridge docs.

Do not ask questions that can be answered by inspecting files or GitHub.

## Closeout Sequence

For each issue approved or verified for closure:

1. Make any required repo edits, keeping them scoped to the issue.
2. Run the relevant validation commands when practical.
3. Update `NEXUS_ISSUE_INDEX.md` and any controlling index so the issue state matches reality.
4. Commit and push repo changes before claiming GitHub-visible completion.
5. Add a final GitHub issue comment with evidence: files changed, commit, validation, and why acceptance is satisfied.
6. Close the issue with the correct state reason.
7. Re-fetch the issue or issue list to confirm it is closed.

If push or GitHub write access fails, stop after local commit/validation and report the exact remaining closeout steps.

## Output

Report:

- issues closed;
- decision-ready issues still waiting on user choice;
- issues left open and why;
- files changed;
- commits pushed;
- checks run or skipped.
