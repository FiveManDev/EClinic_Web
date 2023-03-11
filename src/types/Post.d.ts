export interface Author {
  userID: string
  firstName: string
  lastName: string
  avatar: string
}

export interface IPost {
  id: string
  title: string
  content: string
  image: string[]
  author: Author
  createdAt: string
  updatedAt: string
  likes: number
  isLike: boolean
  isActive: boolean
}
export interface IComment {
  id: string
  content: string
  author: Author
  createdAt: string
  updatedAt: string
  likeUserIds: any[]
  likes: number
  isLike: boolean
  replyCommentDtos: IComment[]
}
export type ICreateCommentForum = {
  postId: string
  content: string
  author: Author
}
