import express from 'express';

import { auth } from '../middlewares/validation.js';
import { login, logout, refresh} from '../controllers/AuthController.js';

export const authRoutes = express.Router();

authRoutes.post("/login", auth.loginValidator, login);
authRoutes.post("/logout", logout);
authRoutes.post("/refresh", auth.refreshValidator, refresh);

export default authRoutes;








