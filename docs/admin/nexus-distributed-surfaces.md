# Nexus Distributed Surfaces

Status: active routing reference

This file tells Codex where to look when Nexus work spans the repo, Obsidian, and Drive.

## Authority Model

| Surface | Path | Role |
| --- | --- | --- |
| Nexus-App repo | `C:\Users\Quintin Livdahl\Repos\Nexus-App` | Canonical source docs, app code, repo-trackable bridge packets, schemas, scripts, and issue/task control files. |
| Canonical source | `docs/nexus-game-source/source` | Canonical Nexus game source corpus inside the repo. |
| Obsidian Nexus notes | `C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game` | Reading layer, project memory, indexes, dashboards, current-state notes, and links into repo/Drive. |
| Obsidian source working copy | `C:\Users\Quintin Livdahl\Obsidian\20 Projects\Nexus Game\00 Source` | Promoted/readable working-copy layer for source docs. It is not independent authority over the repo canonical source. |
| Drive payloads | `G:\My Drive\10_Projects\Nexus Game` | Bulky payloads, generated outputs, handoff bundles, exports, zips, candidate runs, and Google-native files. |

## Routing Rules

- If changing a text doc changes Nexus rules, lore, design, routing, or app/source behavior, make the canonical change in the repo.
- If material is bulky, generated, exported, or Google-native, keep it in Drive and link to it from repo or Obsidian as needed.
- If material exists to help humans or Codex find, understand, or summarize current state, keep it in Obsidian as an index/current-state note.
- Before source edits, check whether the Obsidian working-copy layer has relevant drift from `docs/nexus-game-source/source`; report drift instead of silently overwriting either surface.
- Do not treat GitHub Issues, ChatGPT bridge packets, Obsidian summaries, Drive exports, or old archive paths as source authority unless a controlling task explicitly promotes their content.
- Preserve historical `legacy_paths` inside source docs as evidence. Do not rewrite them merely because the current distributed-surface model changed.

## Known Working-Copy Drift

The Obsidian source working-copy layer may contain edits that are not in the repo. As of the 2026-06-20 prep pass, these files were reported as differing from the repo canonical source:

- `Automation\Canon Homes\AUTO-DATA-003 - SRC-AUTO-003-Data-Model-and-Runtime-Source-Strategy.md`
- `Characters\Applied Rules\CHAR-ABILITY-001 - Ability_Taxonomy_and_Level_Up_Working_Model.md`
- `Characters\Canon Homes\CHAR-CHASSIS-001 - Character_Chassis_and_Build_Stack.md`
- `Characters\Canon Homes\CHAR-PROGRESSION-001 - Traits_Feats_and_Progression.md`
- `Combat\Canon Homes\COMBAT-CORE-001 - Combat_Core_Rules.md`
- `Dashboards\Current State\DASH-TASK-001 - Active_Project_Task_Summary.md`
- `Skills\Canon Homes\SKILL-LIST-001 - SRC-SKILL-002-Skills-List-and-Definitions.md`
- `Skills\Canon Homes\SKILL-RESOLUTION-001 - SRC-SKILL-003-Resolution-Core-Rules.md`

This list is a warning label, not a promotion decision. Recheck current file contents before using it as evidence.

## Prep Status

As of 2026-06-20, the intended Codex project root is:

`C:\Users\Quintin Livdahl\Repos\Nexus-App`

Codex should use this file plus `AGENTS.md` before assuming Nexus material is missing.
