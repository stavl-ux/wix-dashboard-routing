# Dashboard A/B Test Cases

Use these representative Wix owner scenarios to compare the original `wix-app` skill tree with the candidate tree. They are grounded in documented Wix business workflows, not attributed to individual customers.

## Test Protocol

1. Create the same clean site setup for both variants.
2. Send the exact prompt unchanged. Do not mention Auto Patterns, WDS, or implementation details.
3. Save the codegen log, generated result, browser console output, and screenshots.
4. Evaluate the run against the expected route after the run completes; do not reveal the expected route to the agent.

Record for each run: selected route, references read, build time, cost, browser outcome, and the first broken or incomplete manager workflow.

## 1. Workshop Check-in

**Owner:** Solo workshop creator running paid weekend classes.

**Why this is realistic:** Wix Events supports guest lists, filters, guest updates, tickets, waitlists, and check-in workflows. This is the deliberately simple control case: the main experience is one manageable data collection. 

**Site setup:** Enable CMS. Create an existing `Workshop Registrations` collection with 15 records and these fields: `attendeeName`, `email`, `sessionDate`, `ticketType`, `paymentStatus`, `checkInStatus`, `notes`.

**Prompt to send:**

> Build a dashboard page called “Workshop Check-in” for my weekend classes. I need one place to find registrations quickly, see the session date, ticket type, payment status, and whether someone arrived. Add search by attendee name or email and filters for session date, ticket type, payment status, and check-in status. I should be able to mark an attendee as arrived from the list and see a clear empty state when no registrations match.

**What it tests:** Whether the agent recognizes a supported single-collection management surface before reaching for a custom page.

**Expected candidate route:** Auto Patterns Dashboard, plus only documented table/action configuration or override support. No custom table rebuild.

**Pass evidence:** A usable registration list with functioning search, filters, check-in update, and intentional loading, empty, and error states.

## 2. Booking Follow-up Desk

**Owner:** SMB salon owner with several staff members and repeat clients.

**Why this is realistic:** Wix Bookings supports a dashboard booking list, filters, staff/client review, payment collection, and staff schedules. The staff context means the operator needs to examine a booking without losing the queue.

**Site setup:** Enable CMS. Create `Appointments` and `Clients` collections. `Appointments` contains 20 records with `clientRef`, `staffMember`, `service`, `startTime`, `paymentStatus`, `attendanceStatus`, and `followUpNeeded`. `Clients` contains name, email, phone, visit count, and notes. Populate `clientRef` relationships.

**Prompt to send:**

> Build a “Booking Follow-up” dashboard for my salon manager. Show upcoming and missed appointments in one table with client, staff member, service, start time, payment status, and follow-up status. I need filters for staff member, service, date range, payment status, and missed appointments. When I select a booking, keep the list visible and open the client and appointment details in a panel on the right. From there, the manager should be able to add a follow-up note and mark the booking as contacted.

**What it tests:** A multi-collection workflow plus the desktop contextual-edit pattern.

**Expected candidate route:** Custom Dashboard Page; WDS `SidePanel` for the selected booking; WDS documentation gate for the panel, form controls, buttons, table, and filters.

**Pass evidence:** The list remains visible while a real overlay panel edits the selected appointment, persists the update, and refreshes the row without creating a mobile Drawer or a custom fixed-position panel.

## 3. Order Exceptions Queue

**Owner:** Growing retailer handling online orders, local delivery, and pickup.

**Why this is realistic:** Wix Stores and Wix Restaurants both involve order management, fulfillment, payment status, customer information, notes, saved views, and bulk actions. Operational teams need to isolate work that needs attention, not browse every order.

**Site setup:** Enable CMS. Create an existing `Orders` collection with 30 records: `orderNumber`, `customerName`, `orderChannel`, `paymentStatus`, `fulfillmentStatus`, `deliveryMethod`, `total`, `placedAt`, `issueType`, and `internalNote`. Seed a mix of paid/unpaid, fulfilled/unfulfilled, delivery/pickup, and issue states.

**Prompt to send:**

> Build an “Order Exceptions” dashboard for my store operations team. Show only orders that need attention: unpaid orders, unfulfilled orders older than 24 hours, and orders with a customer issue. Let the team search by order number or customer, filter by channel, delivery method, issue type, and date range, and save time by selecting several rows to mark as reviewed. Opening an order should show the customer details, order notes, and the reason it needs attention.

**What it tests:** A custom operational queue, derived eligibility logic, filters that change the query, bulk action behavior, and contextual detail.

