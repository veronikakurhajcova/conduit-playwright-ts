import {test as base} from '@playwright/test';
import { generateUser } from '../test-data/users';
import { User } from '../types/user';
import { Article } from '../types/article';
import { generateArticle } from '../test-data/articles';

const apiUrl = process.env.API_URL ?? 'https://api.realworld.show/api';

type MyFixtures = {
    user: User;
    createdArticle: { article: Article, user:User};
};

export const test = base.extend<MyFixtures>({
    user: async ({request}, use) => {
        const user = generateUser();
         await request.post(`${apiUrl}/users`, {
            data: { user: {...user}}
        });
        await use(user);
    },

    createdArticle: async ({ request }, use) => {
    // 1. Create user and token
    const user = generateUser();
    const regResponse = await request.post(`${apiUrl}/users`, {
        data: { user: { ...user } }
    });
    const regData = await regResponse.json();
    const token = regData.user.token;

    // 2. Create article with token
    const article = generateArticle();
    const articleResponse = await request.post(`${apiUrl}/articles`, {
        headers: { Authorization: `Token ${token}` },
        data: { article: { ...article } }
    });
    const articleData = await articleResponse.json();
    const slug = articleData.article.slug;
    await use({article: {...article,slug}, user});
},

});