
import sequelize from 'sequelize';
import { Trip, Seat, Reservation } from '../../models/index.js';
import validator from '../../helpers/validator.js'
import { internalServerError } from '../../helpers/errors.js';

export const createReservationValidator = (req, res, next) => {
    const rules = {
        "trip_id": "integer|required",
        "seat_id": "integer|required"
    }

    validator(req.body, rules, {}, (err, passed) => {
        if(passed) {
            next();
        }else{
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: err.errors
            })
        }
    });
}

export const updateReservationValidator = (req, res, next) => {
    const rules = {
        "trip_id": "integer",
        "seat_id": "integer"
    }

    validator(req.body, rules, {}, (err, passed) => {
        if(passed) {
            next();
        }else{
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: err.errors
            })
        }
    });
}

export const tripExists = (req, res, next) => {
    var trip = Trip.findOne({
        where: {
            id: req.body.trip_id,
            deleted_at: null,
        }
    })
    .then((trip) => {
        next();
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: [
                    "Trip not found"
                ]
            })
            return false;
        }
        console.error(err)
        internalServerError(res)
        return false;
    })
}

export const seatExists = (req, res, next) => {
    var seat = Seat.findOne({
        where: {
            id: req.body.seat_id,
            deleted_at: null,
        }
    })
    .then((seat) => {
        next();
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: [
                    "Seat not found"
                ]
            })
            return false;
        }
        console.error(err)
        internalServerError(res)
        return false;
    })
}

export const reservationOwner = (req, res, next) => {
    var _reservation = Reservation.findOne({
        where: {
            id: req.params.id,
        }
    }).then((reservation) => {
        if(reservation.user_id == req.user_id) {
            next();
            return true;
        }else{
            res.status(403).send({
                success: false,
                message: "You do not have permission to perform such action"
            });
            return false;
        }
    }).catch((err) => {
        if (err instanceof sequelize.EmptyResultError) {
            res.status(404).send({
                success: false,
                message: "The reservation does not exist"
            });
            return false;
        }
        return internalServerError(res);
    })
}