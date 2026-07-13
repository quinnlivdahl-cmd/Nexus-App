---
status: accepted
date: 2026-07-12
provenance: "Campaign Director contracts Grill with Docs session for GitHub issue #4"
---

# Generated Performance uses local Dialogue Sessions and bounded proposals

Nexus owns each active Dialogue Session and supplies its relevant transcript and character-safe context to a new logically stateless model call for every generated turn. During Free Movement, dialogue softly pauses consequential simulation while ambient presentation may continue; dialogue during Turn-Based Mode follows normal turn and action rules. Model output uses typed Structured Proposals and a hidden structured performance envelope instead of arbitrary state patches: ordinary non-mutating dialogue may display after lightweight conformance checks, while proposed changes to Game Truth or character knowledge must validate and commit before their corresponding performance is presented as fact. All linked effects from one generated performance form one idempotent Proposal Transaction that atomically commits its Game Truth changes, character-knowledge changes, approved history, and releasable performance record. Late, duplicate, cancelled, superseded, structurally invalid, or authority-invalid results cannot partially commit or display; automatic recovery is capped at one repair or regeneration attempt before Nexus restores a safe retryable interaction state.
