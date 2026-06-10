# Nexus Task Packet Template

Use this template to shape GitHub issues, Codex tasks, Replit tasks, and cross-platform work packets.

GitHub Issues are the task packets. The issue body should be shown for review before Codex creates or updates an issue unless the user explicitly approves direct issue changes.

## Shared Core

```md
# Nexus Task Packet

Task name:
Task type:
Request summary:
Goal:
Why this matters:
Planning anchor:
Relevant sources/files:
Current known state:

Prerequisites / readiness:
- Ready now: yes/no
- Missing prerequisites:
- Blocking issue to create/update:
- Recommended action:

Done when:
In scope:
Out of scope:
Do Not Do:
Platform owner:
Handoff target:
Validation / review method:
Risks / challenge:
Open questions:
Next action:
```

## Readiness Rule

If `Ready now` is `no`, do not force an implementation plan. Explain the missing prerequisite and recommend the next task packet or issue to create/update.

Every task packet should include a `Do Not Do` section, even when it is short.

## Code Implementation Add-On

```md
Repo:
Likely files:
Commands/checks:
Dependency/install risk:
Rollback/undo notes:
```

## Source Document Add-On

```md
Source package or lane:
Authority docs:
Edit mode: direct approved edit / redline / candidate
Promotion path:
Metadata/rev impact:
```

## Replit Task Add-On

```md
Copy-ready Replit task:
Do Not Do:
Validation:
Local-first constraints:
```

## Handoff Add-On

```md
Context summary:
Decisions made:
Files inspected/touched:
What not to redo:
Next safe prompt:
```

## Future Validation Expectations

Future scripts should be able to check whether a packet includes:

- task name;
- task type;
- goal;
- planning anchor;
- readiness;
- done-when condition;
- in-scope and out-of-scope boundaries;
- `Do Not Do`;
- validation method;
- next action.
