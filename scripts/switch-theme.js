#!/usr/bin/env node

/**
 * WCW Site Template - Theme Switcher
 *
 * Quickly switch between the 5 available theme presets.
 *
 * Usage:
 *   node scripts/switch-theme.js
 *   node scripts/switch-theme.js professional
 *   pnpm theme
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Theme presets with their details
const themes = {
  professional: {
    name: 'Professional',
    description: 'Traditional, trustworthy design',
    primary: '#1e3a8a', // Navy Blue
    accent: '#3b82f6',
    font: 'Georgia, serif'
  },
  modern: {
    name: 'Modern',
    description: 'Clean, contemporary design',
    primary: '#0d9488', // Teal
    accent: '#14b8a6',
    font: 'Inter, sans-serif'
  },
  elegant: {
    name: 'Elegant',
    description: 'Sophisticated, refined design',
    primary: '#6b21a8', // Deep Purple
    accent: '#9333ea',
    font: 'Playfair Display, serif'
  },
  minimal: {
    name: 'Minimal',
    description: 'Simple, clean design',
    primary: '#374151', // Charcoal
    accent: '#6b7280',
    font: 'Helvetica Neue, sans-serif'
  },
  warm: {
    name: 'Warm',
    description: 'Approachable, friendly design',
    primary: '#E87722', // Burnt Orange
    accent: '#f97316',
    font: 'Merriweather, serif'
  }
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function switchTheme(themeName) {
  try {
    const siteConfigPath = path.join(process.cwd(), 'site.config.ts');

    if (!fs.existsSync(siteConfigPath)) {
      log('✗ Error: site.config.ts not found', 'red');
      log('Make sure you are running this script from the project root.', 'red');
      process.exit(1);
    }

    let siteConfig = fs.readFileSync(siteConfigPath, 'utf8');

    // Replace activeTheme value
    const oldThemeMatch = siteConfig.match(/activeTheme:\s*'([^']*)'/);
    const oldTheme = oldThemeMatch ? oldThemeMatch[1] : 'unknown';

    siteConfig = siteConfig.replace(
      /activeTheme:\s*'[^']*'/,
      `activeTheme: '${themeName}'`
    );

    fs.writeFileSync(siteConfigPath, siteConfig);

    const theme = themes[themeName];
    log('\n========================================', 'bright');
    log('  Theme Switched Successfully!', 'green');
    log('========================================\n', 'bright');
    log(`  Previous Theme: ${oldTheme}`, 'yellow');
    log(`  New Theme: ${themeName} (${theme.name})`, 'green');
    log(`  Description: ${theme.description}`, 'blue');
    log(`  Primary Color: ${theme.primary}`, 'cyan');
    log(`  Font: ${theme.font}`, 'cyan');
    log('\n' + '─'.repeat(40) + '\n', 'blue');
    log('Next Steps:', 'yellow');
    log('  1. Restart your dev server: pnpm dev', 'yellow');
    log('  2. Clear browser cache (Cmd+Shift+R)', 'yellow');
    log('  3. Review the site appearance', 'yellow');
    log('\nNote: Theme colors can be further customized in theme.config.ts\n', 'cyan');

  } catch (error) {
    log('✗ Error switching theme:', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

function showInteractiveMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  log('\n========================================', 'bright');
  log('  WCW Site Template - Theme Switcher', 'bright');
  log('========================================\n', 'bright');

  log('Available Themes:', 'cyan');
  log('─────────────────────────────────────\n', 'cyan');

  const themeKeys = Object.keys(themes);
  themeKeys.forEach((key, index) => {
    const theme = themes[key];
    log(`  ${index + 1}. ${theme.name.padEnd(15)} - ${theme.description}`, 'blue');
    log(`     ${`Color: ${theme.primary}`.padEnd(30)} Font: ${theme.font}`, 'cyan');
    log('', 'reset');
  });

  rl.question(colors.yellow + 'Select theme (1-5): ' + colors.reset, (answer) => {
    const choice = parseInt(answer);

    if (isNaN(choice) || choice < 1 || choice > themeKeys.length) {
      log('✗ Invalid choice. Please select a number between 1 and 5.', 'red');
      rl.close();
      process.exit(1);
    }

    const selectedTheme = themeKeys[choice - 1];
    rl.close();
    switchTheme(selectedTheme);
  });
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  // No arguments - show interactive menu
  showInteractiveMenu();
} else {
  // Theme name provided as argument
  const themeName = args[0].toLowerCase();

  if (!themes[themeName]) {
    log('✗ Invalid theme name.', 'red');
    log('\nAvailable themes:', 'yellow');
    Object.keys(themes).forEach(key => {
      log(`  - ${key}`, 'cyan');
    });
    log('\nUsage:', 'yellow');
    log('  pnpm theme                    (interactive)', 'cyan');
    log('  pnpm theme professional       (direct)', 'cyan');
    process.exit(1);
  }

  switchTheme(themeName);
}
