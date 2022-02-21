import { db } from '../config/db.js';
import sequelize from 'sequelize';

const { Sequelize, DataTypes } = sequelize;

export const Trip = db.define('Trip', 
    {
        id: {
            type: 'SERIAL',
            autoIncrement: true,
            primaryKey: true,
        },
        
        bus_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },        
        tripdate: {
            type: 'TIMESTAMP',
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
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
        tableName: 'trips',
        timestamps: false,
        rejectOnEmpty: true
    }
);

export default Trip;