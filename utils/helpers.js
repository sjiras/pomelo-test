'use strict'

/**
 * 
 * @param {array} list
 * @param {object} options 
 */

const table = (list, options) => {
  let html_items = []
  for (const index in list) {
    if ((parseInt(index) % 10) === 0) html_items.push(`<tr>`)
    html_items.push(`<td>${options.fn(list[index])}</td>`)
    if (((parseInt(index) + 1) % 10) === 0) html_items.push(`</tr>`)
  }

  return `<table>${html_items.join('')}</table>`
}

module.exports = {
  table
}