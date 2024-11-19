import { Router } from 'express';
import { mockPets } from '../controllers/pets.controller.js';
import { mockUsers } from '../controllers/users.controller.js';
import { generateData } from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets', mockPets);
router.get('/mockingusers', mockUsers);
router.post('/generateData', generateData);

export default router;