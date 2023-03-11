/* eslint-disable no-console */
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'dynamodb',
  endpoint: 'http://localhost:8000'
});

const dynamodb = new AWS.DynamoDB();
const primaryKey = 'PK';
const secondaryKey = 'SK';
const tableName = 'dev-star-wars-planets';

const params = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: primaryKey,
        AttributeType: 'S'
      },
      {
        AttributeName: secondaryKey,
        AttributeType: 'S'
      },
      {
        AttributeName: 'GSI1PK',
        AttributeType: 'S'
      },
      {
        AttributeName: 'GSI1SK',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: primaryKey,
        KeyType: 'HASH'
      },
      {
        AttributeName: secondaryKey,
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'GSI1',
        KeySchema: [
          {
            AttributeName: 'GSI1PK',
            KeyType: 'HASH'
          },
          {
            AttributeName: 'GSI1SK',
            KeyType: 'RANGE'
          }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ]
  };
  
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
      const items = [
        {
          "PK": {
            "S": "PLANET#1"
          },
          "SK": {
            "S": "2014-12-09T13:50:49.641000Z"
          },
          "GSI1PK": {
            "S": "PLANET"
          },
          "GSI1SK": {
            "S": "Tatooine"
          },
          "name": {
            "S": "Tatooine"
          },
          "rotation_period": {
            "S": "23"
          },
          "orbital_period": {
            "S": "304"
          },
          "diameter": {
            "S": "10465"
          },
          "climate": {
            "S": "arid"
          },
          "gravity": {
            "S": "1 standard"
          },
          "terrain": {
            "S": "desert"
          },
          "surface_water": {
            "S": "1"
          },
          "population": {
            "S": "200000"
          },
          "residents": {
            "L": [
            {
              "S": "https://swapi.py4e.com/api/people/1/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/2/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/4/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/6/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/7/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/8/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/9/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/11/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/43/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/62/"
            }
            ]
          },
          "films": {
            "L": [
            {
              "S": "https://swapi.py4e.com/api/films/1/"
            },
            {
              "S": "https://swapi.py4e.com/api/films/3/"
            },
            {
              "S": "https://swapi.py4e.com/api/films/4/"
            },
            {
              "S": "https://swapi.py4e.com/api/films/5/"
            },
            {
              "S": "https://swapi.py4e.com/api/films/6/"
            }
            ]
          },
          "created": {
            "S": "2014-12-09T13:50:49.641000Z"
          },
          "edited": {
            "S": "2014-12-20T20:58:18.411000Z"
          },
          "url": {
            "S": "https://swapi.py4e.com/api/planets/1/"
          }
        },
        {
          "PK": {
            "S": "PLANET#2"
          },
          "SK": {
            "S": "2014-12-10T11:35:48.479000Z"
          },
          "GSI1PK": {
            "S": "PLANET"
          },
          "GSI1SK": {
            "S": "Alderaan"
          },
          "name": {
            "S": "Alderaan"
          },
          "rotation_period": {
            "S": "24"
          },
          "orbital_period": {
            "S": "364"
          },
          "diameter": {
            "S": "12500"
          },
          "climate": {
            "S": "temperate"
          },
          "gravity": {
            "S": "1 standard"
          },
          "terrain": {
            "S": "grasslands, mountains"
          },
          "surface_water": {
            "S": "40"
          },
          "population": {
            "S": "2000000000"
          },
          "residents": {
            "L": [
            {
              "S": "https://swapi.py4e.com/api/people/5/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/68/"
            },
            {
              "S": "https://swapi.py4e.com/api/people/81/"
            }
            ]
          },
          "films": {
            "L": [
            {
              "S": "https://swapi.py4e.com/api/films/1/"
            },
            {
              "S": "https://swapi.py4e.com/api/films/6/"
            }
            ]
          },
          "created": {
            "S": "2014-12-10T11:35:48.479000Z"
          },
          "edited": {
            "S": "2014-12-20T20:58:18.420000Z"
          },
          "url": {
            "S": "https://swapi.py4e.com/api/planets/2/"
          }
        }       
      ];
      dynamodb.batchWriteItem({
        RequestItems: {
          [tableName]: items.map((item) => {
            return {
              PutRequest: {
                Item: item
              }
            };
          })
        }
      }, (errPut, dataPut) => {
        if (errPut) {
          console.log("Error Put", errPut);
        } else {
          console.log("Put", dataPut);
        }
      });
    }
  });
  