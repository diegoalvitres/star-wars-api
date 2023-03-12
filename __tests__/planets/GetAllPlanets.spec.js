jest.mock('../../src/planets/DataAccess');
const DataAccess = require('../../src/planets/DataAccess');
const Controller = require('../../src/planets/Controller');
const Fake = require('./data/fakeDataGetAllPlanets.json');

async function okTest(payload, response, data) {
    DataAccess.getAllPlanetsDB.mockReturnValueOnce(data);
    const result = await Controller.getAllPlanets(payload);
    expect(result).toEqual(response);
}

function errorExpect(error, errorResponse) {
    expect(error.detalle).toEqual(errorResponse.detalle);
}
  
async function errorTest(payload, errorResponse, data) {
    try {
        DataAccess.getAllPlanetsDB.mockReturnValueOnce(data);
        await Controller.getAllPlanets(payload);
    } catch (error) {
        errorExpect(error, errorResponse);
    }
}

describe('Validate getAllPlanets from DB', () => {
    describe('Correct call with results in db', () => {
        it('Then it shows the correct response',
            async () => okTest({}, Fake.getAllPlanetsOk.response, Fake.data));
    });
    describe('Not found results in db', () => {
        it('Then it shows the correct response',
            async () => errorTest({}, Fake.notFoundPlanet.response, []));
    });
});