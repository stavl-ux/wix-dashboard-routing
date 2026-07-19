# Dashboard A/B Test Cases

Use these representative Wix owner scenarios to compare the original `wix-app` skill tree with the candidate tree. They are grounded in documented Wix business workflows, not attributed to individual customers.

## Ideal Agent Workflow

The dashboard agent should own the complete path from an unprepared site to a verified manager experience:

1. Inspect the site and identify whether the necessary business capability and data already exist.
2. Enable CMS when the requested experience needs CMS data and CMS is not active.
3. Reuse a suitable existing collection when one exists; otherwise create the required collection, fields, and reference fields.
4. Populate reference values only when the user supplies or explicitly requests data creation. A reference field alone does not connect existing records.
5. Build the dashboard against the real site schema, including loading, empty, access-denied, and recoverable-error states.
6. Verify the primary manager workflow in the browser, including the main data request, mutation, console, and network outcome.

The agent must not invent production business records merely to make a dashboard appear populated. On a new site with no data, it should prepare the schema and show an intentional empty state. In an evaluation environment, seeded sample records are allowed only when the test explicitly requests them.

## Data Presentation Rules

Choose the representation that supports the operator's next decision:

- **Table:** compare many records, scan multiple fields, filter, sort, or perform bulk actions.
- **Gallery / cards:** recognize visual inventory, services, or content at a glance; use only when the data model has a meaningful image field.
- **Both:** expose a view switcher only when the same operator needs visual recognition in one moment and dense comparison in another. In Auto Patterns, configure both `Table` and `Grid`; the documented view switcher is then enabled automatically.
- **Metrics and charts:** summarize trends and thresholds; keep the detailed table below for inspection and follow-up.

Do not add a card view merely because it exists. For bookings, exception queues, and subscription records, a dense table is normally the primary operational surface.

## Test Protocol

1. Start both variants from the same fresh site state. CMS and the described collections should be absent unless a case says otherwise.
2. Send the exact prompt unchanged. Do not mention Auto Patterns, WDS, or implementation details.
3. The agent should prepare the required CMS capability and schema before building the dashboard.
4. If a populated-state evaluation is required, seed the identical records only after the schema exists, then ask the agent to continue with the same original request or a fixed follow-up.
5. Save the codegen log, generated result, browser console output, and screenshots.
6. Evaluate the run against the expected route after the run completes; do not reveal the expected route to the agent.

Record for each run: selected route, references read, infrastructure actions, build time, cost, browser outcome, and the first broken or incomplete manager workflow.

## 1. Inventory Reorder Board

**Owner:** Self-creator running a small visual retail catalog.

**Why this is realistic:** Wix Stores supports product and inventory management. This is the deliberately simple Auto Patterns control case, while also testing the documented table and gallery view switcher.

**Starting site state:** New site. CMS is not enabled. No `Products` collection exists.

**Prompt to send:**

> Build an “Inventory Reorder” dashboard for my small store. Set up the CMS data I need for products if it does not already exist, with product name, product image, SKU, category, stock on hand, reorder point, supplier, and product status. I want to start in a visual gallery so I can quickly recognize items that are low in stock, but I also need to switch to a table when I want to compare stock numbers and suppliers across many products. Add search by name or SKU, filters for category and stock status, and a way to mark an item as restocked. Show a clear empty state when no products match.

| Evaluation area | Requirement |
| --- | --- |
| Presentation | Gallery is the default for visual recognition; table is the comparison and restock-work view. The gallery must use the product image, title, and stock status rather than a generic card. |
| What it tests | Whether the agent recognizes a supported single-collection management surface, configures both documented layouts, and avoids rebuilding a custom grid or table. |
| Expected candidate route | Auto Patterns Dashboard with both documented `Table` and `Grid` layouts, plus only documented table/action configuration or override support. No custom table or gallery rebuild. |
| Pass evidence | CMS is enabled or reused, the product schema includes a meaningful image field, the view switcher works, the table and gallery represent the same records, restock updates persist, and loading, empty, and error states are intentional. |

## 2. Booking Follow-up Desk

**Owner:** SMB salon owner with several staff members and repeat clients.

