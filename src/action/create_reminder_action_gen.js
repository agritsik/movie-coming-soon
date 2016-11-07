const mongoClient = require('src/boundary/db/mongo_client');
const omdbClient = require('src/boundary/omdb/client');
const co = require('co');

module.exports = (id, email) => {
    return co(_execute(id, email));
};

function* _execute(id, email) {
    const omdbResponse = yield omdbClient.searchById(id);
    const mongoResponse = yield mongoClient.create(email, omdbResponse);
    return mongoResponse.insertedCount;
}