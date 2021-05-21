'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru()
const sinon = require('sinon')

describe('utils/constants', () => {

  let constants

  beforeEach(() => {
    constants = proxyquire('../../utils/constants', {})
  })

  it('Should export GITHUB_SEARCH_URL', () => {
    assert(constants.hasOwnProperty('GITHUB_SEARCH_URL'))
    assert.equal(constants.GITHUB_SEARCH_URL, 'https://api.github.com/search/repositories')
  })

  it('Should export GITHUB_ITEMS_PER_PAGE', () => {
    assert(constants.hasOwnProperty('GITHUB_ITEMS_PER_PAGE'))
    assert.equal(constants.GITHUB_ITEMS_PER_PAGE, 100)
  })

  it('Should export GITHUB_MAXIMUM_PAGE', () => {
    assert(constants.hasOwnProperty('GITHUB_MAXIMUM_PAGE'))
    assert.equal(constants.GITHUB_MAXIMUM_PAGE, 10)
  })


})