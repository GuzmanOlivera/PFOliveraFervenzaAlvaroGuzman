import { usersService } from '../services/index.js';
import { petsService } from '../services/index.js';
import generateMockUsers from '../utils/mockingUsers.js';
import generateMockPets from '../utils/mockingPets.js';

export const generateData = async (req, res) => {
    const { users, pets } = req.body;
    if (!users || !pets) {
        return res.status(400).send({ status: 'error', error: 'Valores no válidos.' });
    }

    try {
        const mockUsers = generateMockUsers(users);
        const mockPets = generateMockPets(pets);

        await Promise.all([
            ...mockUsers.map(user => usersService.create(user)),
            ...mockPets.map(pet => petsService.create(pet))
        ]);

        res.send({ status: 'success', message: `${users} usuarios y ${pets} mascotas han sido creados correctamente.` });
    } catch (error) {
        res.status(500).send({ status: 'error', error: 'Error al generar datos.' });
    }
};

