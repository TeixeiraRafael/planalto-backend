import express from 'express';

import { acl } from '../middlewares/acl.js'
import { trip } from '../middlewares/validation.js';
import { createTrip, getTrips, getTrip, updateTrip, deleteTrip, getTripByDate } from '../controllers/TripController.js';

export const tripRoutes = express.Router();

tripRoutes.post(
    "/trip", 
    acl.loggedIn,
    acl.managerUser, 
    trip.createTripValidator,
    trip.busExists, 
    createTrip
);

tripRoutes.get("/trip", getTrips);
tripRoutes.get("/trip/:id", getTrip);

tripRoutes.put(
    "/trip/:id",
    acl.loggedIn,
    acl.managerUser, 
    trip.updateTripValidator,
    trip.busExists, 
    updateTrip
)

tripRoutes.delete(
    "/trip/:id",
    acl.loggedIn,
    acl.managerUser, 
    deleteTrip
)

tripRoutes.post(
    '/tripByDate', 
    getTripByDate
);

export default tripRoutes;








