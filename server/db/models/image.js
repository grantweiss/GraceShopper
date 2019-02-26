const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validation: {
      isUrl: true
    }
  }
})

module.exports = Image
