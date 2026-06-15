---
name: codex-visual-output-starter
description: Use when creating or improving non-image visual outputs for Codex work, including dashboards, charts, Mermaid diagrams, React Flow maps, MkDocs sites, Rich/Textual terminal dashboards, or Streamlit quick dashboards.
---

# Codex Visual Output Starter

Use this skill when the user asks for visual outputs that are not image generation, such as dashboards, diagrams, review surfaces, docs sites, terminal UIs, or quick data dashboards.

Read first:

1. `docs/visual-output-starter/README.md`
2. The example file for the lane you are considering under `docs/visual-output-starter/examples/`
3. Existing app or artifact instructions for the target folder, such as `artifacts/mockup-sandbox` or the live app folder when the user explicitly requests app UI work

## Lane Selection

Pick the smallest useful lane:

- Markdown plus Mermaid for architecture, process, dependency, and state diagrams.
- `artifacts/mockup-sandbox` for polished React dashboards, review surfaces, charts, and UI previews.
- React Flow only when a connected graph needs interaction.
- MkDocs Material only when a small documentation site needs navigation or search.
- Rich/Textual only when the output should live in the terminal.
- Streamlit only for fast local data inspection from CSV, JSON, or generated reports.

## Workflow

1. Identify the review need: what should become easier to see, compare, or decide?
2. Choose one lane and name why it fits.
3. Reuse existing repo assets before adding dependencies.
4. Keep the first artifact narrow, inspectable, and easy to delete or evolve.
5. Validate with the lane's normal checks.
6. Report the exact path and how to open or run it.

## Boundaries

- Do not use this skill for image generation or image editing.
- Do not change Nexus source authority documents unless the task explicitly requires it.
- Do not add a new framework or dependency stack for a planning-only artifact.
- Do not alter the live Nexus companion app when a sandbox or documentation artifact will satisfy the request.
- Do not turn a support visualization into a production product unless the user asks for that.
