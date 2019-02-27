'use strict'

const db = require('../server/db')
const {
  User,
  Beer,
  Review,
  Image,
  Category,
  Brewery
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', userType: 'admin'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'test@email.com', password: '123'})
  ])
  const usersArray = await User.findAll()
  const images = await Promise.all([
    Image.create({
      imageUrl: 'https://robohash.org/Beer'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer1'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer2'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer3'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer4'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer5'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer6'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer7'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer8'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer9'
    }),
    Image.create({
      imageUrl: 'https://robohash.org/Beer10'
    })
  ])
  const imagesArray = await Image.findAll()
  const beers = await Promise.all([
    Beer.create({
      title: 'Space Station Middle Finger',
      description:
        'From the dawn of time, humans have looked to the sky for answers. Space Station Middle Finger replies to all from its eternal orbit. Behold and enjoy Space Station Middle Finger, a bright golden American Pale Ale.',
      price: 800000,
      abv: 6,
      ibu: 50,
      type: 'IPA',
      imgURL: imagesArray[0].imageUrl
    }),
    Beer.create({
      title: 'Alpha King',
      description:
        'A bold yet balanced American Pale Ale with slight caramel sweetness and aggressive citrus hoppiness. This is our flagship beer.',
      price: 182931231124213,
      abv: 6.66,
      ibu: 68,
      type: 'IPA',
      imgURL: imagesArray[1].imageUrl
    }),
    Beer.create({
      title: 'Weihenstephaner Hefe weissbier',
      description:
        'Our golden-yellow wheat beer, with its fine-poured white foam, smells of cloves and impresses consumers with its refreshing banana flavour. It is full bodied and with a smooth yeast taste. To be enjoyed at any time,goes excellently with fish and seafood, with spicy cheese and especially with the traditional Bavarian veal sausage. Brewed according to our centuries-old brewing tradition on the Weihenstephan hill.',
      price: 8.99,
      abv: 5.4,
      ibu: 14,
      type: 'Hefeweizen',
      imgURL: imagesArray[2].imageUrl
    }),
    Beer.create({
      title: 'Samuel Adams Boston Lager',
      description:
        'From the dawn of time, humans have looked to the sky for answers. Space Station Middle Finger replies to all from its eternal orbit. Behold and enjoy Space Station Middle Finger, a bright golden American Pale Ale.',
      price: 7.5,
      abv: 5,
      ibu: 30,
      type: 'Lager',
      imgURL: imagesArray[3].imageUrl
    }),
    Beer.create({
      title: 'Tecate',
      description:
        'A Lager beer with a delicious aroma of malt and hops and a delicate balance in its subtle refreshing taste.',
      price: 7.57,
      abv: 4.6,
      ibu: 25,
      type: 'Lager',
      imgURL: imagesArray[4].imageUrl
    }),
    Beer.create({
      title: 'Miller Lite',
      description:
        'A Lager beer with a delicious aroma of malt and hops and a delicate balance in its subtle refreshing taste.',
      price: 7.57,
      abv: 4.6,
      ibu: 12,
      type: 'Lager',
      imgURL: imagesArray[5].imageUrl
    }),
    Beer.create({
      title: 'Coors Light',
      description: 'None provided.',
      price: 7.57,
      abv: 4.2,
      ibu: 12,
      type: 'Lager',
      imgURL: imagesArray[6].imageUrl
    })
  ])

  const beersArray = await Beer.findAll()

  const breweries = await Promise.all([
    Brewery.create({
      name: '3 Floyds',
      streetAddress: '9750 Indiana Parkway',
      city: 'Munster',
      state: 'Indiana',
      country: 'USA',
      zipCode: '46321',
      phoneNumber: '1-219-922-4425',
      url: 'https://www.3floyds.com'
    }),
    Brewery.create({
      name: 'MillerCoors Brewing Company',
      streetAddress: '4251 West State Street',
      city: 'Milwaukee',
      state: 'Wisconsin',
      country: 'USA',
      zipCode: '53208',
      phoneNumber: '1-414-931-2337',
      url: 'https://www.millercoors.com/'
    }),
    Brewery.create({
      name: 'Tecate',
      streetAddress: '360 Hamilton Avenue',
      city: 'White Plaines',
      state: 'New York',
      country: 'USA',
      zipCode: '10601',
      phoneNumber: '1-877-522-5001',
      url: 'https://tecatebeerusa.com'
    }),
    Brewery.create({
      name: 'Samuel Adams Brewery',
      streetAddress: '30 Germania St',
      city: 'Boston',
      state: 'Massachusetts',
      country: 'USA',
      zipCode: '02130',
      phoneNumber: '1-617-368-5080',
      url: 'https://www.samueladams.com'
    }),
    Brewery.create({
      name: 'Weihenstephaner',
      streetAddress: '9750 Indiana Parkway',
      city: 'Freising',
      state: 'Bavaria',
      country: 'Germany',
      zipCode: '85354',
      phoneNumber: '0 81 61 / 536-0',
      url: 'https://www.weihenstephaner.com'
    }),
    Brewery.create({
      name: 'Great Lakes Brewing Company',
      streetAddress: '2516 Market Ave',
      city: 'Cleveland',
      state: 'Ohio',
      country: 'USA',
      zipCode: '44113',
      phoneNumber: '1-216-771-4404',
      url: 'https://www.greatlakesbrewing.com/'
    })
  ])
  const breweriesArray = await Brewery.findAll()
  const reviews = await Promise.all([
    Review.create({
      content: 'Overpriced',
      rating: 1
    }),
    Review.create({
      content: 'Best beer ever',
      rating: 5
    }),
    Review.create({
      content: 'How do I pronounce this?.',
      rating: 1
    }),
    Review.create({
      content: 'I can find this everywhere.',
      rating: 1
    }),
    Review.create({
      content: "I can't find this anywhere.",
      rating: 1
    })
  ])
  const reviewsArray = await Review.findAll()
  const tags = await Promise.all([
    Category.create({
      tag: 'hoppy'
    }),
    Category.create({
      tag: 'fruity'
    }),
    Category.create({
      tag: 'bitter'
    }),
    Category.create({
      tag: 'sweet'
    }),
    Category.create({
      tag: 'malty'
    }),
    Category.create({
      tag: 'citrusy'
    }),
    Category.create({
      tag: 'watery'
    }),
    Category.create({
      tag: 'drinkable'
    })
  ])
  const tagsArray = await Category.findAll()

  //SETTING BEERS WITH BREWERY
  //space station
  await beersArray[0].setBrewery(breweriesArray[1])
  //ALPHA KING
  await beersArray[1].setBrewery(breweriesArray[1])
  //weihen
  await beersArray[1].setBrewery(breweriesArray[4])
  //sam adams
  await beersArray[2].setBrewery(breweriesArray[3])
  //tecate
  await beersArray[3].setBrewery(breweriesArray[1])
  //miller
  await beersArray[4].setBrewery(breweriesArray[0])

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

  console.log(`seeded ${images.length} images`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${breweries.length} breweries`)
  console.log(`seeded ${tags.length} tags`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${beers.length} beers`)
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
