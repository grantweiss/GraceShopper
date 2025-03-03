const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  firstName: {type: Sequelize.STRING, allowNull: false},
  lastName: {type: Sequelize.STRING, allowNull: false},
  status: {
    type: Sequelize.ENUM(['completed', 'created', 'processing', 'cancelled']),
    defaultValue: 'created'
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  totalCost: Sequelize.FLOAT,
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
  }
})

module.exports = Order
