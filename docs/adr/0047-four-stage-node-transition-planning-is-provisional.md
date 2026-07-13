---
status: accepted
date: 2026-07-12
provenance: "Campaign Director contracts Grill with Docs session for GitHub issue #4"
---

# Four-stage node-transition planning is provisional

The initial quality-first baseline between ordinary Route Nodes uses four specialized Campaign Director calls: update campaign priorities after Route Node Resolution, generate Route Prospects at Downtime start, plan the confirmed destination, and adapt its Node Brief after Deployment Preparation. Each stage emits a bounded validated artifact and is independently configurable and traceable. Four calls are provisional rather than sacred: Campaign Fixtures and playtests compare merged and omitted-stage variants using cost, latency, failure and retry rate, redundant output, validation yield, and human-rated creative improvement, and stages should be merged or removed when they do not justify their operational cost.

Node 0 is an explicit exception: ADR 0041 defines a two-call Campaign Opening Pipeline because its destination and starting deployment do not require Route Prospect or deployment-adaptation stages.