**Expected candidate route:** Custom Dashboard Page. A custom query/derived state is required; do not misroute it as a plain one-collection Auto Patterns CRUD page. Use documented WDS table, filter, bulk-action, and contextual-detail components.

**Pass evidence:** The “needs attention” rule is actually applied, bulk review persists, filters affect the result set, and detail context explains the exception instead of exposing raw data only.

## 4. Multi-location Capacity Planner

**Owner:** Enterprise fitness business with several locations, classes, staff, and capacity constraints.

**Why this is realistic:** Wix Bookings supports appointments, classes, staff, locations, schedules, attendance, and performance analysis. A multi-location operator must compare supply and demand, not simply maintain individual records.

**Site setup:** Enable CMS. Create `Class Sessions`, `Staff`, and `Locations` collections. `Class Sessions` includes `locationRef`, `staffRef`, `serviceName`, `startTime`, `capacity`, `bookedCount`, `waitlistCount`, and `cancellationCount`. Populate 40 sessions across three locations with relationships.

**Prompt to send:**

> Build a “Capacity Planner” dashboard for our regional fitness operations team. I need to spot classes that are overbooked, nearly empty, or have a waitlist. Show summary metrics for today and this week, then a table of upcoming sessions with location, coach, service, start time, capacity, booked spots, waitlist, and cancellations. Let regional managers filter by location, coach, service, and date range. When they open a session, show the affected class details and the linked staff and location information.

**What it tests:** Aggregation, three related data sets, business thresholds, summary metrics, and a read-heavy contextual inspection workflow.

**Expected candidate route:** Custom Dashboard Page. The same physical page combines relationship resolution, calculations, metrics, and a table; it should not be forced into Auto Patterns.

**Pass evidence:** Correct thresholds and metric calculations, relationship data resolves instead of showing blanks, filters work, and the page remains usable for an empty location or zero upcoming sessions.

## 5. Subscription Health Review

**Owner:** Growth lead for a membership business reviewing recurring revenue and churn risk.

**Why this is realistic:** Wix Analytics supports reports with visualizations and detailed tables, customizable date periods, filters, and saved views. This case deliberately asks for metrics and charts alongside a detailed list.

**Site setup:** Enable CMS. Create `Subscriptions` with 40 records: `memberName`, `planName`, `status`, `monthlyValue`, `startDate`, `renewalDate`, `lastPaymentDate`, `paymentFailureCount`, and `cancellationReason`. Include active, past due, canceled, and trial subscriptions over six months.

**Prompt to send:**

> Build a “Subscription Health” dashboard for my membership business. At the top, show active subscriptions, monthly recurring revenue, subscriptions at risk because payment failed, and cancellations this month. Add a chart that shows active subscriptions and cancellations by month for the last six months. Below it, show a searchable subscription list with plan, status, monthly value, renewal date, payment failures, and cancellation reason. Let me filter by plan, status, and renewal date range, and open a member’s subscription details when I need more context.

**What it tests:** The boundary where a table is only one part of a dashboard that also needs metrics, aggregation, and charts.

**Expected candidate route:** Custom Dashboard Page with a declared visualization approach. Do not claim Auto Patterns provides chart/KPI functionality unless the actual package documentation supports it.

**Pass evidence:** Metrics and charts are calculated from the same data contract as the list, all visible states handle missing or malformed data, and the dashboard does not become blank after loading or a failed request.

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
- Wix Bookings documents booking lists, filters, staff/client review, payments, schedules, and analytics: [Managing Bookings with the Booking List](https://support.wix.com/en/article/wix-bookings-managing-bookings-with-the-booking-list), [About Your Bookings Analytics](https://support.wix.com/en/article/wix-analytics-about-the-bookings-overview).
- Wix Restaurants documents saved views, filters, bulk order actions, and customer details: [About the Orders Tab](https://support.wix.com/en/article/wix-restaurants-about-the-orders-tab-9533566).
- Wix Analytics uses a visualization plus detailed table structure and supports date ranges, filters, and saved views: [Customizing Analytics Reports](https://support.wix.com/en/article/customizing-wix-analytics-reports).
- Shopify’s order-management guidance independently supports the operational pattern of searchable, filterable queues and bulk actions: [Viewing and filtering orders](https://help.shopify.com/en/manual/fulfillment/managing-orders/viewing-orders).

## Research Limitation

The internal domain-knowledge MCP service returned an upstream connection failure during this research. The scenarios are therefore grounded in public Wix Help Center documentation, accessible internal WDS guidance, and external operational-dashboard patterns rather than unpublished customer research.
