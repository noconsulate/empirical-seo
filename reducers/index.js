import { combineReducers } from 'redux'
import userReducer from './userSlice'
import flagsReducer from './flagsSlice'

export default combineReducers({
  user: userReducer,
  flags: flagsReducer
})

