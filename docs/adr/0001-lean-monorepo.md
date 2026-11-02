# Use a lean frontend/API monorepo

Keep the React frontend, ASP.NET Core API, tests, and documentation together so
cross-stack changes and their checks travel in one PR. Begin with the UI and API
projects, adding feature-oriented folders and integration boundaries when actual
behavior needs them. We considered separate Domain, Application, Infrastructure,
API, and worker projects from initialization; those would introduce empty layers
before the extraction workflow establishes their responsibilities. A worker or
additional projects can be introduced later without committing to a speculative
domain model now.
