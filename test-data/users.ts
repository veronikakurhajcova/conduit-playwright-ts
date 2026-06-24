import {User} from '../types/user';
import { faker } from '@faker-js/faker';

export function generateUser() : User {
    return {
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password({length:  10})
    }
}

