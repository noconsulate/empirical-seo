import { createSlice } from '@reduxjs/toolkit'
import { test } from './userSlice'

const initialState = {
  loggedInViaCreate: false
}

const flagsSlice = createSlice({
  name: 'flags',
  initialState: initialState,
  reducers: {
    setCreate() {
      console.log('setCreate action')
      return {
        loggedInViaCreate: true
      }
    },
    test2() {
      console.log('test2')
    }
  }
})

export const { setCreate, test2 } = flagsSlice.actions
export default flagsSlice.reducer