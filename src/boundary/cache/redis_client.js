const redis = require('redis');
const logger = require('winston');

let redisClient;
module.exports.init = () => {
    return new Promise((resolve, reject) => {
        redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
        redisClient.on('ready', () => {
            logger.info('Redis connection is established');
            resolve();
        });

        redisClient.on('error', (err) => reject(err));
    });
};

module.exports.get = (title, year) => {
    return new Promise((resolve, reject) => {
        redisClient.get(`q:${year}:${title}`, (err, reply) => {
            if (err) return reject(err);

            resolve(reply);
        });
    });
};

module.exports.set = (title, year, value) => {
    return new Promise((resolve, reject) => {
        redisClient.setex(`q:${year}:${title}`, process.env.REDIS_TTL, value, (err, reply) => {
            if (err) return reject(err);

            resolve(reply);
        });
    });
};