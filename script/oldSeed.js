'use strict'
const faker = require('faker')
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
  for (let i = 0; i < 10000; i++) {
    await Beer.create(faker.fake(name.lastName()))
  }
}

// const users = await Promise.all([
//   User.create({email: 'cody@email.com', password: '123', userType: 'admin'}),
//   User.create({email: 'murphy@email.com', password: '123'}),
//   User.create({email: 'test@email.com', password: '123'})
// ])

// const images = await Promise.all([
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer1'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer2'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer3'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer4'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer5'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer6'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer7'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer8'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer9'
//   }),
//   Image.create({
//     imageUrl: 'https://robohash.org/Beer10'
//   })
// ])

// const beers = await Promise.all([
//   Beer.create({
//     title: 'Space Station Middle Finger',
//     description:
//       'From the dawn of time, humans have looked to the sky for answers. Space Station Middle Finger replies to all from its eternal orbit. Behold and enjoy Space Station Middle Finger, a bright golden American Pale Ale.',
//     price: 800000,
//     abv: 6,
//     ibu: 50,
//     type: 'IPA',
//     imgURL: imagesArray[0].imageUrl
//   }),
//   Beer.create({
//     title: 'Alpha King',
//     description:
//       'A bold yet balanced American Pale Ale with slight caramel sweetness and aggressive citrus hoppiness. This is our flagship beer.',
//     price: 182931231124213,
//     abv: 6.66,
//     ibu: 68,
//     type: 'IPA',
//     imgURL: imagesArray[1].imageUrl
//   }),
//   Beer.create({
//     title: 'Weihenstephaner Hefe weissbier',
//     description:
//       'Our golden-yellow wheat beer, with its fine-poured white foam, smells of cloves and impresses consumers with its refreshing banana flavour. It is full bodied and with a smooth yeast taste. To be enjoyed at any time,goes excellently with fish and seafood, with spicy cheese and especially with the traditional Bavarian veal sausage. Brewed according to our centuries-old brewing tradition on the Weihenstephan hill.',
//     price: 8.99,
//     abv: 5.4,
//     ibu: 14,
//     type: 'Hefeweizen',
//     imgURL: imagesArray[2].imageUrl
//   }),
//   Beer.create({
//     title: 'Samuel Adams Boston Lager',
//     description:
//       'From the dawn of time, humans have looked to the sky for answers. Space Station Middle Finger replies to all from its eternal orbit. Behold and enjoy Space Station Middle Finger, a bright golden American Pale Ale.',
//     price: 7.5,
//     abv: 5,
//     ibu: 30,
//     type: 'Lager',
//     imgURL: imagesArray[3].imageUrl
//   }),
//   Beer.create({
//     title: 'Tecate',
//     description:
//       'A Lager beer with a delicious aroma of malt and hops and a delicate balance in its subtle refreshing taste.',
//     price: 7.57,
//     abv: 4.6,
//     ibu: 25,
//     type: 'Lager',
//     imgURL: imagesArray[4].imageUrl
//   }),
//   Beer.create({
//     title: 'Miller Lite',
//     description:
//       'A Lager beer with a delicious aroma of malt and hops and a delicate balance in its subtle refreshing taste.',
//     price: 7.57,
//     abv: 4.6,
//     ibu: 12,
//     type: 'Lager',
//     imgURL: imagesArray[5].imageUrl
//   }),
//   Beer.create({
//     title: 'Coors Light',
//     description: 'None provided.',
//     price: 7.57,
//     abv: 4.2,
//     ibu: 12,
//     type: 'Lager',
//     imgURL: imagesArray[6].imageUrl
//   })
// ])

