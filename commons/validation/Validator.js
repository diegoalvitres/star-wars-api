const Joi = require('joi');
const ValidationMessages = require('./ValidationMessages');
const ValidationException = require('../exceptions/ValidationException');

module.exports.validate = async (schema, payload) => {
    if (Joi.isSchema(schema)) {
        const validation = schema.validate(payload, {
            allowUnknown: true,
            abortEarly: false,
            convert: false,
            errors: { language: 'spanish' },
            messages: ValidationMessages
        });
        if (validation.error) {
            const messagesError = [];
            validation.error.details.forEach((value) => {
            messagesError.push(value.message);
            });

            new ValidationException(
                "ERVAL-0001",
                JSON.stringify({statusCode: 400, message: messagesError})
            ).throw();
        }
    }
}