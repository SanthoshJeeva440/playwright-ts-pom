import { test } from '../../fixtures/test-fixtures'



test('Verfiy New User Captcha', async ({ basePage, newUserPage }) => {
    await basePage.navigate('/')
    const getCaptchaText = await newUserPage.extractCaptcha();
    await newUserPage.newUserRegistraionForm(getCaptchaText);
    await basePage.sleep(5000)
    await basePage.close();
  });