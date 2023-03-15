import { AxiosResponse } from "axios"
import { CreateAnwserPost, CreatePostForum } from "hooks/query/forum/useForum"
import axiosClient from "shared/axios/httpClient"
import axiosServer from "shared/axios/httpSever"
import { URL_API } from "shared/constant/constant"
import { IComment, IHashtag, IPost } from "types/Post"
import { IServerResponse } from "types/server/IServerResponse"
import {
  CommnentId,
  DeleteActionType,
  IAnwer,
  ICreateCommentForum,
  UpdateActionType
} from "./../types/Post.d"
class ForumService {
  async searchPosts(keyword: string, pageNumber: number, pageSize: number) {
    const res: AxiosResponse = await axiosServer.get(
      `${URL_API.FORUM_POST}/GetPosts?PageNumber=${pageNumber}&PageSize=${pageSize}&searchText=${keyword}`
    )
    return res as AxiosResponse<IServerResponse<IPost[]>>
  }
  async createPost(data: CreatePostForum) {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", data.content)
    data.images.forEach((item) => {
      formData.append("images", item)
    })
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.FORUM_POST}/CreatePost`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    )
    return res.data as IServerResponse<string>
  }
  async createAnswer(data: CreateAnwserPost) {
    const formData = new FormData()
    formData.append("postID", data.postId)
    formData.append("content", data.content)
    data.tags.forEach((item) => {
      formData.append("tags", item)
    })
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.FORUM_POST_ANWERS}/CreateAnswer`,
      formData
    )
    return res.data as IServerResponse<string>
  }
  async getAllPost(pageNumber: number, pageSize: number) {
    const res: AxiosResponse = await axiosServer.get(
      `${URL_API.FORUM_POST}/GetAllPost`,
      {
        headers: {
          PageNumber: pageNumber,
          PageSize: pageSize
        }
      }
    )
    return res as AxiosResponse<IServerResponse<IPost[]>>
  }
  async getPostNoAnser(pageNumber: number, pageSize: number) {
    const res: AxiosResponse = await axiosServer.get(
      `${URL_API.FORUM_POST}/GetPostNoAnswer`,
      {
        headers: {
          PageNumber: pageNumber,
          PageSize: pageSize
        }
      }
    )
    return res as AxiosResponse<IServerResponse<IPost[]>>
  }
  async getPostById(id: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.FORUM_POST}/GetPostById?PostID=${id}`
    )
    return res.data as IServerResponse<IPost>
  }
  async GetAllComment(postId: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.FORUM_POST_COMMENT}/GetAllComment?PostID=${postId}`
    )
    return res.data as IServerResponse<IComment[]>
  }
  async createComment(body: ICreateCommentForum) {
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.FORUM_POST_COMMENT}/CreateComment`,
      { ...body }
    )
    return res.data as IServerResponse<null>
  }
  async createReplyComment(body: ICreateCommentForum) {
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.FORUM_POST_COMMENT}/CreateReplyComment`,
      {
        parentCommentID: body.postId,
        ...body
      }
    )
    return res.data as IServerResponse<null>
  }
  async deleteCommentByID(commentID: string) {
    const res: AxiosResponse = await axiosClient.delete(
      `${URL_API.FORUM_POST_COMMENT}/DeleteCommentByID?CommentID=${commentID}`
    )
    return res.data as IServerResponse<null>
  }
  async deleteReplyCommentByID(value: Omit<DeleteActionType, "kind">) {
    const res: AxiosResponse = await axiosClient.delete(
      `${URL_API.FORUM_POST_COMMENT}/DeleteReplyCommentByID?CommentID=${value.CommentID}&ParentCommentID=${value.ParentCommentID}`
    )
    return res.data as IServerResponse<null>
  }
  async updateComment(
    value: Omit<UpdateActionType, "kind" | "ParentCommentID">
  ) {
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.FORUM_POST_COMMENT}/UpdateComment`,
      {
        ...value
      }
    )
    return res.data as IServerResponse<null>
  }
  async updateCommentReply(value: Omit<UpdateActionType, "kind">) {
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.FORUM_POST_COMMENT}/UpdateReplyComment`,
      {
        ...value
      }
    )
    return res.data as IServerResponse<null>
  }
  async likeComment(value: Omit<CommnentId, "ParentCommentID">) {
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.FORUM_POST_COMMENT}/LikeComment?CommentID=${value.CommentID}`
    )
    return res.data as IServerResponse<null>
  }
  async likeReplyComment(value: CommnentId) {
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.FORUM_POST_COMMENT}/LikeReplyComment?CommentID=${value.CommentID}&ParentCommentID=${value.ParentCommentID}`
    )
    return res.data as IServerResponse<null>
  }
  async likePost(postId: string) {
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.FORUM_POST}/LikePost?PostID=${postId}`
    )
    return res.data as IServerResponse<null>
  }
  async getAnwerByPostId(postId: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.FORUM_POST_ANWERS}/GetAnswerByID?PostID=${postId}`
    )
    return res.data as IServerResponse<IAnwer>
  }
  async getAllHashtag() {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.FORUM_POST_HASHTAG}/GetAllHashtag`
    )
    return res.data as IServerResponse<IHashtag[]>
  }
}
export const forumService = new ForumService()
