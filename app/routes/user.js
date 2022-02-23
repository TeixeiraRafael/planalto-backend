import express from 'express';

import { acl } from '../middlewares/acl.js'
import { user } from '../middlewares/validation.js';
import { createUser, getUser, getAll, updateUser, deleteUser, updatePassword, resetPassword } from '../controllers/UserConroller.js';

export const userRoutes = express.Router();

userRoutes.post("/register", user.registerValidator, createUser);

userRoutes.get("/user/:id", acl.loggedIn, acl.selfOrManager, getUser);
userRoutes.get("/user", acl.loggedIn, acl.managerUser, getAll);

userRoutes.put("/user/:id", acl.loggedIn, acl.selfOrRoot, user.userUpdateValidator, updateUser);
userRoutes.put("/update_password/:id", acl.loggedIn, acl.selfOrRoot, user.updatePassword, updatePassword);
userRoutes.post("/reset_password", user.resetPassword, resetPassword );

userRoutes.delete("/user/:id", acl.loggedIn, acl.selfOrRoot, deleteUser);

export default userRoutes;








