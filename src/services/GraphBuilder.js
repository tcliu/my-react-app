const _ = require('lodash')
const uuidv4 = require('uuid/v4')

function isPrimitive(obj) {
  return !obj || typeof obj !== 'object' || isPlainArray(obj)
}

function isArray(obj, itemRule) {
  return obj && Array.isArray(obj) && (!itemRule || obj.every(itemRule))
}

function isObjectArray(obj) {
  return isArray(obj, _.isPlainObject)
}

function isPlainArray(obj) {
  return isArray(obj, isPrimitive)
}

function isPlainObject(obj) {
  return _.isPlainObject(obj)
}

function toAttrObj(obj) {
  if (isPlainObject(obj)) {
    const o = {}
    for (let k in obj) {
      if (isPrimitive(obj[k])) {
        o[k] = obj[k]
      }
    }
    return o
  }
  return null
}

function generateRelationshipName(k) {
  return k ? k.replace(/s$/, '') : null
}

function buildGraph(obj) {
  const graph = {
    nodes: [],
    edges: []
  }
  const objSet = new Set()
  const s = [{obj: obj}]
  while (s.length > 0) {
    const {obj, parent, key} = s.shift()
    if (!obj.id) {
      obj.id = uuidv4()
    }
    const attrs = toAttrObj(obj) || parent
    const po = isPlainObject(obj)
    if (po) {
      if (!objSet.has(obj)) {
        graph.nodes.push(attrs)
      }
      if (parent && isPlainObject(parent)) {
        graph.edges.push({from: attrs, to: parent, rel: generateRelationshipName(key) || 'parent'})
      }
    }
    if (!objSet.has(obj)) {
      for (let k in obj) {
        if (isPlainObject(obj[k]) || isObjectArray(obj[k])) {
          s.push({obj: obj[k], parent: attrs, key: po ? k : key})
        }
      }
    }
    objSet.add(obj)
  }
  return graph
}

export { buildGraph }