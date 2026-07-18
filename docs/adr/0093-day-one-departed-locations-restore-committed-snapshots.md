---
status: accepted
date: 2026-07-17
provenance: "Define Local Aftermath, return-to-Ship, and save contracts #28 Grill with Docs Wayfinder session"
---

# Day-one departed Locations restore committed snapshots

The day-one campaign preserves a departed Location's committed snapshot rather than discarding it or regenerating the Location. Day one does not present a backtracking loop, but recovery or development tooling that reloads the Location restores that snapshot unchanged; production backtracking, elapsed-time evolution, and Campaign Director adaptation remain unresolved and outside this decision.
