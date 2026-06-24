import { expect } from '@playwright/test';
import { test } from '../../../fixtures/userFixture';
import { MenuBarComponent } from '../../../pages/components/MenuBarComponent';
import { SignInPage } from '../../../pages/SignInPage';
import { invalidLoginUser } from '../../../test-data/invalidLoginUser';

test.describe('Auth Suite', () => {

    test.describe('Login Test', async () => {

        let menuBar: MenuBarComponent;
        let signInPage: SignInPage;

        test.beforeEach(async ({ page }) => {

            menuBar = new MenuBarComponent(page);
            signInPage = new SignInPage(page);

            await page.goto('/');
            await menuBar.clickSignInLink();
        })

        test('[HP] -Login with valid credentials - should redirect to the dasboard', async ({ user }) => {
            await signInPage.signIn(user);
            await expect(menuBar.getProfileAvatar(user.username!)).toBeVisible();
        })

        for (const invalidUser of invalidLoginUser) {
            test(`[NEG] - Login with ${invalidUser.description} - should remain on the login Page and error message displays`, async ({ page }) => {
                await signInPage.fillLoginForm(invalidUser);
                if (invalidUser.btnDisabled) {
                    await expect(signInPage.signInBtn).toBeDisabled();
                } else {
                    expect(page.url()).toContain('login');
                }
            })
        }
    })
})

