import { createSlice } from "@reduxjs/toolkit"
import { IAuthState } from "../../../types/Auth.type"

const initialState: IAuthState = {
  isLoggedIn: false,
  user: {}
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    deleteAuthenticate: (state) => {
      state.isLoggedIn = false
      state.user = {}
    },
    authenticate: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
    }
  }
})

export const { deleteAuthenticate, authenticate } = authSlice.actions
export default authSlice.reducer
