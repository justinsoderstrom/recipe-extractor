# Project initialization design

## Goal and scope

Initialize a public, MIT-licensed repository with a runnable React/ASP.NET Core
foundation, reproducible local development, editor debugging, documentation, and
GitHub checks. Implement no recipe-processing features or Azure deployment.

## Chosen approach

Use one lean repository with frontend, API, and tests. Prefer feature-oriented
organization when features arrive. The alternative was initially separate Domain,
Application, Infrastructure, API, and worker projects; those empty layers would
create abstractions before their responsibilities are understood.

Use React, Vite, strict TypeScript, Tailwind CSS with its Vite plugin, and ASP.NET
Core on .NET 10. Retain simple npm/dotnet commands while adding shared F5 profiles
for Visual Studio and VS Code. Aspire is unnecessary for coordinating these two
processes. Browser-debugging and coordinated shutdown are part of acceptance.

The shell is an accessible responsive page with an explicit development status.
The only application endpoint is `GET /api/health`, returning `200` and `Healthy`.
OpenAPI is available only in Development. Local HTTP ports are 5080 for the API
and 5173 for Vite; `/api` is proxied without rewriting. No credentials are needed.

## Quality and GitHub

Pin runtime versions and commit dependency lockfiles. Use ESLint, Prettier with
Tailwind class sorting, .NET formatting/analyzers, frontend rendering tests, and
API integration tests. Verify commands from the root on Windows and in Ubuntu CI.
Use explicit backend project targets so the JavaScript IDE project does not
perform dependency installation or frontend builds during CLI checks.

Create `justinsoderstrom/recipe-extractor`, push one validated bootstrap commit to
`main`, observe CI, then require PRs and frontend/backend checks without requiring
another person's review. Block force pushes/deletion, resolve review conversations,
use squash merges, and delete merged branches. Add Dependabot, CodeQL, least-
privilege workflow tokens, pinned action commits, and repository security settings.

## Documentation and future direction

Provide the README, development guide, architecture overview, roadmap, glossary,
security policy, architecture decision, plan, and accurate `AGENTS.md` commands.
Clearly distinguish current capabilities from future intentions.

The intended app accepts accessible public video links, extracts recipes in a
background workflow, produces PDFs, and saves them to each allowed user's own
personal OneDrive. Inaccessible sources fail clearly. Two personal Microsoft
accounts will be allowed. Azure and Foundry are the initial direction; replacing
the model provider is a V2 stretch goal. An upload fallback is a possible later
idea, not a committed capability.

Authentication, PWA installation/offline behavior, cloud infrastructure, deployment,
workers, acquisition, models, PDFs, and OneDrive integrations are deferred. Actual
provider interfaces, wire schemas, and infrastructure products are chosen when
their features are designed. Local run/deploy means local launch/debugging after
documented first-time setup.
