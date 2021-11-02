import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { Sequelize, DataTypes } = sequelize;

export const User = db.define('User', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        username: {
            type: DataTypes.STRING(400),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(400),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(400),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(400),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(400),
            allowNull: true
        },
        type: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
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
        tableName: 'user',
        timestamps: false
    }
);

export default User;