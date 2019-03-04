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

//CREATE ORDER
router.post('/', async (req, res, next) => {
  try {
    let newOrder = {
      orderDate: new Date(),
      userid: req.user.id,
      status: 'created'
    }
    newOrder = await Order.create(newOrder)
    const orderItems = req.body.map(lineItem => {
      return {
        userid: req.user.id,
        orderid: newOrder.id,
        beerid: lineItem.beer.id,
        quantity: lineItem.quantity,
        price: lineItem.beer.price
      }
    })
    await OrderItem.bulkCreate(orderItems)
    newOrder = await Order.findOne({
      where: {id: newOrder.id},
      include: OrderItem
    })
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})
//UPDATE ORDER
router.put('/:id', async (req, res, next) => {
  try {
    await Order.update(req.body, {
      where: {id: req.params.id}
    })
    const updatedOrder = await Order.findById(req.params.id)
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
