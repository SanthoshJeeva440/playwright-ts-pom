import { test as base} from '@playwright/test';
import { BasePage } from '../poms/base.pgae';
import { LoginPage} from '../poms/login.page'
import { NewUserPage } from '../poms/newuser.page'


// inherit all pages 

export const test = base.extend<{
    basePage: BasePage;
    loginPage: LoginPage;
    newUserPage: NewUserPage;

}>(
    {
        loginPage: async ({ page }, use) =>{
            await use (new LoginPage(page))
        },

        basePage: async ({ page }, use) =>{
            await use (new BasePage (page))
        },

        newUserPage: async ({ page }, use)=>{
            await use (new NewUserPage (page))
        }

    }
);