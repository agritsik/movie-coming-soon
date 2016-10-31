"use strict";
const request = require('request');
const mongoConnect = require('./mongo');

const OMDB_URL = 'http://www.omdbapi.com/'; // todo: settings

module.exports = (id) => {

    return new Promise((resolve, reject) => {
        request(`${OMDB_URL}?i=${id}&plot=full&r=json`, (err, response, body) => {
            mongoConnect.then(db => db.collection('movies').insertOne({email: req.body.email, movie: body}));
            resolve();
        });
    });

};
