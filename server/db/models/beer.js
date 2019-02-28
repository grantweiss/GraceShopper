const Sequelize = require('sequelize')
const db = require('../db')

const Beer = db.define('beer', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  price: {type: Sequelize.FLOAT},
  inventory: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
  abv: {type: Sequelize.FLOAT},
  ibu: {type: Sequelize.INTEGER},
  type: {
    type: Sequelize.STRING
  },
  imgURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'
  },
  breweryId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Beer
