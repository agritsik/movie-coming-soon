"use strict";

const cacheStorage = require('src/boundary/cache/redis_client');
const omdbClient = require('src/boundary/omdb/client');

module.exports = (title) => {

    // thanks to: http://exploringjs.com/es6/ch_promises.html#_map-via-promiseall
    const years = [2016, 2017];
    return Promise
        .all(years.map(year => _search(title, year)))
        .then(r => {
            console.log(r);
            const map = r.map(e => JSON.parse(e).Search); // todo: check if arr is null
            return [].concat.apply([], map);
        })
};

function _search(title, year) {
    return cacheStorage
        .get(title, year)
        .then((data) => {

            if (data == null) {
                data = omdbClient
                    .searchByTitle(title, year)
                    .then(omdbData => {
                        cacheStorage.set(title, year, omdbData);
                        return omdbData;
                    });
            }

            return data;

        });

}