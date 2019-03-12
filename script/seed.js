'use strict'

const db = require('../server/db')
const {
  User,
  Beer,
  Review,
  Image,
  Category,
  Brewery,
  CategoryBeer
} = require('../server/db/models')
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const importUsers = require('../mock_users.json')

  const users = await User.bulkCreate(importUsers)
  const cody = await User.create({
    email: 'cody@email.com',
    password: '123',
    userType: 'admin'
  })

  const usersArray = await User.findAll()

  const importImages = require('../mock_images.json')

  const images = await Image.bulkCreate(importImages)

  const imagesArray = await Image.findAll()

  const importData = require('../open-beer-database.json')
  let breweriesArray = importData
    .map(record => {
      return {
        id: parseInt(record.fields.brewery_id),
        name: record.fields.name_breweries,
        streetAddress: record.fields.address1,
        city: record.fields.city,
        state: record.fields.state,
        country: record.fields.country
      }
    })
    .sort((record1, record2) => {
      return record1.id - record2.id
    })
    .filter((brewery, index, breweryArray) => {
      if (index === 0) return false
      return brewery.id !== breweryArray[index - 1].id && brewery.name != null
    })

  const bArray = breweriesArray.filter((brewery, index, bArray) => {
    if (index === 0) return true
    if (brewery.id !== bArray[index - 1].id) return true
    return false
  })

  const breweries = await Brewery.bulkCreate(bArray)

  let beersArray = importData
    .map(record => {
      return {
        title: record.fields.name,
        description: record.fields.descript,
        price: randomInt(200, 2000) / 100,
        inventory: randomInt(0, 5000),
        abv: record.fields.abv,
        ibu: record.fields.ibu || randomInt(10, 120),
        type: record.fields.style_name,
        breweryId: parseInt(record.fields.brewery_id),
        imgURL: `https://robohash.org/${
          record.recordid
        }.png?size=500x500&set=set1`
      }
    })
    .filter((beer, index) => {
      if (
        beer.title &&
        !beer.title.startsWith('07/') &&
        !beer.title.startsWith('0')
      ) {
        return true
      }
      return false
    })
  const beer = await Beer.bulkCreate(beersArray)

  beersArray = await Beer.findAll()

  breweriesArray = await Brewery.findAll()

  const importReviews = require('../mock_reviews.json')

  const reviews = await Review.bulkCreate(importReviews)
  const reviewsArray = await Review.findAll()

  const categories = require('../mock_categories.json')

  const tags = await Category.bulkCreate(categories)

  const tagsArray = await Category.findAll()

  const categoryBeer = require('../mock_category_beer.json')
  const catBeer = await CategoryBeer.bulkCreate(categoryBeer)

  const catBeerArray = await CategoryBeer.findAll()

  //SETTING BEERS WITH BREWERY

  let promises2 = []
  let promises3 = []
  let promises4 = []

  //SETTING TAGS W BEERS
  let randomNumOfBeers
  let randomBeer

  for (let i = 0; i < 1000; i++) {
    randomNumOfBeers = Math.floor(Math.random() * 50)
    randomBeer = Math.floor(Math.random() * 998)

    for (let j = 0; j < randomNumOfBeers; j++) {
      const ToF = Math.random() >= 0.5
      if (ToF) promises4.push(tagsArray[i].addBeer(beersArray[randomBeer]))

      randomBeer++
    }
  }

  for (let i = 0; i < 1000; i++) {
    randomNumOfBeers = Math.floor(Math.random() * 50)
    randomBeer = Math.floor(Math.random() * 998)
    promises2.push(reviewsArray[i].setBeer(beersArray[randomBeer]))
  }
  await Promise.all(promises2)

  for (let i = 0; i < 1000; i++) {
    randomNumOfBeers = Math.floor(Math.random() * 50)
    randomBeer = Math.floor(Math.random() * 998)
    promises3.push(usersArray[randomBeer].addReview(reviewsArray[i]))
  }
  await Promise.all(promises3)
  await Promise.all(promises4)

  //SETTING IMAGES WITH BEERS

  await imagesArray[0].setBeer(beersArray[0])
  await imagesArray[1].setBeer(beersArray[1])
  await imagesArray[3].setBeer(beersArray[3])
  await imagesArray[4].setBeer(beersArray[0])
  await imagesArray[5].setBeer(beersArray[5])
  await imagesArray[6].setBeer(beersArray[5])
  await imagesArray[7].setBeer(beersArray[5])
  await imagesArray[8].setBeer(beersArray[0])
  await imagesArray[9].setBeer(beersArray[0])
  await imagesArray[10].setBeer(beersArray[0])

  // SETTING REVIEWS WITH BEERS

  await reviewsArray[0].setBeer(beersArray[0])
  await reviewsArray[1].setBeer(beersArray[0])
  await reviewsArray[2].setBeer(beersArray[4])
  await reviewsArray[3].setBeer(beersArray[2])
  await reviewsArray[4].setBeer(beersArray[2])

  //SETTING REVIEWS WITH USER

  await usersArray[0].addReview(reviewsArray[0])
  await usersArray[1].addReview(reviewsArray[1])
  await usersArray[1].addReview(reviewsArray[2])
  await usersArray[1].addReview(reviewsArray[3])
  await usersArray[1].addReview(reviewsArray[4])

  //SETTING TAGS
  // Fruit
  await tagsArray[0].addBeer(beersArray[0])
  await tagsArray[0].addBeer(beersArray[1])
  await tagsArray[0].addBeer(beersArray[2])
  //Citrusy
  await tagsArray[1].addBeer(beersArray[1])
  //Hoppy
  await tagsArray[2].addBeer(beersArray[0])
  await tagsArray[2].addBeer(beersArray[1])
  await tagsArray[2].addBeer(beersArray[2])
  //Sweet
  await tagsArray[3].addBeer(beersArray[1])
  await tagsArray[3].addBeer(beersArray[2])
  //Malty
  await tagsArray[4].addBeer(beersArray[1])
  await tagsArray[4].addBeer(beersArray[5])
  //Drinkable
  await tagsArray[5].addBeer(beersArray[4])
  await tagsArray[5].addBeer(beersArray[5])
  //Watery
  await tagsArray[6].addBeer(beersArray[6])
  await tagsArray[6].addBeer(beersArray[7])
  //Bitter
  await tagsArray[7].addBeer(beersArray[1])
  await tagsArray[7].addBeer(beersArray[3])

  console.log(`seeded ${imagesArray.length} images`)
  console.log(`seeded ${reviewsArray.length} reviews`)
  console.log(`seeded ${breweriesArray.length} breweries`)
  console.log(`seeded ${tagsArray.length} tags`)
  console.log(`seeded ${usersArray.length} users`)
  console.log(`seeded ${beersArray.length} beers`)
  console.log(`seeded ${catBeerArray.length} category associations with beers`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
