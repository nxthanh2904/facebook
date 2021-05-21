const Joi = require('@hapi/joi');

const createPostValidation = (data) => {
    const postSchema = Joi.object({
        userId: Joi.string()
            .required,

    })
    const check = postSchema.validate(data);
    if (check.error) {
        let errorDetails = check.error.details;
        let errorMessage = errorDetails.map(err => err.message);
        return {
            error: errorMessage
        }
    }
    else {
        return {
            value: check.value,
        }
    }
}

module.exports = {
    createPostValidation,
}