import validator from '../../helpers/validator.js'

export const createCityValidator = (req, res, next) => {
    const rules = {
        "name": "string|max:500|required",
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

export const updateCityValidator = (req, res, next) => {
    const rules = {
        "name": "string|max:500",
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