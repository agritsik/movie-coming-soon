"use strict";

const cacheStorage = require('src/boundary/cache/cache_storage');
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
        cacheStorage.get(`q:${year}:${title}`)
            .then((data) => {

                if (data != null) {
                    return resolve(data);
                } else {
                    omdbClient.searchByTitle(title, year)
                        .then(omdbData => {
                            // put into the cache storage
                            cacheStorage.set(`q:${year}:${title}`, omdbData);
                            return resolve(omdbData);
                        }).catch(err => reject(err));
                }
            }).catch(err => reject(err));
    });
}