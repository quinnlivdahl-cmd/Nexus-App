---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-010"
legacy_ids:
  - 'ADM-010'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\05 Admin Runbooks Source Management rev0.3\ADM-010 - Stewy_Platform_and_Output_Handling.md'
title: "Stewy_Platform_and_Output_Handling"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "applied_rule"
canon_status: "admin_reference"
authority: "historical_reference"
applicability:
  - 'project_operations'
  - 'historical_provenance'
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "stewy_platform_and_output_handling"
owns_topics:
  - 'stewy_platform_and_output_handling'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this platform-handling runbook for rebuild use. It remains an active Admin support surface while wording is normalized away from package-first assumptions."
---

# Stewy Platform and Output Handling

## 1. Purpose

This document defines Steward handling for generated files, download links, exact filenames, Output Register entries, platform constraints, and temporary continuity memory during Nexus package work.

## 2. Download Link Rule

When a Nexus output is provided as a downloadable file, the visible file link must preserve the exact generated filename.

Do not rename, shorten, prettify, or substitute a descriptive title for the link text. A description may appear near the link, but the link itself should use the exact filename.

## 3. Output Register Rule

Every downloadable Nexus file must receive Output Register handling. If the latest full Output Register is unavailable, produce a provisional register revision that clearly says it is merge-needed.

Each entry should record:

- exact filename;
- date/time produced;
- source chat name;
- mode;
- output type;
- short description;
- intended Obsidian placement;
- source impact;
- replaces/supplements;
- deletion/verification guidance;
- rev/date/status notes;
- link or local reference when available.

## 4. Temporary Continuity Memory

System memory may be used only as a temporary Output Register continuity aid when the latest Output Register is unavailable and generated output filenames must not be lost between chats.

Memory is not the project database and must be cleared once the register is integrated.

## 5. Platform Handling

- Current work packets should be uploaded into the active chat when needed.
- Permanent source slots should not be used for transient work packets.
- Zips are preferred for modular source packages.
- Markdown is the primary authority format for AI-readable source and admin rules.
- CSV/XLSX/JSON may be used for data tables, workbooks, or runtime exports, but they should be paired with Markdown summaries or data dictionaries when relevant.

## 6. Output Failure Handling

If a file output fails or is incomplete, state the failure plainly, do not pretend it succeeded, and produce the best recoverable artifact or register note.

## 7. Export Filename, Link, and Timestamp Rules

Use exact filenames as download link text.

Preferred export filename pattern:

`TYPECODE - Topic - Mode - MMDD HHMM.ext`

Recommended type codes:

- `PKG##` - source package by slot;
- `DOC` - single Markdown document;
- `REG` - Output Register;
- `DASH` - dashboard;
- `HOF` - handoff;
- `PAS` - passoff;
- `RUN` - runbook/function doc;
- `RPT` - report, validation, or audit;
- `TPL` - template;
- `DATA` - CSV/XLSX/JSON data export;
- `ART` - image or visual asset;
- `ZIP` - mixed export bundle that is not a source slot package.

When practical, use Minnesota time for `MMDD HHMM` if the user says CST/MN time. Do not call a produced package current until upload/searchability/metadata verification is complete.

## 7. Changelog

### rev0.1 - 2026-05-13

- Reconstructed from Global Output Register rules, Stewy source handling rules, and current project output continuity practice.



