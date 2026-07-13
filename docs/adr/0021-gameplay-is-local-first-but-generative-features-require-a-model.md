---
status: accepted
date: 2026-07-10
provenance: "July 2026 Grill with Docs revised-vision decision session; published by Revised Vision Decision Baseline #58"
---

# Gameplay is local-first but generative features require a model

Authoritative rules, movement, Turn-Based Mode, Location state, saves, and Game Truth run locally, while the initial product requires model access for the Campaign Director, Player Intent interpretation, Generated Performance, and new Route Prospects; Live Illustrations remain optional. GPT-5.5 is the primary initial driver behind a replaceable Model Runtime, with Ollama compatibility reserved for future testing, and credentials remain outside the browser-facing client.

The fixed GPT-5.5 driver clause is superseded by ADR 0035's provider-neutral, task-routed Model Runtime. The local-first authority boundary, model-required feature boundary, future local-provider compatibility, and credential boundary remain accepted.
