
import User from "../src/dao/Users.dao.js";
import Pet from "../src/dao/Pets.dao.js";
import Adoption from "../src/dao/Adoption.js";
import assert from "assert";
import { connectDB, mongoose } from '../src/utils/db.js';

before(async function () {
    await connectDB();
});

/******************* */
/* TESTING ADOPTIONS */
/******************* */
describe('Testing del DAO de Adoptions', function () {
    before(function () {
        this.adoptionsDao = new Adoption();
        this.usersDao = new User();
        this.petsDao = new Pet();
        this.createdAdoptions = [];
        this.createdUsers = [];
        this.createdPets = [];
    });

    it('Verificar que la lista de adopciones que se obtiene con GET sea un array', async function () {
        const result = await this.adoptionsDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it('Crear adopción y guardarla en la base de datos', async function () {
        let user = {
            first_name: "Lionel",
            last_name: "Messi",
            email: "leo.messi@futbol.com",
            password: "GOAT@2024"
        };
        const savedUser = await this.usersDao.save(user);
        this.createdUsers.push(savedUser._id);

        let pet = {
            name: "Firulais",
            specie: "Dog",
            birthDate: new Date(2020, 1, 1),
            adopted: false
        };
        const savedPet = await this.petsDao.save(pet);
        this.createdPets.push(savedPet._id);

        let adoption = {
            owner: savedUser._id,
            pet: savedPet._id
        };
        const result = await this.adoptionsDao.save(adoption);
        assert.ok(result._id);
        this.createdAdoptions.push(result._id);
    });

    it('Verificar que se pueda obtener una adopción por su ID', async function () {
        let user = {
            first_name: "Neymar",
            last_name: "Jr",
            email: "neymar.jr@futbol.com",
            password: "Neymar@2024"
        };
        const savedUser = await this.usersDao.save(user);
        this.createdUsers.push(savedUser._id);

        let pet = {
            name: "Pelusa",
            specie: "Cat",
            birthDate: new Date(2019, 5, 15),
            adopted: false
        };
        const savedPet = await this.petsDao.save(pet);
        this.createdPets.push(savedPet._id);

        let adoption = {
            owner: savedUser._id,
            pet: savedPet._id
        };
        const savedAdoption = await this.adoptionsDao.save(adoption);
        this.createdAdoptions.push(savedAdoption._id);

        const result = await this.adoptionsDao.getBy({ _id: savedAdoption._id });
        assert.strictEqual(typeof result, "object");
        assert.strictEqual(result._id.toString(), savedAdoption._id.toString());
    });

    after(async function () {
        for (const adoptionId of this.createdAdoptions) {
            await this.adoptionsDao.delete(adoptionId);
        }
        for (const userId of this.createdUsers) {
            await this.usersDao.delete(userId);
        }
        for (const petId of this.createdPets) {
            await this.petsDao.delete(petId);
        }
    });
});

/*************** */
/* TESTING USERS */
/*************** */

describe('Testing del DAO de Users', function () {
    before(function () {
        this.usersDao = new User();
        this.createdUsers = [];
    });

    it('Verificar que la lista de usuarios que se obtiene con GET sea un array', async function () {
        const result = await this.usersDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it('Crear usuario y guardarlo en la base de datos', async function () {
        let user = {
            first_name: "Roberto",
            last_name: "Carlos",
            email: "roberto-carlos@soytuamigo.com",
            password: "123456789"
        };
        const result = await this.usersDao.save(user);
        assert.ok(result._id);
        this.createdUsers.push(result._id); 
    });

    it('Verificar que el nuevo usuario tenga un array de mascotas vacío', async function () {
        let user = {
            first_name: "Cristiano",
            last_name: "Ronaldo",
            email: "cr7@superfutbol.net",
            password: "Siuuu!7GOAT@2024"
        };

        const result = await this.usersDao.save(user);
        assert.deepStrictEqual(result.pets, []);
        this.createdUsers.push(result._id);
    });

    it('Verificar que se pueda obtener un usuario por su email', async function () {
        let user = {
            first_name: "Kylian",
            last_name: "Mbappé",
            email: "speedster.kylian@fastmail.com",
            password: "Mbappe123!Lightning"
        };

        const savedUser = await this.usersDao.save(user);
        this.createdUsers.push(savedUser._id); 

        const result = await this.usersDao.getBy({ email: user.email });
        assert.strictEqual(typeof result, "object");
        assert.strictEqual(result.email, user.email);
    });

    after(async function () {
        for (const userId of this.createdUsers) {
            await this.usersDao.delete(userId);
        }
    });
});

after(async function () {
    await mongoose.disconnect();
});