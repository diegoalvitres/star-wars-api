const fetch = require('node-fetch');
const Constants = require('./support/Constants');

async function callAllPeopleAPI(page) {
    // agregar parametro page si es que existe, para mostrar resultados de esa pagina
    const urlWithQueryParam = `${Constants.EXTERNAL_ENDPOINT_PEOPLE}${(page) ? `?page=${page}` : ''}`;
    console.log(urlWithQueryParam)
    const result = await callExternalAPI(urlWithQueryParam);
    return result;
}

async function callPeopleByIdAPI(id) {
    const urlWithPathParam = `${Constants.EXTERNAL_ENDPOINT_PEOPLE}/${id}`;
    const result = await callExternalAPI(urlWithPathParam);
    return result;
}

async function callExternalAPI(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    callAllPeopleAPI,
    callPeopleByIdAPI
};
