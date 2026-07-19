#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const routes = new Set([
  'auto-patterns',
  'custom-dashboard',
  'dashboard-modal',
  'side-panel',
  'drawer',
  'data-schema',
  'data-operations',
]);

const planPath = process.argv[2];
if (!planPath) {
  console.error('Usage: node validate-routing-plan.mjs <plan.json>');
  process.exit(1);
}

const plan = JSON.parse(await readFile(planPath, 'utf8'));
const errors = [];

if (typeof plan.userOutcome !== 'string' || !plan.userOutcome.trim()) {
  errors.push('userOutcome must be a non-empty string.');
}
if (!Array.isArray(plan.capabilities) || plan.capabilities.length === 0) {
  errors.push('capabilities must contain at least one capability.');
}

for (const [index, capability] of (plan.capabilities ?? []).entries()) {
  const label = `capabilities[${index}]`;
  for (const field of ['id', 'surface', 'route', 'acceptance']) {
    if (typeof capability[field] !== 'string' || !capability[field].trim()) {
      errors.push(`${label}.${field} must be a non-empty string.`);
    }
  }
  if (!capability.data || typeof capability.data !== 'object') {
    errors.push(`${label}.data must describe the data scope.`);
  }
  if (!Array.isArray(capability.references) || capability.references.length === 0) {
    errors.push(`${label}.references must name at least one reference.`);
  }
  if (!routes.has(capability.route)) {
    errors.push(`${label}.route must be one of: ${[...routes].join(', ')}.`);
  }
  if (capability.route === 'auto-patterns' && capability.data?.scope !== 'single-collection') {
    errors.push(`${label} uses auto-patterns but data.scope is not single-collection.`);
  }
  if (capability.data?.scope === 'multi-collection' && capability.route === 'auto-patterns') {
    errors.push(`${label} must not route a multi-collection capability to auto-patterns.`);
  }
}

if (errors.length) {
  console.error(`Routing plan is invalid:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Routing plan is valid: ${plan.capabilities.length} capability(s).`);
