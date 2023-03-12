const DataAccess = require('./DataAccess');
const PeopleResponse = require('./models/PeopleResponse');
const AllPeopleResponse = require('./models/AllPeopleResponse');
const AppException = require('../../commons/exceptions/AppException');
const ServiceSupport = require('./support/ServiceSupport');
const PeopleSchemaResponse = require('./models/PeopleSchemaResponse');

async function fetchAllPeople(payload) {
    try {
        const { page } = payload;
        const result = await DataAccess.callAllPeopleAPI(page);
        if (!result) {
            console.error("Error calling external API");
            new AppException(500, "Error llamando a servicio externo").throw();
        }
        return AllPeopleResponse.map(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchPeopleById(payload) {
    try {
        const { id } = payload;
        const result = await DataAccess.callPeopleByIdAPI(id);
        if (!result) {
            console.error("Error calling external API");
            new AppException(500, "Error llamando a servicio externo").throw();
        }
        return PeopleResponse.map(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchPeopleSchema() {
    try {
        const result = await DataAccess.callPeopleSchemaAPI();
        const modifiedProperties = ServiceSupport.serializeObjectProperty(result);
        const spanishPropertiesValues = PeopleResponse.map(modifiedProperties);
        result.properties = spanishPropertiesValues;
        result.required = Object.keys(spanishPropertiesValues);
        return PeopleSchemaResponse.map(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    fetchAllPeople,
    fetchPeopleById,
    fetchPeopleSchema
};
