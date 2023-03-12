const Service = require ('./Service');

async function getAllPeople(payload) {
    return Service.fetchAllPeople(payload);
}

async function getPeopleById(payload) {
    return Service.fetchPeopleById(payload);
}

async function getPeopleSchema() {
    return Service.fetchPeopleSchema();
}

module.exports = {
    getAllPeople,
    getPeopleById,
    getPeopleSchema
};
