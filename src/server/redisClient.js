var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL); //creates a new client

client.on('connect', function() {
    console.log('Redis connected');
});

module.exports = client;