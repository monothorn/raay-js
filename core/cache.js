var Redis = require('ioredis');

var config = require('../config');

module.exports = new Redis({
    port: config.cache.redis.port,          // Redis port
    host: config.cache.redis.host,   // Redis host
    // family: 4,           // 4 (IPv4) or 6 (IPv6)
    // password: 'auth',
    db: config.cache.redis.index
});