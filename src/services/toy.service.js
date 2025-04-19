import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'

export const toyLabels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]

_createToys()

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getFilterFromSearchParams,
  getImportanceStats,
  getById,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy) {
  return storageService.query(TOY_KEY).then(toys => {
    if (filterBy.name) {
      const regExp = new RegExp(filterBy.name, 'i')
      toys = toys.filter(toy => regExp.test(toy.name))
    }

    if (filterBy.price) {
      toys = toys.filter(toy => toy.price <= filterBy.price)
    }

    return toys
  })
}

function get(toyId) {
  return storageService.get(TOY_KEY, toyId).then(toy => {
    toy = _setNextPrevToyId(toy)
    return toy
  })
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    // TOY - updatable fields
    toy.updatedAt = Date.now()
    return storageService.put(TOY_KEY, toy)
  } else {
    toy.createdAt = toy.updatedAt = Date.now()

    return storageService.post(TOY_KEY, toy)
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    imgUrl: '',
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  }
}

function getDefaultFilter() {
  return { name: '', price: 0, labels: [], inStock: true }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

function getImportanceStats() {
  return storageService.query(TOY_KEY).then(toys => {
    const toyCountByImportanceMap = _getToyCountByImportanceMap(toys)
    const data = Object.keys(toyCountByImportanceMap).map(speedName => ({
      title: speedName,
      value: toyCountByImportanceMap[speedName],
    }))
    return data
  })
}

function getById(toyId) {
  return storageService.get(TOY_KEY, toyId)
}

function _createToys() {
  let toys = utilService.loadFromStorage(TOY_KEY)
  if (!toys || !toys.length) {
    toys = []
    const toyNames = ['Talking Doll', 'Robot', 'Puzzle Box', 'Racing Car', 'Magic Art Set']
    for (let i = 0; i < 20; i++) {
      const name = toyNames[utilService.getRandomIntInclusive(0, toyNames.length - 1)]
      const price = utilService.getRandomIntInclusive(20, 200)
      toys.push(_createToy(name, price))
    }
    utilService.saveToStorage(TOY_KEY, toys)
  }
}

function _createToy(name, price) {
  const toy = {
    _id: utilService.makeId(),
    name,
    price,
    imgUrl: 'https://placehold.co/300x200',
    labels: _getRandomLabels(),
    createdAt: Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24 * 30),
    inStock: Math.random() > 0.2,
  }
  return toy
}

function _getRandomLabels() {
  const shuffled = toyLabels.sort(() => 0.5 - Math.random())
  const count = utilService.getRandomIntInclusive(1, 3)
  return shuffled.slice(0, count)
}

function _setNextPrevToyId(toy) {
  return storageService.query(TOY_KEY).then(toys => {
    const toyIdx = toys.findIndex(currToy => currToy._id === toy._id)
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
    toy.nextToyId = nextToy._id
    toy.prevToyId = prevToy._id
    return toy
  })
}

function _getToyCountByImportanceMap(toys) {
  const toyCountByImportanceMap = toys.reduce(
    (map, toy) => {
      if (toy.importance < 3) map.low++
      else if (toy.importance < 7) map.normal++
      else map.urgent++
      return map
    },
    { low: 0, normal: 0, urgent: 0 }
  )
  return toyCountByImportanceMap
}

// Data Model:
// const toy = {
//     _id: "gZ6Nvy",
//     txt: "Master Redux",
//     importance: 9,
//     isDone: false,
//     createdAt: 1711472269690,
//     updatedAt: 1711472269690
// }
