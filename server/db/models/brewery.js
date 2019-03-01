const Sequelize = require('sequelize')
const db = require('../db')

const Brewery = db.define('brewery', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    hooks: {
      beforeCreate: function() {
        const sanitizedNameArr = req.body.brewery.split(' ')
        let sanitizedName = ''
        sanitizedNameArr.forEach(word => {
          sanitizedName +=
            word[0].toUpperCase() +
            word.slice(1, word.length).toLowerCase() +
            ' '
          sanitizedName.trim(' ')
        })
        return sanitizedName
      }
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
