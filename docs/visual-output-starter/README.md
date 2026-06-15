# Codex Visual Output Starter Toolkit

Status: starter scaffold
Controlling issue: GitHub Issue #51

## Purpose

This toolkit helps Codex produce useful visual outputs that are not image generation.

Visual output means reviewable artifacts such as dashboards, charts, diagrams, documentation sites, terminal dashboards, and quick local data apps. The goal is to give future Codex sessions a small set of reusable lanes instead of downloading random repos or growing the Nexus app architecture by accident.

## Landing Spot Decision

Use this folder as the planning and example home:

`docs/visual-output-starter`

Use this skill as the agent guidance entrypoint:

`.agents/skills/codex-visual-output-starter/SKILL.md`

Use the existing React sandbox as the first runnable web UI lane:

`artifacts/mockup-sandbox`

This is intentionally narrow. The first pass does not add new package workspaces, install MkDocs, install Mermaid CLI, install Textual, or change the live Nexus companion app. Those tools can be added later when a real artifact needs them.

## Approved Lanes

| Lane | Use when | First local home | Minimal example |
|---|---|---|---|
| React dashboard | The user needs a polished inspectable web surface, cards, charts, filters, or review UI. | `artifacts/mockup-sandbox` | `examples/react-dashboard/review-surface-brief.md` |
| Charts and metrics | The output is mostly trend, count, category, or validation evidence. | `artifacts/mockup-sandbox` with Recharts | `examples/charts/issue-health-chart-spec.md` |
| Mermaid diagram | The output is architecture, flow, sequence, dependency, or state transition documentation. | Markdown docs | `examples/mermaid/session-closeout-flow.md` |
| React Flow / node map | The user needs an interactive node graph, workflow map, ability tree, route map, or dependency explorer. | Future React lane, usually `artifacts/mockup-sandbox` | `examples/react-flow/ability-tree-spec.md` |
| MkDocs Material docs | The user needs a small navigable documentation site, handbook, or reusable knowledge surface. | Future docs app or exported static site | `examples/docs-mkdocs/mkdocs-material-plan.md` |
| Rich/Textual terminal UI | The user needs a local command-line dashboard, queue browser, status screen, or operator console. | Future Python utility under `scripts/` or a tool repo | `examples/terminal-textual/issue-console-spec.md` |
| Streamlit quick dashboard | The user needs a fast local Python dashboard for CSV, JSON, validation, or exploratory data. | Future Python utility under `scripts/` or a tool repo | `examples/streamlit/source-audit-dashboard-spec.md` |

## Selection Rule

Pick the smallest lane that makes the work easier to inspect.

- Use Markdown plus Mermaid for durable architecture and process explanation.
- Use the React sandbox when visual polish, responsive UI, interactivity, or app-like review matters.
- Use React Flow when the main object is a connected graph, not a table.
- Use MkDocs when the output is a reference site with navigation.
- Use Rich/Textual when the user wants a terminal-native tool.
- Use Streamlit when the fastest useful artifact is a local data dashboard.

## Do Not Do By Default

- Do not use this toolkit for image generation or image editing.
- Do not alter Nexus game/source authority docs just to demonstrate a visual lane.
- Do not add heavy dependencies without a concrete artifact request.
- Do not replace `artifacts/nexus-companion` with a visual-output experiment.
- Do not create a production dashboard when a reviewable starter surface is enough.

## Current Reusable Assets

`artifacts/mockup-sandbox` already provides a Vite + React + shadcn/ui + Recharts-capable sandbox. Future dashboard or chart prototypes should usually start there before adding another web app.

## Validation Expectations

For documentation-only outputs:

- Run `corepack pnpm run validate:workflow` when workflow/index constraints are affected.
- Inspect rendered Mermaid syntax when a diagram is central to the deliverable.

For React sandbox outputs:

- Run `corepack pnpm --filter ./artifacts/mockup-sandbox run typecheck`.
- Run `corepack pnpm --filter ./artifacts/mockup-sandbox run build`.
- Open the local preview when a user-facing surface is produced.

For Python quick dashboards:

- Prefer a local virtual environment or existing project runtime.
- Record required packages beside the script before asking the user to rely on it.
