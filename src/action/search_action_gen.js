const redisClient = require('src/boundary/cache/redis_client');
const omdbClient = require('src/boundary/omdb/client');
const co = require('co');
const logger = require('winston');

module.exports = (title) => {
    return co(_execute(title));
};

function* _execute(title) {
    const r = yield [
        co(_search(title, 2016)),
        co(_search(title, 2017))
    ];
    logger.debug(`generator search result: ${r}`);
    const map = r.map(e => JSON.parse(e).Search || []);
    return [].concat.apply([], map);
}

function* _search(title, year) {
    let data = yield redisClient.get(title, year);

    if (data == null) {
        data = yield omdbClient.searchByTitle(title, year);
        redisClient.set(title, year, data);
    }

    return data;
}


