import { combineReducers } from 'redux'
import userReducer from './userSlice'
import flagsReducer from './flagsSlice'

export default combineReducers({
  flags: flagsReducer,
  user: userReducer,
})

