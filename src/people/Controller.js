const Service = require ('./Service');

async function getAllPeople(payload) {
    return Service.fetchAllPeople(payload);
}

async function getPeopleById(payload) {
    return Service.fetchPeopleById(payload);
}

module.exports = {
    getAllPeople,
    getPeopleById
};
