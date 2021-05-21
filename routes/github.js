'use strict'
const axios = require('axios')
const { GITHUB_SEARCH_URL, GITHUB_ITEMS_PER_PAGE, GITHUB_MAXIMUM_PAGE } = require('../utils/constants')

module.exports = [
  {
    method: 'GET',
    path: '/github',
    handler: async (request, h) => {
      const { page = 1 } = request.query
      const pages = [...Array(GITHUB_MAXIMUM_PAGE).keys()].map(i => i + 1)
      try {
        const response = await axios.get(`${GITHUB_SEARCH_URL}?q=nodejs&page=${page}&per_page=${GITHUB_ITEMS_PER_PAGE}`)
        return h.view('index', { pages, page, items: response.data.items })
      } catch (error) {
        const code = error.response ? error.response.status : 500
        const message = error.response ? error.response.data.message : 'Internal Server Error'
        return h.view('error', { code, message })
      }
    },
  },
]