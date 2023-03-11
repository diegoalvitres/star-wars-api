const objectMapper = require('object-mapper');

const _clearMeta = (value) => {
    return value.includes("#") ? value.split("#")[1] : value;
}

class PlanetReponse {
  static map(keys) {
    const map = {
        PK: {
            key: "id",
            transform: (val) => _clearMeta(val)
        },
        "films[]": "peliculas[]",
        edited: "editado",
        created: "creado",
        climate: "clima",
        rotation_period: "periodo_rotacion",
        url: "url",
        population: "poblacion",
        orbital_period: "periodo_orbital",
        surface_water: "agua_en_superficie",
        diameter: "diametro",
        gravity: "gravedad",
        name: "nombre",
        "residents[]": "residentes[]",
        terrain: "terreno"          
    };
    return objectMapper(keys, map);
  }
}

module.exports = PlanetReponse;
