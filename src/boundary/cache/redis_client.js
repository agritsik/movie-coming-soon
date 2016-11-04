const redis = require('redis');

let redisClient;
module.exports.init = () => {
    return new Promise((resolve, reject) => {
        redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
        redisClient.on("ready", () => {
            console.log("Redis connection is established");
            resolve()
        })
    });
};

module.exports.get = (title, year) => {
    return new Promise((resolve, reject) => {
        redisClient.get(`q:${year}:${title}`, (err, reply) => {
            if (err) return reject(err);

            resolve(reply);
        });
    })
};

module.exports.set = (title, year, value) => {
    return new Promise((resolve, reject) => {
        redisClient.setex(`q:${year}:${title}`, 1, value, (err, reply) => {
            if (err) return reject(err);

            resolve(reply);
        });
    })
};