function _cleanAndConvertToObject(value) {
    return JSON.parse(value.toString());
  }

function clearResponseLambda(value) {
    // limpiar el response del lambda
    const cleanStr = _cleanAndConvertToObject(value.Payload);
    console.log("first Parse");
    console.log(cleanStr);
    return cleanStr || { error: true };
}

module.exports = {
    clearResponseLambda
}