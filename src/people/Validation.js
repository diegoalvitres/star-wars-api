const Joi = require('joi');

async function validateParamPage(payload) {
    const schema = Joi.object().keys({
      page: Joi.number()
    });
    await Validator.validate(schema, payload);
  }
    
  module.exports = { validateParamPage };
