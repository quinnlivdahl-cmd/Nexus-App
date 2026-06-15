# Chart Example: Issue Health

Use this lane when a small chart makes status easier to inspect.

## Minimal Data

```json
[
  { "state": "ready", "count": 2 },
  { "state": "blocked", "count": 0 },
  { "state": "parked", "count": 3 },
  { "state": "done", "count": 12 }
]
```

## Minimal View

- one bar chart for counts by state;
- one table with the exact issue numbers behind each bar;
- one timestamp or commit hash showing when the data was collected.

## Best Default

Use Recharts inside `artifacts/mockup-sandbox` when the artifact is web-based.

Use a static Markdown table when the chart does not add inspection value.
