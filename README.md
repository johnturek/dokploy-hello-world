# Dokploy Hello World

A zero-dependency Node.js Hello World proving GitHub Actions CI and automatic Dokploy CD.

- CI: tests + container build on every pull request and push.
- CD: successful pushes to `main` call the Dokploy API and verify the live HTTPS health endpoint.

## Security baseline

The required GitHub checks enforce tests, dependency auditing, secret scanning,
Dockerfile linting, CodeQL, high/critical container scanning, and SBOM generation.
Successful `main` builds publish a GitHub OIDC-signed GHCR image and tell Dokploy
to deploy its immutable digest. Production verification checks the digest's
commit, health response, and security headers.

The runtime image is non-root and removes npm from production. The Dokploy host
runs `ops/dokploy-runtime-hardening.sh` as a supervised service to keep the
application root filesystem read-only and drop all Linux capabilities after
Dokploy updates the Swarm service.
