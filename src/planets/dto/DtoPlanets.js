const DynamoDBLib = require("../../../commons/libs/DynamoDBLib");

class DtoSpeeches {
  static expressionPK = ':PK';
  static expressionGSIPK = ':GSI1PK'

  static paramsQueryGetAllPlanets() {
    return {
      TableName: process.env.TABLE_NAME_PLANETS,
      IndexName: DynamoDBLib.getTypeIndex().name,
      KeyConditionExpression: `${DynamoDBLib.getTypeIndex().PK} = ${DtoSpeeches.expressionGSIPK}`,
      ExpressionAttributeValues: {
        [DtoSpeeches.expressionGSIPK]: DynamoDBLib.metaPlanets
      }
    };
  }

  static paramsQueryGetById(id) {
    return {
      TableName: process.env.TABLE_NAME_PLANETS,
      KeyConditionExpression: `PK = ${DtoSpeeches.expressionPK}`,
      ExpressionAttributeValues: {
        [DtoSpeeches.expressionPK]: DynamoDBLib.getPk(DynamoDBLib.metaPlanets, id)
      }
    };
  }
}

module.exports = DtoSpeeches;
