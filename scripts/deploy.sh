#!/usr/bin/env bash
set -euo pipefail

pnpm install --frozen-lockfile
pnpm build
rsync -av --delete .next/ your-server:/var/www/nso
