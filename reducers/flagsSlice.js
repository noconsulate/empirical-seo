import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInViaCreate: false
}

const flagsSlice = createSlice({
  name: 'flags',
  initialState: initialState,
  reducers: {
    setCreate(state, action) {
      console.log('setContinue action')
      state.loggedInViaCreate = true
    }
  }
})

export const { setCreate } = flagsSlice.actions
export default flagsSlice.reducer