const mongoClient = require('src/boundary/db/mongo_client');
const omdbClient = require('src/boundary/omdb/client');
const co = require('co');


class CreateReminderActionGen {

    execute(id, email) {
        return co(this._execute(id, email));
    }

    *_execute(id, email) {
        const omdbResponse = yield omdbClient.searchById(id);
        const mongoResponse = yield mongoClient.create(email, omdbResponse);
        return mongoResponse.insertedCount;
    }
}

module.exports = new CreateReminderActionGen();