import validator from '../../helpers/validator.js'

export const registerValidator = (req, res, next) => {
    const rules = {
        "name": "required|string|max:500",
        "password": "required|string|max:500|confirmed",
        "email": "required|email|max:500|confirmed",
        "document" : "required|max:100",
        "birthdate": "requred|date",
        "phone_type": "required|integer",
        "phone": "required|max:20",
        "addr_postal_code":"required|max:20",
        "addr_street": "required|max:100",
        "addr_number": "required|max:100",
        "addr_additional_info": "max:100",
        "neighbourhood": "required|max:100",
        "city": "required|max:100",
        "state": "required|max:100",
        "enable_sms": "required|boolean"
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
        "email": "email|max:500|confirmed",
        "document" : "max:100",
        "birthdate": "date",
        "phone_type": "integer",
        "phone": "max:20",
        "addr_postal_code":"max:20",
        "addr_street": "max:100",
        "addr_number": "max:100",
        "addr_additional_info": "max:100",
        "neighbourhood": "max:100",
        "city": "max:100",
        "state": "max:100",
        "enable_sms": "boolean"
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