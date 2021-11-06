import validator from '../../helpers/validator.js'

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