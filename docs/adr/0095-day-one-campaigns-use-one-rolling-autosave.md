---
status: accepted
date: 2026-07-17
provenance: "Define Local Aftermath, return-to-Ship, and save contracts #28 Grill with Docs Wayfinder session"
---

# Day-one campaigns use one rolling autosave

The day-one campaign uses one rolling consequence-preserving autosave rather than player-managed save slots or routine quickload. Consequence-bearing commits checkpoint durably before their presentation, active Location state flushes at stable boundaries and bounded intervals rather than every rendered frame, and the player-facing controls are Continue, Save & Quit, and save export/import.

The runtime may retain a prior validated checkpoint for corruption or crash recovery, but it is not exposed as a consequence-reversal timeline. If Route Node Resolution cannot durably commit, Nexus remains in the Location and does not release the recap or Ship transition; Crew Archive persistence remains a separate lane.
