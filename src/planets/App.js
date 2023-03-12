const Controller = require('./Controller');

module.exports.handler = async (event) => {
    console.info("Controller planets")
    const { action } = event;
    console.info("Action called", action);
    const payload = { ...event.query, ...event.path, ...event.body };
    console.info("Payload", payload);
    return Controller[action](payload);
}
