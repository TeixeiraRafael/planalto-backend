import express from 'express';

import { acl } from '../middlewares/acl.js'
import { user } from '../middlewares/validation.js';
import { createUser, getUser, getAll, updateUser, deleteUser, resetPassword } from '../controllers/UserController.js';

export const userRoutes = express.Router();

userRoutes.post("/register", user.registerValidator, createUser);
userRoutes.post("/passwordReset", user.resetPassword, resetPassword)

userRoutes.get("/user/:id", acl.loggedIn, acl.selfOrManager, getUser);
userRoutes.get("/user", acl.loggedIn, acl.managerUser, getAll);

userRoutes.put("/user/:id", acl.loggedIn, acl.selfOrRoot, user.userUpdateValidator, updateUser);

userRoutes.delete("/user/:id", acl.loggedIn, acl.selfOrRoot, deleteUser);

export default userRoutes;








