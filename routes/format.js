'use strict'

const { format_object } = require('../utils/formatter')

module.exports = [
  {
    method: 'POST',
    path: '/format',
    handler: (request, h) => {
      const { payload } = request
      if (payload) {
        const levels = Object.keys(payload).sort().reverse()

        const formatted_object = format_object(levels, {}, payload)
        return h.response(formatted_object).code(200)
      } else return h.response({ message: 'Payload missing', code: 400 }).code(400)
    },
  },
]