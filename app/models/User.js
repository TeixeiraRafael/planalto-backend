import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { Sequelize, DataTypes } = sequelize;

export const User = db.define('User', 
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
        email: {
            type: DataTypes.STRING(500),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
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
        tableName: 'users',
        timestamps: false
    }
);

export default User;