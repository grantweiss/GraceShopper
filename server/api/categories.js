const router = require('express').Router()
const {Beer, Review, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.send(categories)
  } catch (err) {
    next(err)
  }
})
