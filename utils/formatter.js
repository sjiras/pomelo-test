'use strict'

/**
 * 
 * @param {array} levels Must be descending order.
 * @param {object} childs 
 * @param {object} original_object 
 * @param {pbject} output_object 
 */

const format_object = (levels, childs, original_object) => {
  const level = levels.shift()
  const items = original_object[`${level}`] ? original_object[`${level}`] : []
  let new_childs = {}
  let output_object = []
  for (const item of items) {
    if (`${item.level}` === `${level}`) {
      const { parent_id, id } = item
      // Clone object
      let formatted_object = JSON.parse(JSON.stringify(item))

      if (childs.hasOwnProperty(id)) {
        formatted_object.children = childs[id]
      }

      if (levels.length > 0) {
        if (parent_id) {
          new_childs.hasOwnProperty(parent_id) ?
            new_childs[parent_id].push(formatted_object) : new_childs[parent_id] = [formatted_object]
        }
      } else output_object.push(formatted_object)
    }
  }

  if (levels.length > 0) return format_object(levels, new_childs, original_object)
  else return output_object
}

module.exports = {
  format_object,
}