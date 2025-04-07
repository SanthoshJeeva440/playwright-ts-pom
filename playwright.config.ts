import { defineConfig } from '@playwright/test';
import {BROWSER, CHANNEL } from './config/global.config'
import ENV from './config/env';



export default defineConfig({
  timeout: 60000,
  testDir: './test-suite',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'reports/all-results',
  reporter:[
    ['list'],
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/report.json' }]
  ],
  
  globalSetup: require.resolve('./fixtures/global.setup'),
  globalTeardown: require.resolve('./fixtures/global.teardown.ts'),
  use: {
    baseURL: ENV.URL,
    headless: process.env.HEADLESS !== 'false',
    storageState: 'storageState.json',
    browserName: BROWSER as 'chromium' | 'firefox' | 'webkit',
    viewport: null,
    channel: CHANNEL as 'chrome' | 'msedge',
    launchOptions:{
      args: ['--start-maximized']
    },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
});
