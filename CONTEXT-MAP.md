# Context Map

## Contexts

- [Canonical Nexus game source](./docs/nexus-game-source/README.md) — owns current product language, gameplay rules, lore, presentation, and game-state concepts; accepted rationale is indexed in [System-wide ADRs](./docs/adr/README.md)
- [Nexus Project Operations](./docs/contexts/nexus-project-operations/CONTEXT.md) — owns project-control language for GitHub workflow, planning, agent behavior, source maintenance, validation, handoffs, roadmap maintenance, and project memory

## Relationships

- **Nexus Project Operations → canonical game source**: Project workflows maintain and deliver the game, but operational terminology does not define game concepts or player-facing rules.

## Authority and precedence

- `docs/nexus-game-source/source` is the canonical current textual definition of the game: its rules, concepts, lore, and design model.
- Accepted Nexus Game ADRs are controlling decisions. When an accepted ADR changes a claim in the domain source, the ADR controls that affected claim until the owning source document is reconciled; unrelated source material remains current.
- Reconciliation updates the owning domain document to express the accepted decision and link its provenance. After reconciliation, use the domain document as the primary current-game reference and the ADR as the record of why the change was made.
- Canonical domain source supplies current product language. The archived July 2026 synthesis remains provenance, not a parallel glossary.
- Legacy roadmaps, Local Playable Alpha material, and text-RPG/DM-chat assumptions do not override the canonical domain source or accepted ADRs.
- GitHub issues transfer work and acceptance criteria. They do not replace the decision baseline or canonical source.