**Why this is realistic:** Wix Bookings supports a dashboard booking list, filters, staff/client review, payment collection, and staff schedules. The staff context means the operator needs to examine a booking without losing the queue.

**Starting site state:** New site. CMS is not enabled. No `Appointments` or `Clients` collection exists.

**Prompt to send:**

> Build a “Booking Follow-up” dashboard for my salon manager. Set up CMS collections for clients and appointments if they do not already exist, including a relationship between an appointment and its client. Show upcoming and missed appointments in one table with client, staff member, service, start time, payment status, and follow-up status. I need filters for staff member, service, date range, payment status, and missed appointments. When I select a booking, keep the list visible and open the client and appointment details in a panel on the right. From there, the manager should be able to add a follow-up note and mark the booking as contacted.

| Evaluation area | Requirement |
| --- | --- |
| Presentation | Use a table only. The manager needs to compare appointment time, staff, payment, and follow-up state across many records; cards would make this queue slower to scan. |
| What it tests | A multi-collection workflow plus the desktop contextual-edit pattern. |
| Expected candidate route | Custom Dashboard Page; WDS `SidePanel` for the selected booking; WDS documentation gate for the panel, form controls, buttons, table, and filters. |
| Pass evidence | CMS is enabled or reused, both schemas and the appointment-to-client relationship exist, and the list remains visible while a real overlay panel edits the selected appointment, persists the update, and refreshes the row without creating a mobile Drawer or a custom fixed-position panel. |

## 3. Order Exceptions Queue

**Owner:** Growing retailer handling online orders, local delivery, and pickup.

**Why this is realistic:** Wix Stores and Wix Restaurants both involve order management, fulfillment, payment status, customer information, notes, saved views, and bulk actions. Operational teams need to isolate work that needs attention, not browse every order.

**Starting site state:** New site. CMS is not enabled. No `Orders` collection exists.

**Prompt to send:**

> Build an “Order Exceptions” dashboard for my store operations team. Set up the CMS data needed for orders if it does not already exist. Show only orders that need attention: unpaid orders, unfulfilled orders older than 24 hours, and orders with a customer issue. Let the team search by order number or customer, filter by channel, delivery method, issue type, and date range, and save time by selecting several rows to mark as reviewed. Opening an order should show the customer details, order notes, and the reason it needs attention.

| Evaluation area | Requirement |
| --- | --- |
| Presentation | Use a dense table only, with bulk selection. This is an exception queue, not a visual catalog. |
| What it tests | A custom operational queue, derived eligibility logic, filters that change the query, bulk action behavior, and contextual detail. |
| Expected candidate route | Custom Dashboard Page. A custom query/derived state is required; do not misroute it as a plain one-collection Auto Patterns CRUD page. Use documented WDS table, filter, bulk-action, and contextual-detail components. |
| Pass evidence | CMS is enabled or reused, the order schema is ready, the “needs attention” rule is actually applied, bulk review persists, filters affect the result set, and detail context explains the exception instead of exposing raw data only. |

## 4. Multi-location Capacity Planner

**Owner:** Enterprise fitness business with several locations, classes, staff, and capacity constraints.

**Why this is realistic:** Wix Bookings supports appointments, classes, staff, locations, schedules, attendance, and performance analysis. A multi-location operator must compare supply and demand, not simply maintain individual records.

**Starting site state:** New site. CMS is not enabled. No `Class Sessions`, `Staff`, or `Locations` collection exists.

**Prompt to send:**

> Build a “Capacity Planner” dashboard for our regional fitness operations team. Set up the CMS data needed for class sessions, staff, and locations if it does not already exist, including the relationships from a session to its coach and location. I need to spot classes that are overbooked, nearly empty, or have a waitlist. Show summary metrics for today and this week, then a table of upcoming sessions with location, coach, service, start time, capacity, booked spots, waitlist, and cancellations. Let regional managers filter by location, coach, service, and date range. When they open a session, show the affected class details and the linked staff and location information.

