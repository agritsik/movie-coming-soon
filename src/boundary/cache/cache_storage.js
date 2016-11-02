const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
redisClient.on("ready", () => console.log("Redis is ready"));
redisClient.on("error", err => console.log("Redis Error: " + err));

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
}