const Service = require ('./Service');
const Validation = require('./Validation');

async function getAllPlanets() {
    return Service.fetchAllPlanets();
}

async function getPlanetById(payload) {
    return Service.fetchPlanetById(payload);
}

async function getPlanetByName(payload) {
    await Validation.validateParamName(payload);
    return Service.fetchPlanetByName(payload);
}

async function addPlanet(payload) {
    await Validation.validateRequestPlanet(payload);
    return Service.addPlanet(payload);
}

module.exports = {
    getAllPlanets,
    getPlanetById,
    getPlanetByName,
    addPlanet
};
