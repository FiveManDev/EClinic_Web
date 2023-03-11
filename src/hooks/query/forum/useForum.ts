import { forumService } from "./../../../services/forum.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ICreateCommentForum } from "types/Post"

export interface CreatePostForum {
  title: string
  content: string
  images: File[]
  userId: string
}
export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: (data: CreatePostForum) => forumService.createPost(data)
  })
}
export const useGetAllPostForumQuery = () => {
  const queryKey = ["useGetAllPostForumQuery"]
  return useQuery({
    queryKey,
    queryFn: () => forumService.getAllPost()
  })
}
export const useGetPostbyIdQuery = (id: string) => {
  const queryKey = ["useGetPostbyIdQuery", id]
  return useQuery({
    queryKey,
    queryFn: () => forumService.getPostById(id)
  })
}
export const useGetAllCommentForumQuery = (postId: string) => {
  const queryKey = ["useGetAllCommentForumQuery", postId]
  return useQuery({
    queryKey,
    queryFn: () => forumService.GetAllComment(postId)
  })
}
export const useCreateCommentForumMutation = () => {
  return useMutation({
    mutationFn: (body: ICreateCommentForum) => forumService.createComment(body)
  })
}
export const useCreateReplyCommentForumMutation = () => {
  return useMutation({
    mutationFn: (body: ICreateCommentForum) => forumService.createReplyComment(body)
  })
}
