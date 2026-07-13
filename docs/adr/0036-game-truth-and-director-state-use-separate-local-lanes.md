---
status: accepted
date: 2026-07-12
provenance: "Campaign Director contracts Grill with Docs session for GitHub issue #4"
---

# Game Truth and Director State use separate local lanes

Game Truth is the authoritative current state and is stored with a supporting history of approved changes rather than rebuilt from a full event stream. Director State is a separate local campaign-save lane for bounded private plans, possibilities, and pacing intent; model calls may propose updates, but deterministic harness checks control persistence, lifecycle, references, size, and the boundary that prevents Director State from becoming Game Truth.
