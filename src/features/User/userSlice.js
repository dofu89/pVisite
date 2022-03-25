import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  messages: [],
  userId: '',
  navMenu: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages
    },
    setUserId: (state, action) => {
      state.userId = action.payload.userId
    },
    setActive: (state, action) => {
      state.navMenu = action.payload.navMenu
    },
  },
})

export const { setUser, setMessages, setUserId, setActive } = userSlice.actions

export const authUser = (state) => state.user.user
export const messagesBase = (state) => state.user.messages
export const docUserId = (state) => state.user.userId
export const activeNavMenu = (state) => state.user.navMenu

export default userSlice.reducer
