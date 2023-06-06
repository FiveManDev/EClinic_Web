import { createSlice } from "@reduxjs/toolkit"

export const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    roomId: ""
  },
  reducers: {
    onShowChatRoom: (state, action) => {
      state.roomId = action.payload
    }
  }
})
