import validator from '../../helpers/validator.js'


export const createTripValidator = (req, res, next) => {
    const rules = {
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