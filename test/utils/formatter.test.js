'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru()
const sinon = require('sinon')

describe('utils/formatter.js', () => {

  let formatter, input, expected_output

  beforeEach(() => {
    formatter = proxyquire('../../utils/formatter', {})
  })

  describe('format_object', () => {

    it('Should export format_object', () => {
      formatter.hasOwnProperty('format_object')
    })

    it('Should format object', () => {
      input = {
        '0': [
          {
            "id": 10,
            "title": "House",
            "level": 0,
            "children": [],
            "parent_id": null
          },
          {
            "id": 19,
            "title": "House",
            "level": 1,
            "children": [],
            "parent_id": null
          },
        ],
        '1': [
          {
            "id": 12,
            "title": "Red Roof",
            "level": 1,
            "children": [],
            "parent_id": 10
          },
          {
            "id": 16,
            "title": "Red Roof",
            "level": 1,
            "children": [],
            "parent_id": null
          },
          {
            "id": 18,
            "title": "Blue Roof",
            "level": 1,
            "children": [],
            "parent_id": 10
          },
        ]
      }


      expected_output = [
        {
          "id": 10,
          "title": "House",
          "level": 0,
          "children": [
            {
              "id": 12,
              "title": "Red Roof",
              "level": 1,
              "children": [],
              "parent_id": 10
            },
            {
              "id": 18,
              "title": "Blue Roof",
              "level": 1,
              "children": [],
              "parent_id": 10
            },
          ],
          "parent_id": null
        }
      ]

      let output = formatter.format_object(['2', '1', '0'], {}, input)
      assert.deepEqual(output, expected_output)
    })

  })

})