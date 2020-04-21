import Router from 'next/router'

import { createSlice } from '@reduxjs/toolkit'
import { fbAuth } from '../config/firebase'

const initialState = {
  userUid: 'init Uid',
  userEmail: 'init userEmail',
  isUser: false,
  isAnon: false,
}
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changeUser(state, action) {
      console.log('changeUser action', action.payload)
      const { userEmail, userUid, isUser, isAnon } = action.payload
      state.userEmail = userEmail
      state.userUid = userUid
      state.isUser = isUser
      state.isAnon = isAnon
    },
    removeUser() {
      fbAuth.signOut()
        .catch(res => console.log('signout error', res))
      Router.push('/')
      return initialState
    },
  }

})

export const { changeUser, removeUser } = userSlice.actions
export default userSlice.reducer

