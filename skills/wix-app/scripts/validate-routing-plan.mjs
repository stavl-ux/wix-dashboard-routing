#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const hostExtensions = new Set([
  'DASHBOARD_PAGE',
  'DASHBOARD_MODAL',
  'DASHBOARD_PLUGIN',
  'DASHBOARD_MENU_PLUGIN',
  'DATA_COLLECTION',
]);
const primitives = new Set([
  'auto-patterns',
  'auto-patterns-override',
  'custom-dashboard',
  'wds-side-panel',
  'wds-drawer',
  'dashboard-modal-api',
  'data-schema',
  'data-operations',
  'custom-visualization',
]);
const dataSourceKinds = new Set([
  'existing-site-collection',
  'new-app-collection',
  'wix-business-data',
  'external-api',
  'none',
]);
const compositions = new Set([
  'standalone-auto-patterns',
  'documented-override',
  'custom-dashboard-page',
  'separate-extension',
  'non-visual',
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

const capabilitiesBySurface = new Map();

for (const [index, capability] of (plan.capabilities ?? []).entries()) {
  const label = `capabilities[${index}]`;
  for (const field of ['id', 'surface', 'hostSurfaceId', 'hostExtension', 'implementationPrimitive', 'composition', 'acceptance']) {
    if (typeof capability[field] !== 'string' || !capability[field].trim()) {
      errors.push(`${label}.${field} must be a non-empty string.`);
    }
  }
  if (!capability.dataSource || typeof capability.dataSource !== 'object') {
    errors.push(`${label}.dataSource must describe the source of data.`);
  }
  if (!Array.isArray(capability.references) || capability.references.length === 0) {
    errors.push(`${label}.references must name at least one reference.`);
  }
  if (!hostExtensions.has(capability.hostExtension)) {
    errors.push(`${label}.hostExtension must be one of: ${[...hostExtensions].join(', ')}.`);
  }
  if (!primitives.has(capability.implementationPrimitive)) {
    errors.push(`${label}.implementationPrimitive must be one of: ${[...primitives].join(', ')}.`);
  }
  if (!dataSourceKinds.has(capability.dataSource?.kind)) {
    errors.push(`${label}.dataSource.kind must be one of: ${[...dataSourceKinds].join(', ')}.`);
  }
  if (!compositions.has(capability.composition)) {
    errors.push(`${label}.composition must be one of: ${[...compositions].join(', ')}.`);
  }
  if (capability.implementationPrimitive === 'auto-patterns' && capability.hostExtension !== 'DASHBOARD_PAGE') {
    errors.push(`${label} uses auto-patterns but is not hosted by DASHBOARD_PAGE.`);
  }
  if (capability.implementationPrimitive === 'auto-patterns' && capability.composition !== 'standalone-auto-patterns') {
    errors.push(`${label} uses auto-patterns but is not a standalone Auto Patterns page.`);
  }
  if (['wds-side-panel', 'wds-drawer'].includes(capability.implementationPrimitive) && capability.hostExtension !== 'DASHBOARD_PAGE') {
    errors.push(`${label} uses a WDS panel primitive but is not hosted by DASHBOARD_PAGE.`);
  }
  const hasWdsComponents = Array.isArray(capability.wdsComponents) && capability.wdsComponents.length > 0;
  const hasDocumentationTargets = Array.isArray(capability.documentationTargets) && capability.documentationTargets.length > 0;
  const requiresWdsDocumentation = ['wds-side-panel', 'wds-drawer'].includes(capability.implementationPrimitive);
  if (requiresWdsDocumentation && !hasWdsComponents) {
    errors.push(`${label} uses a WDS panel primitive but does not name its WDS components.`);
  }
  if (requiresWdsDocumentation && !hasDocumentationTargets) {
    errors.push(`${label} uses a WDS panel primitive but does not name its packages/wix-design-system documentation targets.`);
  }
  if ((hasWdsComponents || hasDocumentationTargets) && (!hasWdsComponents || !hasDocumentationTargets)) {
    errors.push(`${label} must provide both wdsComponents and documentationTargets when either is present.`);
  }
  if (hasDocumentationTargets && capability.documentationTargets.some((target) => typeof target !== 'string' || !target.startsWith('packages/wix-design-system:'))) {
    errors.push(`${label}.documentationTargets must use packages/wix-design-system targets.`);
  }
  if (['wds-side-panel', 'wds-drawer'].includes(capability.implementationPrimitive) && capability.composition === 'standalone-auto-patterns') {
    errors.push(`${label} cannot add a WDS panel primitive to a standalone Auto Patterns page without a documented override.`);
  }
  if (capability.implementationPrimitive === 'dashboard-modal-api' && capability.hostExtension !== 'DASHBOARD_MODAL') {
    errors.push(`${label} uses dashboard-modal-api but is not hosted by DASHBOARD_MODAL.`);
  }
  if (capability.dataSource?.kind === 'new-app-collection' && capability.hostExtension !== 'DATA_COLLECTION' && capability.implementationPrimitive === 'data-schema') {
    errors.push(`${label} creates app-owned schema but is not hosted by DATA_COLLECTION.`);
  }

  const surfaceCapabilities = capabilitiesBySurface.get(capability.hostSurfaceId) ?? [];
  surfaceCapabilities.push({ capability, label });
  capabilitiesBySurface.set(capability.hostSurfaceId, surfaceCapabilities);
}

for (const [hostSurfaceId, surfaceCapabilities] of capabilitiesBySurface) {
  const standaloneAutoPatterns = surfaceCapabilities.filter(
    ({ capability }) => capability.implementationPrimitive === 'auto-patterns' && capability.composition === 'standalone-auto-patterns',
  );
  if (standaloneAutoPatterns.length && surfaceCapabilities.length > 1) {
    errors.push(`hostSurfaceId ${hostSurfaceId} mixes a standalone Auto Patterns page with other capabilities. Use a documented override, a custom Dashboard Page, or separate surfaces.`);
  }
}

if (errors.length) {
  console.error(`Routing plan is invalid:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Routing plan is valid: ${plan.capabilities.length} capability(s).`);
