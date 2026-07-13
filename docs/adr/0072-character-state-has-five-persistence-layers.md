---
status: accepted
date: 2026-07-12
provenance: "Campaign Director contracts Grill with Docs session for GitHub issue #4"
---

# Character state has five persistence layers

Character ownership is separated into five layers: Character Profile for persistent identity, Crew Archive Entry for cross-campaign history and eligibility, Campaign Build for run-specific mechanics, CrewMember for current-campaign membership and relationships, and Actor State for live scene state. Each layer references the more persistent identity instead of duplicating or owning it, preventing campaign reset, archive conversion, recruitment, or scene resolution from overwriting permanent identity or historical state.
