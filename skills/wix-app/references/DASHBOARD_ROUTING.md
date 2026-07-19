# Dashboard Routing

## Purpose

Translate a product request into small capabilities with explicit implementation routes. Route the capability, never just the page.

## 1. Decompose Before Choosing Technology

Identify the following for every requested capability:

| Dimension | Questions |
| --- | --- |
| Data | Is there one collection, several collections, a relationship, computed data, or an external API? |
| Surface | Is it a CRUD table, entity view, setup flow, KPI, chart, form, or navigation? |
| Interaction | Must a manager create, edit, assign, filter, bulk-edit, or inspect? |
| Placement | Is it a full page, focused task, contextual desktop panel, or mobile surface? |
| Proof | Which data request and visible state prove it works? |

Do not infer that a request for a table is single-collection CRUD. Confirm the data model first.

## 2. Choose a Route

| Capability | Route | Read |
| --- | --- | --- |
| Single collection CRUD table/entity flow | Auto Patterns | [AUTO_PATTERNS.md](AUTO_PATTERNS.md) |
| Change an existing Auto Patterns page | Auto Patterns override | [CHANGE_ROUTING.md](CHANGE_ROUTING.md) |
| Join, aggregation, custom workflow, external data | Custom dashboard | [CUSTOM_DASHBOARD.md](CUSTOM_DASHBOARD.md) |
| New collection, fields, or indexes | Data schema | [DATA_MODEL_AND_OPERATIONS.md](DATA_MODEL_AND_OPERATIONS.md) |
| Reference field or relationship values | Data schema plus operations | [DATA_MODEL_AND_OPERATIONS.md](DATA_MODEL_AND_OPERATIONS.md) |
| Desktop contextual inspector or assignment | SidePanel | [OVERLAYS.md](OVERLAYS.md) |
| Mobile sliding task surface | Drawer | [OVERLAYS.md](OVERLAYS.md) |
| Focused popup task | Dashboard Modal | [OVERLAYS.md](OVERLAYS.md) |
| KPI or chart | Custom visualization | [VISUALIZATIONS.md](VISUALIZATIONS.md) |

## 3. Build a Capability Plan

Use this shape:

```json
{
  "userOutcome": "Managers can assign a class to each student from a registrations table.",
  "capabilities": [
    {
      "id": "registrations-table",
      "surface": "table",
      "data": { "scope": "single-collection", "collection": "Students" },
      "route": "auto-patterns",
      "references": ["AUTO_PATTERNS.md"],
      "acceptance": "Rows, filters, and loading state render from Students."
    },
    {
      "id": "class-assignment",
      "surface": "contextual editor",
      "data": { "scope": "relationship", "from": "Students", "to": "Classes" },
      "route": "side-panel",
      "references": ["OVERLAYS.md", "DATA_MODEL_AND_OPERATIONS.md"],
      "acceptance": "A selected student can be assigned a class and the row refreshes."
    }
  ]
}
```

## Escalation Rules

- If one capability is unsupported by Auto Patterns, retain Auto Patterns for the supported capability and build only the unsupported capability custom.
- If a request requires a data relationship, plan both schema creation and record population. A field definition alone does not join records.
- If requested terminology is ambiguous, resolve it using product intent: desktop contextual work means SidePanel; mobile slide-in means Drawer; focused popup means Dashboard Modal.
- If the primary data source fails, show a usable error state and stop treating the page as complete.
