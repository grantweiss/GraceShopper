const router = require('express').Router()
const {OrderItem, Beer} = require('../db/models')
module.exports = router

//Getting ORDER ITEMS ASSOCIATED WITH UserID
router.get('/:userId', async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      where: {
        userId: req.params.userId,
        orderId: null
      },
      include: {model: Beer}
    })
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

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
      await OrderItem.bulkCreate(orderItems)
      const newOrderItems = await OrderItems.findAll({
        where: {
          userId: req.user.id,
          orderId: null
        }
      })
      res.send(newOrderItems)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    if (req.params.userId) {
      const orderItems = req.body.map(listItem => {
        let orderItem = {}
        orderItem.userId = req.params.userId
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
