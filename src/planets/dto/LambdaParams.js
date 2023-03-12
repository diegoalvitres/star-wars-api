class LambdaParams {
    constructor(
      FunctionName,
      action,
      payload
    ) {
      this.FunctionName = FunctionName;
      this.InvocationType = "RequestResponse";
      this.Payload = JSON.stringify({
        origin: "LAMBDA_EVENT",
        action,
        body: payload
      });
    }
  }
  
  module.exports = LambdaParams;
  