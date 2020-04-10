import { createSlice } from '@reduxjs/toolkit'

import { fbAuth } from '../config/firebase'

const userInit = fbAuth.currentUser

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: 'A USER IN THE userSlice WOW'
  },
  reducers: {
    changeUser(state, action) {
      const { userName } = action.payload
      state.userName =  userName
    }
  }

})

export const { changeUser } = userSlice.actions
export default userSlice.reducer