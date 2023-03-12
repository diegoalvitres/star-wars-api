const AWS = require('aws-sdk');

class DynamoDBLib {

    static metaPlanets = 'PLANET';

    static getInstance() {
        if (process.env.IS_OFFLINE) {
            AWS.config.update({
                region: 'dynamodb',
                endpoint: 'http://localhost:8000'
            });
        }
        return new AWS.DynamoDB.DocumentClient();
    }
    static getTypeIndex() {
        return {
            name: 'GSI1',
            PK: 'GSI1PK',
            SK: 'GSI1SK'
        };
    }
    static getPk(meta, id) {
        return `${meta}#${id}`;
    }
    static orderBySK(items) {
        return items.sort((a, b) => {
            if (a.SK < b.SK) {
            return -1;
            }
            if (a.SK > b.SK) {
            return 1;
            }
            return 0;
        });
    }
}

module.exports = DynamoDBLib;
