const Joi = require('joi');
const Validator = require('../../commons/validation/Validator');

async function validateParamName(payload) {
    const schema = Joi.object().keys({
        nombre: Joi.string().required()
    });
    await Validator.validate(schema, payload);
}
async function validateRequestPlanet(payload) {
    const schema = Joi.object().keys({
        nombre: Joi.string().required().min(1),
        peliculas: Joi.array().items(Joi.string()),
        residentes: Joi.array().items(Joi.string()),
        clima: Joi.string(),
        terreno: Joi.string() 
    });
    await Validator.validate(schema, payload);
}

module.exports = { validateParamName, validateRequestPlanet };
