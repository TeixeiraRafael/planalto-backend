import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { Sequelize, DataTypes } = sequelize;

export const City = db.define('City', 
    {
        id: {
            type: 'SERIAL',
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        created_at: {
            type: 'TIMESTAMP',
            allowNull: true
        },
        updated_at: {
            type: 'TIMESTAMP',
            allowNull: true
        },

        deleted_at: {
            type: 'TIMESTAMP',
            allowNull: true
        },
    },
    {
        tableName: 'cities',
        timestamps: false,
        rejectOnEmpty: true
    }
);

export default City;