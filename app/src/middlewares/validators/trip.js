import validator from '../../helpers/validator.js'

import { Bus, City } from '../../models/index.js';
import sequelize from 'sequelize';

import { internalServerError } from '../../helpers/errors.js';

export const validOrigin = (req, res, next) => {
    var city = City.findOne({
        where: {
            id: req.body.origin_id,
            deleted_at: null
        },
    })
    .then((city) => {
        next();
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: [
                    "Origin city not found"
                ]
            })
            return false;
        }
        console.error(err)
        internalServerError(res)
        return false;
    })
}

export const validDestination = (req, res, next) => {
    var city = City.findOne({
        where: {
            id: req.body.destination_id,
            deleted_at: null
        },
    })
    .then((city) => {
        next();
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: [
                    "Destination city not found"
                ]
            })
            return false;
        }
        internalServerError(res)
        return false;
    })
}

export const createTripValidator = (req, res, next) => {
    const rules = {
        "origin_id": "integer|required",
        "destination_id": "integer|required",
        "bus_id": "integer|required",
        "tripdate": "date|required",
        "price": "numeric|required"
    }

    validator(req.body, rules, {}, (err, passed) => {
        if(passed) {
            next();
        }else{
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: err.errors
            })
        }
    });
}

export const updateTripValidator = (req, res, next) => {
    const rules = {
        "origin_id": "integer",
        "destination_id": "integer",
        "bus_id": "integer",
        "tripdate": "date",
        "price": "numeric"
    }

    validator(req.body, rules, {}, (err, passed) => {
        if(passed) {
            next();
        }else{
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: err.errors
            })
        }
    });
}