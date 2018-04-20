var winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp':true, json: true, stringify: (obj) => JSON.stringify(obj)});

if(!process.env.NODE_ENV)
  winston.level='debug';

module.exports = winston;