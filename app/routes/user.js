import express from 'express';

import { acl } from '../middlewares/acl.js'
import { user } from '../middlewares/validation.js';
import { createUser, getUser } from '../controllers/UserConroller.js';

export const userRoutes = express.Router();

userRoutes.post("/register", user.registerValidator, createUser);
userRoutes.get("/user", acl.loggedIn, acl.basicUser, getUser);

export default userRoutes;








