import express from 'express';

import authRoutes from './auth.js';
import documentationRoutes from './docs.js';

export const routes = express.Router();

routes.use(authRoutes);
routes.use(documentationRoutes);

export default routes;