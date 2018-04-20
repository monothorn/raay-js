var _ = require('lodash');
var config = {}

_.set(config, "db.database", 'test_db');
_.set(config, "db.port", 3306);

_.set(config, "db.master", {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test_db'
});

_.set(config, "db.slave", {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test_db'
});

exports = module.exports = config;
