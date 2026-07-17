# Domain Docs

How Matt Pocock engineering skills should consume Nexus domain documentation before exploring or changing the repository.

## Before exploring

- Read root `CONTEXT-MAP.md` when it exists, then read each relevant context file.
- Read the decision conventions and accepted set in `docs/adr/README.md`, then the relevant system-wide decisions under `docs/adr/`.
- Read context-specific ADRs linked by the relevant context file.
- Read the current `AGENTS.md` instructions that apply to the target path.

If these files do not exist yet, proceed without complaint. `$grill-with-docs`, `$domain-modeling`, and related workflows create domain docs lazily when terminology or decisions are actually resolved.

## Multi-context layout

Nexus uses two top-level contexts:

```text
/
├── CONTEXT-MAP.md
├── docs/
│   ├── adr/                              # system-wide decisions
│   └── contexts/
│       ├── nexus-game/
│       │   └── CONTEXT.md
│       └── nexus-project-operations/
│           └── CONTEXT.md
```

The context map and context files are created only when the first domain-modeling workflow resolves their content. This setup establishes their destinations and consumer rules without inventing a glossary or architectural decisions.

## Nexus Game

`Nexus Game` is the product context. The application previously described as the "companion app" is becoming the game itself; `companion` is a legacy implementation name, not a durable product concept.

Current north star:

> Nexus is a local-first 2D spatial sci-fi party RPG with a fixed Tilted Top-Down presentation. Exploration and noncombat play happen in persistent Locations, and Turn-Based Mode uses the same spatial runtime. Text supports the game rather than constituting it.

This context includes product identity, gameplay, spatial exploration, combat, presentation, rules, lore, canonical game source, UI, runtime, API, state, persistence, and AI integration.

Preserve the authority distinction inside the context:

- `docs/nexus-game-source/source` is canonical game-design and source authority.
- Application code is implementation authority.
- When source and implementation disagree, report the mismatch instead of silently rewriting either side.

Current node movement, text-first non-combat play, roadmap assumptions, and issue designs are evidence to evaluate. They are not automatically preserved in the revised product direction.

## Nexus Project Operations

`Nexus Project Operations` is the project-control context. It includes GitHub workflow, planning, agent behavior, source maintenance, validation, handoffs, roadmap maintenance, and project memory.

GitHub Issues remain execution packets. The issue index, transition router, Obsidian project hub, and Drive payload home retain the supporting roles defined in root instructions and `docs/agents/issue-tracker.md`. The Local Playable Alpha plan and June roadmap remain retrievable only as historical planning evidence.

## Vocabulary and decisions

- Use the vocabulary defined by the relevant context file. Do not drift to legacy names such as "companion app" when referring to the product.
- If a needed concept is absent, reconsider whether it is project language or record a domain-modeling gap.
- Put system-wide architectural decision records in `docs/adr/`. Link context-specific decisions from the owning context.
- `docs/adr/` is the approved decision-record destination for the Matt workflow. Initial ADRs #24 is closed and superseded as historical setup context; do not create its proposed parallel `docs/admin/decision-records/` system.
- Minimal Project Operations Context #49 remains separate, open work for the existing Nexus Project Operations slot. Do not create its glossary as part of Nexus Game decision work.
- If proposed work contradicts an existing ADR, surface the conflict explicitly instead of silently overriding the decision.

## Revised-vision work

The canonical domain source is the current textual definition of Nexus. Accepted ADRs control only the claims they change; reconcile those decisions into the owning source documents and preserve unaffected source material as current. After reconciliation, use the domain document for the current rule or concept and the ADR for decision rationale and provenance.
