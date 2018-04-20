var _ = require('lodash');
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(_.get(config, "db.database"), null, null, {
  dialect: 'mysql',
  port: _.get(config, "db.port"),
  replication: {
    read: [
      {
        host: _.get(config, "db.slave.host"),
        username: _.get(config, "db.slave.user"),
        password: _.get(config, 'db.slave.password'),
        pool: {
          max: _.get(config, "pool.slave.max"),
          min: _.get(config, "pool.slave.min"),
          acquire: _.get(config, "pool.slave.acquire"),
          idle: _.get(config, "pool.slave.idle"),
        }
      }
    ],
    write: {
      host: _.get(config, "db.master.host"),
      username: _.get(config, "db.master.user"),
      password: _.get(config, 'db.master.password'),
      pool: {
        max: _.get(config, "pool.master.max"),
        min: _.get(config, "pool.master.min"),
        acquire: _.get(config, "pool.master.acquire"),
        idle: _.get(config, "pool.master.idle"),
      }
    }
  },
});

module.exports = sequelize;