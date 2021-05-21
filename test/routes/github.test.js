'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru()
const sinon = require('sinon')

describe('routes/github.js', () => {

  let github, axios, constants, request, h, query

  beforeEach(() => {
    axios = {
      get: sinon.stub(),
    }
    constants = {
      GITHUB_SEARCH_URL: 'https://github.com/search',
      GITHUB_ITEMS_PER_PAGE: 100,
    }
    request = {}
    h = {
      view: sinon.stub(),
    }
    query = { page: 2 }
    github = proxyquire('../../routes/github', {
      'axios': axios,
      '../utils/constants': constants,
    })
  })

  it('Should export routes configuration array', () => {
    assert(Array.isArray(github))
  })

  describe('/github', () => {

    it('Should use GET on path /github', () => {
      let config = github[0]
      assert.equal(config.method, 'GET')
      assert.equal(config.path, '/github')
    })

    it('Handler should call get to specific url', () => {
      axios.get.resolves({ data: { items: [] } })
      github[0].handler({ query, }, h)
      assert(axios.get.calledOnce)
      assert(axios.get.calledWith(`${constants.GITHUB_SEARCH_URL}?q=nodejs&page=${2}&per_page=${constants.GITHUB_ITEMS_PER_PAGE}`))
    })

    it('Handler should use default page value when value does not exists', () => {
      axios.get.resolves({ data: { items: [] } })
      github[0].handler({ query: {} }, h)
      assert(axios.get.calledWith(`${constants.GITHUB_SEARCH_URL}?q=nodejs&page=${1}&per_page=${constants.GITHUB_ITEMS_PER_PAGE}`))
    })

    it('Handler should return html to client', async () => {
      axios.get.resolves({ data: { items: ['item'] } })
      await github[0].handler({ query }, h)
      assert(h.view.calledOnce)
      assert(h.view.calledWith('index', { page: query.page, items: ['item'] }))
    })

    it('Handler should return error html to client when APIs response error', async () => {
      const error_response = { status: 400, data: { message: 'Bad Request' } }
      axios.get.rejects({ response: error_response })
      await github[0].handler({ query }, h)
      assert(h.view.calledOnce)
      assert(h.view.calledWith('error', { code: error_response.status, message: error_response.data.message }))
    })

    it('Handler should return error html to client when module error', async () => {
      axios.get.rejects(new Error('Error'))
      await github[0].handler({ query }, h)
      assert(h.view.calledOnce)
      assert(h.view.calledWith('error', { code: 500, message: 'Internal Server Error' }))
    })

  })

})