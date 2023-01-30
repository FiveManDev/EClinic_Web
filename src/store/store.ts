import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { isProduction } from "shared/helpers/helper"
import authSlice from "./module/auth/auth-slice"
export const store = configureStore({
  reducer: {
    auth: authSlice
  },
  devTools: isProduction() ? false : true
})

//get rootState and app dispathch from our store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
