# Overlays

Choose an overlay by user context, not by loose wording such as “drawer” or “panel.”

| User need | Primitive | Rules |
| --- | --- | --- |
| Inspect or edit a selected item while retaining desktop page context | WDS SidePanel | Use the documented overlay component. It must layer above the page and not become a fixed element inside the page layout. |
| Perform a focused, bounded popup task | Dashboard Modal | Create/use the Dashboard Modal extension and open it through the dashboard API. |
| Present a mobile sliding task surface | WDS Drawer | Use it for mobile drawer behavior, not as a generic desktop SidePanel substitute. |

## Layout Guardrails

- Do not set a nested content layout to the same fixed dimensions as its overlay host.
- Do not use `overflow: auto` on the outer host by default.
- Let the host control containment; place scroll behavior only in the documented content region when needed.
- Keep close controls, focus handling, and page blocking behavior in the documented component.

## Language Guardrail

When writing instructions, name the exact component: `SidePanel`, `Drawer`, or `Dashboard Modal`. Do not write “drawer/side panel” unless responsive behavior deliberately uses both and the breakpoint behavior is specified.
