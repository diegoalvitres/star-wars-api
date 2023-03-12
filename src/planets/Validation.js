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
        clima: Joi.string().allow(null),
        terreno: Joi.string().allow(null),
        poblacion: Joi.string().allow(null),
        periodo_actual: Joi.string().allow(null),
        agua_en_superficie: Joi.string().allow(null),
        gravedad: Joi.string().allow(null),
        diametro: Joi.string().allow(null),
        creado: Joi.string().allow(null).custom(validateCustom, 'validate iso format'),
        editado: Joi.string().allow(null).custom(validateCustom, 'validate iso format'),
        url: Joi.string().allow(null)
    });
    await Validator.validate(schema, payload);
}

function validateCustom(date) {
    if (!validationDate(date)) {
        throw new Error("Fecha invalida");
    }
}

function validationDate(dateStr) {
    if (!dateStr) return true;
    if (!/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,10}))?Z?$/.test(dateStr)) return false;
    const date = new Date(dateStr);
    const isValid = !isNaN(date);
    return isValid;
}

module.exports = { validateParamName, validateRequestPlanet };
