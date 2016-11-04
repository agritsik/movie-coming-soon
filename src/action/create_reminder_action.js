const mongoDB = require('src/boundary/db/mongo_client');
const omdbClient = require('src/boundary/omdb/client');

module.exports = (id, email) => {

    return omdbClient.searchById(id)
        .then(data => mongoDB.create(email, data))
        .then(data => data.insertedCount);

};
