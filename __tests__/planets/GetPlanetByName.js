jest.mock('../../src/planets/DataAccess');
const DataAccess = require('../../src/planets/DataAccess');
const Controller = require('../../src/planets/Controller');
const Fake = require('./data/fakeDataGetByName.json');

async function okTest(payload, response, data) {
    DataAccess.getPlanetsByNameDB.mockReturnValueOnce(data);
    const result = await Controller.getPlanetByName(payload);
    expect(result).toEqual(response);
}

function errorExpect(error, errorResponse) {
    if (!errorResponse.detalle) {
        expect(error.toString()).toEqual(errorResponse.errorMessage);
    } else {
        expect(error.detalle).toEqual(errorResponse.detalle);            
    }
}
  
async function errorTest(payload, errorResponse, data) {
    try {
        DataAccess.getPlanetsByNameDB.mockReturnValueOnce(data);
        await Controller.getPlanetByName(payload);
    } catch (error) {
        errorExpect(error, errorResponse);
    }
}

describe('Validate getPlanetByName from DB', () => {
    describe('When data exist', () => {
        it('Then it shows the correct response',
            async () => okTest(Fake.getPlanetByNameOk.payload, Fake.getPlanetByNameOk.response, Fake.data));
    });
    describe('When not found data in DB', () => {
        it('Then it shows the error message',
            async () => errorTest(Fake.notFoundPlanet.payload, Fake.notFoundPlanet.response, []));
    });
    describe('When required param is missing', () => {
        it('Then it shows the error message',
            async () => errorTest(Fake.paramNameRequired.payload, Fake.paramNameRequired.response, []));
    });
});