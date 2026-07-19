---
name: wix-app
description: Route, build, review, or test Wix back-office dashboards by capability. Use for Wix dashboard requests involving tables, CMS collections, entity forms, charts, metrics, modals, side panels, drawers, multi-collection data, Auto Patterns, WDS, or runtime validation. Use when choosing between @wix/auto-patterns and custom dashboard implementation, or when improving an existing generated dashboard.
---

# Wix Dashboard Routing

Build a dashboard as a set of independently routed capabilities. Do not classify an entire request as either “Auto Patterns” or “custom React.”

## Non-Negotiable Workflow

1. Read [DASHBOARD_ROUTING.md](references/DASHBOARD_ROUTING.md) for every dashboard task.
2. Create a capability map before scaffolding or editing UI.
3. Read every reference selected by that map, plus [RUNTIME_VALIDATION.md](references/RUNTIME_VALIDATION.md).
4. Implement each capability using its assigned primitive. Preserve Auto Patterns for supported parts of a mixed dashboard.
5. Validate the primary user workflow in a browser. A successful build alone is not a successful dashboard.

Use `scripts/validate-routing-plan.mjs <plan.json>` when a written plan is available. Do not invent an Auto Patterns, WDS, or SDK capability that is not documented.

## Routing Rules

- Use **Auto Patterns** for supported, single-collection CRUD surfaces: collection list, filters, row actions, entity view/create/edit flows, and supported overrides. Read [AUTO_PATTERNS.md](references/AUTO_PATTERNS.md).
- Use a **custom dashboard page** only for the capability that needs it: multi-collection joins, computed business logic, external APIs, custom workflows, unsupported visualization, or explicit custom React. Read [CUSTOM_DASHBOARD.md](references/CUSTOM_DASHBOARD.md).
- For an existing page, inspect for `patterns.json` before editing. If it exists, read [CHANGE_ROUTING.md](references/CHANGE_ROUTING.md) and change the declarative configuration or documented override, not the generated page component.
- Treat an overlay as a precise product choice. Read [OVERLAYS.md](references/OVERLAYS.md). `SidePanel`, `Drawer`, and `Dashboard Modal` are not synonyms.
- Treat data schema, relationships, record population, and manager-facing editing as separate capabilities. Read [DATA_MODEL_AND_OPERATIONS.md](references/DATA_MODEL_AND_OPERATIONS.md).
- Do not route charts or KPI cards to Auto Patterns unless a documented component supports the exact request. Read [VISUALIZATIONS.md](references/VISUALIZATIONS.md).

## Required Capability Map

Before implementation, capture these fields internally or in a plan file:

| Field | Capture |
| --- | --- |
| User outcome | What a manager must be able to accomplish |
| Data | Existing/new collection, scope, relationships, external sources |
| Surface | Table, entity form, chart, metric, setup, or detail view |
| Interaction | Create, edit, assign, filter, bulk action, drill-in, or review |
| Route | Auto Patterns, custom dashboard, modal, SidePanel, Drawer, data schema, or data operations |
| Evidence | The browser behavior that proves this capability works |

For mixed requests, one map can contain several routes. Example: an Auto Patterns collection table, a custom KPI strip, and a SidePanel for a contextual assignment workflow.

## Completion Standard

Do not report completion until all relevant checks pass:

- Correct primitive chosen for each capability.
- Existing `patterns.json` respected.
- Required collection schema and record values exist.
- Loading, empty, permission-denied, and error states are intentional.
- Primary data request succeeds after the page settles.
- No uncaught browser errors or failed primary network requests.

## Reference Index

- [DASHBOARD_ROUTING.md](references/DASHBOARD_ROUTING.md): decompose and route a request.
- [CAPABILITY_CATALOG.md](references/CAPABILITY_CATALOG.md): supported surfaces and explicit boundaries.
- [CHANGE_ROUTING.md](references/CHANGE_ROUTING.md): safely change an existing dashboard.
- [AUTO_PATTERNS.md](references/AUTO_PATTERNS.md): declarative CRUD surfaces.
- [CUSTOM_DASHBOARD.md](references/CUSTOM_DASHBOARD.md): custom page responsibilities.
- [OVERLAYS.md](references/OVERLAYS.md): Modal vs SidePanel vs Drawer.
- [DATA_MODEL_AND_OPERATIONS.md](references/DATA_MODEL_AND_OPERATIONS.md): schema, relationships, and record mutation.
- [VISUALIZATIONS.md](references/VISUALIZATIONS.md): metrics and charts.
- [RUNTIME_VALIDATION.md](references/RUNTIME_VALIDATION.md): browser-level acceptance checks.
