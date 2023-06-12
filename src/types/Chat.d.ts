export interface IRoom {
  roomID: string
  isClosed: boolean
  createdAt: string
  roomType: RoomType
  roomAuthor: RoomAuthor
  chatMessage: ChatMessage
}

export interface RoomType {
  roomTypeID: string
  roomTypeName: string
}

export interface RoomAuthor {
  userID: string
  firstName: string
  lastName: string
  avatar: string
}

export interface ChatMessage {
  chatMessageID: string
  userID: string
  content: string
  isImage: boolean
  type: number
  isMyChat: boolean
  createdAt: string
}
