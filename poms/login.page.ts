import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.pgae';
import { loginLocators } from './selectors/locators';

export class LoginPage extends BasePage{

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly searchHotelText: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator(loginLocators.usernameInput);
        this.passwordInput = page.locator(loginLocators.passwordInput);
        this.loginButton = page.locator(loginLocators.loginButton);
        this.searchHotelText = page.locator(loginLocators.searchHotelText);
    }

    async login(username, password){
        await this.usernameInput.waitFor({timeout: 10000, state: 'visible'});
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.searchHotelText.waitFor({timeout: 10000, state: 'visible'});
    }
}
