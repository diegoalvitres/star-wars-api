const objectMapper = require('object-mapper');

class PeopleResponse {
  static map(keys) {
    const map = {
        eye_color: "color_de_ojos",
        films: "peliculas",
        gender: "genero",
        birth_year: "año_de_nacimiento",
        hair_color: "color_de_pelo",
        height: "altura",
        homeworld: "mundo_natal",
        mass: "masa",
        name: "nombre",
        skin_color: "color_de_piel",
        created: "creado",
        edited: "editado",
        species: "especies",
        starships: "naves_espaciales",
        url: "enlace",
        vehicles: "vehiculos",
        detail: "detalle"
    };
    return objectMapper(keys, map);
  }
}

module.exports = PeopleResponse;
