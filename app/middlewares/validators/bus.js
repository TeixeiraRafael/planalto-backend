import validator from '../../helpers/validator.js'

export const createBusValidator = (req, res, next) => {
    const rules = {
        "plate": "string|max:10|required",
        "model": "string|max:500|required"
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

export const updateBusValidator = (req, res, next) => {
    const rules = {
        "plate": "string|max:10",
        "model": "string|max:500"
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