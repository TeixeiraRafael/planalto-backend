import validator from '../../helpers/validator.js'

export const registerValidator = (req, res, next) => {
    const rules = {
        "name": "required|string|max:500",
        "password": "required|string|max:500|confirmed",
        "email": "required|email|max:500",
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

export const userUpdateValidator = (req, res, next) => {
    const rules = {
        "name": "string|max:500",
        "email": "email|max:500",
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