# Roadmap

Only the foundation is implemented. The following milestones require their own
design and validation; they are not public capability promises.

1. **Source-access feasibility.** Investigate accessible public YouTube and Facebook
   examples, source restrictions, duration/size limits, and transcript/video inputs.
   Define supported sources and clear inaccessible/no-recipe outcomes. Consider an
   upload fallback separately if it would solve a demonstrated source-access gap.
2. **Private identity.** Personal Microsoft sign-in, explicit two-account allowlist,
   per-user OneDrive consent, and secure token lifecycle. No anonymous public access.
3. **Durable processing foundation.** Choose Azure hosting, job persistence, queueing,
   worker execution, status, retry/cancellation rules, and bounded source acquisition.
4. **Recipe extraction.** Select a Foundry model and inputs, establish structured
   recipe data, validate uncertain/no-recipe results, and evaluate real examples.
   Introduce the model-provider adapter when its responsibilities are known.
5. **PDF and OneDrive delivery.** Design readable documents, metadata/provenance,
   filename/collision handling, per-user uploads, and partial-failure recovery.
6. **PWA experience.** Android installation, responsive submission/status UX,
   update behavior, and carefully bounded caching that respects private data.
7. **V2 exploration.** A locally hosted model endpoint behind the established
   integration boundary; evaluate model capability differences and connectivity.

Deployment infrastructure and workflows should be introduced with the first hosted
milestone, with explicit costs, configuration, and authentication requirements.
