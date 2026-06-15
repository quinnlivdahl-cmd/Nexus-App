# Streamlit Example: Source Audit Dashboard

Use this lane when Codex needs a quick local data dashboard from CSV, JSON, or generated reports.

## Minimal Inputs

- source index JSON or CSV;
- validation output;
- optional issue linkage table.

## Minimal Widgets

- search box;
- status filter;
- table of matching rows;
- simple count chart;
- download button for filtered results when useful.

## Good Uses

- source-index audit;
- issue-index drift review;
- validation result browser;
- data-cleanup triage.

## First Pass Rule

Use Streamlit for fast data inspection, not durable app UI. Promote successful patterns into a real repo tool only after the workflow proves repeatable.
