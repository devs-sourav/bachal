import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './slices/user/UserSLice'

export default configureStore({
  reducer: {
    loggedUser: userReducer,
  },
})