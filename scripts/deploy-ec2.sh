#!/usr/bin/env bash
set -euo pipefail

revision="${1:?A commit SHA is required}"
[[ "$revision" =~ ^[0-9a-f]{40}$ ]] || { echo "Invalid commit SHA" >&2; exit 1; }
env_file="$HOME/.config/onfit/backend.env"
[[ -f "$env_file" ]] || { echo "Missing server environment file" >&2; exit 1; }

awk -F= '
  BEGIN {
    split("APP_ENV SECRET_KEY TIDB_HOST TIDB_PORT TIDB_USERNAME TIDB_PASSWORD TIDB_DATABASE", keys, " ")
    for (i in keys) required[keys[i]]=1
  }
  /^[[:space:]]*#/ || /^[[:space:]]*$/ { next }
  {
    key=$1
    if (key in required) {
      count[key]++
      if (substr($0, index($0, "=")+1) !~ /[^[:space:]]/) empty[key]=1
    }
  }
  END {
    for (key in required) {
      if (count[key] != 1 || empty[key]) {
        print "Missing, duplicate, or empty setting: " key > "/dev/stderr"
        failed=1
      }
    }
    exit failed
  }
' "$env_file"

if docker container inspect onfit-candidate >/dev/null 2>&1 || docker container inspect onfit-previous >/dev/null 2>&1; then
  echo "A candidate or previous container already exists; inspect it before deploying." >&2
  exit 1
fi

had_previous=0
if docker container inspect onfit >/dev/null 2>&1; then
  managed=$(docker inspect -f '{{ index .Config.Labels "onfit.managed" }}' onfit)
  [[ "$managed" == "github-actions" ]] || {
    echo "Existing onfit container is not managed by this workflow; refusing to replace it." >&2
    exit 1
  }
  had_previous=1
fi

wait_for_health() {
  local port="$1"
  for ((i=0; i<30; i++)); do
    if curl --fail --silent --show-error --max-time 2 "http://127.0.0.1:$port/health" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done
  return 1
}

docker run -d --name onfit-candidate --label onfit.managed=github-actions \
  --env-file "$env_file" -p 127.0.0.1:18001:10000 "onfit:$revision" >/dev/null
if ! wait_for_health 18001; then
  docker rm -f onfit-candidate >/dev/null
  echo "Candidate health check failed; existing service was not changed." >&2
  exit 1
fi
if ! docker exec onfit-candidate python -c 'from app.db.session import engine; from sqlalchemy import text; assert engine is not None, "Database not configured"; connection = engine.connect(); connection.execute(text("SELECT 1")); connection.close()' >/dev/null 2>&1; then
  docker rm -f onfit-candidate >/dev/null
  echo "Candidate database connection failed; existing service was not changed." >&2
  exit 1
fi
docker rm -f onfit-candidate >/dev/null

if (( had_previous )); then
  docker rename onfit onfit-previous
  if ! docker stop onfit-previous >/dev/null; then
    docker rename onfit-previous onfit
    echo "Could not stop the previous container." >&2
    exit 1
  fi
fi

rollback() {
  if docker container inspect onfit >/dev/null 2>&1; then
    docker rm -f onfit >/dev/null
  fi
  if (( had_previous )); then
    docker rename onfit-previous onfit
    docker start onfit >/dev/null
    echo "Previous container restored; verify its health." >&2
  fi
}

if ! docker run -d --name onfit --label onfit.managed=github-actions \
  --restart unless-stopped --env-file "$env_file" \
  -p 127.0.0.1:18000:10000 "onfit:$revision" >/dev/null; then
  rollback
  echo "Failed to start new container." >&2
  exit 1
fi
if ! wait_for_health 18000; then
  rollback
  echo "New container health check failed." >&2
  exit 1
fi
if (( had_previous )); then
  docker rm onfit-previous >/dev/null
fi
echo "ONFIT deployed successfully at commit $revision."
