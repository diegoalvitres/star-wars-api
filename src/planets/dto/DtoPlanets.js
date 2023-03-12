const DynamoDBLib = require("../../../commons/libs/DynamoDBLib");

class DtoPlanets {
  static expressionPK = ':PK';
  static expressionGSIPK = ':GSI1PK'
  static expressionGSISK = ':GSI1SK'

  static paramsQueryGetAllPlanets() {
    return {
        TableName: process.env.TABLE_NAME_PLANETS,
        IndexName: DynamoDBLib.getTypeIndex().name,
        KeyConditionExpression: `${DynamoDBLib.getTypeIndex().PK} = ${DtoPlanets.expressionGSIPK}`,
        ExpressionAttributeValues: {
            [DtoPlanets.expressionGSIPK]: DynamoDBLib.metaPlanets
        }
    };
  }

  static paramsQueryGetById(id) {
    return {
        TableName: process.env.TABLE_NAME_PLANETS,
        KeyConditionExpression: `PK = ${DtoPlanets.expressionPK}`,
        ExpressionAttributeValues: {
            [DtoPlanets.expressionPK]: DynamoDBLib.getPk(DynamoDBLib.metaPlanets, id)
        }
    };
  }

  static paramsQueryGetByName(name) {
    return {
        TableName: process.env.TABLE_NAME_PLANETS,
        IndexName: DynamoDBLib.getTypeIndex().name,
        KeyConditionExpression: `${DynamoDBLib.getTypeIndex().PK} = ${DtoPlanets.expressionGSIPK} AND ${DynamoDBLib.getTypeIndex().SK} = ${DtoPlanets.expressionGSISK}`,
        ExpressionAttributeValues: {
            [DtoPlanets.expressionGSIPK]: DynamoDBLib.metaPlanets,
            [DtoPlanets.expressionGSISK]: name
        }
    };
  }
}

module.exports = DtoPlanets;
