function _cleanAndConvertToObject(value) {
    return JSON.parse(value.toString());
  }

function clearResponseLambda(value) {
    // limpiar el response del lambda
    const cleanStr = _cleanAndConvertToObject(value.Payload);
    console.log("first Parse");
    console.log(cleanStr);
    // console.log(cleanStr.detalle);
    const objResponse = (process.env.STAGE === 'dev') ? cleanStr : _cleanAndConvertToObject(cleanStr);
    console.log("second Parse");
    console.log(objResponse);
    return objResponse || { error: true };
}

module.exports = {
    clearResponseLambda
}