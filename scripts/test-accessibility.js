#!/usr/bin/env node

/**
 * Accessibility Testing Script using axe-core CLI
 * Tests WCAG 2.1 AA compliance across key pages
 *
 * Usage:
 *   npm run test:accessibility
 *   npm run test:accessibility -- --url=http://localhost:3000/contact
 *   npm run test:accessibility -- --verbose
 */

const { execSync } = require('child_process');
const nodePath = require('path');
const fs = require('fs');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const KEY_PAGES = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/blog',
  '/achievements',
  '/team-member',
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
  '/accessibility-statement',
  '/non-discrimination-statement',
];

function checkAxeInstalled() {
  try {
    execSync('npx @axe-core/cli --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function testPage(url, options = {}) {
  const { verbose = false } = options;

  console.log(`\n  Testing: ${url}`);

  try {
    const command = `npx @axe-core/cli "${url}" --tags wcag2aa --stdout`;
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: verbose ? 'inherit' : 'pipe'
    });

    const results = JSON.parse(output);
    return {
      url,
      success: true,
      violations: results.violations || [],
      incomplete: results.incomplete || [],
      passes: results.passes || [],
    };
  } catch (error) {
    try {
      const errorOutput = error.stdout || error.message;
      const results = JSON.parse(errorOutput);
      return {
        url,
        success: false,
        violations: results.violations || [],
        incomplete: results.incomplete || [],
        error: error.message
      };
    } catch {
      return {
        url,
        success: false,
        error: error.message,
      };
    }
  }
}

function formatResults(results) {
  console.log('\n' + '='.repeat(70));
  console.log('ACCESSIBILITY TEST RESULTS');
  console.log('='.repeat(70));

  let totalViolations = 0;
  let totalPages = 0;
  let passedPages = 0;

  results.forEach(result => {
    totalPages++;
    const violations = result.violations || [];
    totalViolations += violations.length;

    if (violations.length === 0) {
      passedPages++;
      console.log(`\n  PASS  ${result.url}`);
    } else {
      console.log(`\n  FAIL  ${result.url} (${violations.length} violation${violations.length > 1 ? 's' : ''})`);

      violations.forEach(v => {
        console.log(`    - [${v.impact}] ${v.id}: ${v.description}`);
        console.log(`      Help: ${v.helpUrl}`);
      });
    }

    if (result.incomplete && result.incomplete.length > 0) {
      console.log(`    ${result.incomplete.length} item(s) need manual review`);
    }
  });

  console.log('\n' + '='.repeat(70));
  console.log(`Pages: ${totalPages} tested, ${passedPages} passed, ${totalPages - passedPages} failed`);
  console.log(`Violations: ${totalViolations} total`);
  console.log('='.repeat(70));

  if (totalViolations === 0) {
    console.log('\n  All pages passed accessibility tests!\n');
  } else {
    console.log(`\n  Found ${totalViolations} violation(s) to fix.\n`);
  }

  return totalViolations === 0;
}

function main() {
  const args = process.argv.slice(2);
  const testUrl = args.find(arg => arg.startsWith('--url='))?.split('=')[1];
  const verbose = args.includes('--verbose') || args.includes('-v');

  const baseUrl = testUrl || BASE_URL;

  console.log('Starting Accessibility Tests');
  console.log(`Base URL: ${baseUrl}`);

  if (!checkAxeInstalled()) {
    console.error('\nError: @axe-core/cli is not installed.');
    console.error('Install it: npm install -D @axe-core/cli');
    process.exit(1);
  }

  if (testUrl) {
    const result = testPage(testUrl, { verbose });
    const passed = formatResults([result]);
    process.exit(passed ? 0 : 1);
    return;
  }

  const results = [];
  for (const page of KEY_PAGES) {
    const url = `${baseUrl}${page}`;
    results.push(testPage(url, { verbose: false }));
  }

  const allPassed = formatResults(results);

  const resultsFile = nodePath.join(process.cwd(), 'accessibility-results.json');
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`Detailed results saved to: ${resultsFile}`);

  process.exit(allPassed ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { testPage, formatResults };
