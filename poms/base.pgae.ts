import { Page, Locator } from '@playwright/test';

export class BasePage {
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigate(path: string){
        await this.page.goto(path);
    }

    async close(){
        await this.page.close();
    }

    async waitForUrl(path: string | RegExp): Promise<void>{
        await this.page.waitForURL(path);
    }

    async sleep(time: number){
        await this.page.waitForTimeout(time);
    }
      
}
