# Auto Patterns

Use Auto Patterns for the supported CRUD surface of a dashboard: a single collection, a management table or grid, supported filters/actions, and entity create/edit/view flows.

## Required Checks

- Confirm the source is one collection, not a join or aggregate across several collections.
- Confirm the requested interaction maps to a documented declarative feature or override.
- For an existing page, inspect `patterns.json` and edit configuration or an override instead of the generated component.
- Keep the initial field set intentionally small and typed correctly.

## Do Not Route Here

Use another route for:

- Multi-collection data displays or custom joins.
- Custom business calculations or external APIs.
- KPI cards and charts.
- A modal, SidePanel, or Drawer interaction.
- Custom backend endpoints.

## Mixed Dashboard Rule

If a dashboard needs a collection table plus unsupported custom capabilities, keep the table on Auto Patterns. Build only the unsupported capability using the appropriate custom route.

## Implementation Source

Consult the current Wix Auto Patterns reference and the installed package’s documented configuration. Do not guess configuration keys or modes.
