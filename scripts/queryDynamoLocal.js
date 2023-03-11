const AWS = require('aws-sdk');

AWS.config.update({
  region: 'dynamodb',
  endpoint: 'http://localhost:8000'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'dev-star-wars-planets';

async function _getAll() {
    const params = {
        TableName: tableName
    };
    const response = await dynamodb.scan(params).promise();
    console.log(response);
}

async function _getPlanet(planetName) {
    const params = {
        TableName: tableName,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :planet",
        ExpressionAttributeValues: {
        ":planet": planetName
        }
    };
    const response = await dynamodb.query(params).promise();
    console.log(response.Items);
}

_getAll();
_getPlanet("Marte");