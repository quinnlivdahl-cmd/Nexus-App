---
status: accepted
date: 2026-07-12
provenance: "Campaign Director contracts Grill with Docs session for GitHub issue #4"
---

# Director planning is checkpoint-triggered and prepares each node

The Campaign Director plans only at deterministic Planning Checkpoints rather than running continuously during ordinary play. Baseline checkpoints are campaign initialization, material scene resolution, Node 0 Resolution, Route Node Resolution, and mandatory pre-node preparation after Node 0 is selected or a Route Prospect is committed. A checkpoint may use a bounded sequence of specialized, logically stateless calls whose validated artifacts feed later steps. Pre-node preparation commits a bounded Node Brief that guides context and opportunities inside the node without scripting outcomes, owning authoritative geometry, or establishing future events as Game Truth.

ADR 0047 sets a provisional four-stage baseline between ordinary Route Nodes and requires per-stage evaluation before that call count is treated as durable.
