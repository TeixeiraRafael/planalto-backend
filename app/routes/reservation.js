import express from 'express';

import { acl } from '../middlewares/acl.js'
import { reservation } from '../middlewares/validation.js';
import { createReservation, getReservations, getReservation, deleteReservation, getUserReservations } from '../controllers/ReservationController.js';

export const reservationRoutes = express.Router();

reservationRoutes.post(
    "/reservation", 
    reservation.createReservationValidator, 
    acl.loggedIn,
    reservation.tripExists,
    reservation.seatExists,
    createReservation
);

reservationRoutes.get(
    "/reservation",
    acl.loggedIn,
    acl.managerUser,
    getReservations
);

reservationRoutes.get(
    "/reservation/:id",
    acl.loggedIn,
    reservation.reservationOwner,
    getReservation
);

reservationRoutes.delete(
    "/reservation/:id",
    acl.loggedIn,
    reservation.reservationOwner,
    deleteReservation
)

reservationRoutes.post(
    "/reservation/getByUser",
    acl.loggedIn,
    getUserReservations
)

reservationRoutes;

export default reservationRoutes;








