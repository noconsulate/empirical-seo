import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { fbAuth } from '../config/firebase'

const initialState = {
  userUid: 'init Uid',
  userEmail: 'init userEmail',
  isUser: false,
  isAnon: null,
}
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
  changeUser(state, action) {
    console.log(action.payload)
    const { userEmail, userUid, isUser, isAnon } = action.payload
    state.userEmail = userEmail
    state.userUid = userUid
    state.isUser = isUser
    state.isAnon = isAnon
  },
  removeUser() {
    fbAuth.signOut()
      .then(res => fbAuth.signInAnonymously())
      .catch(res => console.log('signout error', res))
    return initialState
  }
}

})

export const { changeUser, removeUser } = userSlice.actions
export default userSlice.reducer