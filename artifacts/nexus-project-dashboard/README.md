# Nexus Project Control

A private, owner-only command center for Nexus player-loop development. It is a timestamped derived projection, not a replacement authority: canonical source defines game truth, GitHub Issues own execution packets, the repo owns implementation, Obsidian owns project memory, and Drive holds curated retrieval material.

The first release intentionally labels its snapshot freshness, shows the local issue mirror as stale, redacts owner paths in the interface, and uses copy/open instructions instead of claiming a direct Codex task deep link.

The snapshot uses **declared mappings plus observed state**. Roadmap, ticket, decision, and purpose mappings are reviewed project inputs; the generator does not pretend to infer those mappings from prose. Source hashes and freshness, actual Git worktrees, dirty state, upstream divergence, last commits, and context-manifest hashes are regenerated locally.

## Update sources

- Current product direction: `docs/adr/README.md` and `docs/nexus-game-source/source/SOURCE-INDEX.json`
- Canonical game truth: `docs/nexus-game-source/source`
- Execution mirror: `NEXUS_ISSUE_INDEX.md` (verify against GitHub before acting)
- Operations authority: `docs/contexts/nexus-project-operations`
- Local worktree evidence: declared worktree data in `app/data/project-snapshot.json`

Regenerate source provenance, worktree evidence, freshness, attention items, and context-manifest hashes after intentionally refreshing the local snapshot:

```powershell
npm run snapshot:generate
```

The former Drive mirror of current repo context is [documented as retired](docs/drive-context-bundle-contract.md) and represented by an empty compatibility manifest at `app/data/drive-context-bundle-manifest.json`. Current GPT context comes from GitHub; Drive remains the bulky-material lane.

## Local use

```powershell
npm install
npm run dev
```

Use `npm run build` for the production build, `npm run snapshot:validate` for the generated-state contract, and `npm test` for contract and rendered-dashboard checks.

## Publishing

The site is published with OpenAI Sites and remains private/owner-only. Do not treat its displayed local snapshot as live remote state.
