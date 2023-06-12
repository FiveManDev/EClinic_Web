import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { isProduction } from "shared/helpers/helper"
import authSlice from "./module/auth/auth-slice"
import { chatsSlice } from "./module/chat/chat-slice"
export const store = configureStore({
  reducer: {
    auth: authSlice,
    chats: chatsSlice.reducer
  },
  devTools: isProduction() ? false : true
})

//get rootState and app dispathch from our store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
