const redis = require('redis');
const logger = require('winston');

class RedisClient {

    constructor() {
    }

    init() {
        return new Promise((resolve, reject) => {
            this.redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
            this.redisClient.on('ready', () => {
                logger.info('Redis connection is established');
                resolve();
            });

            this.redisClient.on('error', (err) => reject(err));
        });
    }

    get(title, year) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(`q:${year}:${title}`, (err, reply) => {
                if (err) return reject(err);

                resolve(reply);
            });
        });
    }

    set(title, year, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.setex(`q:${year}:${title}`, process.env.REDIS_TTL, value, (err, reply) => {
                if (err) return reject(err);

                resolve(reply);
            });
        });
    };
}

module.exports = new RedisClient();


