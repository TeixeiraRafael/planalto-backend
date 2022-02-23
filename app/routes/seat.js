import express from 'express';

import { acl } from '../middlewares/acl.js'
import { seat } from '../middlewares/validation.js';
import { createSeat, getSeats, getSeat, updateSeat, deleteSeat } from '../controllers/SeatController.js';

export const seatRoutes = express.Router();

seatRoutes.post(
    "/seat", 
    acl.loggedIn,
    acl.managerUser, 
    seat.busExists, 
    seat.createSeatValidator, 
    createSeat
);

seatRoutes.get("/seat", getSeats);
seatRoutes.get("/seat/:id", getSeat);

seatRoutes.put(
    "/seat/:id", 
    acl.loggedIn, 
    acl.managerUser, 
    seat.busExists, 
    seat.updateSeatValidator, 
    updateSeat
);

seatRoutes.delete(
    "/seat/:id", 
    acl.loggedIn, 
    acl.managerUser, 
    deleteSeat
);

export default seatRoutes;








