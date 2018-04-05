import { combineReducers } from 'redux'
import auth from './Auth/AuthRedux'
import todos from './Todo/TodoRedux'

const rootReducer = combineReducers({
  auth,
  todos
})

export default rootReducer
