import express from 'express';

import { acl } from '../middlewares/acl.js';
import { trip_leg } from '../middlewares/validation.js';
import { createTripLeg } from '../controllers/TripLegController.js';

export const tripLegRoutes = express.Router();

tripLegRoutes.post(
    "/trip_leg",
    acl.loggedIn,
    acl.managerUser,
    trip_leg.createTripLegValidator,
    trip_leg.validOrigin,
    trip_leg.validDestination,
    createTripLeg
);

export default tripLegRoutes;