const request = require('request');
const logger = require('winston');

class OmdbClient {

    searchByTitle(title, year) {
        return new Promise((resolve, reject) => {

            const url = `${process.env.OMDB_URL}?s=${title}&y=${year}&type=movie`;
            logger.debug(`Request to ${url}`); // todo: move to interceptor

            request(url, (err, response, body) => {
                if (err) return reject(err);
                resolve(body);
            });
        });
    }

    searchById(id) {
        return new Promise((resolve, reject) => {

            const url = `${process.env.OMDB_URL}?i=${id}&plot=full&r=json`;
            logger.debug(`Request to ${url}`); // todo: move to interceptor

            request(url, (err, response, body) => {
                if (err) return reject(err);
                resolve(body);
            });
        });

    }
}


module.exports = new OmdbClient();