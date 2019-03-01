/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Beer = db.model('beer')
const Category = db.model('category')
const Review = db.model('review')
const User = db.model('user')

const beers = [
  {
    title: 'Miller',
    description: 'This is an old beer',
    price: 1.35,
    inventory: 20,
    abv: 3.2,
    ibu: 30,
    type: 'Lager',
    imgURL: 'https://robohash.org/Beer1'
  },
  {
    title: 'Sam Adams',
    description: 'This beer is from Boston',
    price: 5.0,
    inventory: 30,
    abv: 5.1,
    ibu: 50,
    type: 'Bock',
    imgURL: 'https://robohash.org/Beer2'
  },
  {
    title: 'Zombie Dust',
    description: 'This is a great beer',
    price: 7.0,
    inventory: 100,
    abv: 6.8,
    ibu: 75,
    type: 'IPA',
    imgURL: 'https://robohash.org/Beer3'
  }
]
const categories = [{tag: 'hoppy'}, {tag: 'flat'}, {tag: 'great'}]
const reviews = [
  {content: 'I really like this beer', rating: 5},
  {content: 'This beer tasts like weak water', rating: 1},
  {content: 'This beer goes well with pizza', rating: 3},
  {
    content:
      'I would not drink this beer if I was dying in the middle of the desert',
    rating: 1
  }
]
describe('Beer routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/beers/', () => {
    const authenticatedUser = request.agent(app)
    beforeEach(async () => {
      await User.create({
        email: 'stevenbonifas@gmail.com',
        password: 'Test',
        userType: 'admin'
      })
      await authenticatedUser
        .post('/auth/login')
        .send({email: 'stevenbonifas@gmail.com', password: 'Test'})
      await Beer.bulkCreate(beers)
      const outBeers = await Beer.findAll()
      await Category.bulkCreate(categories)
      const outCategories = await Category.findAll()
      await Review.bulkCreate(reviews)
      const outReviews = await Review.findAll()
      await outBeers[0].addCategory(outCategories[0])
      await outBeers[0].addCategory(outCategories[1])
      await outBeers[1].addCategory(outCategories[2])
      await outBeers[2].addCategory(outCategories[2])
      await outBeers[0].addReview(outReviews[1])
      await outBeers[0].addReview(outReviews[2])
      await outBeers[1].addReview(outReviews[0])
      await outBeers[2].addReview(outReviews[1])
      await outBeers[0].addReview(outReviews[3])
      await outBeers[2].addReview(outReviews[3])
    })

    it('GET /api/beers', async () => {
      const res = await request(app)
        .get('/api/beers')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.a('string')
      expect(res.body.length).to.be.equal(3)
      expect(res.body[0].categories.length).to.be.greaterThan(0)
      expect(res.body[0].categories[0].tag).to.be.a('string')
    })
    it('GET /api/beers/search', async () => {
      const res = await request(app)
        .get('/api/beers/search?tag=hoppy')
        .expect(200)
      expect(res.body[0].categories).to.be.an('array')
      const tagArray = res.body[0].categories.map(category => category.tag)
      expect(tagArray).includes('hoppy')
    })
    it('GET /api/beers/:beerId', async () => {
      const res = await request(app)
        .get('/api/beers/1')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.a('string')
      expect(res.body.reviews.length).to.be.greaterThan(0)
      expect(res.body.reviews[0].content).to.be.a('string')
      expect(res.body.reviews[0].rating).to.be.a('number')
    })
    it('DELETE /api/beers/:beerId', async () => {
      await authenticatedUser.delete('/api/beers/1').expect(200)
      const allBeers = await Beer.findAll()
      expect(allBeers.length).to.equal(2)
      const beerIdArray = allBeers.map(beer => beer.id)
      expect(beerIdArray).to.not.include(1)
    })
  }) // end describe('/api/beers')
}) // end describe('Beer routes')
