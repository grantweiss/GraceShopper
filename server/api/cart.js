const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

//CREATING ORDER ITEMS ASSOCIATED WITH ORDERID

router.post('/order/:orderId', async (req, res, next) => {
  try {
    if (req.user.id) {
      const orderItems = req.body.map(listItem => {
        let orderItem = {}
        orderItem.userId = req.user.id
        orderItem.beerId = listItem.beer.id
        orderItem.quantity = listItem.quantity
        orderItem.price = listItem.beer.price
        orderItem.orderId = req.params.orderId
        return orderItem
      })
      const newOrderItems = await OrderItem.bulkCreate(orderItems)
      res.send(newOrderItems)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    if (req.user.id) {
      const orderItems = req.body.map(listItem => {
        let orderItem = {}
        orderItem.userId = req.user.id
        orderItem.beerId = listItem.beer.id
        orderItem.quantity = listItem.quantity
        orderItem.price = listItem.beer.price
        return orderItem
      })
      const newOrderItems = await OrderItem.bulkCreate(orderItems)
      res.send(newOrderItems)
    }
  } catch (error) {
    next(error)
  }
})
router.delete('/:userId', async (req, res, next) => {
  try {
    await OrderItem.destroy({
      where: {
        userId: req.params.userId,
        orderId: null
      }
    })
    res.status(201).send('Successfully deleted cart')
  } catch (error) {
    next(error)
  }
})
