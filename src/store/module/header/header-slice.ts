import { createSlice } from "@reduxjs/toolkit"

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    zIndex: 20
  },
  reducers: {
    onChangeZIndex: (state, action) => {
      state.zIndex = action.payload
    }
  }
})
