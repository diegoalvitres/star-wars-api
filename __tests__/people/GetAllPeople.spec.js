jest.mock('../../src/people/DataAccess');
const DataAccess = require('../../src/people/DataAccess');
const Controller = require('../../src/people/Controller');
const Fake = require('./data/fakeGetAllPeople.json');

async function okTest(payload, response, data) {
    DataAccess.callAllPeopleAPI.mockReturnValueOnce(data);
    const result = await Controller.getAllPeople(payload);
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
        DataAccess.callAllPeopleAPI.mockReturnValueOnce(null);
        await Controller.getAllPeople(payload);
    } catch (error) {
        errorExpect(error, errorResponse);
    }
}

describe('Validate getAllPeople', () => {
    describe('When call the api without page param', () => {
        it('Then it shows the correct response', async () => okTest({}, Fake.getAllPeopleOk.response, Fake.data));
    });
    describe('When call the api with a correct page param', () => {
        it('Then it shows the correct response', async () => okTest(Fake.getAllPeopleOk.payload, Fake.getAllPeopleOk.response, Fake.data));
    });
    describe('When call the api with an inexistent page value', () => {
        it('Then it shows the detail response', async () => okTest(Fake.getAllPeopleWithInvalidPage.payload, Fake.getAllPeopleWithInvalidPage.response, Fake.dataNotFound));
    });
    describe('When call the external api return error', () => {
        it('Then it shows the error', async () => errorTest(Fake.errorCallingExternalAPI.response, {}));
    });
});