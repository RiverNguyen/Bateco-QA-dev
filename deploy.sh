#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

ENV_FILE="${ROOT}/.env.deploy"
if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing ${ENV_FILE}" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a

: "${VPS_USER:?VPS_USER is required in .env.deploy}"
: "${VPS_HOST:?VPS_HOST is required in .env.deploy}"
: "${VPS_PASSWORD:?VPS_PASSWORD is required in .env.deploy}"

IMAGE="docker.io/rivernguyen1309/bqa:latest"

echo "Building ${IMAGE}..."
docker compose -f docker-compose.yml build

echo "Pushing ${IMAGE}..."
docker push rivernguyen1309/bqa:latest

ssh_with_password() {
  local askpass
  askpass="$(mktemp)"
  chmod 700 "${askpass}"
  printf '#!/bin/sh\nprintf %%s\\\\n %q\n' "${VPS_PASSWORD}" > "${askpass}"
  chmod 700 "${askpass}"
  SSH_ASKPASS="${askpass}" SSH_ASKPASS_REQUIRE=force DISPLAY="${DISPLAY:-:0}" \
    setsid -w ssh \
      -o StrictHostKeyChecking=accept-new \
      -o PreferredAuthentications=password \
      -o PubkeyAuthentication=no \
      "${VPS_USER}@${VPS_HOST}" "$@"
  local status=$?
  rm -f "${askpass}"
  return "${status}"
}

echo "Deploying on ${VPS_USER}@${VPS_HOST}..."
ssh_with_password \
  "docker pull ${IMAGE} && docker stop bqa || true && docker rm bqa || true && docker run -d -p 3000:3000 --name bqa ${IMAGE} && docker system prune -f"

echo "Deployed ${IMAGE} on ${VPS_HOST}:3000"
