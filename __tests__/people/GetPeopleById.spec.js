jest.mock('../../src/people/DataAccess');
const DataAccess = require('../../src/people/DataAccess');
const Controller = require('../../src/people/Controller');
const Fake = require('./data/fakeGetPeopleById.json');

async function okTest(payload, response, data) {
    DataAccess.callPeopleByIdAPI.mockReturnValueOnce(data);
    const result = await Controller.getPeopleById(payload);
    expect(result).toEqual(response);
}

function errorExpect(error, errorResponse) {
    expect(error.code.toString()).toEqual(errorResponse.code);
    error.message.forEach((message, index) => {
        expect(message).toEqual(errorResponse.message[index]);
    });
}
  
async function errorTest(errorResponse, payload) {
    try {
        DataAccess.callPeopleByIdAPI.mockReturnValueOnce(null);
        await Controller.getPeopleById(payload);
    } catch (error) {
        errorExpect(error, errorResponse);
    }
}

describe('Validate getPeopleById', () => {
    describe('When call with valid id', () => {
        it('Then it shows the correct response', async () => okTest(Fake.getPeopleByIdOk.payload, Fake.getPeopleByIdOk.response, Fake.data));
    });
    describe('When call the api with an invalid id', () => {
        it('Then it shows the detail response', async () => okTest(Fake.getPeopleByIdInexistent.payload, Fake.getPeopleByIdInexistent.response, Fake.dataNotFoundById));
    });
    describe('When call the external api return error', () => {
        it('Then it shows the error', async () => errorTest(Fake.errorCallingExternalAPI.response, {}));
    });
});