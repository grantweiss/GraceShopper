const router = require('express').Router()
const {Beer, Review, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const beers = await Beer.findAll({include: {model: Category}})
    if (beers.length > 0) res.json(beers)
    else {
      res.sendStatus(500)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    const beers = await Beer.findAll({
      include: {model: Category, where: {tag: req.query.tag}}
    })
    res.send(beers)
  } catch (err) {
    next(err)
  }
})

router.get('/:beerId', async (req, res, next) => {
  try {
    const beer = await Beer.findById(req.params.beerId, {
      include: [Review]
    })
    !beer ? res.sendStatus(500) : res.json(beer)
  } catch (error) {
    next(error)
  }
})

//Admin routes

const isAdmin = (req, res, next) => {
  if (req.user.userType === 'admin') {
    next()
  } else {
    const err = new Error('Must be an admin')
    res.status(401)
    next(err)
  }
}

router.delete('/:beerId', isAdmin, async (req, res, next) => {
  try {
    const toDelete = await Beer.findById(req.params.beerId)
    await toDelete.destroy()
    res.status(201).send('Successfully deleted Beer')
  } catch (error) {
    next(error)
  }
})
