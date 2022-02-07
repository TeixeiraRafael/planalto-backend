import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { Sequelize, DataTypes } = sequelize;

export const Reservation = db.define('Reservation', 
    {
        id: {
            type: 'SERIAL',
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: 'BIGINT',
            allowNull: false
        },
        trip_id: {
            type: 'BIGINT',
            allowNull: false,
        },
        seat_id: {
            type: 'BIGINT',
            allowNull: false,
        },
        transaction_id: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: true
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
        tableName: 'reservations',
        timestamps: false,
        rejectOnEmpty: true
    }
);

export default Reservation;