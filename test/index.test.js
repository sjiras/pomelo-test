'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru()
const sinon = require('sinon')

describe('index.js', () => {

  let index, hapi, hapi_server, hapi_vision, handlebars, node_process, routes, helpers

  beforeEach(() => {
    hapi_server = {
      register: sinon.stub().resolves({}),
      route: sinon.stub().returns(),
      views: sinon.stub().returns(),
      start: sinon.stub().resolves({}),
    }
    hapi = {
      server: sinon.stub().returns(hapi_server)
    }
    hapi_vision = sinon.stub()
    handlebars = {
      registerHelper: sinon.stub().returns(),
    }
    node_process = {
      cwd: () => process.cwd(),
      on: sinon.stub(),
      exit: sinon.stub(),
    }
    routes = sinon.stub(),
      helpers = {
        table: sinon.stub(),
      }
    index = proxyquire('../index', {
      '@hapi/hapi': hapi,
      '@hapi/vision': hapi_vision,
      'handlebars': handlebars,
      'process': node_process,
      './routes': routes,
      './utils/helpers': helpers,
    })
  })

  it('Should create Hapi server instance', () => {
    assert(hapi.server.calledOnce)
    assert(hapi.server.calledWith({
      port: 3000,
      host: 'localhost',
    }))
  })

  it('Should register Handlebars helper', () => {
    assert(handlebars.registerHelper.calledOnce)
    assert(handlebars.registerHelper.calledWith('table', helpers.table))
  })

  it('Should register Hapi vision', () => {
    assert(hapi_server.register.calledOnce)
    assert(hapi_server.register.calledWith(hapi_vision))
  })

  it('Should register server routes', done => {
    setTimeout(() => {
      assert(hapi_server.route.calledOnce)
      assert(hapi_server.route.calledWith(routes))
      done()
    }, 200)

  })

  it('Should config views', done => {
    setTimeout(() => {
      assert(hapi_server.views.calledOnce)
      assert(hapi_server.views.calledWith({
        engines: {
          html: handlebars,
        },
        compileMode: 'sync',
        relativeTo: process.cwd(),
        path: './templates',
      }))
      done()
    }, 200)
  })

  it('Should start server', done => {
    setTimeout(() => {
      assert(hapi_server.start.calledOnce)
      done()
    }, 200)
  })

  it('Should subscribe on unhandledRejection event', () => {
    assert(node_process.on.calledOnce)
    assert(node_process.on.calledWith('unhandledRejection'))

  })

  it('Should exit process', () => {
    const error = { message: 'error' }
    node_process.on.getCall(0).args[1](error)
    assert(node_process.exit.calledOnce)
    assert(node_process.exit.calledWith(1))
  })

})