import { faker } from '@faker-js/faker';

function generateMockPets(count) {
  const pets = [];
  const speciesOptions = ['dog', 'cat', 'rabbit', 'bird', 'hamster'];

  for (let i = 0; i < count; i++) {
    const randomSpecies = faker.helpers.arrayElement(speciesOptions);
    const randomBirthDate = faker.date.past(10);  

    pets.push({
      name: faker.person.firstName(),
      specie: randomSpecies,
      birthDate: randomBirthDate,
      adopted: false,
      owner: null
    });
  }

  return pets;
}

export default generateMockPets;