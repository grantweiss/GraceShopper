const router = require('express').Router()
const {User, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findById(id, {
      include: [{model: Review}]
    })
    !user ? res.sendStatus(500) : res.json(user)
  } catch (error) {
    next(error)
  }
})
