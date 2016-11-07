const mongoClient = require('src/boundary/db/mongo_client');
const omdbClient = require('src/boundary/omdb/client');

class CreateReminderActionGen {

    execute(id, email) {
        return omdbClient.searchById(id)
            .then(data => mongoClient.create(email, data))
            .then(data => data.insertedCount);
    }
}

module.exports = new CreateReminderActionGen();