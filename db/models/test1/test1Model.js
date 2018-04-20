const Sequelize = require('sequelize');
const sequelize = require('../../seq');

const TableName = sequelize.define('table_name', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    tableName: 'table_name',
    timestamps: false
});


module.exports = TableName;