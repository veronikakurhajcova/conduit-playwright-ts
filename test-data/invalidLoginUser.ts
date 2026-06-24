import {faker} from '@faker-js/faker';
import { InvalidUser } from '../types/user';

export const invalidLoginUser: InvalidUser[] = [
    {email: faker.internet.email(), password: faker.internet.password(), description:'Login with non-existent user', isKnownBug: false, btnDisabled: false},
    {email: '', password: faker.internet.password(), description:'Login with empty email', isKnownBug: false, btnDisabled: true},
    {email: faker.internet.email(), password: '', description: 'Login with empty password', isKnownBug: false, btnDisabled: true},
    {email: 'invalidemail.com', password: faker.internet.password(), description: 'Login with invalid email format', isKnownBug: false, btnDisabled: false}   
]
