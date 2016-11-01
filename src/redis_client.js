const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
redisClient.on("ready", () => console.log("Redis is ready"));
redisClient.on("error", err => console.log("Redis Error: " + err));

module.exports = redisClient;