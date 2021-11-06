import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { Sequelize, DataTypes } = sequelize;

export const Seat = db.define('Seat', 
    {
        id: {
            type: 'SERIAL',
            autoIncrement: true,
            primaryKey: true,
        },
        bus_id: {
            type: 'BIGINT',
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        description: {
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
        }
    },
    {
        tableName: 'seats',
        timestamps: false,
        rejectOnEmpty: true
    }
);

export default Seat;