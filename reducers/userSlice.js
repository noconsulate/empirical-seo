import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { fbAuth } from '../config/firebase'

const initialState = {
  userUid: 'init Uid',
  userEmail: 'init userEmail',
  isUser: false,
}
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
  changeUser(state, action) {
    console.log(action.payload)
    const { userEmail, userUid, isUser } = action.payload
    state.userEmail = userEmail
    state.userUid = userUid
    state.isUser = isUser
  },
  removeUser() {
    fbAuth.signOut()
      .catch(res => console.log('signout error', res))
    return initialState
  }
}

})

export const { changeUser, removeUser } = userSlice.actions
export default userSlice.reducer