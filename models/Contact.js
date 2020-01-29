const Sequelize = require('sequelize')
const db = require('../config/database')

const Contact = db.define('contact', {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  bio: {
    type: Sequelize.STRING
  },
})

module.exports = Contact