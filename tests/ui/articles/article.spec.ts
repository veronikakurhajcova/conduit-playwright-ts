import { expect } from '@playwright/test';
import { test } from '../../../fixtures/userFixture';
import { MenuBarComponent } from '../../../pages/components/MenuBarComponent';
import { NewArticlePage } from '../../../pages/NewArticlePage';
import { SignInPage } from '../../../pages/SignInPage';
import { generateArticle } from '../../../test-data/articles';
import { invalidArticles } from '../../../test-data/invalidArticles';

test.describe('Artikel suite', () => {

    let menuBar: MenuBarComponent;
    let signInPage: SignInPage;
    let newArticlePage: NewArticlePage;

    test.beforeEach(async ({ page }) => {

        menuBar = new MenuBarComponent(page);
        signInPage = new SignInPage(page);
        newArticlePage = new NewArticlePage(page);
    })


    test('[HP] - Create article with valid data - should be created correct article', async ({ page, user }) => {
        const article = generateArticle();

        await page.goto('/');
        await menuBar.clickSignInLink();
        await signInPage.signIn(user);
        await menuBar.clickOnNewArticleLink();
        await newArticlePage.createNewArticle(article);
        await expect(newArticlePage.getPublishedArticleTitle(article.title)).toBeVisible();
        await expect(newArticlePage.getPublishedArticleTitle(article.title)).toHaveText(article.title);

        await expect(newArticlePage.getPublishedArticleBody(article.body)).toBeVisible();
        await expect(newArticlePage.getPublishedArticleBody(article.body)).toHaveText(article.body);
    })

    test('[HP] - Edit article title - should return edited title', async ({ page, createdArticle }) => {
        const editedArticle = generateArticle();

        await page.goto('/');
        await menuBar.clickSignInLink();
        await signInPage.signIn(createdArticle.user);

        await page.goto(`/article/${createdArticle.article.slug}`);

        await newArticlePage.clickEditArticle();
        await newArticlePage.enterArticleTitle(editedArticle.title);
        await newArticlePage.clickPublishArticleBtn();

        await expect(newArticlePage.getPublishedArticleTitle(editedArticle.title)).toBeVisible();
        await expect(newArticlePage.getPublishedArticleTitle(editedArticle.title)).toHaveText(editedArticle.title);
        await expect(newArticlePage.getPublishedArticleBody(createdArticle.article.body)).toBeVisible();
    })

    test('[HP] - Edit article body - should return edited body', async ({ page, createdArticle }) => {
        const editedArticle = generateArticle();

        await page.goto('/');
        await menuBar.clickSignInLink();
        await signInPage.signIn(createdArticle.user);

        await page.goto(`/article/${createdArticle.article.slug}`);
        await newArticlePage.clickEditArticle();
        await newArticlePage.enterArticleBody(editedArticle.body);
        await newArticlePage.clickPublishArticleBtn();

        await expect(newArticlePage.getPublishedArticleTitle(createdArticle.article.title)).toBeVisible();
        await expect(newArticlePage.getPublishedArticleBody(editedArticle.body)).toBeVisible();
        await expect(newArticlePage.getPublishedArticleBody(editedArticle.body)).toHaveText(editedArticle.body);
    })

    test('[HP] - Delete existent article - should delete existent article', async ({ page, createdArticle }) => {
        await page.goto('/');
        await menuBar.clickSignInLink();
        await signInPage.signIn(createdArticle.user);

        await page.goto(`/article/${createdArticle.article.slug}`);
        await expect(newArticlePage.getPublishedArticleTitle(createdArticle.article.title)).toBeVisible();
        await expect(newArticlePage.getPublishedArticleBody(createdArticle.article.body)).toBeVisible();

        await newArticlePage.clickDeleteArticle();
        await expect(newArticlePage.getPublishedArticleTitle(createdArticle.article.title)).not.toBeVisible();
        await expect(newArticlePage.getPublishedArticleBody(createdArticle.article.body)).not.toBeVisible();
    })


    for (const article of invalidArticles) {
        test(`[NEG] - Create article with ${article.testDescription} - should display "${article.errorMessage}"`, async ({ page, user }) => {
            await page.goto('/');
            await menuBar.clickSignInLink();
            await signInPage.signIn(user);
            await menuBar.clickOnNewArticleLink();
            await newArticlePage.createNewArticle(article);

            await expect(newArticlePage.getPublishedErrorMessage(article.errorMessage)).toBeVisible();
            await expect(newArticlePage.getPublishedErrorMessage(article.errorMessage)).toHaveText(article.errorMessage);
        })
    }
})