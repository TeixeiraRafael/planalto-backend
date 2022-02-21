import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { sequelize, DataTypes } = sequelize;

export const TripLegReservation = db.define('TripLegReservation', 
    {
        id: {
            type: 'SERIAL',
            autoIncrement: true,
            primaryKey: true
        },
        
        trip_leg_id: {
            type: 'BIGINT',
            allowNull: false,
        },

        reservation_id: {
            type: 'BIGINT',
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
        }
    }
)