import express from 'express';

import { user } from '../middlewares/validation.js';
import { createUser } from '../controllers/UserConroller.js';

export const userRoutes = express.Router();

userRoutes.post("/register", user.registerValidator, createUser);

export default userRoutes;








