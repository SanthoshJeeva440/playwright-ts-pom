import {launchBrowser, BASEURL} from '../config/global.config';
import { LoginPage } from '../poms/login.page'

// setup the login flow and stored data's in storageState.json

async function globalSetup() {
  const browser = await launchBrowser();  
  const context = await browser.newContext({
    viewport: null,
    ignoreHTTPSErrors: true
  }
  );
  const page = await context.newPage();
  
  await page.goto(BASEURL, { waitUntil: 'load' });
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
  await page.waitForURL(/SearchHotel.php/)
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();

}

export default globalSetup;
