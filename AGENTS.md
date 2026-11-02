# Repository Guidelines

## Project structure and current scope

- `src/web`: React/Vite/strict TypeScript/Tailwind UI and colocated `*.test.tsx` tests.
- `src/api`: ASP.NET Core .NET 10 API; health endpoint and Development-only OpenAPI.
- `tests/api`: xUnit v3 integration tests (`*Tests.cs`) with `WebApplicationFactory`.
- `docs`: development, architecture, roadmap, decisions, and initialization design/plan.
- `.github`: CI, CodeQL, Dependabot, PR template. `.vscode`: root full-app debugging.

This is a foundation, not a working recipe extractor. Read the architecture and
roadmap before feature work; distinguish future intentions from implemented code.
Add feature folders when needed rather than empty architectural layers, adapters,
cloud settings, or simulated product functionality. Keep generated output ignored.

## Runtime, setup, and commands

Baseline: .NET SDK 10.0.403 (same-band patch roll-forward), Node 24.18.1, npm 11.16.0.
Run all commands from the repository root. No cloud credentials are required.

```sh
npm --prefix src/web ci
dotnet restore tests/api/RecipeExtractor.Api.Tests.csproj --locked-mode
```

Development: `npm --prefix src/web run dev` and
`dotnet watch --project src/api/RecipeExtractor.Api.csproj`, or the shared
**Recipe Extractor** F5 configurations in Visual Studio/VS Code. See the development
guide for editor prerequisites and lifecycle troubleshooting.

Verification:

```sh
npm --prefix src/web run format:check
npm --prefix src/web run lint
npm --prefix src/web run typecheck
npm --prefix src/web test
npm --prefix src/web run build
dotnet format src/api/RecipeExtractor.Api.csproj --verify-no-changes --no-restore
dotnet format tests/api/RecipeExtractor.Api.Tests.csproj --verify-no-changes --no-restore
dotnet build tests/api/RecipeExtractor.Api.Tests.csproj --configuration Release --no-restore
dotnet test --project tests/api/RecipeExtractor.Api.Tests.csproj --configuration Release --no-build --no-restore
```

Target .NET projects explicitly, not the solution's JavaScript IDE project. The
native .NET 10 test runner uses `--project`. Restricted environments may need
permission for the .NET tooling's local IPC pipes. Report checks that cannot run.

## Style and tests

Use standard C# conventions and descriptive PascalCase types; use camelCase values
and PascalCase React components in TypeScript. Follow `.editorconfig`, strict TS,
ESLint, Prettier/Tailwind class sorting, and .NET analyzers. To apply formatting,
use `npm --prefix src/web run format` and the .NET format commands without
`--verify-no-changes`. Keep changes focused and avoid unrelated formatting.

Add observable-behavior tests for features and regression tests for fixes; keep
them deterministic and independent of private credentials or local machine state.
Use the real shell/API boundaries rather than placeholder tests or mocked behavior.
There is no arbitrary coverage threshold. Verify startup/proxy/debugging changes
with actual processes in addition to static checks. Update documentation and these
commands when changing tooling; verify commands before claiming they work.

## Git and review

Use short-lived branches and PRs after the one-time bootstrap. Main requires
passing frontend/backend checks and resolved conversations, without another
person's approval. Use concise imperative commit subjects. PRs describe the
problem, resulting behavior, validation, relevant issues, and review setup; include
screenshots for visual changes. Do not claim checks passed without reading results.

## Security and configuration

Keep credentials, tokens, and private configuration out of source control. No
environment file is needed today. Introduce safe examples only for actual supported
settings, and ignore real local secrets. Never put secrets in browser `VITE_*`
configuration. Keep dependency lockfiles current and review updates instead of
forcing audit upgrades. See `SECURITY.md` and the development advisory notes.
Authentication, Azure, PWA, video ingestion, models, PDFs, and OneDrive remain
future work until explicitly requested.
