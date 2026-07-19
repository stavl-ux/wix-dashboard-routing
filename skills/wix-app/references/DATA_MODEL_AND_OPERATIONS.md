# Data Model and Operations

Treat schema, relationship values, and manager workflows as three separate deliverables.

## 1. Schema

Define collections, fields, indexes, permissions, and reference fields. For app-owned collections, obtain the required namespace and use the scoped collection identifier.

## 2. Relationship Data

Creating a reference field does not populate it. Decide how existing and future records receive relationship values:

- migration or initial-data strategy;
- user assignment workflow;
- validation for missing or invalid references;
- behavior for records with no relationship.

## 3. Manager Workflow

If a manager must assign a relationship from the dashboard, implement a discoverable write flow. The flow must:

1. show available target records;
2. persist the chosen reference on the source record;
3. refresh the table/detail surface;
4. communicate failure without losing context.

## Data Contract

Before building a table that combines records, write down the source collection, target collection, reference field, required display fields, missing-value treatment, and mutation path. Do not rely on implied naming such as `classRef` without verifying the actual schema.
