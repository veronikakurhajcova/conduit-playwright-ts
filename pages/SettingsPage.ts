import { Page, Locator } from "@playwright/test";
import { UserSettings } from "../types/usersettings";

export class SettingsPage {
    private readonly profilePicture: Locator;
    private readonly username: Locator;
    private readonly bio: Locator;
    readonly email: Locator;
    readonly newPassword: Locator;
    readonly updateSettingsBtn: Locator;
    private readonly logoutBtn: Locator;

    constructor(private readonly page: Page) {
        this.profilePicture = page.getByPlaceholder('URL of profile picture');
        this.username = page.getByPlaceholder('Username');
        this.bio = page.getByPlaceholder('Short bio about you');
        this.email = page.getByPlaceholder('Email');
        this.newPassword = page.getByPlaceholder('New Password');
        this.updateSettingsBtn = page.getByRole('button', { name: 'Update Settings' });
        this.logoutBtn = page.getByRole('button', { name: 'Or click here to logout.' });
    }

    async enterProfilePicture(url: string): Promise<void> {
        await this.profilePicture.fill(url);
    }

    async enterUsername(username: string): Promise<void> {
        await this.username.fill(username);
    }

    async enterBio(bio: string): Promise<void> {
        await this.bio.fill(bio);
    }

    async enterEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    async enterNewPassword(newPassword: string): Promise<void> {
        await this.newPassword.fill(newPassword);
    }

    async clickUpdateSettingsBtn(): Promise<void> {
        await this.updateSettingsBtn.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutBtn.click();
    }

    async changeSettings(): Promise<void> {
    }

    async updateSeetings(userSetting: UserSettings): Promise<void> {
        if (userSetting.profilePicture) await this.enterProfilePicture(userSetting.profilePicture);
        if (userSetting.username) await this.enterUsername(userSetting.username);
        if (userSetting.bio) await this.enterBio(userSetting.bio);
        if (userSetting.email) await this.enterEmail(userSetting.email);
        if (userSetting.newPassword) await this.enterNewPassword(userSetting.newPassword);
        await this.clickUpdateSettingsBtn();
    }
}