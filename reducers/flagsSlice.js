import { createSlice } from '@reduxjs/toolkit'

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
  }
})

export const { setCreate, test2 } = flagsSlice.actions
export default flagsSlice.reducer

//just some noise here