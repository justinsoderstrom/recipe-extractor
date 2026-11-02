# Project Initialization Implementation Plan

**Goal:** Establish a runnable, documented foundation and public GitHub repository,
without recipe-processing features.

**Architecture:** Lean React/Vite/TypeScript/Tailwind frontend and ASP.NET Core API
in one repository. Thin editor integration; independent CLI/CI builds.

**Spec:** [Approved design](../specs/2026-11-01-project-initialization-design.md).

## Constraints

- .NET SDK 10.0.403 (latest patch within the feature band), Node 24.18.1, npm 11.16.0.
- Stable dependencies, committed lockfiles, credential-free local verification.
- Local ports 5080 and 5173, strict Vite port, `/api` proxy without rewriting.
- Only shell/health behavior; future features and Azure deployment stay deferred.
- Implement directly in this initially empty checkout; one bootstrap push to main
  precedes PR protections, as explicitly authorized.

## Tasks

- [ ] 1. Establish runtime/tool configuration and source/test projects. Write a
  health integration test and frontend rendering test; observe missing behavior
  fail before implementing the health endpoint and accessible styled shell.
- [ ] 2. Add Visual Studio and VS Code launch configuration. Verify full-app F5,
  browser/C# breakpoints, HMR, stop/restart, proxy health, and port conflicts.
- [ ] 3. Add root-tested development commands, architecture/roadmap/glossary,
  security guidance, MIT license, and accurate agent instructions.
- [ ] 4. Add frontend/backend CI, CodeQL, grouped Dependabot, and a PR template.
  Pin action SHAs, minimize permissions, and use explicit backend project targets.
- [ ] 5. Run all checks, obtain a fresh whole-repository review, resolve material
  issues, commit, create/push the public GitHub repository, observe remote checks,
  enable protections/security settings, and verify remote state.

## Review focus and acceptance

- Clean checkout: documented locked restores and checks must succeed without
  credentials, generated files, or IDE-specific frontend builds.
- Health contract: `GET /api/health` returns `200`, `text/plain`, and `Healthy`.
- Environment boundary: OpenAPI is available in Development and absent otherwise.
- IDE lifecycle: one F5 launches both servers, browser debugging resolves source,
  Stop releases owned processes, and restart does not leak ports.
- GitHub checks: stable frontend/backend check names run on every PR/main push;
  rules require them without a second reviewer or permanently pending filters.

Use frontend/API tests for application behavior and real process/IDE/remote
checks for configuration. No placeholder arithmetic tests, arbitrary coverage
thresholds, or browser-test framework are required.
