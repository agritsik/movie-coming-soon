const redis = require('redis');
const redisClient = redis.createClient(6379, '192.168.99.100');
redisClient.on("ready", () => console.log("Redis is ready"));
redisClient.on("error", err => console.log("Redis Error: " + err));

module.exports = redisClient;