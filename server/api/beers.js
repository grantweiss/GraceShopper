const router = require('express').Router()
const {Beer, Review, Category, Brewery, User} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//CREATE BEER

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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    //Create new beer
    const newBeer = await Beer.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory,
      abv: req.body.abv,
      ibu: req.body.ibu,
      type: req.body.type
    })
    //Assign tags to the newly created beer
    const tagsArr = req.body.tags.split(' ')
    let tagToBeAssigned

    tagsArr.forEach(async tag => {
      tag = tag.toLowerCase()
      tagToBeAssigned = await Category.findOrCreate({
        where: {
          tag: tag
        }
      })
      newBeer.addCategory(tagToBeAssigned[0].id)
    })

    //Assign brewery to the newly created beer
    const breweryToBeAssigned = await Brewery.findOne({
      where: {
        name: {[Op.iLike]: `${req.body.brewery}`}
      }
    })
    // if the brewery didn't exist
    if (!breweryToBeAssigned) {
      const newBrewery = await Brewery.create({
        name: req.body.brewery
      })
      newBeer.setBrewery(newBrewery.id)
    } else {
      newBeer.setBrewery(breweryToBeAssigned.id)
    }

    res.status(201).json(newBeer)
  } catch (error) {
    next(error)
  }
})
