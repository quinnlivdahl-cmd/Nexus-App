---
status: accepted
date: 2026-07-12
provenance: "Campaign Director contracts Grill with Docs session for GitHub issue #4"
---

# Completed campaigns append retrievable Saga Sources

At campaign start, the player may select an existing Legacy World or begin a Fresh World. After Campaign Resolution, a completed campaign in a Legacy World appends a durable local Saga Source derived from its validated Resolution Brief and committed history. The source prioritizes machine-readable Legacy Consequences that describe how affected world state is now different, with stable IDs, source references, scope, applicability, and superseded state; a short readable chronicle may preserve player history but does not establish additional canon. Future Context Broker packets retrieve relevant current consequences rather than loading full campaigns or procedural retellings, while normal authority, character-knowledge, Context Budget, omission, and trace rules prevent historical world canon from becoming universal speaker knowledge or unbounded prompt context.

ADR 0065 adds explicit Canon Visibility so the Campaign Director may plan from relevant secret legacy facts without placing them on the public World Timeline or leaking them through unauthorized Generated Performance.

ADR 0068 makes validated Legacy Consequence promotion automatic at Campaign Resolution rather than requiring a player canon-approval gate.

ADR 0060 orders those Saga Sources in one forward Legacy Sequence rather than supporting parallel campaigns, prequels, or branching timelines initially.
