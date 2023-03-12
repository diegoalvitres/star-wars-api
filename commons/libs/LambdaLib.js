const AWS = require('aws-sdk');

class LambdaLib {
  static getInstace() {
    if (process.env.STAGE === 'dev') {
      return new AWS.Lambda({
        endpoint: 'http://127.0.0.1:3002',
        region: "us-east-1"
      });
    }
    return new AWS.Lambda();
  }
}

module.exports = LambdaLib;
