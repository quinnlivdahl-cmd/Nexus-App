# Task Plan: Nexus-App Planning Overlay and Issue 9 Closeout Sync

## Goal

Create the repo-wide planning overlay and close out Source Context Pack #9 after Source Context Pack PR #52 has merged.

## Current Phase

**Commit, PR, and GitHub closeout**

---

## Phases

- [x] Phase 1: Verify Source Context Pack PR #52 and Source Context Pack #9 live GitHub state.
- [x] Phase 2: Add repo planning-with-files overlay and root instruction pointer.
- [x] Phase 3: Update Nexus issue index and transition surfaces for Source Context Pack #9 completion.
- [x] Phase 4: Run required validation commands.
- [ ] Phase 5: Commit, push, open and merge closeout sync PR, then comment on and close Source Context Pack #9.

---

## Key Questions

- Is Source Context Pack PR #52 merged to `main` with merge commit `4dd084e4054dd8347adf8848f1b5bc8d116e5cbb`?
- Is Source Context Pack #9 still open before closeout evidence is posted?
- Do the planning overlay and issue queue updates avoid starting Backend AI Routing #10, App-Native Campaign Seed #11, or other downstream work?
- Do workflow/source/roadmap/context/typecheck/build validations pass after the closeout sync edits?

---

## Decisions Made

| Decision | Rationale | Date |
|----------|-----------|------|
| Use `planning/` as the planning overlay home. | The requested scope named `planning/`, and the planning setup skill recommends that location for discoverable cross-session planning files. | 2026-06-27 |
| Keep closeout sync documentation-only. | The task explicitly excludes app runtime, source schema, package, and `.gitignore` changes unless required by validation or merge conflict. | 2026-06-27 |
| Keep Backend AI Routing #10 and App-Native Campaign Seed #11 dependent/eligible, not in progress. | Source Context Pack #9 completion unlocks future sequencing but does not authorize downstream implementation. | 2026-06-27 |

---

## Errors Encountered

| Error | Context | Resolution/Mutation | Date |
|-------|---------|---------------------|------|
| Initial `Get-Content` call for the planning skill used an incorrectly escaped path with a space. | Loading the planning setup skill after confirming that `planning/` was absent. | Re-ran with a quoted absolute path and read the skill plus templates successfully. | 2026-06-27 |
| Validation runner used `$code:` inside a PowerShell string, causing a parser error before any validation command ran. | Starting the required validation suite. | Use `${code}` or string formatting for the exit-code line and rerun the suite. | 2026-06-27 |

---

## Notes

- Update Current Phase as closeout advances.
- Keep this overlay focused on repo-wide planning continuity, not source canon.
- Reread this file before major planning or GitHub state decisions.
