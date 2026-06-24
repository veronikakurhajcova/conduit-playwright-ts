import { expect } from '@playwright/test';
import { test } from '../../../fixtures/userFixture';
import { MenuBarComponent } from '../../../pages/components/MenuBarComponent';
import { SignInPage } from '../../../pages/SignInPage';
import { SettingsPage } from '../../../pages/SettingsPage';
import { generateSettings} from '../../../test-data/settings'; 
import { ProfilePage } from '../../../pages/ProfilePage';

test.describe('Settings suite', () => {
    let menuBar: MenuBarComponent;
    let signInPage: SignInPage;
    let settingsPage: SettingsPage;
    let profilePage: ProfilePage;
    

    test.beforeEach(async ({ page,user }) => {
        signInPage = new SignInPage(page);
        menuBar = new MenuBarComponent(page);
        settingsPage = new SettingsPage(page);
        profilePage = new ProfilePage(page);
        
        await page.goto('/');
        await menuBar.clickSignInLink();
        await signInPage.signIn(user);
        await menuBar.clickSettingsLink();
    })


    test('[HP] - Set profile picture - should display updated profile picture', async () => {  
        const settings = generateSettings();

        await settingsPage.enterProfilePicture(settings.profilePicture!);
        await settingsPage.clickUpdateSettingsBtn();

        await expect(menuBar.userPicture).toBeVisible();
        await expect(menuBar.userPicture).toHaveAttribute('src',settings.profilePicture!);
    })

     test('[HP] - Set username - should display updated username', async () => {
        const settings = generateSettings();

        await settingsPage.enterUsername(settings.username!);
        await settingsPage.clickUpdateSettingsBtn();

        await expect(menuBar.getProfileAvatar(settings.username!)).toBeVisible();
        await expect(menuBar.getProfileAvatar(settings.username!)).toContainText(settings.username!);
    });

     test('[HP] - Set bio - should display updated bio', async () => {
        const settings = generateSettings();
        
        await settingsPage.enterBio(settings.bio!);
        await settingsPage.clickUpdateSettingsBtn();

        await expect(profilePage.bioProfile).toBeVisible();
        await expect(profilePage.bioProfile).toContainText(settings.bio!);
    });

     test('[HP] - Set email - should display updated email', async () => {
        const settings = generateSettings();

        await settingsPage.enterEmail(settings.email!);
        await settingsPage.clickUpdateSettingsBtn();
    
        await menuBar.clickSettingsLink();
        await expect(settingsPage.email).toHaveValue(settings.email!);

    });

    test('[HP] - Set new password - should update password', async ({ user, request}) => {
        const settings = generateSettings();

        await settingsPage.enterNewPassword(settings.newPassword!);
        await settingsPage.clickUpdateSettingsBtn();
        await menuBar.clickSettingsLink();
        await settingsPage.clickLogout();

        const loginResponse = await request.post('https://api.realworld.show/api/users/login', {
            data: {
                user: {
                email: user.email,
                password: settings.newPassword!
                }
            }
        })
         expect(loginResponse.status()).toBe(200);
    });
   
})