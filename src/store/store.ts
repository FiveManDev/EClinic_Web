import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { useDispatch } from "react-redux"
export const store = configureStore({
  reducer: {}
})

//get rootState and app dispathch from our store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
const makeStore = () => store

export const wrapper = createWrapper(makeStore)
