---
status: accepted
date: 2026-07-12
provenance: "Campaign Director contracts Grill with Docs session for GitHub issue #4"
---

# Campaign Resolution separates closure planning from epilogue performance

After deterministic systems resolve the Playable Finale and commit Node 10 outcomes, Campaign Resolution uses two logically stateless calls. The Campaign Director first produces a source-referenced Resolution Brief from committed Game Truth, approved history, relevant Campaign Threads, Climax Plan outcomes, crew and faction state, Ship state, and archive rules; deterministic validation commits its closure statuses and authorized archive effects. When the Player Character survived, this same structured call also produces the source-referenced conversion evidence and default Converted Crewmate Package proposal, creating a validated pending Conversion Review rather than committing the discretionary package. A separate narration call then renders the epilogue from the approved brief as Generated Performance, after which the player completes Conversion Review and deterministic finalization commits the legal package. No third model call is added. If narration fails, the brief remains durable and retryable, and no closing prose may change the outcome, rewards, losses, relationships, thread state, campaign history, or conversion options.

ADR 0056 defines thread closure policy: material threads may remain unresolved, and only threads that materially shaped the campaign receive epilogue coverage.

ADR 0057 permits the validated Resolution Brief to produce a retrievable Saga Source when the campaign belongs to an opt-in Legacy World.

ADR 0069 applies the same two-call closure boundary to Early Campaign Resolution after Player Character Permanent Loss.
