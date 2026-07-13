# Nexus Skill Tree Lab

The Skill Tree Lab is a noncanonical planning instrument inside the existing Nexus Companion app. It keeps its draft data and light-theme settings in browser local storage and does not require a backend or account.

## Start

From the repository root:

```powershell
corepack pnpm --filter @workspace/nexus-companion run dev
```

Open `http://127.0.0.1:5173`, then choose **Skill Lab** in the app navigation.

If the workspace package guard is temporarily busy, the already-installed local runtime can be started directly:

```powershell
Set-Location .\artifacts\nexus-companion
$env:PORT = '5173'
.\node_modules\.bin\vite.cmd --config vite.config.ts --host 0.0.0.0
```

## Stop

Return to the terminal running the app and press `Ctrl+C`.

## Local data

- Automatic persistence key: `nexus-skill-tree-lab-v1`
- JSON export preserves the complete editable workspace.
- Markdown export produces a readable tree review document.
- Reset to seed restores the bundled research and candidate tree after confirmation.

Everything in the Lab is a proposal. It does not modify canonical Nexus source files.
