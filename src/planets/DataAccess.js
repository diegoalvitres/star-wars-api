const DynamoDBLib = require('../../commons/libs/DynamoDBLib');
const DtoPlanets = require('./dto/DtoPlanets')

const db = DynamoDBLib.getInstance();

async function getAllPlanetsDB() {
    console.log("111 ");
  const response = await db.query(DtoPlanets.paramsQueryGetAllPlanets()).promise();
  console.log(response);
  return DynamoDBLib.orderBySK(response.Items);
}

async function getAllPlanetsByIdDB(id) {
    console.log("22 ");
    console.log("query", DtoPlanets.paramsQueryGetById(id));
    const response = await db.query(DtoPlanets.paramsQueryGetById(id)).promise();
    console.log(response);
    return response.Items;
}

module.exports = {
    getAllPlanetsDB,
    getAllPlanetsByIdDB
}