---
status: accepted
date: 2026-07-12
provenance: "Spatial Action Transaction Grill with Docs session for GitHub issue #5"
---

# Proximity actions use linked staged commits

When a proximity-bound action requires automatic approach movement, Nexus treats the movement and the interaction as linked stages under one Player Intent rather than one rollback-capable commit. Movement becomes persistent Location truth as it occurs; on arrival, the interaction is revalidated against current truth and commits atomically only if it remains valid. Interruption, Tactical Pressure beginning en route, or the target becoming stale, blocked, or unavailable does not roll back completed movement. If Tactical Pressure begins before the interaction commits, the pending Free Movement interaction is discarded rather than carried into Turn-Based Mode: the changed tactical situation demands a fresh player choice. Turn-Based Mode then accounts for movement and other costs through its normal AP, MP, reaction, and sequencing rules. A genuinely indivisible movement-plus-effect behavior must be defined explicitly as a compound action rather than inheriting that behavior by default.
