import { combineReducers } from 'redux'
import auth from './Auth/AuthRedux'

const rootReducer = combineReducers({
  auth
})

export default rootReducer
