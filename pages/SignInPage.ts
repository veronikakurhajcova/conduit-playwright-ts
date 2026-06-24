import { Page, Locator } from '@playwright/test';
import { User } from '../types/user';

export class SignInPage {
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    readonly signInBtn: Locator;

    constructor(private readonly page: Page) {
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.signInBtn = page.getByRole('button', { name: 'Sign in' });
    }

    async fillLoginForm(user: User): Promise<void> {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
    }

    async clickOnSignBtn(): Promise<void> {
        await this.signInBtn.click();
    }

    async signIn(user: User): Promise<void> {
        await this.fillLoginForm(user);
        await this.clickOnSignBtn();
    }
}