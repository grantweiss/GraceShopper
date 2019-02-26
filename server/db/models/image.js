const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  imageUrl: {
    type: Sequelize.URL,
    allowNull: false
  }
})

module.exports = Image
