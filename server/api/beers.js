const router = require('express').Router()
const {Beer, Review, Category, User} = require('../db/models')
module.exports = router

//CREATE BEER
router.post('/', async (req, res, next) => {
  try {
    const newBeer = await Beer.create(req.body)
    res.status(201).json(newBeer)
  } catch (error) {
    next(error)
  }
})

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
      include: [{model: Review, include: [User]}, Category]
    })
    !beer ? res.sendStatus(500) : res.json(beer)
  } catch (error) {
    next(error)
  }
})

//Admin routes

const isLoggedIn = (req, res, next) => {
  if (req.user) next()
  else {
    const err = new Error('Must loggin to do things')
    res.status(401)
    next(err)
  }
}

const isAdmin = (req, res, next) => {
  console.log('User:')
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
    res.status(200).send('Successfully deleted Beer')
  } catch (error) {
    next(error)
  }
})

router.put('/:beerId', isAdmin, async (req, res, next) => {
  try {
    const editedBeer = await Beer.findById(req.params.beerId, {
      include: {model: Category}
    })
    const updatedBeer = await editedBeer.update(req.body, {
      fields: Object.keys(req.body)
    })

    res.status(200).send(updatedBeer)
  } catch (err) {
    next(err)
  }
})

router.post(`/:beerId/review`, isLoggedIn, async (req, res, next) => {
  try {
    const beer = await Beer.findById(req.params.beerId)
    const user = await User.findById(req.user.id)
    const review = await Review.create(req.body)
    await beer.addReview(review)
    await user.addReview(review)
    res.status(201).json(beer)
  } catch (error) {
    next(error)
  }
})
