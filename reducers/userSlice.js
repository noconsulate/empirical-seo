import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { fbAuth } from '../config/firebase'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userUid: 'init Uid',
      userEmail: 'init userEmail',
      isUser: false,
  },
  reducers: {
    changeUser(state, action) {
      console.log(action.payload)
      const { userEmail } = action.payload
      state.userEmail= userEmail
    }
  }

})

export const { changeUser } = userSlice.actions
export default userSlice.reducer