const DynamoDBLib = require('../../commons/libs/DynamoDBLib');
const LambdaLib = require('../../commons/libs/LambdaLib');
const LambdaParams = require('./dto/LambdaParams');
const DtoPlanets = require('./dto/DtoPlanets')
const DtoPlanetsRequest = require('./dto/DtoPlanetRequest');

const db = DynamoDBLib.getInstance();
const lambda = LambdaLib.getInstace();

async function getAllPlanetsDB() {
  const response = await db.query(DtoPlanets.paramsQueryGetAllPlanets()).promise();
  return DynamoDBLib.orderBySK(response.Items);
}

async function getPlanetsByIdDB(id) {
    const response = await db.query(DtoPlanets.paramsQueryGetById(id)).promise();
    return response.Items;
}

async function getPlanetsByNameDB(name) {
    const response = await db.query(DtoPlanets.paramsQueryGetByName(name)).promise();
    return response.Items;
}

async function createPlanetDB(request) {
    const dtoPlanets = new DtoPlanetsRequest({ ...request });
    const paramsToCreate = dtoPlanets.paramsCreateItemDB
    await db.put(paramsToCreate).promise();
    return paramsToCreate.Item;
  }

async function invokeLambda(name, action, payload) {
    const result = await lambda.invoke(new LambdaParams(name, action, payload)).promise();
    return result;
}

module.exports = {
    getAllPlanetsDB,
    getPlanetsByIdDB,
    getPlanetsByNameDB,
    invokeLambda,
    createPlanetDB
}