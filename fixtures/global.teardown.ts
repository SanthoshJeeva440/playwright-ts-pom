import { FullConfig } from '@playwright/test';
import fs from 'fs';

async function globalTeardown(config: FullConfig) {

  // Clean up storage state after tests
  const storagePath = './storageState.json';
  if (fs.existsSync(storagePath)) {
    fs.unlinkSync(storagePath);
    console.log(`✅ Deleted ${storagePath}`);
  }
}

export default globalTeardown;
