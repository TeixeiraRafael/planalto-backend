import sequelize from 'sequelize';

import { City } from '../models/index.js'
import { internalServerError } from '../helpers/errors.js';

export const createCity = (req, res) => {
    var newCity = new City({
        name: req.body.name
    });

    newCity.save()
    .then((city) => {
        res.status(200).send({
            success: true,
            city
        })
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.UniqueConstraintError){
            res.status(412).send({
                success: false,
                message: "A city with that name is already registered"
            })
            return true;
        }
        internalServerError(res);
        return false;
    })
}

export const getCities = (req, res) => {
    var cities = City.findAll({
        where: {
            deleted_at: null
        },
        attributes: ['id', 'name',]

    })
    .then((cities) => {
        res.status(200).send({
            success: true,
            cities
        })
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "No cities registered"
            })
            return false;
        }
        internalServerError(res)
        return false;
    });
}

export const getCity = (req, res) => {
    var city = City.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        },
        attributes: ['id', 'name']

    })
    .then((city) => {
        res.status(200).send({
            success: true,
            city
        })
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "City not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    });
}


export const updateCity = (req, res) => {
    var city = City.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        }
    }).then((city) => {
        city.name = req.body.name || city.name;
        city.updated_at = new Date().toISOString();
        city.save()
        .then((updatedCity) => {
            res.status(200).send({
                success: true,
                city: updatedCity
            })
        })
        .catch((err) => {
            internalServerError(res)
            return false;
        })
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "City not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    });
}

export const deleteCity = (req, res) => {
    var city = City.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        }
    }).then((city) => {
        city.deleted_at = new Date().toISOString();
        city.save()
        .then((updatedCity) => {
            res.status(200).send({
                success: true,
                city: updatedCity
            })
        })
        .catch((err) => {
            internalServerError(res)
            return false;
        })
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(404).send({
                success: false,
                message: "City not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    });
}