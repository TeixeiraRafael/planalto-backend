import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { Sequelize, DataTypes } = sequelize;

export const Bus = db.define('Bus', 
    {
        id: {
            type: 'SERIAL',
            autoIncrement: true,
            primaryKey: true,
        },
        plate: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        model: {
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
        tableName: 'buses',
        timestamps: false,
        rejectOnEmpty: true
    }
);

export default Bus;