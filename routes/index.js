"use strict"; // todo: do we need strict?

const express = require('express');
const request = require('request');
const redis = require('redis');
const MongoClient = require('mongodb').MongoClient;

const OMDB_URL = 'http://www.omdbapi.com/'; // todo: settings

// todo: modules http://stackoverflow.com/a/10328308/5253591
let router = express.Router();

let redisClient = redis.createClient(6379, '192.168.99.100');
redisClient.on("error", function (err) {
    console.log("Error " + err);
});

let mongo;
MongoClient.connect('mongodb://192.168.99.100:27017/csm', function (err, db) {
    console.log("Error " + err);
    mongo = db;
});

router.get('/', (req, res) => {
    res.send('<h1>Coming soon movies API</h1>');
});

router.get('/search', (req, res) => {

    // thanks to: http://exploringjs.com/es6/ch_promises.html#_map-via-promiseall
    const years = [2016, 2017];
    Promise
        .all(years.map(e => _search(req.query.s, e)))
        .then(r => {
            const map = r.map(e => JSON.parse(e).Search); // todo: check if arr is null
            res.send([].concat.apply([], map));
        });
});

router.post('/reminders', (req, res) => {

    _detail(req.body.imdbID).then(data => {
        mongo.collection('movies')
            .insertOne({email: req.body.email, movie: data})
            .then(r => res.status(201).send());
    });

});

// todo: function declaration http://stackoverflow.com/a/336868/5253591
/**
 * Loads movie details by id
 * @param id
 * @returns {Promise}
 * @private
 */
function _detail(id) {
    return new Promise((resolve, reject) => {
        request(`${OMDB_URL}?i=${id}&plot=full&r=json`, (err, response, body) => {
            resolve(body);
        });
    });
}


/**
 * Loads movies by title and year
 * @param title
 * @param year
 * @returns {Promise}
 * @private
 */
function _search(title, year) {
    return new Promise((resolve, reject)=> {
        redisClient.get(`q:${year}:${title}`, (err, reply) => {
            if (reply != null) {
                resolve(reply);
            } else {
                request(`${OMDB_URL}?s=${title}&y=${year}&type=movie`, (err, response, body) => {
                    redisClient.setex(`q:${year}:${title}`, 3600, body);
                    resolve(body);
                });
            }
        })
    });

}

module.exports = router;
