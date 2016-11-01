const redis = require('redis');
const redisClient = redis.createClient(6379, 'localhost');
redisClient.on("ready", () => console.log("Redis is ready"));
redisClient.on("error", err => console.log("Redis Error: " + err));

module.exports = redisClient;