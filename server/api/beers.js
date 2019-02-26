const router = require('express').Router()
const {Beer} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const beers = await Beer.findAll()
    if (beers.length > 0) res.json(beers)
    else {
      res.json([
        {
          id: 0,
          title: 'Test1',
          imgURL:
            'https://images.homedepot-static.com/productImages/f0991a0b-7e75-4c78-ac5a-edbefab9684b/svn/rubbermaid-commercial-products-mop-buckets-with-wringer-1887305-64_1000.jpg',
          description:
            'After a long night, enjoy the spoils of the festive bar crowd.'
        }
      ])
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:beerId', async (req, res, next) => {})
