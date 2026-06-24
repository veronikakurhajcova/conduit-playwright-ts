import { Page, Locator } from '@playwright/test';
import { User } from '../types/user';

export class SignUpPage {
    private readonly usernameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    readonly signUpBtn: Locator;

    constructor(private readonly page: Page) {
        this.usernameInput = page.getByPlaceholder('Username');
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.signUpBtn = page.getByRole('button', { name: 'Sign up' });
    }

    async fillSignUpForm(user: User): Promise<void> {
        await this.usernameInput.fill(user.username!);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
    }

    async clickSignUpBtn(): Promise<void> {
        await this.signUpBtn.click();
    }

    async singUp(user: User): Promise<void> {
        await this.fillSignUpForm(user);
        await this.clickSignUpBtn();
    }

}