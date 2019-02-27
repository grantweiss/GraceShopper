/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Instance fields', () => {
    let cody
    beforeEach(async () => {
      cody = await User.create({
        firstName: 'Cody',
        lastName: 'Fullstack',
        phoneNumber: '773-773-7373',
        userType: 'auth',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
    })

    describe('firstName field', () => {
      it('has a firstName field where type is string', () => {
        expect(cody.firstName).to.be.a('string')
        expect(cody.firstName).to.equal('Cody')
      })
    })
    describe('lastName field', () => {
      it('has a lastName field where type is string', () => {
        expect(cody.lastName).to.be.a('string')
        expect(cody.lastName).to.equal('Fullstack')
      })
    })
    describe('phoneNumber field', () => {
      it('has a phoneNumber field where type is string', () => {
        expect(cody.phoneNumber).to.be.a('string')
        expect(cody.phoneNumber).to.equal('773-773-7373')
      })
    })
    describe('userType field', () => {
      it('has a userType field where type is string', () => {
        expect(cody.userType).to.be.a('string')
        expect(cody.userType).to.equal('auth')
      })
      it('requires `userType` to be one of an enumerator list', async () => {
        let result, error
        try {
          result = await cody.update({userType: 'Bad User'})
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
  })
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
