const ULID = require('ulid');
const DynamoDBLib = require("../../../commons/libs/DynamoDBLib");

class PlametRequest {
    constructor({
      peliculas, editado, creado, clima, periodo_rotacion,
      url, poblacion, periodo_actual, agua_en_superficie, diametro,
      gravedad, nombre, residentes, terreno, id
    }) {
        this.id = ULID.ulid(),
        this.peliculas = peliculas;
        this.editado = editado;
        this.creado = creado;
        this.clima = clima;
        this.periodo_rotacion = periodo_rotacion;
        this.url = url;
        this.poblacion = poblacion;
        this.periodo_actual = periodo_actual;
        this.agua_en_superficie = agua_en_superficie;
        this.diametro = diametro;
        this.gravedad = gravedad;
        this.nombre = nombre;
        this.residentes = residentes;
        this.terreno = terreno;
    }

    get paramsCreateItemDB() {
        return {
            TableName: process.env.TABLE_NAME_PLANETS,
            Item: {
                PK: DynamoDBLib.getPk(DynamoDBLib.metaPlanets, this.id),
                SK: this.creado || new Date().toISOString(),
                [DynamoDBLib.getTypeIndex().PK]: DynamoDBLib.metaPlanets,
                [DynamoDBLib.getTypeIndex().SK]: this.nombre, 
                id: this.id,
                films: this.peliculas || [],
                edited: this.editado || new Date().toISOString(),
                created: this.creado || new Date().toISOString(),
                climate: this.clima || "desconocido",
                rotation_period: this.periodo_rotacion || null,
                url: this.url || `http://localhost:3000/dev/planet/${this.id}`,
                population: this.poblacion || null,
                orbital_period: this.periodo_actual || null,
                surface_water: this.agua_en_superficie || null,
                diameter: this.diametro || null,
                gravity: this.gravedad || "desconocido",
                name: this.nombre,
                residents: this.residentes || [],
                terrain: this.terreno || "desconocido"
            }
        };
    }
  }
  
  module.exports = PlametRequest;
  