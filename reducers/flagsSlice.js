import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInViaCreate: false
}

const flagsSlice = createSlice({
  name: 'flags',
  initialState: initialState,
  reducers: {
    setCreateFlag() {
      console.log('setCreate action')
      return {
        loggedInViaCreate: true
      }
    },
  }
})

export const { setCreateFlag, test2 } = flagsSlice.actions
export default flagsSlice.reducer

//just some noise here