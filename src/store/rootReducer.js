import { combineReducers } from 'redux'
import { toyReducer } from './toy/toyReducer.js'

const rootReducer = combineReducers({
  toyModule: toyReducer,
})

export default rootReducer
