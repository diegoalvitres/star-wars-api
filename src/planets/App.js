const Controller = require('./Controller');

module.exports.handler = async (event) => {
    const { action } = event;
    const payload = { ...event.query, ...event.path, ...event.body };
    return Controller[action](payload);
}
