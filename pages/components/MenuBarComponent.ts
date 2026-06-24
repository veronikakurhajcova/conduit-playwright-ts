import { Page, Locator } from "@playwright/test";

export class MenuBarComponent {
    private readonly signUpLink: Locator;
    readonly signInLink: Locator;
    private readonly newArticleLink: Locator;
    private readonly settingsLink: Locator;
    readonly userPicture: Locator;

    constructor(private readonly page: Page) {
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.signInLink = page.getByRole('link', { name: 'Sign in' });
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.settingsLink = page.getByRole('link', { name: 'Settings' }).first();
        this.userPicture = page.locator('img.user-pic');
    }

    async clickSignUpLink(): Promise<void> {
        await this.signUpLink.click();
    }

    async clickSignInLink(): Promise<void> {
        await this.signInLink.click();
    }

    async clickOnNewArticleLink(): Promise<void> {
        await this.newArticleLink.click();
    }

    async clickSettingsLink(): Promise<void> {
        await this.settingsLink.click();
    }

    async clickUserPicture(): Promise<void> {
        await this.userPicture.click();
    }

    getProfileAvatar(username: string): Locator {
        return this.page.getByRole('link', { name: username });
    }




}