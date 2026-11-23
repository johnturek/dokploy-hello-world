# Dokploy Hello World

A zero-dependency Node.js Hello World proving GitHub Actions CI and automatic Dokploy CD.

- CI: tests + container build on every pull request and push.
- CD: successful pushes to `main` call the Dokploy API and verify the live HTTPS health endpoint.
