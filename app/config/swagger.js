import path from 'path';

const swaggerDefinitions = {
    openapi: '3.0.0',
    host: process.env.HOST || 'localhost:8080',
    basePath: '/api-docs',
    info: {
        title: "AuRos authentication server",
        version: '1.0.0'
    }
}


export const swaggerOptions = {
    definition: swaggerDefinitions,
    apis: ['./app/docs/*.yaml'],
};

export default swaggerOptions;