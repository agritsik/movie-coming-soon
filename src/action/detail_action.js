"use strict";

const mongoDB = require('src/mongo_client');
const omdbClient = require('src/boundary/omdb/client');

module.exports = (id, email) => {

    return new Promise((resolve, reject) => {

        omdbClient.searchById(id)
            .then(data => {
                mongoDB.db.collection('movies').insertOne({email: email, movie: data})
                    .then(r => resolve(r.insertedCount))
                    .catch(err => reject(err));
            }).catch(err => reject(err));
    });

};
