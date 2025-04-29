import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

// export const toyLabels = [
//   'On wheels',
//   'Box game',
//   'Art',
//   'Baby',
//   'Doll',
//   'Puzzle',
//   'Outdoor',
//   'Battery Powered',
// ]
export const toyService = {
  query,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getFilterFromSearchParams,
  getById,
  getLabels,
}

function query(filterBy = {}) {
  console.log('Sending filter to backend:', filterBy)
  const params = { ...filterBy }

  if (params.labels && params.labels.length > 0) {
    params.labels = params.labels.join(',')
  }

  return httpService.get(BASE_URL, params)
}
function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  const method = toy._id ? 'put' : 'post'
  return httpService[method](BASE_URL, toy)
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
  return { name: '', price: 0, labels: [], inStock: '' }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}
function getLabels() {
  return httpService.get(BASE_URL + 'labels')
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
