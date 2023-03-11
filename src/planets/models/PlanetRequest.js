class PlametRequest {
    constructor({
      peliculas, editado, creado, clima, periodo_rotacion,
      url, poblacion, periodo_actual, agua_en_superficie, diametro,
      gravedad, nombre, residentes, terreno, id
    }) {
        this.id = id,
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

    get paramsOriginalName() {
        return {
            id: this.id,
            films: this.peliculas,
            edited: this.editado,
            created: this.creado,
            climate: this.clima,
            rotation_period: this.periodo_rotacion,
            url: this.url,
            population: this.poblacion,
            orbital_period: this.periodo_actual,
            surface_water: this.agua_en_superficie,
            diameter: this.diametro,
            gravity: this.gravedad,
            name: this.nombre,
            residents: this.residentes,
            terrain: this.terreno
        };
    }
  }
  
  module.exports = PlametRequest;
  