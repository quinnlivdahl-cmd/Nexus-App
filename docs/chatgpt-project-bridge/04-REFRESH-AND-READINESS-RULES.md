# Refresh And Readiness Rules

Status: upload-ready bridge file

## Currentness States

Use these states for ChatGPT Project context:

- `not-needed`: the task does not need a ChatGPT Project refresh.
- `stale-but-usable`: uploaded context is good enough for brainstorming or rough planning with a caveat.
- `targeted-packet-needed`: a narrow task, source, issue, or playtest packet is needed.
- `baseline-refresh-needed`: the baseline bridge files need upload because operating context changed.
- `sent-pending-verification`: files were uploaded or pasted, but searchability/use has not been checked.
- `verified-current-for-scope`: ChatGPT Project was checked and is current for a named scope.

Never use these states as proof of live source currentness.

## Readiness Gate

Before preparing a refresh, answer:

1. What exact scope needs ChatGPT Project context?
2. Which authority lane owns the current truth?
3. Which bridge file or packet should carry the context?
4. Is a full baseline refresh needed, or is a targeted packet enough?
5. What should not be uploaded?
6. How will upload be confirmed or logged?

Default to the smallest useful refresh.

## Upload Confirmation Rule

Do not say "ChatGPT Project was refreshed" unless one of these is true:

- the user confirms the selected files were uploaded or pasted;
- a refresh ledger records the upload action;
- a tool or direct project check verifies the uploaded context for the named scope.

If a file is prepared but not sent, call it `upload-ready`, not current.

## What Not To Upload By Default

- Full live `00 Source`.
- Broad source snapshots.
- App source code unless a ChatGPT discussion needs it.
- Git history or issue dumps.
- Old slot packages as if they were current.
- Zip bundles unless Markdown is too large or awkward.

## Searchability Check

When checking whether ChatGPT Project has the current bridge context, ask it about specific anchor phrases from the uploaded files, such as:

- `repo-trackable bridge layer`
- `verified-current-for-scope`
- `Slots are upload/context roles`
- `ChatGPT Project is a curated context client`

A successful searchability check proves only that the uploaded project context can find the named scope.

