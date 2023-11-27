import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where your test files are located
  testDir: './playwright/tests',

  // Global timeout for the entire test run
  timeout: 1 * 60 * 1000,

  // Expectation-related settings
  expect: {
    // Timeout for individual test expectations
    timeout: 5000,
  },

  // Configuration for parallel test execution
  fullyParallel: !true, // Disable full parallelism
  retries: process.env.CI ? 1 : 0, // Retry tests once if running in a CI environment
  workers: process.env.CI ? 1 : 4, // Number of worker processes for parallel execution

  // Configuration for test result reporting
  reporter: process.env.CI
    ? [['junit', { outputFile: 'results.xml' }]] // JUnit report for CI environment
    : [
      ['json', { outputFile: 'report.json' }], // JSON report
      ['html', { open: 'on-failure' }], // HTML report, open on failure
    ],

  // Configuration for Playwright's settings
  use: {
    // Whether to run the browser in headless mode or not
    headless: process.env.CI ? true : false,

    // Base URL for your application
    baseURL: 'http://localhost:4200/',

    // Configuration for various features
    // actionTimeout: 2 * 60 * 1000, // Action timeout (commented out, can be enabled if needed)
    trace: process.env.CI ? 'off' : 'on', // Enable/disable trace feature
    video: process.env.CI ? 'off' : 'on', // Enable/disable video recording
    screenshot: process.env.CI ? 'off' : 'on', // Enable/disable taking screenshots
  },

  // Configuration for different browser projects
  projects: [
    {
      // Project for Chromium browser
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'], // Use predefined settings for Desktop Chrome
        headless: true, // Run Chromium in headless mode
      },
    }],
});
