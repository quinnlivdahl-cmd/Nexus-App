---
status: accepted
date: 2026-07-15
provenance: "Technical ownership decision delegated during Define Tactical Pressure activation and participation #14 Grill with Docs Wayfinder session"
---

# Campaign Saves serialize Location-owned Tactical State

Campaign Save owns the persisted session envelope, while the active Location owns one Tactical State component containing only ordered-time references and sequence progress: active triggers, participants, Initiative, round, cursor, Timing Entries, active Areas, and the applicable rules-policy revision. Rules Core updates that component through validated commits, while actors, objects, hazards, objectives, geometry, and consequences retain their existing state ownership. A separate Encounter state would duplicate authority, a campaign-root tactical record would detach sequencing from its Location, and runtime-only memory could not restore deterministic play.
