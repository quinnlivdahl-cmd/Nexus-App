# React Flow Example: Ability Tree Spec

Use this lane when a graph needs interactive pan, zoom, selection, or node details.

## Minimal Node Types

```json
[
  { "id": "root", "label": "Skill Focus", "kind": "root" },
  { "id": "branch-1", "label": "Approach", "kind": "branch" },
  { "id": "ability-1", "label": "Signature Move", "kind": "ability" }
]
```

## Minimal Edges

```json
[
  { "source": "root", "target": "branch-1", "label": "unlocks" },
  { "source": "branch-1", "target": "ability-1", "label": "requires" }
]
```

## Good Nexus Uses

- ability trees;
- workflow maps;
- source dependency maps;
- route-node maps;
- rules-core transaction maps.

## Implementation Note

Do not add React Flow to the repo until a concrete artifact needs an interactive graph. For planning, this spec is enough.
