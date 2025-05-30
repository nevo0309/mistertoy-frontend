import { toyService } from '../../services/toy.service.remote.js'
import {
  ADD_TOY,
  REMOVE_TOY,
  SET_TOYS,
  UPDATE_TOY,
  SET_FILTER_BY,
  SET_IS_LOADING,
} from './toyReducer.js'
import { store } from '../store.js'

export function loadToys() {
  const { filterBy } = store.getState().toyModule

  store.dispatch({ type: SET_IS_LOADING, isLoading: true })

  return toyService
    .query(filterBy)
    .then(toys => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch(err => {
      console.log('toy action -> Cannot load toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeToy(toyId) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })

  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch(err => {
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function saveToy(toy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })

  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService
    .save(toy)
    .then(savedToy => {
      store.dispatch({ type, toy: savedToy })
      return savedToy
    })
    .catch(err => {
      console.log('toy action -> Cannot save toy', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}
export function setFilterBy(filterBy = toyService.getDefaultFilter()) {
  store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}
