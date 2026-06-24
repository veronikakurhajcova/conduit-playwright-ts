import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../../pages/SignUpPage';
import { MenuBarComponent } from '../../../pages/components/MenuBarComponent';
import { generateUser } from '../../../test-data/users';
import { invalidUsers } from '../../../test-data/invalidRegistrationUsers';

test.describe('Auth Suite', () => {

    test.describe('Sign up Test', () => {

        let signUpPage: SignUpPage;
        let menuBar: MenuBarComponent;

        test.beforeEach(async ({ page }) => {
            signUpPage = new SignUpPage(page);
            menuBar = new MenuBarComponent(page);
            await page.goto('/');
            await menuBar.clickSignUpLink();
        })

        test('[HP] - Sign up with valid credentials - should be redirected to dashboard Page', async () => {
            const user = generateUser();
            
            await signUpPage.singUp(user);
            await expect(menuBar.getProfileAvatar(user.username!)).toBeVisible();
        })

        for (const invalidUser of invalidUsers) {
            test(`[NEG] - Sign up with  ${invalidUser.description} - should be error displayed and remain on the home Page`, async () => {
                if (invalidUser.isKnownBug) test.fail();

                await signUpPage.fillSignUpForm(invalidUser);
                await expect(signUpPage.signUpBtn).toBeDisabled();
            })
        }
    })
})


