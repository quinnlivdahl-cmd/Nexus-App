# Nexus Skill Tree Lab

The Skill Tree Lab is the editable app surface for the playtest-ready provisional Nexus Skill Tree. The bundled seed is usable for current playtests but is not final. The Lab keeps browser edits and light-theme settings in local storage and does not require a backend or account.

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

The bundled seed is mirrored into `SKILL-TREE-001` as provisional source. Local browser edits remain proposals until deliberately synchronized into the seed and regenerated source document.
