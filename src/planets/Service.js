const DataAccess = require('./DataAccess');
const PlanetReponse = require('./models/PlanetResponse');

async function fetchAllPlanets() {
    try {
        const result = await DataAccess.getAllPlanetsDB();
        return result.map((item) => PlanetReponse.map(item));
    } catch (error) {
        throw error;
    }
}

async function fetchPlanetById(payload) {
    try {
        const { id } = payload;
        const result = await DataAccess.getAllPlanetsByIdDB(id);
        return PlanetReponse.map(result);
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