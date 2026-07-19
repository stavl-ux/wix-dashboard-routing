# Capability Catalog

Use this catalog as a boundary map. “Supported” means a documented implementation route exists; it does not mean every requested variation is automatically generated.

| Capability | Preferred primitive | Boundary |
| --- | --- | --- |
| Collection table with supported CRUD | Auto Patterns | One collection and supported declarative actions |
| Entity create/edit/view | Auto Patterns | Use supported entity pages and action configuration |
| Table header, actions, slots, columns, sections | Auto Patterns override | Only when `patterns.json` exists |
| Multiple collections or a join | Custom dashboard/data logic | Define relationship, query, null behavior, and write path |
| Relationship schema | Data Collection | Reference definition is not data population |
| Assign/change a relationship | Data operations + contextual UI | Persist the record change and refresh displayed data |
| KPI cards | Custom dashboard metric component | Require source, calculation, loading, empty, and error states |
| Charts | Custom dashboard visualization | Require aggregation contract and malformed-data handling |
| Desktop inspection/edit flow | WDS SidePanel | Keep page context visible and preserve overlay behavior |
| Mobile overlay | WDS Drawer | Do not use as a synonym for desktop SidePanel |
| Focused popup | Dashboard Modal | Do not embed a page modal directly in a Dashboard Page |

## Unsupported-by-Default Assumptions

Do not assume any of these without a documented source:

- Auto Patterns supports charts, KPI widgets, or arbitrary multi-collection joins.
- Creating a reference field populates existing records.
- A table action is automatically inline-editable.
- A custom fixed-position panel behaves like a documented WDS overlay.
- A build or deployment proves runtime data correctness.
