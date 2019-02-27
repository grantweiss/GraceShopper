/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Beer = db.model('beer')

describe('Beer model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceFields', () => {
    let samAdams
    let miller
    beforeEach(async () => {
      samAdams = await Beer.create({
        title: 'Boston Lager',
        description: 'Tasty beer that you can drink all day',
        price: 1.35,
        inventory: 5,
        abv: 4.5,
        ibu: 50,
        type: 'Bock',
        imgURL: 'https://robohash.org/Beer1'
      })
      miller = await Beer.create({
        title: 'Miller Lite',
        description: 'A weak beer that tastes flat!!',
        price: 2.0,
        abv: 3.2,
        ibu: 10,
        type: 'Lager'
      })
    })
    describe('title field', () => {
      it('has a title field where type is STRING', () => {
        expect(samAdams.title).to.be.a('string')
        expect(samAdams.title).to.equal('Boston Lager')
      })
      it('requires `title`', async () => {
        samAdams.title = null
        let result, error
        try {
          result = await samAdams.validate()
        } catch (err) {
          error = err
        }
        if (result) throw Error('validation should fail when content is null')
        expect(error).to.be.an.instanceOf(Error)
      })
      it('requires `title` to not be an empty string', async () => {
        samAdams.title = ''
        let result, error
        try {
          result = await samAdams.validate()
        } catch (err) {
          error = err
        }
        if (result) throw Error('validation should fail when content is empty')
        expect(error).to.be.an.instanceOf(Error)
      })
    })
    describe('description field', () => {
      it('has a description field where type is string', () => {
        expect(samAdams.description).to.be.a('string')
        expect(samAdams.description).to.equal(
          'Tasty beer that you can drink all day'
        )
      })
    })
    describe('price field', () => {
      it('has a price field where type is number', () => {
        expect(samAdams.price).to.be.a('number')
        expect(samAdams.price).to.equal(1.35)
      })
    })
    describe('inventory field', () => {
      it('has a inventory field where type is number and default is 0', () => {
        expect(samAdams.inventory).to.be.a('number')
        expect(samAdams.inventory).to.equal(5)
        expect(miller.inventory).to.equal(0)
      })
    })
    describe('abv field', () => {
      it('has a abv field where type is number', () => {
        expect(samAdams.abv).to.be.a('number')
        expect(samAdams.abv).to.equal(4.5)
      })
    })
    describe('ibu field', () => {
      it('has a ibu field where type is number', () => {
        expect(samAdams.ibu).to.be.a('number')
        expect(samAdams.ibu).to.equal(50)
      })
    })
    describe('type field', () => {
      it('has a type field where type is number', () => {
        expect(samAdams.type).to.be.a('string')
        expect(samAdams.type).to.equal('Bock')
      })

      it('requires `type` to be one of an enumerator list', async () => {
        let result, error
        try {
          result = await samAdams.update({type: 'Bad Beer'})
        } catch (err) {
          error = err
        }
        if (result)
          throw Error(
            'validation should fail when type is not in the enumerator list'
          )
        expect(error).to.be.an.instanceOf(Error)
      })
    })
    describe('imgURL field', () => {
      it('has a imgURL field where type is string and default is https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png', () => {
        expect(samAdams.imgURL).to.be.a('string')
        expect(samAdams.imgURL).to.equal('https://robohash.org/Beer1')
        expect(miller.imgURL).to.equal(
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'
        )
      })
    })
  })
}) // end describe('Beer model')
