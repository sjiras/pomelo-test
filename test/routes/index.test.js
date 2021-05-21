'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru()
const sinon = require('sinon')

describe('routes/index.js', () => {

  let index

  beforeEach(() => {
    index = proxyquire('../../routes/index', {
      './format': ['format'],
      './github': ['github'],
    })
  })

  it('Should merge arrays into one array', () => {
    assert.deepEqual(index, ['format', 'github'])
  })

})