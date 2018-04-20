var _ = require('lodash'),
    defaults = {};

_.set(defaults, "Constants", {
    SOME_CONSTANT: null
});

function __getEnvConfig() {
    switch (process.env.NODE_ENV) {
        case 'production':
            return require('./lib/prod');
        case 'test':
            return require('./lib/test');
        case 'local':
            return require('./lib/local');
        default:
            return require('./lib/dev');
    }
}

config = {};
exports = module.exports = _.defaultsDeep(config, __getEnvConfig(), defaults);