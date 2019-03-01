const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

router.post('/:userId', async (req, res, next) => {
  try {
    const listItems = req.body.map(listItem => {
      listItem.userid = req.params.userId
      return listItem
    })
    const newOrderItems = await OrderItem.bulkCreate(listItems)
    return newOrderItems
  } catch (error) {
    next(error)
  }
})
router.delete('/:userId', async (req, res, next) => {
  try {
    await OrderItem.destroy({
      where: {
        userid: req.params.userId,
        orderid: null
      }
    })
    res.status(201).send('Successfully deleted cart')
  } catch (error) {
    next(error)
  }
})
