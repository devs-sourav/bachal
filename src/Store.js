import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './slices/user/UserSLice'
import activechatReducer from './slices/activeChat/ActiveChatSlice'

export default configureStore({
  reducer: {
    loggedUser: userReducer,
    activeChat: activechatReducer,
  },
})