import express from 'express';

import { acl } from '../middlewares/acl.js'
import { bus } from '../middlewares/validation.js';
import { createBus, getBuses, getBus, updateBus, deleteBus } from '../controllers/BusController.js';

export const busRoutes = express.Router();

busRoutes.post("/bus", acl.loggedIn, acl.managerUser, bus.createBusValidator, createBus);

busRoutes.get("/bus", getBuses);
busRoutes.get("/bus/:id", getBus);

busRoutes.put("/bus/:id", acl.loggedIn, acl.managerUser, bus.updateBusValidator, updateBus);

busRoutes.delete("/bus/:id", acl.loggedIn, acl.managerUser, deleteBus)
export default busRoutes;








