import validator from '../../helpers/validator.js'

import { Bus } from '../../models/index.js';
import sequelize from 'sequelize';

import { internalServerError } from '../../helpers/errors.js';

export const createSeatValidator = (req, res, next) => {
    const rules = {
        "bus_id": "integer|required",
        "name": "string|max:500|required",
        "description": "string|max:500|required"
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

export const updateSeatValidator = (req, res, next) => {
    const rules = {
        "bus_id": "integer",
        "name": "string|max:500",
        "description": "string|max:500"
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

export const busExists = (req, res, next) => {
    console.log(req)
    var bus = Bus.findOne({
        where: {
            id: req.body.bus_id,
            deleted_at: null
        },
    })
    .then((bus) => {
        next();
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(412).send({
                success: false,
                message: "Validation failed",
                errors: [
                    "Bus not found"
                ]
            })
            return false;
        }
        console.error(err)
        internalServerError(res)
        return false;
    })
}