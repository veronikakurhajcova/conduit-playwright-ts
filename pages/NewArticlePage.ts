import { Page, Locator } from '@playwright/test';
import { Article } from '../types/article';

export class NewArticlePage {
    private readonly articleTitleInput: Locator;
    private readonly articleDescriptionInput: Locator;
    private readonly articleBodyInput: Locator;
    private readonly articleTagsInput: Locator;
    private readonly publishArticleBtn: Locator;

    private readonly editBtn: Locator;
    private readonly deleteBtn: Locator;

    constructor(private readonly page: Page) {
        this.articleTitleInput = page.getByPlaceholder('Article Title');
        this.articleDescriptionInput = page.locator('[name="description"]');
        this.articleBodyInput = page.locator('[name="body"]');
        this.articleTagsInput = page.getByPlaceholder('Enter tags');
        this.publishArticleBtn = page.getByRole('button', { name: 'Publish Article' });

        this.editBtn = page.getByText(' Edit Article ').nth(1);
        this.deleteBtn = page.getByText(' Delete Article ').nth(1);
    }

    // Create Article section

    async enterArticleTitle(title: string): Promise<void> {
        await this.articleTitleInput.fill(title);
    }

    async enterArticleDescription(text: string): Promise<void> {
        await this.articleDescriptionInput.fill(text);
    }


    async enterArticleBody(text: string): Promise<void> {
        await this.articleBodyInput.fill(text);
    }

    async enterArticleTags(tags: string | string[]): Promise<void> {
        const tagArray = Array.isArray(tags) ? tags : [tags];
        for (const tag of tagArray) {
            await this.articleTagsInput.fill(tag);
            await this.articleTagsInput.press('Enter');
        }
    }

    async clickPublishArticleBtn(): Promise<void> {
        await this.publishArticleBtn.click();
    }

    async createNewArticle(article: Article): Promise<void> {
        await this.enterArticleTitle(article.title);
        await this.enterArticleDescription(article.description);
        await this.enterArticleBody(article.body);
        if (article.tag) await this.enterArticleTags(article.tag);
        await this.clickPublishArticleBtn();
    }


    // After publishing a new article section
    getPublishedArticleTitle(title: string): Locator {
        return this.page.getByRole('heading', { name: title });
    }

    getPublishedArticleBody(body: string): Locator {
        return this.page.locator('.article-content p', { hasText: body });
    }

    getPublishedErrorMessage(message: string): Locator {
        return this.page.locator('.error-messages', { hasText: message });
    }

    async clickEditArticle(): Promise<void> {
        await this.editBtn.click();
    }

    async clickDeleteArticle(): Promise<void> {
        await this.deleteBtn.click();
    }



}