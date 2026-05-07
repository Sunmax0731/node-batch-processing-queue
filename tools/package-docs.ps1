param(
  [string]$OutputPath = "dist/node-batch-processing-queue-docs.zip"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$destination = Join-Path $root $OutputPath
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $destination) | Out-Null
if (Test-Path $destination) { Remove-Item $destination -Force }
Compress-Archive -Path (Join-Path $root "docs\*.md") -DestinationPath $destination
Write-Output $destination
