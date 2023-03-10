const DataAccess = require('./DataAccess');
const PeopleResponse = require('./models/PeopleResponse');
const AllPeopleResponse = require('./models/AllPeopleResponse');

async function fetchAllPeople(payload) {
    const { page } = payload;
    const result = await DataAccess.callAllPeopleAPI(page);
    if (!result) {
        return {
            code: "ERROR",
            description: "Error llamando a servicio externo"
        };
    }
    return AllPeopleResponse.map(result);
}

async function fetchPeopleById(payload) {
    try {
        const { id } = payload;
        const result = await DataAccess.callPeopleByIdAPI(id);
        if (!result) {
            return {
                code: "ERROR",
                description: "Error llamando a servicio externo"
            };
        }
        return PeopleResponse.map(result);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchAllPeople,
    fetchPeopleById
};
