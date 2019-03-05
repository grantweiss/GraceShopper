const router = require('express').Router()
const {User, Review} = require('../db/models')
const {isAdmin} = require('./checkCredentials')
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

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.sendStatus(500)
    } else {
      await user.destroy()
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

router.put(`/:id`, async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.sendStatus(500)
    } else {
      await user.update(req.body)
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})
