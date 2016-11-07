const redisClient = require('src/boundary/cache/redis_client');
const omdbClient = require('src/boundary/omdb/client');
const logger = require('winston');

class SearchAction {

    execute(title) {

        // thanks to: http://exploringjs.com/es6/ch_promises.html#_map-via-promiseall
        const years = [2016, 2017];
        return Promise
            .all(years.map(year => this._search(title, year)))
            .then(r => {
                logger.debug(`promises search result: ${r}`);
                const map = r.map(e => JSON.parse(e).Search || []);
                return [].concat.apply([], map);
            });
    }

    _search(title, year) {
        return redisClient
            .get(title, year)
            .then((data) => {

                if (data == null) {
                    data = omdbClient
                        .searchByTitle(title, year)
                        .then(omdbData => {
                            redisClient.set(title, year, omdbData);
                            return omdbData;
                        });
                }

                return data;
            });
    }

}

module.exports = new SearchAction();
