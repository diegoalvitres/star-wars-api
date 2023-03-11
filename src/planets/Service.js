const DataAccess = require('./DataAccess');
// const PlanetReponse = require('./models/PlanetReponse');

async function fetchAllPlanets() {
    console.log("all planets");
    try {
        const result = await DataAccess.getAllPlanetsDB();
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}

async function fetchPlanetById(payload) {
    console.log("all planets by id");
    try {
        const { id } = payload;
        const result = await DataAccess.getAllPlanetsByIdDB(id);
        return result;
    } catch (error) {
        throw error;
    }
}

async function addPlanet(payload) {
    try {
        // validar
        const result = await DataAccess.addPlanetDB(payload);
        console.log(result);
        return "ok";
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchAllPlanets,
    fetchPlanetById,
    addPlanet
}