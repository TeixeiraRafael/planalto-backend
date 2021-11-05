import { config } from './db.config.js'

import { Sequelize } from 'sequelize';

export const db = new Sequelize(
    config.DB,
    config.USER, 
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: 'postgresql'
    }
);

export default db;