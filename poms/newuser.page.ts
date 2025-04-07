import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.pgae';
import { loginLocators, newUserLocators } from './selectors/locators';
import Tesseract from 'tesseract.js';
import fs from 'fs';

process.noDeprecation = true;


export class NewUserPage extends BasePage{

    readonly newUserButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly fullnameInput: Locator;
    readonly emailInput: Locator;
    readonly captchaImg: Locator;
    readonly captchaInput: Locator;
    readonly refreshButton: Locator;

    constructor(page: Page){
        super(page);
        this.newUserButton = page.locator(loginLocators.newUserButton);
        this.usernameInput = page.locator(loginLocators.usernameInput);
        this.passwordInput = page.locator(loginLocators.passwordInput);
        this.confirmPasswordInput = page.locator(newUserLocators.confirmPasswordInput);
        this.captchaImg = page.locator(newUserLocators.captcha);
        this.captchaInput = page.locator(newUserLocators.captchaInput);
        this.refreshButton = page.locator(newUserLocators.refreshButton);
    }


    async extractCaptcha(): Promise<string>{
        try {
            // Wait and click the "New User" button
            await expect(this.newUserButton).toBeVisible({ timeout: 10000 });
            await this.newUserButton.click();
    
            // Wait for CAPTCHA to appear
            await expect(this.captchaImg).toBeVisible({ timeout: 10000 });
    
            let captchaText = '';
    
            while (true) {
                await this.captchaImg.screenshot({ path: 'captcha.png' });
                if (!fs.existsSync('captcha.png')) throw new Error('CAPTCHA screenshot failed');
                const { data: { text } } = await Tesseract.recognize('captcha.png', 'eng');
                captchaText = text.trim();
                console.log(`Extracted CAPTCHA Text: "${captchaText}" (Length: ${captchaText.length})`);
                if (captchaText.length == 6 || captchaText.length == 7) {
                    break;
                }
                await this.refreshButton.click();
                await this.sleep(3000);
            }
    
            console.log(`Final Valid CAPTCHA: "${captchaText}"`);
            return captchaText;
    
        } catch (error) {
            console.error('Error during user creation:', error);
            throw error;
        }
        
    
    }

    async newUserRegistraionForm(insetCaptcha){
        await this.usernameInput.fill('Santhosh');
        await this.passwordInput.fill('Testing@12345')
        await this.confirmPasswordInput.fill('Testing@12345');
        await this.captchaInput.fill(insetCaptcha);
    }

}
