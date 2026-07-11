# Context Map

## Contexts

- [Nexus Game](./docs/contexts/nexus-game/CONTEXT.md) — defines the product language for player experience, gameplay, rules, presentation, and game state; its accepted decisions are indexed in [System-wide ADRs](./docs/adr/README.md)
- **Nexus Project Operations** — owns project-control language; its glossary will be created at `docs/contexts/nexus-project-operations/CONTEXT.md` when this workflow first resolves an operations term

## Relationships

- **Nexus Project Operations → Nexus Game**: Project workflows maintain and deliver the game, but operational terminology does not define game concepts or player-facing rules.

## Authority and precedence

- The Nexus Game context and accepted ADR index are the revised decision baseline for product language, interpretation, and planning.
- `docs/nexus-game-source/source` remains canonical game-source authority until Golden Truth Spatial Reconciliation #59 explicitly reconciles it with this baseline.
- Where the revised baseline conflicts with legacy roadmaps, Local Playable Alpha material, or text-RPG/DM-chat assumptions, the revised baseline controls planning; the conflict must still be surfaced rather than silently rewriting canonical source.
- GitHub issues transfer work and acceptance criteria. They do not replace the decision baseline or canonical source.
