# Security policy

## Current status

This repository is a local-development foundation. There are no supported
production releases, authentication flows, cloud deployments, or stored user
artifacts yet. Do not expose this unauthenticated scaffold as the private recipe
application described in the roadmap.

## Reporting a vulnerability

Use [GitHub private vulnerability reporting](https://github.com/justinsoderstrom/recipe-extractor/security/advisories/new).
Include affected versions/commits, reproduction steps, and the expected impact.
Do not put credentials or private user data in public issues or pull requests.

## Configuration and dependencies

Local startup and checks require no credentials. Keep secrets out of source,
commits, screenshots, and logs. Future server integrations should use .NET user
secrets locally and an appropriate secret store in deployment. Browser environment
variables, including `VITE_*`, are bundled public configuration and must not contain
tokens or client secrets. Do not add fictional cloud settings to the scaffold.

Commit lockfiles and review dependency updates. CI checks and CodeQL do not prove
the absence of vulnerabilities. See [development notes](docs/development.md#dependencies-and-advisories)
for the initialization-time developer-tool advisory and audit commands. Future
URL ingestion, identity, model output, and OneDrive controls are recorded in the
[architecture overview](docs/architecture.md#security-design-still-needed-before-features).
