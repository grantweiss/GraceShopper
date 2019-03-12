const router = require('express').Router()
const {Beer, Review, Category, Brewery, User} = require('../db/models')
const Sequelize = require('sequelize')
const {isLoggedIn, isAdmin} = require('./checkCredentials')
const Op = Sequelize.Op
module.exports = router

//All beers catalog
router.get('/', async (req, res, next) => {
  try {
    const brewerys = await Brewery.findAll({include: {model: Beer}})
    if (Breweryrs.length > 0) res.json(brewerys)
    else {
      res.sendStatus(500)
    }
  } catch (err) {
    next(err)
  }
})

//Search by name

router.get('/name', async (req, res, next) => {
  try {
    const brewery = await Brewery.findAll({
      where: {name: {[Op.iLike]: `%${req.query.name}`}}
    })
    if (brewery) res.send(brewery)
    else {
      res.sendStatus(500)
    }
  } catch (err) {
    next(err)
  }
})

//pagination

router.get('/page/:page', async (req, res, next) => {
  try {
    let limit = 50 // number of records per page
    let offset = (req.params.page - 1) * limit
    const brewerysCounter = await Brewery.findAndCountAll({
      order: [['id', 'ASC']]
    })
    const brewerysNum = brewerysCounter.count
    const beginning = offset < brewerysNum ? offset : brewerysNum - 1
    const end = offset + limit < brewerysNum ? offset + limit : brewerysNum

    const brewerysPage = brewerysCounter.rows.slice(beginning, end)
    res.json(brewerysPage)
  } catch (err) {
    next(err)
  }
})

//search by category

router.get('/search', async (req, res, next) => {
  try {
    const brewerys = await Brewery.findAll({
      include: {model: Beer}
    })
    res.send(brewerys)
  } catch (err) {
    next(err)
  }
})

//beer by ID
router.get('/:breweryId', async (req, res, next) => {
  try {
    const brewery = await Brewery.findById(req.params.breweryId, {
      include: [{model: Beer}]
    })
    !brewery ? res.sendStatus(500) : res.json(brewery)
  } catch (error) {
    next(error)
  }
})

//Admin routes

router.delete('/:breweryId', isAdmin, async (req, res, next) => {
  try {
    const toDelete = await Brewery.findById(req.params.breweryId)
    await toDelete.destroy()
    res.status(200).send('Successfully deleted Brewery')
  } catch (error) {
    next(error)
  }
})

router.put('/:breweryId', isAdmin, async (req, res, next) => {
  try {
    const editedBrewery = await Brewery.findById(req.params.breweryId)
    const updatedBrewery = await editedBrewery.update(req.body, {
      fields: Object.keys(req.body)
    })

    res.status(200).send(updatedBrewery)
  } catch (err) {
    next(err)
  }
})

//CREATE BREWERY
router.post('/', isAdmin, async (req, res, next) => {
  try {
    //Create new brewery
    const newBrewery = await Brewery.create({
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
      newBrewery.addCategory(tagToBeAssigned[0].id)
    })
  } catch (err) {
    next(err)
  }
})
