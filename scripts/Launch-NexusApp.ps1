param(
  [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$appUrl = "http://127.0.0.1:5173"

Set-Location -LiteralPath $repoRoot

Write-Host "Starting Nexus local app from $repoRoot"
Write-Host "App URL: $appUrl"
Write-Host ""

try {
  $pnpmVersion = (& corepack pnpm --version) -join ""
  Write-Host "Using pnpm $pnpmVersion via Corepack."
} catch {
  Write-Host "Corepack pnpm is not available. Install/repair Node.js Corepack, then retry." -ForegroundColor Red
  throw
}

if (-not $NoBrowser) {
  Start-Job -ScriptBlock {
    param($url)
    Start-Sleep -Seconds 5
    Start-Process $url
  } -ArgumentList $appUrl | Out-Null
}

Write-Host "Leave this window open while playing. Press Ctrl+C to stop the app."
Write-Host ""

& corepack pnpm run local:dev
