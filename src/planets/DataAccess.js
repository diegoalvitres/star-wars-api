const DynamoDBLib = require('../../commons/libs/DynamoDBLib');
const DtoPlanets = require('./dto/DtoPlanets')

const db = DynamoDBLib.getInstance();

async function getAllPlanetsDB() {
  const response = await db.query(DtoPlanets.paramsQueryGetAllPlanets()).promise();
  return DynamoDBLib.orderBySK(response.Items);
}

async function getAllPlanetsByIdDB(id) {
    const response = await db.query(DtoPlanets.paramsQueryGetById(id)).promise();
    return response.Items;
}

module.exports = {
    getAllPlanetsDB,
    getAllPlanetsByIdDB
}