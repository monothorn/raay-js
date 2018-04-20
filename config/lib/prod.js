var _ = require('lodash');
var config = {}

_.set(config, "db.main", {
    host: '',
    user: '',
    password: '',
    database: 'mydb'
});

exports = module.exports = config;
