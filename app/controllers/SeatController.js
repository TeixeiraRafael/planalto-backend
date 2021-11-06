import sequelize from 'sequelize';

import { Bus, Seat } from '../models/index.js'
import { internalServerError } from '../helpers/errors.js';

export const createSeat = (req, res) => {
    var bus = Bus.findOne({
        where: {
            id: req.body.bus_id,
            deleted_at: null
        },
    })
    .then((bus) => {
        var newSeat = new Seat({
            bus_id: bus.id,
            name: req.body.name,
            description: req.body.description
        });

        newSeat.save()
        .then((seat) => {
            res.status(200).send({
                success: true,
                seat
            })
        })
        .catch((err) =>  {
            if(err instanceof sequelize.UniqueConstraintError){
                res.status(412).send({
                    success: false,
                    message: "A seat with that name is already registered"
                })
                return true;
            }
            internalServerError(res);
        })

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

export const getSeats = (req, res) => {
    var seats = Seat.findAll({
        where: {
            deleted_at: null
        },
    })
    .then((seats) => {
        res.status(200).send({
            success: true,
            seats
        })
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "Seats not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    })
}

export const getSeat = (req, res) => {
    var seat = Seat.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        },
    })
    .then((seat) => {
        res.status(200).send({
            success: true,
            seat
        })
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "Seat not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    })
}

export const updateSeat = (req, res) => {
    var bus = Bus.findOne({
        where: {
            id: req.body.bus_id,
            deleted_at: null
        },
    })
    .then((bus) => {
        var seat = Seat.findOne({
            where: {
                id: req.params.id,
                deleted_at: null
            },
        })
        .then((seat) => {
            seat.bus_id = req.body.bus_id || seat.bus_id;
            seat.name = req.body.name || seat.name;
            seat.description = req.body.description || seat.description;
            seat.updated_at = new Date().toISOString();

            seat.save()
            .then((updatedSeat) => {  
                res.status(200).send({
                    success: true,
                    seat: updatedSeat
                })
            })
            .catch((err) =>  {
                if(err instanceof sequelize.UniqueConstraintError){
                    res.status(412).send({
                        success: false,
                        message: "A seat with that name is already registered"
                    })
                    return true;
                }
                internalServerError(res);
            })
        })
        .catch((err) => {
            if(err instanceof sequelize.EmptyResultError){
                res.status(404).send({
                    success: false,
                    message: "Seat not found"
                })
                return false;
            }
            internalServerError(res)
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

export const deleteSeat = (req, res) => {
    var seat = Seat.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        },
    })
    .then((seat) => {
        seat.deleted_at = new Date().toISOString();
        seat.save()
        .then((deletedSeat) => {
            res.status(200).send({
                success: true,
                deletedSeat
            })
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
                message: "Seat not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    })
}