// const breweries = await Promise.all([
//   Brewery.create({
//     name: '3 Floyds',
//     streetAddress: '9750 Indiana Parkway',
//     city: 'Munster',
//     state: 'Indiana',
//     country: 'USA',
//     zipCode: '46321',
//     phoneNumber: '1-219-922-4425',
//     url: 'https://www.3floyds.com'
//   }),
//   Brewery.create({
//     name: 'MillerCoors Brewing Company',
//     streetAddress: '4251 West State Street',
//     city: 'Milwaukee',
//     state: 'Wisconsin',
//     country: 'USA',
//     zipCode: '53208',
//     phoneNumber: '1-414-931-2337',
//     url: 'https://www.millercoors.com/'
//   }),
//   Brewery.create({
//     name: 'Tecate',
//     streetAddress: '360 Hamilton Avenue',
//     city: 'White Plaines',
//     state: 'New York',
//     country: 'USA',
//     zipCode: '10601',
//     phoneNumber: '1-877-522-5001',
//     url: 'https://tecatebeerusa.com'
//   }),
//   Brewery.create({
//     name: 'Samuel Adams Brewery',
//     streetAddress: '30 Germania St',
//     city: 'Boston',
//     state: 'Massachusetts',
//     country: 'USA',
//     zipCode: '02130',
//     phoneNumber: '1-617-368-5080',
//     url: 'https://www.samueladams.com'
//   }),
//   Brewery.create({
//     name: 'Weihenstephaner',
//     streetAddress: '9750 Indiana Parkway',
//     city: 'Freising',
//     state: 'Bavaria',
//     country: 'Germany',
//     zipCode: '85354',
//     phoneNumber: '0 81 61 / 536-0',
//     url: 'https://www.weihenstephaner.com'
//   }),
//   Brewery.create({
//     name: 'Great Lakes Brewing Company',
//     streetAddress: '2516 Market Ave',
//     city: 'Cleveland',
//     state: 'Ohio',
//     country: 'USA',
//     zipCode: '44113',
//     phoneNumber: '1-216-771-4404',
//     url: 'https://www.greatlakesbrewing.com/'
//   })
// ])
// const breweries = await Promise.all([
//   Brewery.create({
//     name: '3 Floyds',
//     streetAddress: '9750 Indiana Parkway',
//     city: 'Munster',
//     state: 'Indiana',
//     country: 'USA',
//     zipCode: '46321',
//     phoneNumber: '1-219-922-4425',
//     url: 'https://www.3floyds.com'
//   }),
//   Brewery.create({
//     name: 'MillerCoors Brewing Company',
//     streetAddress: '4251 West State Street',
//     city: 'Milwaukee',
//     state: 'Wisconsin',
//     country: 'USA',
//     zipCode: '53208',
//     phoneNumber: '1-414-931-2337',
//     url: 'https://www.millercoors.com/'
//   }),
//   Brewery.create({
//     name: 'Tecate',
//     streetAddress: '360 Hamilton Avenue',
//     city: 'White Plaines',
//     state: 'New York',
//     country: 'USA',
//     zipCode: '10601',
//     phoneNumber: '1-877-522-5001',
//     url: 'https://tecatebeerusa.com'
//   }),
//   Brewery.create({
//     name: 'Samuel Adams Brewery',
//     streetAddress: '30 Germania St',
//     city: 'Boston',
//     state: 'Massachusetts',
//     country: 'USA',
//     zipCode: '02130',
//     phoneNumber: '1-617-368-5080',
//     url: 'https://www.samueladams.com'
//   }),
//   Brewery.create({
//     name: 'Weihenstephaner',
//     streetAddress: '9750 Indiana Parkway',
//     city: 'Freising',
//     state: 'Bavaria',
//     country: 'Germany',
//     zipCode: '85354',
//     phoneNumber: '0 81 61 / 536-0',
//     url: 'https://www.weihenstephaner.com'
//   }),
//   Brewery.create({
//     name: 'Great Lakes Brewing Company',
//     streetAddress: '2516 Market Ave',
//     city: 'Cleveland',
//     state: 'Ohio',
//     country: 'USA',
//     zipCode: '44113',
//     phoneNumber: '1-216-771-4404',
//     url: 'https://www.greatlakesbrewing.com/'
//   })
// ])

// const reviews = await Promise.all([
//   Review.create({
//     content: 'Overpriced',
//     rating: 1
//   }),
//   Review.create({
//     content: 'Best beer ever',
//     rating: 5
//   }),
//   Review.create({
//     content: 'How do I pronounce this?.',
//     rating: 1
//   }),
//   Review.create({
//     content: 'I can find this everywhere.',
//     rating: 1
//   }),
//   Review.create({
//     content: "I can't find this anywhere.",
//     rating: 1
//   })
// ])

// const tags = await Promise.all([
//   Category.create({
//     tag: 'hoppy'
//   }),
//   Category.create({
//     tag: 'fruity'
//   }),
//   Category.create({
//     tag: 'bitter'
//   }),
//   Category.create({
//     tag: 'sweet'
//   }),
//   Category.create({
//     tag: 'malty'
//   }),
//   Category.create({
//     tag: 'citrusy'
//   }),
//   Category.create({
//     tag: 'watery'
//   }),
//   Category.create({
//     tag: 'drinkable'
//   })
// ])
