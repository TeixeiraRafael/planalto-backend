import validator from '../../helpers/validator.js'

export const paymentValidator = (req, res, next) => {
    const rules = {
        "payerEmail" : "required|email|max:400",
        "payerFirstName": "required|max:200",
        "payerLAstName": "required|max:200",
        "docType": "required",
        "docNumber": "required"
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