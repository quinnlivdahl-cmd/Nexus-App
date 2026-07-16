---
project: "Nexus"
doc_id: "ADMIN-RUNBOOK-011"
legacy_ids:
  - 'ADM-011'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\05 Admin Runbooks Source Management rev0.3\ADM-011 - Dashboard_Update_Procedure.md'
title: "Dashboard_Update_Procedure"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Steward"
source_role: "applied_rule"
canon_status: "admin_reference"
placement_domain: "Admin"
content_role: "applied_rule"
topic_family: "dashboard_update_procedure"
owns_topics:
  - 'dashboard_update_procedure'
borrows_topics: []
created: "2026-05-13"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Phase 10 reviewed this dashboard procedure for rebuild use. It remains an active Admin support surface while routing language is normalized toward current domains."
---

# Dashboard Update Procedure

## 1. Purpose

This document defines the Steward procedure for updating dashboard/current-state files without moving dashboard bodies into the Admin Runbooks package.

Dashboard update procedure belongs in Admin. Actual live dashboard files belong in Dashboards.

## 2. Procedure

When updating a dashboard:

1. identify the dashboard file and its mode owner;
2. verify snapshot date, source inputs, and currentness;
3. update only the relevant status, task, link, conflict, or handoff pointer sections;
4. do not silently overwrite old dashboard state;
5. preserve old snapshots in Obsidian archive when needed;
6. do not treat dashboard summaries as higher authority than placed source docs unless explicitly promoted;
7. update Output Register only if a downloadable dashboard output is produced.

## 3. Dashboard Package Boundary

Admin includes this procedure only.

The following belong elsewhere:

- live dashboard bodies -> Dashboards;
- dashboard templates -> Modes unless package-specific;
- handoff bodies -> Obsidian handoff folders / Output Register tracking;
- source truth -> source packages 07-15.

## 4. Legacy Dashboard Update Evidence

# Dashboard Update Note - 2026-05-07 21:34 CDT

This dashboard package updates the live DM Mode dashboard to rev 5.

## Updated

- `DM_Mode_Live_Campaign_Dashboard.md`
- `DM_Mode_Live_Campaign_Dashboard_rev5_2026-05-07_2134_CDT.md`

## Purpose

- Preserve Ternary Lock freeform ship-time state.
- Add Dq9 Save workflow reminder.
- Add counter/aftermath display reference.
- Add individual crew-state symbols: `Loyalty Loyalty`, `Morale Morale`, `Health Health`.

## Placement

Replace/supplement the current `Dashboards/` folder. Do not delete older dashboard revisions until this rev opens correctly.

## 5. Obsidian-First Dashboard and Tracker Procedure

Dashboards and task trackers should be designed for Obsidian display/view mode, not only edit mode.

### 5.1 Dashboard display rules

- Avoid HTML `<details>` as the default folding method when it fails in Obsidian view mode.
- Prefer Obsidian-native foldable headings/callouts or simple visible sections.
- All dashboards should remain readable on mobile and in Obsidian view mode.
- DM display formats that are already specific should be protected; additions should not break them.

### 5.2 Seed dashboard rules

- Branches default closed except the active branch in the snapshot.
- Use fold/dropdown behavior at branch and stem level, not leaf level.
- Leaves remain simple bullets under stems.
- Seed harvests should update the Seed Tree/dashboard when content is mature enough to route.

### 5.3 Tracker consolidation

Before creating a new task list, thoroughly check whether a current tracker exists. Prefer consolidating active tasks into `DASH-007 - Active_Project_Task_Summary` when applicable.

Task items should use action verbs and concrete targets, such as:

- `Water Sx`
- `Draft [specific doc]`
- `Produce SVG Location-overlay and tactical-marker set`
- `Integrate handoff`
- `Verify upload/searchability`
- `Backpatch source package`

## 5. Changelog

### rev0.1 - 2026-05-13

- Created from Routing Map guidance and older dashboard update note evidence.
