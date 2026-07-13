# Drive Context Bundle contract

The Drive Context Bundle is **designed, not published**. Its machine-readable contract lives at `app/data/drive-context-bundle-manifest.json`. Snapshot generation refreshes local hashes and freshness only; it never contacts or mutates Drive.

The manifest is destination-aware: it declares the project, audience, lifecycle status, version, source workflow, runtime lane, purpose, target, boundaries, checks, risks, destination plan, and approval requirement. Every entry has a stable local ID, nullable Drive ID, logical owner path, repo-relative source path, freshness, content hash, authority role, retrieval intent, and publication status.

## Publication rules

1. A separate authenticated Codex action must verify every declared source and show the owner a reviewable publication plan.
2. Create, replace, withdraw, and Drive-ID recording operations require explicit owner approval.
3. Returned Drive IDs may be recorded only after the corresponding destination file is verified.
4. The publisher must preserve source authority and must not expand the bundle through unscoped repo or Drive search.
5. A changed source hash makes the published entry stale until an approved refresh succeeds.

Until that action exists and succeeds, `driveId` remains `null`, `publicationStatus` remains `pending`, and the dashboard must describe the bundle as not published.
