const Sequelize = require('sequelize')
const db = require('../db')

const Brewery = db.define('brewery', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  streetAddress: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  zipCode: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING,
    validation: {
      isUrl: true
    }
  }
})

module.exports = Brewery
