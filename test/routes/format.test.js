'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru()
const sinon = require('sinon')

describe('routes/format.js', () => {

  let format, formatter, request, h, payload

  beforeEach(() => {
    formatter = {
      format_object: sinon.stub(),
    }
    request = {}
    h = {
      response: sinon.stub(),
      code: sinon.stub(),
    }
    h.response.returns(h)
    h.code.returns(h)
    payload = { '1': 'data', '2': 'data' }
    format = proxyquire('../../routes/format', {
      '../utils/formatter': formatter,
    })
  })

  it('Should export routes configuration array', () => {
    assert(Array.isArray(format))
  })

  describe('/format', () => {

    it('Should use POST on path /format', () => {
      let config = format[0]
      assert.equal(config.method, 'POST')
      assert.equal(config.path, '/format')
    })

    it('Handler should call format_object', () => {
      format[0].handler({ payload }, h)
      assert(formatter.format_object.calledOnce)
      assert(formatter.format_object.calledWith(['2', '1'], {}, payload))
    })

    it('Handler should return formatted document to client', () => {
      const output = sinon.stub()
      formatter.format_object.returns(output)
      format[0].handler({ payload }, h)
      assert(h.response.calledOnce)
      assert(h.response.calledWith(output))
      assert(h.code.calledOnce)
      assert(h.code.calledWith(200))
    })

    it('Handler should return 400 when payload does not exists', () => {
      format[0].handler({}, h)
      assert(h.response.calledOnce)
      assert(h.response.calledWith({ message: 'Payload missing', code: 400 }))
      assert(h.code.calledOnce)
      assert(h.code.calledWith(400))
    })

  })

})