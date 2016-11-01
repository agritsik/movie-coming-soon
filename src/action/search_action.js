"use strict";
const request = require('request');
const redis = require('src/redis_client');

const OMDB_URL = 'http://www.omdbapi.com/'; // todo: settings

module.exports = (title) => {

    // thanks to: http://exploringjs.com/es6/ch_promises.html#_map-via-promiseall
    const years = [2016, 2017];
    return Promise
        .all(years.map(year => _search(title, year)))
        .then(r => {
            const map = r.map(e => JSON.parse(e).Search); // todo: check if arr is null
            return [].concat.apply([], map);
        }).catch(err => Promise.reject(err));
};


function _search(title, year) {
    return new Promise((resolve, reject)=> {

        // check cache
        redis.get(`q:${year}:${title}`, (err, reply) => {
            if(err) reject(err);

            if (reply != null) {
                resolve(reply);
            } else {
                request(`${OMDB_URL}?s=${title}&y=${year}&type=movie`, (err, response, body) => {
                    if(err) reject(err);
                    redis.setex(`q:${year}:${title}`, 3600, body);
                    resolve(body);
                });
            }
        })
    });
};