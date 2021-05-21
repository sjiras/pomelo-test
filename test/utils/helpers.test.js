'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru()
const sinon = require('sinon')

describe('utils/helpers.js', () => {

  let helpers, options, input, expected_output

  beforeEach(() => {
    //Mock function
    options = { fn: (obj) => obj.name }
    helpers = proxyquire('../../utils/helpers', {})
  })

  describe('table', () => {

    it('Should export table', () => {
      helpers.hasOwnProperty('table')
    })

    it('Should return html table', () => {
      input = [
        { name: 'cell1' },
        { name: 'cell2' },
        { name: 'cell3' },
        { name: 'cell4' },
        { name: 'cell5' },
        { name: 'cell6' },
        { name: 'cell7' },
        { name: 'cell8' },
        { name: 'cell9' },
        { name: 'cell10' }
      ]
      expected_output = '<table><tr><td>cell1</td><td>cell2</td><td>cell3</td><td>cell4</td><td>cell5</td><td>cell6</td><td>cell7</td><td>cell8</td><td>cell9</td><td>cell10</td></tr></table>'
      let output = helpers.table(input, options)
      assert.equal(expected_output, output)
    })

  })

})