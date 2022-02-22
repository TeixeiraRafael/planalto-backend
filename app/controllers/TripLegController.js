import { TripLeg, Trip, City } from '../models/index.js'
import { internalServerError } from '../helpers/errors.js'

export const createTripLeg = (req, res) => {
  var newTripLeg = new TripLeg({
    trip_id: req.body.trip_id,
    origin_id: req.body.origin_id,
    destination_id: req.body.destination_id
  });

  newTripLeg.save()
    .then((trip_leg) => {
      res.status(200).send({
        success: true,
        trip_leg
      });
    }).catch((err) => {
      internalServerError(res);
    });
}



