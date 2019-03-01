const router = require('express').Router()
const {
  Beer,
  Review,
  Category,
  Brewery,
  User,
  Order,
  OrderItem
} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

const isLoggedIn = (req, res, next) => {
  if (req.user) next()
  else {
    const err = new Error('Must loggin to do things')
    res.status(401)
    next(err)
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.userType === 'admin') {
    next()
  } else {
    const err = new Error('Must be an admin')
    res.status(401)
    next(err)
  }
}

//GET SINGLE ORDER
router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findById(req.params.id)
    res.status(200).json(singleOrder)
  } catch (error) {
    next(error)
  }
})

//GET ORDERS
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    if (req.user.userType === 'admin') {
      const allOrders = await Order.findAll()
      res.json(allOrders)
    } else {
      const allOrders = await Order.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(allOrders)
    }
  } catch (error) {
    next(error)
  }
})
