const Service = require ('./Service');

async function getAllPlanets() {
    console.log("Service 1");    
    return Service.fetchAllPlanets();
}

async function getPlanetById(payload) {
    console.log("Service 2");
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
