const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
redisClient.on("ready", () => console.log("Redis is ready"));
redisClient.on("error", err => console.log("Redis Error: " + err));

module.exports.get = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, reply) => {
            if (err) return reject(err);

            resolve(reply);
        });
    })
};

module.exports.set = (key, value) => {
    return new Promise((resolve, reject) => {
        redisClient.setex(key, 3600, value, (err, reply) => {
            if (err) return reject(err);

            resolve(reply);
        });
    })
}