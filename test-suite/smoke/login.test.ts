import { test } from '../../fixtures/test-fixtures'



test.describe('Smoke Test - Dashboard', () => {
  test.use({ storageState: 'storageState.json' });

  test('Verify Heading', async ({ basePage, loginPage }) => {
    await loginPage.navigate('/SearchHotel.php');
    await basePage.waitForUrl(/.*SearchHotel.php/);
  });

});