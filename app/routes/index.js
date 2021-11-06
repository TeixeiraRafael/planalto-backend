import express from 'express';

import userRoutes from './user.js';
import authRoutes from './auth.js';
import cityRoutes from './city.js';
import busRoutes from './bus.js';
import seatRoutes from './seat.js';

import documentationRoutes from './docs.js';

export const routes = express.Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(cityRoutes);
routes.use(busRoutes);
routes.use(seatRoutes);

routes.use(documentationRoutes);

export default routes;