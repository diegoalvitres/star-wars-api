const Joi = require('joi');

async function validateParamName(payload) {
    try {
        const schema = Joi.object().keys({
            nombre: Joi.string().required()
        });
        await schema.validateAsync(payload);
    }catch (error) {
        console.error(error);
        throw new Error(`[400] ${error}`);
    }
}
async function validateRequestPlanet(payload) {
    try {
        const schema = Joi.object().keys({
            nombre: Joi.string().required().min(1),
            peliculas: Joi.array().items(Joi.string()),
            residentes: Joi.array().items(Joi.string()),
            clima: Joi.string(),
            terreno: Joi.string() 
        });
        schema.validateAsync(payload);
    }catch (error) {
        console.error(error);
        throw new Error(`[400] ${error}`);
    }
}

module.exports = { validateParamName, validateRequestPlanet };
