const db = require('../db')
const User = require('./user')
const Brewery = require('./brewery')
const Order = require('./order')
const Image = require('./image')
const Category = require('./category')
const Beer = require('./beer')
const Review = require('./review')
const OrderItem = require('./orderItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Beer.belongsTo(Brewery)
Brewery.hasMany(Beer)

User.hasMany(Order)
Order.belongsTo(User)

OrderItem.belongsTo(User)
User.hasMany(OrderItem)

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

OrderItem.belongsTo(Beer)
Beer.hasMany(OrderItem)

Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Beer)
Beer.hasMany(Review)

Category.belongsToMany(Beer, {through: 'categoryBeer'})
Beer.belongsToMany(Category, {through: 'categoryBeer'})

Beer.hasMany(Image)
Image.belongsTo(Beer)

module.exports = {
  db,
  User,
  Brewery,
  Order,
  Image,
  Category,
  Beer,
  Review,
  OrderItem
}
