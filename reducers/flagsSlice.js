import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInViaCreate: false,
  pageControl: 0,
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
    setPageControl(state, action) {
      console.log('setPageControl action', action.payload)
      state.pageControl = action.payload
    },
  }
})

export const { setCreateFlag, setPageControl } = flagsSlice.actions
export default flagsSlice.reducer
