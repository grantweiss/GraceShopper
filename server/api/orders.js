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
const {isLoggedIn, isAdmin} = require('./checkCredentials')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//UPDATE ORDER
router.put('/:id', async (req, res, next) => {
  try {
    const updatedOrder = await Order.update(req.body, {
      where: {id: req.params.id}
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

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

//SET ORDER ITEMS
