jest.mock('../../src/planets/DataAccess');
const DataAccess = require('../../src/planets/DataAccess');
const Controller = require('../../src/planets/Controller');
const Fake = require('./data/fakeDataAddPlanet.json');

async function okTest(payload, response, data, dataLambdaRes) {
    DataAccess.createPlanetDB.mockReturnValueOnce(data);
    DataAccess.invokeLambda.mockReturnValueOnce(dataLambdaRes);
    const result = await Controller.addPlanet(payload);
    expect(result).toEqual(response);
}

function errorExpect(error, errorResponse) {
    if (errorResponse.errorMessage) {
        expect(error.toString()).toEqual(errorResponse.errorMessage);
    } else {
        expect(error.toString()).toEqual(errorResponse.message);
    }
}
  
async function errorTest(payload, errorResponse, dataLambdaRes) {
    try {
        DataAccess.invokeLambda.mockReturnValueOnce(dataLambdaRes);
        await Controller.addPlanet(payload);
    } catch (error) {
        errorExpect(error, errorResponse);
    }
}

describe('Validate savePlanet in DB', () => {
    describe('When save the planet correctly', () => {
        it('Then it shows the planet saved',
            async () => okTest(Fake.addNewPlanet.payload, Fake.addNewPlanet.response, Fake.data, Fake.dataCallLambda));
    });
    describe('When a required property is not sent', () => {
        it('Then it shows the error message',
            async () => errorTest(Fake.propertyRequired.payload, Fake.propertyRequired.response, Fake.dataCallLambdaWithData));
    });
    describe('When trying to save a planet that already exists (name)', () => {
        it('Then it shows the error message',
            async () => errorTest(Fake.duplicatedPlanetName.payload, Fake.duplicatedPlanetName.response, Fake.dataCallLambdaWithData));
    });
});