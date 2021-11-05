import express from 'express';

import { acl } from '../middlewares/acl.js'
import { city } from '../middlewares/validation.js';
import { createCity, getCities, getCity, updateCity, deleteCity } from '../controllers/CityController.js';

export const cityRoutes = express.Router();

cityRoutes.post("/city", acl.loggedIn, acl.managerUser, city.createCityValidator, createCity);

cityRoutes.get("/city", getCities);
cityRoutes.get("/city/:id", getCity);

cityRoutes.put("/city/:id", acl.loggedIn, acl.managerUser, city.updateCityValidator, updateCity);
cityRoutes.delete("/city/:id", acl.loggedIn, acl.managerUser, deleteCity);

export default cityRoutes;








