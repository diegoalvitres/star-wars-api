const Service = require ('./Service');

async function getAllPlanets() {
    return Service.fetchAllPlanets();
}

async function getPlanetById(payload) {
    return Service.fetchPlanetById(payload);
}

async function addPlanet(payload) {
    return Service.addPlanet(payload);
}

module.exports = {
    getAllPlanets,
    getPlanetById,
    addPlanet
};
