'use strict'
const hapi = require('@hapi/hapi')
const handlebars = require('handlebars')
const process = require('process')
const routes = require('./routes')
const helpers = require('./utils/helpers')

const init = async () => {

  const server = hapi.server({
    port: 3000,
    host: 'localhost',
  })

  handlebars.registerHelper('table', helpers.table)
  await server.register(require('@hapi/vision'))

  server.route(routes)
  server.views({
    engines: {
      html: handlebars,
    },
    compileMode: 'sync',
    relativeTo: process.cwd(),
    path: './templates',
  })

  await server.start()
}

process.on('unhandledRejection', err => {
  process.exit(1)
})

init()