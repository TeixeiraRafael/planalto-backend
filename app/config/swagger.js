import path from 'path';

const swaggerDefinitions = {
    openapi: '3.0.0',
    host: process.env.HOST || 'localhost:8080',
    basePath: '/api-docs',
    info: {
        title: "Planalto API docs",
        version: '1.0.0'
    }
}


export const swaggerOptions = {
    definition: swaggerDefinitions,
    apis: ['/usr/src/docs/*.yaml'],
};

export default swaggerOptions;
