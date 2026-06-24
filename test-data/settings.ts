import {faker} from '@faker-js/faker';
import { UserSettings } from '../types/usersettings';

export function generateSettings(): UserSettings {
    return {
        profilePicture: faker.image.avatar(),
        username: faker.person.firstName(),
        bio: faker.lorem.paragraph({min:1, max:3}),
        email: faker.internet.email(),
        newPassword: faker.internet.password()
    }
}