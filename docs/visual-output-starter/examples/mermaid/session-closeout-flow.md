# Mermaid Example: Session Closeout Flow

Use this lane when the visual output is a process, dependency, sequence, or state transition.

```mermaid
flowchart TD
  A["Read controlling issue"] --> B["Inspect repo truth"]
  B --> C["Implement scoped change"]
  C --> D["Run validation"]
  D --> E{"Acceptance satisfied?"}
  E -->|No| F["Record blocker or next fix"]
  E -->|Yes| G["Commit and push"]
  G --> H["Update issue index"]
  H --> I["Post evidence comment"]
  I --> J["Close issue when ready"]
```

## Good Uses

- session workflow;
- issue dependencies;
- source routing;
- app runtime architecture;
- state transitions.

## Rule

Keep diagrams close to the documentation they clarify. Do not create a diagram-only artifact unless the user asked for a diagram.
