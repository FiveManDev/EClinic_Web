import { forumService } from "./../../../services/forum.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DeleteActionType, ICreateCommentForum } from "types/Post"

export interface CreatePostForum {
  title: string
  content: string
  images: File[]
}
export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: (data: CreatePostForum) => forumService.createPost(data)
  })
}
export const useGetAllPostForumQuery = (
  pageNumber: number,
  pageSize: number
) => {
  const queryKey = ["useGetAllPostForumQuery", pageNumber, pageSize]
  return useQuery({
    queryKey,
    queryFn: () => forumService.getAllPost(pageNumber, pageSize)
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
    mutationFn: (body: ICreateCommentForum) =>
      forumService.createReplyComment(body)
  })
}
export const useDeleteCommnetForumMutation = () => {
  return useMutation({
    mutationFn: (querys: Omit<DeleteActionType, "kind" | "ParentCommentID">) =>
      forumService.deleteCommentByID(querys.CommentID)
  })
}
export const useDeleteReplyCommnetForumMutation = () => {
  return useMutation({
    mutationFn: (querys: Omit<DeleteActionType, "kind">) =>
      forumService.deleteReplyCommentByID(querys)
  })
}
