jest.mock('../../src/people/DataAccess');
const DataAccess = require('../../src/people/DataAccess');
const Controller = require('../../src/people/Controller');
const Fake = require('./data/fakeGetPeopleSchema.json');

async function okTest(payload, response, data) {
    DataAccess.callPeopleSchemaAPI.mockReturnValueOnce(data);
    const result = await Controller.getPeopleSchema(payload);
    expect(result).toEqual(response);
}

describe('Validate getPeopleSchema', () => {
    describe('When call the api correct', () => {
        it('Then it shows the correct response', async () => okTest({}, Fake.getPeopleShemaOK.response, Fake.data));
    });
});