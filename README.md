# Recipe Extractor

[![CI](https://github.com/justinsoderstrom/recipe-extractor/actions/workflows/ci.yml/badge.svg)](https://github.com/justinsoderstrom/recipe-extractor/actions/workflows/ci.yml)
[![CodeQL](https://github.com/justinsoderstrom/recipe-extractor/actions/workflows/codeql.yml/badge.svg)](https://github.com/justinsoderstrom/recipe-extractor/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A foundation for turning public cooking videos into recipes you can keep.

**Status: project initialization.** The React shell and ASP.NET Core health endpoint
work locally. Video extraction, PDFs, account sign-in, OneDrive, PWA support, and
Azure deployment are planned and are **not implemented**.

## Stack

- React, Vite, strict TypeScript, and Tailwind CSS
- ASP.NET Core on .NET 10
- Vitest / React Testing Library and xUnit v3 / Microsoft.Testing.Platform
- GitHub Actions, CodeQL, and Dependabot

## Quick start

Install the [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
and [Node.js 24](https://nodejs.org/). The checked-in baseline is .NET SDK
**10.0.403**, Node **24.18.1**, and npm **11.16.0**. `global.json` permits newer
servicing patches within the same SDK feature band; CI uses the recorded versions.

Run once from the repository root:

```sh
npm --prefix src/web ci
dotnet restore tests/api/RecipeExtractor.Api.Tests.csproj --locked-mode
```

Then choose an editor:

- **Visual Studio 2026 18.9+** with ASP.NET/web development and JavaScript tooling:
  open `RecipeExtractor.slnx`, enable the shared **Recipe Extractor** multiple-startup
  profile as described in the development guide, and press **F5**. Use Microsoft
  Edge as the browser debug target.
- **VS Code:** open the repository folder, install the recommended extensions,
  select **Recipe Extractor** in Run and Debug, and press **F5**. Microsoft Edge
  is the configured browser; change the browser debugger if using another OS.

Or run these commands in separate terminals:

```sh
dotnet watch --project src/api/RecipeExtractor.Api.csproj
```

```sh
npm --prefix src/web run dev
```

Open [localhost:5173](http://localhost:5173). The API listens on
[localhost:5080](http://localhost:5080/api/health). The frontend development server
proxies `/api` to it. No credentials, Docker, Azure account, or development
certificate is required. This is a local HTTP setup, not a production deployment.

## Check the project

Run from the repository root after the initial restore:

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

The backend build also builds its referenced API. Use explicit project commands;
the solution includes a frontend project for Visual Studio, while frontend builds
and dependency installation remain npm's responsibility.

## Documentation

- [Development and debugging](docs/development.md)
- [Architecture and future boundaries](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Domain language](CONTEXT.md)
- [Architecture decision](docs/adr/0001-lean-monorepo.md)
- [Agent working instructions](AGENTS.md)
- [Security policy](SECURITY.md)

Licensed under [MIT](LICENSE).
