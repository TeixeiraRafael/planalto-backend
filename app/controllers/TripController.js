import sequelize from 'sequelize';

import { Trip, Bus, City, Seat, Reservation } from '../models/index.js'
import { internalServerError } from '../helpers/errors.js';

export const createTrip = (req, res) => {
  var newTrip = new Trip({
    bus_id: req.body.bus_id,
    tripdate: req.body.tripdate,
    price: req.body.price
  });

  newTrip.save()
    .then((trip) => {
      res.status(200).send({
        success: true,
        trip
      });
    }).catch((err) => {
      console.log(err);
      internalServerError(res);
    });
}

export const getTrips = (req, res) => {
  var trips = Trip.findAll({
    where: {
      deleted_at: null,
    },
    include: [
      { model: Bus, as: 'bus', attributes: ['id', 'plate', 'model'] }
    ],
    attributes: ['id', 'tripdate', 'price']
  }).then((trips) => {
    res.status(200).send({
      success: true,
      trips
    })
  })
    .catch((err) => {
      console.error(err)
      if (err instanceof sequelize.EmptyResultError) {
        res.status(404).send({
          success: false,
          message: "Trips not found"
        })
        return false;
      }
      internalServerError(res)
      return false;
    })
}

export const getTrip = async (req, res) => {
  Trip.findOne({
    where: {
      id: req.params.id,
      deleted_at: null,
    },
    include: [
      {
        model: Bus, as: 'bus', attributes: ['id', 'plate', 'model'],
        include: [{ model: Seat }]
      }
    ],
    attributes: ['id', 'tripdate', 'price']
  }).then((trip) => {
    res.status(200).send({
      success: true,
      trip,
    })
  }).catch((err) => {
    console.error(err)
    if (err instanceof sequelize.EmptyResultError) {
      res.status(404).send({
        success: false,
        message: "Trip not found"
      })
      return false;
    }
    internalServerError(res)
    return false;
  })
}

export const updateTrip = (req, res) => {
  var trips = Trip.findOne({
    where: {
      id: req.params.id,
      deleted_at: null,
    }
  }).then((trip) => {
    trip.bus_id = req.body.bus_id || trip.bus_id;
    trip.tripdate = req.body.tripdate || trip.tripdate;
    trip.price = req.body.price || trip.price;
    trip.updated_at = new Date().toISOString();

    trip.save()
      .then((updatedTrip) => {
        var trip = Trip.findOne({
          where: {
            id: updatedTrip.id,
            deleted_at: null,
          },
          include: [
            { model: Bus, as: 'bus', attributes: ['id', 'plate', 'model'] }
          ],
          attributes: ['id', 'tripdate', 'price', 'updated_at']
        }).then((_trip) => {
          res.status(200).send({
            success: true,
            trip: _trip
          })
        })
      }).catch((err) => {
        internalServerError(res);
        return false;
      })
  }).catch((err) => {
    if (err instanceof sequelize.EmptyResultError) {
      res.status(404).send({
        success: false,
        message: "Trip not found"
      })
      return false;
    }
    internalServerError(res)
    return false;
  })
}

export const deleteTrip = (req, res) => {
  var trips = Trip.findOne({
    where: {
      id: req.params.id,
      deleted_at: null,
    }
  }).then((trip) => {
    trip.deleted_at = new Date().toISOString();
    trip.save()
      .then((updatedTrip) => {
        var trip = Trip.findOne({
          where: {
            id: updatedTrip.id,
          },
          include: [
            { model: Bus, as: 'bus', attributes: ['id', 'plate', 'model'] }
          ],
          attributes: ['id', 'tripdate', 'price', 'deleted_at']
        }).then((_trip) => {
          res.status(200).send({
            success: true,
            trip: _trip
          })
        })
      }).catch((err) => {
        internalServerError(res);
        return false;
      })
  }).catch((err) => {
    if (err instanceof sequelize.EmptyResultError) {
      res.status(404).send({
        success: false,
        message: "Trip not found"
      })
      return false;
    }
    internalServerError(res)
    return false;
  })
}

export const getTripByDate = (req, res) => {
  var lower = new Date(req.body.tripdate);
  lower.setHours(0);
  lower.setMinutes(0);
  lower.setSeconds(1);

  var higher = new Date(req.body.tripdate);
  higher.setHours(23);
  higher.setMinutes(59);
  higher.setSeconds(59);

  Trip.findAll({
    where: {
      origin_id: req.body.origin_id,
      destination_id: req.body.destination_id,
      tripdate: {
        [sequelize.Op.gt]: lower,
        [sequelize.Op.lt]: higher
      },
      deleted_at: null,
    }
  }).then((trips) => {
    res.status(200).send({
      success: true,
      trips
    })
    return true;
  }).catch((err) => {
    if (err instanceof sequelize.EmptyResultError) {
      res.status(404).send({
        success: false,
        message: "No trips found"
      })
      return false;
    }
    res.status(500).send({
      success: false,
      status: "Internal server Error"
    });
    return false;
  })
}
