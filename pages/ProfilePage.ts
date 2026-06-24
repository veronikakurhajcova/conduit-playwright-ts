import { Page, Locator } from '@playwright/test';

export class ProfilePage {
    readonly bioProfile: Locator;

    constructor(private readonly page: Page) {
        this.bioProfile = page.locator('img.user-img ~ p');
    }
}