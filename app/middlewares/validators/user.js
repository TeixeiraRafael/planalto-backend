import validator from '../../helpers/validator.js'

export const registerValidator = (req, res, next) => {
    const rules = {
        "name": "required|string|max:500",
        "password": "required|string|max:500|confirmed",
        "email": "required|email|max:500",
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
}