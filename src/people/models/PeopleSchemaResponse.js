const objectMapper = require('object-mapper');

class PeopleSchemaResponse {
  static map(keys) {
    const map = {
        description: "descripcion",
        "$schema": "$esquema",
        properties: "propiedades",
        type: "tipo",
        required: "requerido",
        title: "titulo"
    };
    return objectMapper(keys, map);
  }
}

module.exports = PeopleSchemaResponse;