| Evaluation area | Requirement |
| --- | --- |
| Presentation | Put summary metrics above a table. Do not add cards for individual sessions; the manager's task is comparing capacity, demand, and timing across sessions. |
| What it tests | Aggregation, three related data sets, business thresholds, summary metrics, and a read-heavy contextual inspection workflow. |
| Expected candidate route | Custom Dashboard Page. The same physical page combines relationship resolution, calculations, metrics, and a table; it should not be forced into Auto Patterns. |
| Pass evidence | CMS is enabled or reused, the three schemas and both relationships exist, correct thresholds and metric calculations are applied, relationship data resolves instead of showing blanks, filters work, and the page remains usable for an empty location or zero upcoming sessions. |

## 5. Subscription Health Review

**Owner:** Growth lead for a membership business reviewing recurring revenue and churn risk.

**Why this is realistic:** Wix Analytics supports reports with visualizations and detailed tables, customizable date periods, filters, and saved views. This case deliberately asks for metrics and charts alongside a detailed list.

**Starting site state:** New site. CMS is not enabled. No `Subscriptions` collection exists.

**Prompt to send:**

> Build a “Subscription Health” dashboard for my membership business. Set up the CMS data needed for subscriptions if it does not already exist, including member name, plan, status, monthly value, start and renewal dates, last payment date, payment failures, and cancellation reason. At the top, show active subscriptions, monthly recurring revenue, subscriptions at risk because payment failed, and cancellations this month. Add a chart that shows active subscriptions and cancellations by month for the last six months. Below it, show a searchable subscription list with plan, status, monthly value, renewal date, payment failures, and cancellation reason. Let me filter by plan, status, and renewal date range, and open a member’s subscription details when I need more context.

| Evaluation area | Requirement |
| --- | --- |
| Presentation | Use metrics and charts for trend recognition, then a table for subscription-level investigation. Do not substitute a gallery of subscription cards for the detailed list. |
| What it tests | The boundary where a table is only one part of a dashboard that also needs metrics, aggregation, and charts. |
| Expected candidate route | Custom Dashboard Page with a declared visualization approach. Do not claim Auto Patterns provides chart/KPI functionality unless the actual package documentation supports it. |
| Pass evidence | CMS is enabled or reused, the subscription schema is ready, metrics and charts are calculated from the same data contract as the list, all visible states handle missing or malformed data, and the dashboard does not become blank after loading or a failed request. |

## Cross-case Scorecard

Score each variant 0, 1, or 2 for every row.

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Route selection | Wrong or unproven route | Plausible but incomplete route | Correct route, evidenced by references/log |
| Workflow fit | Visual shell only | Main path partly works | Manager can complete the intended task |
| Data behavior | Broken, mocked, or missing | Works with notable gaps | Queries, mutations, and empty/error states behave correctly |
| Component fidelity | Custom approximation or wrong primitive | Correct family, flawed use | Exact documented component behavior and composition |
| Runtime proof | No browser proof | Preview only | Primary workflow, console, and network checked |
| Efficiency | Unusually wasteful or stuck | Acceptable | Appropriate reads, steps, time, and cost |

## Research Basis

- Wix Events documents guest-list filtering, editing, waitlists, ticket management, and dashboard check-in workflows: [Managing Your Guest List](https://support.wix.com/en/article/wix-events-managing-your-guest-list).
- Wix Stores documents product inventory and order management workflows: [About Wix Stores](https://support.wix.com/en/article/wix-stores-about-wix-stores).
- Wix Bookings documents booking lists, filters, staff/client review, payments, schedules, and analytics: [Managing Bookings with the Booking List](https://support.wix.com/en/article/wix-bookings-managing-bookings-with-the-booking-list), [About Your Bookings Analytics](https://support.wix.com/en/article/wix-analytics-about-the-bookings-overview).
- Wix Restaurants documents saved views, filters, bulk order actions, and customer details: [About the Orders Tab](https://support.wix.com/en/article/wix-restaurants-about-the-orders-tab-9533566).
- Wix Analytics uses a visualization plus detailed table structure and supports date ranges, filters, and saved views: [Customizing Analytics Reports](https://support.wix.com/en/article/customizing-wix-analytics-reports).
- Shopify’s order-management guidance independently supports the operational pattern of searchable, filterable queues and bulk actions: [Viewing and filtering orders](https://help.shopify.com/en/manual/fulfillment/managing-orders/viewing-orders).
