import { useMutation, useQuery } from "@tanstack/react-query"
import { blogService } from "services/blog.service"
import { QUERY_KEYS } from "shared/constant/constant"
import { IBlog } from "types/Blog"

export interface CreatePostForum {
  title: string
  content: string
  images: File[]
}
export type CreatePostBlog = Omit<
  IBlog,
  "id" | "createdAt" | "updatedAt" | "author" | "hashtags"
> & {
  hashtagId: string[]
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
export const useGetAllBlog = (pageNumber: number, pageSize: number) => {
  const queryKey = [QUERY_KEYS.BLOG.POST, pageNumber, pageSize]
  return useQuery({
    queryKey,
    queryFn: () => blogService.getAllBlog(pageNumber, pageSize)
  })
}
export const useGetBlogPostbyIdQuery = (id: string) => {
  const queryKey = [QUERY_KEYS.FORUM.POST, id]
  return useQuery({
    queryKey,
    queryFn: () => blogService.getPostById(id)
  })
}
export const useCreateBlogPostMutation = () =>
  useMutation({
    mutationFn: (body: CreatePostBlog) => blogService.createPost(body)
  })
export const useGetAllHashTag = () => {
  const queryKey = [QUERY_KEYS.BLOG.HASHTASH]
  return useQuery({
    queryKey,
    queryFn: () => blogService.getAllHashTag()
  })
}
