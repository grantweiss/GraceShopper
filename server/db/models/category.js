const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  tag: {
    type: Sequelize.STRING,
    allowNull: false,
    validation: {
      notEmpty: true
    }
  }
})

module.exports = Category
