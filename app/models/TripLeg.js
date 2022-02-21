import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { Sequelize, DataTypes } = sequelize;

export const TripLeg = db.define('TripLeg', 
    {
        id: {
            type: 'SERIAL',
            autoIncrement: true,
            primaryKey: true,
        },

        trip_id: {
            type: 'BIGINT',
            allowNull: false,
        },

        origin_id: {
            type: 'BIGINT',
            allowNull: false
        },

        destination_id: {
            type: 'BIGINT',
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
        tableName: 'trip_legs',
        timestamps: false,
        rejectOnEmpty: true
    }
);

export default TripLeg;