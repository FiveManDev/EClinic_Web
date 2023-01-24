import { IAuthState } from "./../../../types/Auth.type"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IAuthState = {
  isAuthenticated: false,
  isFetched: false,
  me: {}
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {}
})
