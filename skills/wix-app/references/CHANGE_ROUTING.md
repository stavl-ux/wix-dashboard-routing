# Change Routing for Existing Dashboards

## Inspect Before Editing

1. Locate the dashboard page directory.
2. Check for a sibling `patterns.json`.
3. If present, treat the page as Auto Patterns-owned. Do not directly add UI to the generated page component.
4. Read the narrowest relevant override or action documentation before editing configuration.

## Route the Change

| Requested change | Preferred route |
| --- | --- |
| Header copy, banner, or slot | Auto Patterns header/slot override |
| Table column | Auto Patterns column override |
| Table or page action | Auto Patterns action configuration/override |
| Custom section around supported page | Auto Patterns section override |
| Unsupported visual capability | Add an explicitly scoped custom capability; do not rewrite the Auto Patterns surface |
| Existing custom dashboard bug | Read custom dashboard, data, overlay, and runtime validation references that match the changed behavior |

## Protect the Contract

Preserve the generated table/entity lifecycle unless the user explicitly asks to replace it. Document every escape from the declarative path and why it was necessary.
