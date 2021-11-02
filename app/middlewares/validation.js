import validator from '../helpers/validator.js'

export const registerValidator = (req, res, next) => {
    const rules = {
        "username": [
            "required", 
            "string", 
            "max:400",
            "regex:/^[a-zA-Z0-9]+(?:[_]?[a-zA-Z0-9])*$/"
        ],
        "name": "required|string|max:400",
        "password": "required|string|max:400",
        "email": "required|email|max:400",
        "phone": "max:400"
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
    })
};

export const loginValidator = (req, res, next) => {
    const rules = {
        "email": "required|email|max:400",
        "password": "required|string|max:400"
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
    })
}

export const refreshValidator = (req, res, next) => {
    const rules = {
        "refresh_token": "required|string",
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
    })
}