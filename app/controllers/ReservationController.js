import { Reservation, User, City, Trip } from '../models/index.js'
import { internalServerError } from '../helpers/errors.js';

import sequelize from 'sequelize';
import mercadopago from 'mercadopago';

export const createReservation = (req, res) => {
    var checkReservation = Reservation.findAll({
        where: {
            trip_id: req.body.trip_id,
            seat_id: req.body.seat_id
        }
    })
    .then((reservation) => {
        res.status(412).send({
            success: false,
            message: "Seat alread taken."
        })
    })
    .catch(async (err) => {
        if(err instanceof sequelize.EmptyResultError){
            getPaymentData(req)
            .then((paymentData) => {
                console.log(paymentData)
                var pag = mercadopago.payment.create(paymentData)
                .then((data) => {
                    const qr_code_base64 = data.response.point_of_interaction.transaction_data.qr_code_base64
                    
                    var reservation = new Reservation({
                        user_id: req.user_id,
                        trip_id: req.body.trip_id,
                        seat_id: req.body.seat_id,
                        transaction_id: data.body.id,
                        approved: false
                    });
                    reservation.save()
                    .then((newReservation) => {
                        res.status(200).send({
                            success: true,
                            reservation: newReservation,
                            qr_code_base64
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        internalServerError(res);
                    })
                })
                .catch((err) => {
                    console.error(err);
                });
            });            
        }
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

const getPaymentData = (req) => {
    const user_id = req.user_id;
    const trip_id = req.body.trip_id;

    return new Promise((resolve, reject) => {
        User.findOne({
            where: {
                id: user_id,
                deleted_at: null
            }
        }).then((user) => {
            Trip.findOne({
                where: {
                    id: trip_id,
                    deleted_at: null
                },
                include: [
                    { model: City, as: 'origin', attributes: ['name'] }, 
                    { model: City, as: 'destination', attributes: ['name'] },
                ]
            }).then((trip) => {
                var payment_data = {
                    transaction_amount: trip.price,
                    description: 'Trip from ' + trip.origin.name + ' to ' + trip.destination.name + ' on ' + trip.tripdate,
                    payment_method_id: 'pix',
                    payer: {
                        email: user.email,
                        first_name: user.name,
                        identification: {
                            type: req.body.docType,
                            number: req.body.docNumber
                        },
                        address:  {
                            zip_code: user.addr_postal_code,
                            street_name: user.addr_street,
                            street_number: user.addr_number,
                            neighborhood: user.neighborhood,
                            city: user.city,
                            federal_unit: user.state
                        }
                    }
                }
    
                resolve(payment_data);
            }).catch((err) => {
                reject(err)
            })        
        })
        .catch((err) => {
            reject(err);
        });
    })
    
}
