"use strict";
const request = require('request');
const mongoDB = require('src/mongo_client');

const OMDB_URL = 'http://www.omdbapi.com/'; // todo: settings

module.exports = (id, email) => {

    return new Promise((resolve, reject) => {
        request(`${OMDB_URL}?i=${id}&plot=full&r=json`, (err, response, body) => {
            mongoDB.db.collection('movies').insertOne({email: email, movie: body})
                .then(r => resolve(r.insertedCount))
                .catch(err => reject(err));
        });
    });

};
