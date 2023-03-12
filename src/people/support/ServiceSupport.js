function serializeObjectProperty(inObject) {
    const oldObject = { ...inObject.properties };
    const newObject = {};
    const keyNames = Object.keys(inObject.properties);

    keyNames.map((kName) => {
        const type3Obj = oldObject[kName]
        const oldKeys = Object.keys(type3Obj);
        oldKeys.forEach((val) => {
            const xtemp = {};
            if (val === 'type') {
                xtemp['tipo'] = oldObject[kName]['type'];
                newObject[kName] = xtemp;
            }
            if (val === 'description') {
                newObject[kName]['descripcion'] = oldObject[kName]['description'];
            }
            if (val === 'format') {
                newObject[kName]['formato'] = oldObject[kName]['format'];
            }
        });
    });
    return newObject;
}

module.exports = {
    serializeObjectProperty
}