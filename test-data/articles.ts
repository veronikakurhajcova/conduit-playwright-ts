import { faker } from '@faker-js/faker';
import { Article } from '../types/article';

export function generateArticle(): Article {
    return {
        title: faker.lorem.sentence({ min: 2, max: 4 }),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(3),
        tag: faker.lorem.word()
    }

}