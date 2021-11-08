import { Reservation } from '../models/index.js'
import { internalServerError } from '../helpers/errors.js';

import sequelize from 'sequelize';

export const createReservation = (req, res) => {
    var reservation = new Reservation({
        user_id: req.user_id,
        trip_id: req.body.trip_id,
        seat_id: req.body.seat_id,
    });

    reservation.save()
    .then((newReservation) => {
        res.status(200).send({
            success: true,
            reservation: newReservation
        });
    })
    .catch((err) => {
        console.log(err);
        internalServerError(res);
    })
}

export const getReservations = (req, res) => {
    var reservations = Reservation.findAll({
        where: {
            deleted_at: null,
        }
    })
    .then((reservations) => {
        res.status(200).send({
            success: true,
            reservations
        })
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "No reservations found."
            });
            return false;
        }
        internalServerError(res);
    });
}

export const getReservation = (req, res) => {
    var reservations = Reservation.findOne({
        where: {
            id: req.params.id,
            deleted_at: null,
        }
    })
    .then((reservation) => {
        res.status(200).send({
            success: true,
            reservation
        })
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "Reservation not found."
            });
            return false;
        }
        internalServerError(res);
    });
}

export const deleteReservation = (req, res) => {
    var reservations = Reservation.findOne({
        where: {
            id: req.params.id,
            deleted_at: null,
        }
    })
    .then((reservation) => {
        reservation.deleted_at = new Date().toISOString();
        reservation.save()
        .then((deletedReservation) => {
            res.status(200).send({
                success: true,
                reservation: deletedReservation
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
                message: "Reservation not found."
            });
            return false;
        }
        internalServerError(res);
    });
}