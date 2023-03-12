const DataAccess = require('./DataAccess');
const PlanetReponse = require('./models/PlanetResponse');
const ServiceSupport = require('./support/ServiceSupport');
const Constants = require('./support/Constants');
const AppException = require('../../commons/exceptions/AppException');

async function fetchAllPlanets() {
    try {
        const result = await DataAccess.getAllPlanetsDB();
        console.log(result);
        if (result.length === 0) {
            new AppException(404, "No se encontraron planetas").throw();
        }
        return result.map((item) => PlanetReponse.map(item));        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchPlanetById(payload) {
    try {
        const { id } = payload;
        const result = await DataAccess.getPlanetsByIdDB(id);
        if (result.length === 0) {
            new AppException(404, "Planeta no encontrado").throw();
        }
        return PlanetReponse.map(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchPlanetByName(payload) {
    try {
        const { nombre } = payload;
        const result = await DataAccess.getPlanetsByNameDB(nombre);
        if (result.length === 0) {
            new AppException(404, "Planeta no encontrado").throw();
        }
        return PlanetReponse.map(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function addPlanet(payload) {
    try {
        const { nombre } = payload;
        const callLambdaGetPlanetByName = await _invokeLambda(Constants.FUNCTION_NAME_PLANET, Constants.ACTION_NAME, {nombre});
        console.info('LambdaResponse', callLambdaGetPlanetByName);
        const resultResponse = ServiceSupport.clearResponseLambda(callLambdaGetPlanetByName);
        if (!resultResponse.errorMessage) {            
            throw new Error(JSON.stringify({
                statusCode: 400,
                message: "El nombre del planeta ya está registrado"
            }));
        }
        const result = await DataAccess.createPlanetDB(payload);
        console.log(result);
        return PlanetReponse.map(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function _invokeLambda(name, action, payload) {
    try {
        console.log("before lambda call");
        return await DataAccess.invokeLambda(name, action, payload);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = {
    fetchAllPlanets,
    fetchPlanetById,
    fetchPlanetByName,
    addPlanet
}