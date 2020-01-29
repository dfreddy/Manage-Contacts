const Sequelize = require('sequelize');

module.exports = new Sequelize('WeChatContacts', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});