import { faker } from "@faker-js/faker";
import { InvalidUser } from "../types/user";

export const invalidUsers: InvalidUser[] = [
    {username:'', email: faker.internet.email(), password: faker.internet.password(), description: 'empty username', isKnownBug: false},
    {username: faker.person.firstName(), email: '', password: faker.internet.password(), description: 'empty email', isKnownBug: false},
    {username: faker.person.firstName(), email: faker.internet.email(), password: '', description: 'empty password', isKnownBug: false},
    {username: faker.string.alpha(50), email: faker.internet.email(), password: faker.internet.password(), description: 'too long username', isKnownBug: true},
    {username: faker.person.firstName(), email: faker.string.alpha(10), password: faker.internet.password(), description: 'email without @', isKnownBug: true},
]