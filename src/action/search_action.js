"use strict";

const redis = require('src/redis_client');
const omdbClient = require('src/boundary/omdb/client');

module.exports = (title) => {

    // thanks to: http://exploringjs.com/es6/ch_promises.html#_map-via-promiseall
    const years = [2016, 2017];
    return Promise
        .all(years.map(year => _search(title, year)))
        .then(r => {
            const map = r.map(e => JSON.parse(e).Search); // todo: check if arr is null
            return [].concat.apply([], map);
        })//.catch(err => Promise.reject(err));
};


function _search(title, year) {
    return new Promise((resolve, reject)=> {

        // check cache
        redis.get(`q:${year}:${title}`, (err, reply) => {
            if (err) return reject(err);

            if (reply != null) {
                return resolve(reply);
            } else {
                omdbClient.searchByTitle(title, year)
                    .then(data => {
                        // put into the cache storage
                        redis.setex(`q:${year}:${title}`, 3600, data);
                        return resolve(data);
                    }).catch(err => reject(err));
            }
        })
    });
};