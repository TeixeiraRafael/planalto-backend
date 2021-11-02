import express from 'express';

import { login, logout, refresh} from '../controllers/AuthController.js';
import { loginValidator, refreshValidator } from '../middlewares/validation.js';

export const authRoutes = express.Router();


authRoutes.post("/login", loginValidator, login);
authRoutes.post("/logout", logout);
authRoutes.post("/refresh", refreshValidator, refresh);

export default authRoutes;








