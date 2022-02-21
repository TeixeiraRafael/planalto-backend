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
        role_id: {
            type: DataTypes.BIGINT,
            allowNull: true
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

        document: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        birthdate: {
            type: DataTypes.DATE,
            allowNull: true
        },

        phone_type: {
            type: DataTypes.BIGINT,
            allowNull: true
        },

        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        addr_postal_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        addr_street: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        addr_number: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        addr_additional_info: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        neighbourhood: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        city: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        state: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        enable_sms: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: 'users',
        timestamps: false,
        rejectOnEmpty: true,
    }
);

export default User;