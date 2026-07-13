---
status: accepted
date: 2026-07-12
provenance: "Campaign Director contracts Grill with Docs session for GitHub issue #4"
---

# The Model Runtime is provider-neutral and task-routed

The Campaign Director Harness uses deterministic application orchestration around specialized, logically stateless model calls rather than one mega-agent or several autonomous agents. A provider-neutral Model Runtime routes named task profiles such as Director planning, dialogue, narration, intent interpretation, summarization, and repair to configurable hosted or local models; conversation history, state, validation, and recovery remain owned by Nexus so OpenAI-specific capabilities may optimize a provider adapter without becoming architectural requirements. Each task profile owns independently adjustable input and output budgets, and the Context Broker trims by authority, task relevance, current state, character knowledge, active conversation, then wider history rather than enforcing one small global limit.
