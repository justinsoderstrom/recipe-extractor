# Architecture

## Implemented foundation

One repository contains a React/Vite SPA and an independent ASP.NET Core API.
The frontend currently renders a responsive development-status page. The API
provides `GET /api/health` and Development-only OpenAPI. Integration tests run an
in-memory API host; frontend tests render the real shell in jsdom.

During local development, Vite proxies `/api` unchanged to the loopback API. No
cross-origin API access policy is required. Editor profiles coordinate the two
processes; explicit npm/dotnet commands remain the build and CI source of truth.
There is no authentication, persistence, background worker, PWA service worker,
cloud resource, or recipe-processing implementation.

## Intended product direction — not implemented

An allowed user signs in using a personal Microsoft account and submits an
accessible public cooking-video link. A background workflow will acquire source
material, extract any recipes, produce a PDF, and upload it to that user's own
personal OneDrive Recipes folder. Initially, only two explicitly allowed accounts
will have access. Public source access does not make the running app public.

Inaccessible sources should fail clearly; access restrictions will not be bypassed.
Public YouTube and Facebook links are examples to investigate, not a promise that
every platform/link is supported. Source acquisition needs a feasibility milestone
before choosing download/transcription tools. Video-file upload is a possible
fallback idea, not a committed requirement. A valid video containing no recipe is
a distinct outcome to design rather than an invitation to invent ingredients.

## Future boundaries

Keep acquisition, model-assisted extraction, PDF rendering, and OneDrive delivery
separate when their responsibilities become concrete. Background work must survive
request completion and eventually support durable status, explicit failures, and
appropriate cancellation/retry behavior. Do not implement a fire-and-forget request
task and assume it provides durable processing.

Azure is the initial hosting direction and Microsoft Foundry the initial model
direction. Actual hosting, queues, storage, identity configuration, models, PDF
library, and recipe/job schemas will be selected in their feature designs.
No specific Azure products are provisioned or implied by this scaffold.

Treat model calls as a replaceable integration boundary. An adapter remains an
appropriate approach; evaluate existing .NET abstractions such as
[Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
when the first model integration establishes the required capabilities. Do not
create an unused interface or assume all providers accept the same video inputs.
Calling a locally hosted model is a V2 stretch goal, not a commitment to moving
the entire app and its storage off Azure.

## Security design still needed before features

- Require sign-in and an explicit account allowlist before deploying the private app.
- Obtain each user's delegated Microsoft Graph consent for their own OneDrive;
  design secure token storage, renewal, revocation, and account/data isolation.
- Treat submitted URLs as untrusted: validate schemes/destinations/redirects and
  prevent requests to private/internal services; bound download size and duration.
- Treat videos, transcripts, and model output as untrusted content. Plan prompt-
  injection handling, output validation, provenance, and review of uncertain recipes.
- Keep source media, recipe artifacts, and tokens private; select retention and
  deletion policies before storing them. Avoid sensitive data in logs.
- Use HTTPS for any deployment. PWA installation, cache/update behavior, offline
  expectations, and authentication interactions need their own design.

These are future implementation requirements, not claims about controls already
present in this local shell.
