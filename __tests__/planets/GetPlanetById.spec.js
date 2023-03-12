jest.mock('../../src/planets/DataAccess');
const DataAccess = require('../../src/planets/DataAccess');
const Controller = require('../../src/planets/Controller');
const Fake = require('./data/fakeDataGetById.json');

async function okTest(payload, response, data) {
    DataAccess.getPlanetsByIdDB.mockReturnValueOnce(data);
    const result = await Controller.getPlanetById(payload);
    expect(result).toEqual(response);
}

function errorExpect(error, errorResponse) {
    if (!error.detalle) {
        expect(error.toString()).toEqual(errorResponse.detalle);
    } else {
        expect(error.detalle).toEqual(errorResponse.detalle);
    }
}
  
async function errorTest(payload, errorResponse, data) {
    try {
        DataAccess.getPlanetsByIdDB.mockReturnValueOnce(data);
        await Controller.getPlanetById(payload);
    } catch (error) {
        errorExpect(error, errorResponse);
    }
}

describe('Validate getPlanetById from DB', () => {
    describe('When data exist', () => {
        it('Then it shows the correct response',
            async () => okTest(Fake.getPlanetByIdOk.payload, Fake.getPlanetByIdOk.response, Fake.data));
    });
    describe('When not found data in DB', () => {
        it('Then it shows the correct response',
            async () => errorTest(Fake.notFoundPlanet.payload, Fake.notFoundPlanet.response, []));
    });
});