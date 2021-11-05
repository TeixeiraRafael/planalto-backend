import express from 'express';

import userRoutes from './user.js';
import authRoutes from './auth.js';
import documentationRoutes from './docs.js';

export const routes = express.Router();

routes.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'Working'
    })
})
routes.use(userRoutes);
routes.use(authRoutes);
routes.use(documentationRoutes);

export default routes;