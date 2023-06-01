import { HashTag } from "./Base.type"
import { Author } from "./Post"

export interface IBlog {
  id: string
  title: string
  content: string
  coverImage?: any
  author: Author
  isActive: boolean
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  hashtags: HashTag[]
  createdAt: string
  updatedAt: string
}
