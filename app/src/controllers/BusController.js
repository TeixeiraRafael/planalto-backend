import sequelize from 'sequelize';

import { Bus, Seat } from '../models/index.js'
import { internalServerError } from '../helpers/errors.js';

export const createBus = (req, res) => {
    var newBus = new Bus({
        plate: req.body.plate,
        model: req.body.model
    });

    newBus.save()
    .then((bus) => {
        res.status(200).send({
            success: true,
            bus
        })
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.UniqueConstraintError){
            res.status(412).send({
                success: false,
                message: "A bus with that plate is already registered"
            })
            return true;
        }
        internalServerError(res);
        return false;
    })
}

export const getBuses = (req, res) => {
    var buses = Bus.findAll({
        where: {
            deleted_at: null
        },
        attributes: ['id', 'plate', 'model']
    })
    .then((buses) => {
        res.status(200).send({
            success: true,
            buses
        });
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError) {
            res.status(404).send({
                success: false,
                message: "No buses registered"
            })
            return false;
        }
        internalServerError(res);
        return false;
    })
}

export const getBus = (req, res) => {
    var bus = Bus.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        },
        attributes: ['id', 'plate', 'model'],
        include: {
            model: Seat,
            where: {
                deleted_at: null
            }
        }
    })
    .then((bus) => {
        res.status(200).send({
            success: true,
            bus
        });
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "Bus not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    })
}

export const updateBus = (req, res) => {
    var bus = Bus.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        }
    })
    .then((bus) => {
        bus.plate = req.body.plate || bus.plate;
        bus.model = req.body.model || bus.model;
        bus.updated_at = new Date().toISOString();

        bus.save()
        .then((updatedBus) => {
            res.status(200).send({
                success: true,
                updatedBus
            });
            return true;
        })
        .catch((err) => {
            internalServerError(res);
            return false;
        })
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "Bus not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    })
}

export const deleteBus = (req, res) => {
    var bus = Bus.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        }
    })
    .then((bus) => {
        bus.deleted_at = new Date().toISOString();
        bus.save()
        .then((updatedBus) => {
            res.status(200).send({
                success: true,
                updatedBus
            });
            return true;
        })
        .catch((err) => {
            internalServerError(res);
            return false;
        })
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "Bus not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    })
}