import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const generateMockUsers = (quantity) => {
    const users = [];
    const password = 'coder123';
    const saltRounds = 10; 
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    for (let i = 0; i < quantity; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email(firstName, lastName);
        const role = faker.helpers.arrayElement(['user', 'admin']);
        const pets = [];

        users.push({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
            role,
            pets
        });
    }
    return users;
};

export default generateMockUsers;
