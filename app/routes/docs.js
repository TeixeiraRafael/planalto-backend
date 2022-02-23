import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from '../config/swagger.js';

export const documentationRoutes = express.Router();

const swaggerDocs = await swaggerJSDoc(swaggerOptions);
documentationRoutes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default documentationRoutes;
