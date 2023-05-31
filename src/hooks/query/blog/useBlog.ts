import { useQuery } from "@tanstack/react-query"
import { blogService } from "services/blog.service"
import { QUERY_KEYS } from "shared/constant/constant"

export interface CreatePostForum {
  title: string
  content: string
  images: File[]
}
export interface CreateAnwserPost {
  postId: string
  content: string
  tags: string[]
}
export const useSearchPostsBlog = (
  keyword: string,
  pageNumber: number,
  pageSize: number,
  tags: string[]
) => {
  const queryKey = [
    QUERY_KEYS.BLOG.POST,
    keyword ? keyword : " ",
    tags,
    pageNumber,
    pageSize
  ]
  return useQuery({
    queryKey,
    queryFn: () => blogService.searchPosts(keyword, pageNumber, pageSize, tags)
  })
}
export const useGetBlogPostbyIdQuery = (id: string) => {
  const queryKey = [QUERY_KEYS.FORUM.POST, id]
  return useQuery({
    queryKey,
    queryFn: () => blogService.getPostById(id)
  })
}
