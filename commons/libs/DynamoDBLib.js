const AWS = require('aws-sdk');

class DynamoDBLib {

    static metaPlanets = 'PLANET';

    static getInstance() {
        console.log('env: ', process.env);
        if (process.env.STAGE === 'dev') {
            console.log("IAMMM HERE");
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
            PK: 'GSI1PK'
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