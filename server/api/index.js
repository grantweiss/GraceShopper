const router = require('express').Router()
const stripe = require('stripe')('sk_test_k430OyO0VT7fpkEsYqpf7sJF')

module.exports = router

router.use('/users', require('./users'))
router.use('/beers', require('./beers'))
router.use('/categories', require('./categories'))
router.use('/cart', require('./cart'))
router.use('/orders', require('./orders'))

router.post('/charge', async (req, res, next) => {
  try {
    console.log('token', req.body)
    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: req.body.description,
      source: req.body.id
    })

    console.log('status', status)
    res.json({status})
  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
