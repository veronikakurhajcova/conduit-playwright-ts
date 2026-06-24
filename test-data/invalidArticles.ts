import {faker} from '@faker-js/faker';
import { InvalidArticle } from '../types/article';

export const invalidArticles: InvalidArticle[] = [
     {title: '', 
      description: faker.lorem.sentence(), 
      body:faker.lorem.paragraphs(3), 
      tag:faker.lorem.word(), 
      testDescription: 'with empty article title', 
      errorMessage:'title can\'t be blank', 
      isKnownBug: false},
     {title: faker.lorem.sentence({min: 2, max: 4}), 
     description: '', 
     body:faker.lorem.paragraphs(3), 
     tag:faker.lorem.word(), 
     testDescription: 'with empty article description', 
     errorMessage: 'description can\'t be blank',
     isKnownBug: false },
     {title: faker.lorem.sentence({min: 2, max: 4}), 
     description: faker.lorem.sentence(), 
     body:'', 
     tag:faker.lorem.word(), 
     testDescription: 'with empty article body', 
     errorMessage: 'body can\'t be blank', 
     isKnownBug: false }
]