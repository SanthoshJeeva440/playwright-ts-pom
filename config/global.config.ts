import { chromium, firefox, webkit, Browser } from '@playwright/test';
import dotenv from 'dotenv';

// load environment varibales dynamically

dotenv.config({
  path: `./env/.env.qa`,
  override: true,
})

if (process.env.ENV != null) {
  dotenv.config({
      path: `config/env/.env.${process.env.ENV}`,
      override: true,
  })
}
else {
  dotenv.config({
      path: `config/env/.env.qa`,
      override: true,
  })
}

// Common configuration variables
export const BROWSER = process.env.BROWSER || 'chromium';
export const HEADLESS = process.env.HEADLESS !== 'false';
export const CHANNEL = process.env.CHANNEL || '';
export const BASEURL = process.env.URL || 'http://adactinhotelapp.com';

// Function to launch a browser based on env config
export async function launchBrowser(): Promise<Browser> {
    switch (BROWSER) {
      case 'firefox':
        return await firefox.launch({ headless: HEADLESS, args: ['--start-maximized'] });
      case 'webkit':
        return await webkit.launch({ headless: HEADLESS, args: ['--start-maximized'] });
      default:
        if (CHANNEL === 'firefox') {
          return await firefox.launch({
            headless: HEADLESS,
            channel: CHANNEL as 'firefox',
            args: ['--start-maximized'],
          });
        }
        return await chromium.launch({
          headless: HEADLESS,
          channel: CHANNEL as 'chrome' | 'msedge',
          args: ['--start-maximized'],
        });
    }
  }