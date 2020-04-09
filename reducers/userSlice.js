import { createSlice } from '@reduxjs/toolkit'

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