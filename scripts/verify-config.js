#!/usr/bin/env node

/**
 * Cover Site Template - Configuration Verification
 *
 * Checks your template configuration for common issues and missing values.
 * Helps ensure everything is set up correctly before deployment.
 *
 * Usage:
 *   node scripts/verify-config.js
 *   pnpm verify
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

let totalChecks = 0;
let passedChecks = 0;
let warnings = 0;

function check(name, condition, errorMsg, isWarning = false) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    log(`  ✓ ${name}`, 'green');
    return true;
  } else {
    if (isWarning) {
      warnings++;
      log(`  ⚠ ${name}`, 'yellow');
      log(`    ${errorMsg}`, 'yellow');
    } else {
      log(`  ✗ ${name}`, 'red');
      log(`    ${errorMsg}`, 'red');
    }
    return false;
  }
}

function checkFileExists(filePath, displayName) {
  return check(
    displayName || path.basename(filePath),
    fs.existsSync(filePath),
    `File not found: ${filePath}`
  );
}

function verifyConfig() {
  log('\n========================================', 'bright');
  log('  Cover Site Template - Config Verification', 'bright');
  log('========================================\n', 'bright');

  // Check 1: Required Files
  log('Checking Required Files:', 'cyan');
  log('─────────────────────────────────────\n', 'cyan');

  checkFileExists(path.join(process.cwd(), 'site.config.ts'), 'site.config.ts');
  checkFileExists(path.join(process.cwd(), 'theme.config.ts'), 'theme.config.ts');
  checkFileExists(path.join(process.cwd(), 'package.json'), 'package.json');
  checkFileExists(path.join(process.cwd(), 'next.config.mjs'), 'next.config.mjs');
  checkFileExists(path.join(process.cwd(), 'tailwind.config.ts'), 'tailwind.config.ts');
  checkFileExists(path.join(process.cwd(), '.env.example'), '.env.example');

  // Check 2: Environment Variables
  log('\nChecking Environment Variables:', 'cyan');
  log('─────────────────────────────────────\n', 'cyan');

  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);

  if (envExists) {
    const envContent = fs.readFileSync(envPath, 'utf8');

    check(
      '.env.local file exists',
      true,
      ''
    );

    check(
      'NEXT_PUBLIC_GA_MEASUREMENT_ID',
      envContent.includes('NEXT_PUBLIC_GA_MEASUREMENT_ID=') && !envContent.includes('NEXT_PUBLIC_GA_MEASUREMENT_ID=\n'),
      'Google Analytics not configured (optional)',
      true
    );

    check(
      'NEXT_PUBLIC_SUPABASE_URL',
      envContent.includes('NEXT_PUBLIC_SUPABASE_URL=') && !envContent.includes('NEXT_PUBLIC_SUPABASE_URL=\n'),
      'Supabase URL not configured (required for newsletter)',
      true
    );

    check(
      'SUPABASE_SERVICE_ROLE_KEY',
      envContent.includes('SUPABASE_SERVICE_ROLE_KEY=') && !envContent.includes('SUPABASE_SERVICE_ROLE_KEY=\n'),
      'Supabase key not configured (required for newsletter)',
      true
    );

    check(
      'NEWSLETTER_ADMIN_KEY',
      envContent.includes('NEWSLETTER_ADMIN_KEY=') && !envContent.includes('NEWSLETTER_ADMIN_KEY=\n'),
      'Admin key not configured (optional)',
      true
    );
  } else {
    check(
      '.env.local file exists',
      false,
      'Create .env.local from .env.example',
      true
    );
  }

  // Check 3: site.config.ts
  log('\nChecking Site Configuration:', 'cyan');
  log('─────────────────────────────────────\n', 'cyan');

  const siteConfigPath = path.join(process.cwd(), 'site.config.ts');
  if (fs.existsSync(siteConfigPath)) {
    const siteConfig = fs.readFileSync(siteConfigPath, 'utf8');

    check(
      'Company name configured',
      !siteConfig.includes('name: "Your Company Name"') && !siteConfig.includes('name: "AMC Defense Law"'),
      'Update company name in site.config.ts'
    );

    check(
      'Contact phone configured',
      !siteConfig.includes('phone: "+1 (555) 123-4567"') && !siteConfig.includes('(561) 542-5494'),
      'Update phone number in site.config.ts'
    );

    check(
      'Contact email configured',
      !siteConfig.includes('email: "contact@yoursite.com"') && !siteConfig.includes('contact@amcdefenselaw.com'),
      'Update email in site.config.ts'
    );

    check(
      'Site URL configured',
      !siteConfig.includes('url: "https://yoursite.com"') && !siteConfig.includes('amcdefenselaw.com'),
      'Update site URL in site.config.ts'
    );

    check(
      'Business address configured',
      !siteConfig.includes('street: "123 Main Street"') && !siteConfig.includes('1200 North Federal Highway'),
      'Update address in site.config.ts'
    );

    // Check theme
    const themeMatch = siteConfig.match(/activeTheme:\s*'([^']*)'/);
    if (themeMatch) {
      const validThemes = ['professional', 'modern', 'elegant', 'minimal', 'warm'];
      check(
        'Valid theme selected',
        validThemes.includes(themeMatch[1]),
        `Invalid theme: ${themeMatch[1]}. Use: ${validThemes.join(', ')}`
      );
    }
  }

  // Check 4: Logo Files
  log('\nChecking Branding Assets:', 'cyan');
  log('─────────────────────────────────────\n', 'cyan');

  const logoPath = path.join(process.cwd(), 'public/img/logo.svg');
  const logoWhitePath = path.join(process.cwd(), 'public/img/logo-white.svg');
  const faviconPath = path.join(process.cwd(), 'public/img/favicon.ico');

  checkFileExists(logoPath, 'Logo file (logo.svg)');
  checkFileExists(logoWhitePath, 'White logo (logo-white.svg)');
  checkFileExists(faviconPath, 'Favicon (favicon.ico)');

  // Check 5: Content Directories
  log('\nChecking Content Directories:', 'cyan');
  log('─────────────────────────────────────\n', 'cyan');

  const blogDir = path.join(process.cwd(), 'content/blog');
  const blogDirExists = fs.existsSync(blogDir);

  check(
    'Blog directory exists',
    blogDirExists,
    'Create content/blog directory'
  );

  if (blogDirExists) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
    check(
      'Blog posts exist',
      blogFiles.length > 0,
      'No blog posts found. Create .mdx files in content/blog',
      true
    );
  }

  // Check 6: API Routes
  log('\nChecking API Routes:', 'cyan');
  log('─────────────────────────────────────\n', 'cyan');

  checkFileExists(
    path.join(process.cwd(), 'app/api/newsletter/subscribe/route.ts'),
    'Newsletter subscribe API'
  );

  checkFileExists(
    path.join(process.cwd(), 'app/api/upload-audio/route.ts'),
    'Audio upload API'
  );

  // Check 7: Hardcoded Values
  log('\nChecking for Hardcoded Values:', 'cyan');
  log('─────────────────────────────────────\n', 'cyan');

  const subscribeRoutePath = path.join(process.cwd(), 'app/api/newsletter/subscribe/route.ts');
  if (fs.existsSync(subscribeRoutePath)) {
    const subscribeRoute = fs.readFileSync(subscribeRoutePath, 'utf8');

    check(
      'No hardcoded Supabase URL',
      !subscribeRoute.includes('https://luctiepxpgsjfdlotubw.supabase.co'),
      'Replace hardcoded Supabase URL with process.env.NEXT_PUBLIC_SUPABASE_URL'
    );
  }

  const analyticsPath = path.join(process.cwd(), 'components/google-analytics.tsx');
  if (fs.existsSync(analyticsPath)) {
    const analytics = fs.readFileSync(analyticsPath, 'utf8');

    check(
      'No hardcoded GA ID',
      !analytics.includes('G-7FTPKV8KLS'),
      'Replace hardcoded GA ID with process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID'
    );
  }

  // Summary
  log('\n========================================', 'bright');
  log('  Verification Summary', 'bright');
  log('========================================\n', 'bright');

  const failedChecks = totalChecks - passedChecks - warnings;

  log(`Total Checks: ${totalChecks}`, 'blue');
  log(`Passed: ${passedChecks}`, 'green');
  if (warnings > 0) {
    log(`Warnings: ${warnings}`, 'yellow');
  }
  if (failedChecks > 0) {
    log(`Failed: ${failedChecks}`, 'red');
  }

  if (failedChecks === 0) {
    log('\n✓ Configuration looks good!', 'green');
    if (warnings > 0) {
      log('⚠ Some optional features are not configured.', 'yellow');
      log('  Review warnings above if you need these features.\n', 'yellow');
    } else {
      log('  Your template is ready to deploy!\n', 'green');
    }
  } else {
    log('\n✗ Configuration has issues.', 'red');
    log('  Please fix the errors above before deploying.\n', 'red');
  }

  log('For detailed setup instructions, see:', 'cyan');
  log('  SETUP-GUIDE.md\n', 'cyan');

  process.exit(failedChecks > 0 ? 1 : 0);
}

// Run verification
verifyConfig();
