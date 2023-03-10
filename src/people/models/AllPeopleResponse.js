const objectMapper = require('object-mapper');
const PeopleResponse = require('./PeopleResponse');

class AllPeopleResponse {
  static map(keys) {
    const map = {
        count: "cantidad",
        next: "siguiente",
        previous: "previo",
        "results": {
            key: "resultados2",
            transform: (val) => val.map((idx) => PeopleResponse.map(idx))
        },
        detail: "detalle"
    };
    return objectMapper(keys, map);
  }
}

module.exports = AllPeopleResponse;
