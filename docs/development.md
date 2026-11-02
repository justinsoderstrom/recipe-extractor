# Development

## Repository map

| Location | Responsibility |
| --- | --- |
| `src/web` | React/Vite/TypeScript UI, Tailwind, and colocated `*.test.tsx` tests |
| `src/api` | ASP.NET Core host, health endpoint, development-only OpenAPI |
| `tests/api` | xUnit HTTP integration tests using `WebApplicationFactory` |
| `docs` | Architecture, decisions, roadmap, and the initialization design/plan |
| `.github` | CI, CodeQL, Dependabot, and PR template |
| `.vscode` | Root full-app debugging and editor recommendations |

Keep build artifacts, dependencies, caches, logs, and secrets out of Git. Introduce
feature folders when actual features arrive; do not create empty layers.

## Runtime and first-time setup

Use .NET SDK 10.0.403, Node 24.18.1, and npm 11.16.0 as recorded in `global.json`,
`.node-version`, and the frontend manifest. For Visual Studio, use 2026 18.9 or
later with ASP.NET/web development and JavaScript tooling. The SDK feature band
requires this newer IDE even though earlier Visual Studio versions support React.

From the repository root:

```sh
npm --prefix src/web ci
dotnet restore tests/api/RecipeExtractor.Api.Tests.csproj --locked-mode
```

No environment file or secret configuration is needed. `npm ci` installs exactly
the lockfile; it is deliberately not performed implicitly by Visual Studio. Repeat
it after a branch or dependency change. NuGet's test-project restore includes the
API and validates both lockfiles. CI uses the same commands on Ubuntu.

## F5 in Visual Studio

Open `RecipeExtractor.slnx`, choose the shared **Recipe Extractor** launch profile,
and use Edge as the browser debug target. The profile starts the API first and the
frontend second. The frontend JavaScript project runs `npm run dev`; its browser
launch settings are in `src/web/.vscode/launch.json`. The API does not open a second
browser. The shared profile lives beside the solution in `RecipeExtractor.slnLaunch`.

On first open, Visual Studio may still select the API as its single startup
project. Right-click the solution, choose **Configure Startup Projects**, select
**Multiple startup projects**, select **Recipe Extractor**, and confirm with **OK**.
The API and web project should both show **Start**; the test project should show
**None**. This selection is local IDE state; the profile itself is checked in.

Set a C# breakpoint on `app.MapHealthChecks` in `Program.cs`, then F5 to confirm
startup debugging. Set a browser TypeScript breakpoint on the `return` in `App.tsx`
and refresh the frontend. Continue execution before making health requests.
Stopping debugging should stop both app servers. A subsequent F5 must reuse the
same ports without requiring a manual process kill.

## F5 in VS Code

Open the repository root and install the recommended C# Dev Kit, ESLint, Prettier,
and Tailwind CSS IntelliSense extensions. Select **Recipe Extractor** in Run and
Debug and press F5. Root launch/tasks files build and launch the API directly,
launch Vite through the Node debugger, and open an Edge browser debugger when Vite
reports readiness. API-only and web-only configurations are available too.

The compound uses `stopAll`; stopping one server stops the other. Vite is owned by
the debugger rather than a detached background task. Its browser debug session is
configured to close when the server stops. Test C# and TypeScript breakpoints as
described above. On a machine without Edge, change the browser action to the
installed browser's supported debugger; CLI startup remains platform-independent.

## Command-line development

Run these in separate terminals, from the root:

```sh
dotnet watch --project src/api/RecipeExtractor.Api.csproj
```

```sh
npm --prefix src/web run dev
```

The frontend is `http://localhost:5173`; the API is `http://localhost:5080`.
`GET /api/health` returns plain text `Healthy`. Check it through Vite at
`http://localhost:5173/api/health` to verify proxy wiring. Development OpenAPI is
`http://localhost:5080/openapi/v1.json`; it is intentionally absent in Production.
The health check indicates host availability only, not readiness of future integrations.

## Checks and formatting

All commands below run from the root. The README lists the complete CI check sequence.

| Command | Purpose |
| --- | --- |
| `npm --prefix src/web run dev` | Vite development server and hot module replacement |
| `npm --prefix src/web run lint` | ESLint TypeScript/React checks, zero warnings |
| `npm --prefix src/web run typecheck` | Strict TypeScript checking without emitting files |
| `npm --prefix src/web run format:check` | Prettier and Tailwind class-order verification |
| `npm --prefix src/web run format` | Apply frontend formatting |
| `npm --prefix src/web test` | Run the deterministic frontend tests once |
| `npm --prefix src/web run test:watch` | Interactive frontend test runner |
| `npm --prefix src/web run build` | Typecheck and create the production bundle in `src/web/dist` |
| `npm --prefix src/web run preview` | Preview an already-built frontend bundle; its inherited `/api` proxy still needs the API running separately |
| `dotnet build tests/api/RecipeExtractor.Api.Tests.csproj --configuration Release --no-restore` | Build API and test executable |
| `dotnet test --project tests/api/RecipeExtractor.Api.Tests.csproj --configuration Release --no-build --no-restore` | Run xUnit through the .NET 10 native test runner |

Use `dotnet format src/api/RecipeExtractor.Api.csproj --no-restore` and
`dotnet format tests/api/RecipeExtractor.Api.Tests.csproj --no-restore` to apply C#
formatting; add `--verify-no-changes` for the read-only checks used in CI. Keep
frontend tests next to the code as `*.test.tsx`; backend tests use `*Tests.cs`.
Test observable behavior without real credentials or network dependencies.

## Dependencies and advisories

For intentional updates, use npm/dotnet package commands, regenerate the affected
lockfiles, and run all checks. Locked restores should never silently update files.
Do not use forced audit fixes or major transitive overrides without checking compatibility.

As of initialization on 2026-11-01, npm reports a moderate development-tool
advisory, [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249),
in the ESLint toolchain's transitive `minimatch` dependency. The audit counts affected
parents separately. It concerns glob-pattern denial of service; the app does not
ship these developer tools or accept user-provided lint patterns. Retain normal
upstream version constraints and use Dependabot to follow compatible fixes. Run
`npm --prefix src/web audit` to recheck, and
`npm --prefix src/web audit --omit=dev` to inspect shipped dependencies separately.

## Troubleshooting

- **Port in use:** stop the previous debug session/terminal first. Vite fails
  rather than silently changing 5173. Keep the proxy, launch profile, and browser
  URL consistent if deliberately changing ports.
- **Proxy connection refused:** confirm the API has started and is not paused at a
  breakpoint. Startup ordering alone does not guarantee HTTP readiness.
- **Missing frontend modules:** run `npm --prefix src/web ci`; the IDE does not
  run an implicit `npm install`.
- **Frontend project unavailable in Visual Studio:** install the IDE's JavaScript
  project tooling through Visual Studio Installer and reopen the solution.
- **Test runner:** .NET 10 uses `dotnet test --project ...` with the MTP setting in
  `global.json`, rather than older positional VSTest commands.
- **Restricted automation sandbox:** .NET tests/formatting need local named-pipe
  IPC. A permission failure there requires running the same command in a normal
  local terminal or an authorized unrestricted execution environment.

## Working through GitHub

Use short-lived branches and PRs. Required frontend/backend checks and resolved
conversations protect `main`; another person's approval is not required. Prefer
concise imperative commit subjects, explain behavior and validation in PRs, and
include screenshots for visual changes. Dependabot PRs receive the same checks;
automatic merging is not configured. Deployment and release workflows are deferred.
