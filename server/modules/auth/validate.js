const Joi = require('@hapi/joi');


const registerValidation = (user) => {
    const userSchema = Joi.object({
        phoneNumber: Joi.string()
            .min(10)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
    })
    const check = userSchema.validate(user);
    if (check.error) {
        let errorDetails = check.error.details;
        let errorMessage = errorDetails.map(err => err.message);
        return {
            error: errorMessage
        }
    }
    else {
        return {
            value: check.value
        }
    }

}

const loginValidation = (data) => {
    const schema = Joi.object({
        phoneNumber: Joi.string()
            .min(10)
            .required(),
        password: Joi.string()
            .min(6).
            required()
    })
    const check = schema.validate(data);
    if (check.error) {
        let errorDetails = check.error.details;
        let errorMessage = errorDetails.map(err => err.message);
        return {
            error: errorMessage
        }
    } else {
        return {
            value: check.value
        }
    }
}


module.exports = {
    registerValidation,
    loginValidation,
}