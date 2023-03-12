const DataAccess = require('./DataAccess');
const PeopleResponse = require('./models/PeopleResponse');
const AllPeopleResponse = require('./models/AllPeopleResponse');

async function fetchAllPeople(payload) {
    try {
        const { page } = payload;
        const result = await DataAccess.callAllPeopleAPI(page);
        if (!result) {
            console.error("Error calling external API");
            return {
                statusCode: 500,
                description: "Error llamando a servicio externo"
            };
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
            return {
                statusCode: 500,
                description: "Error llamando a servicio externo"
            };
        }
        return PeopleResponse.map(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    fetchAllPeople,
    fetchPeopleById
};
