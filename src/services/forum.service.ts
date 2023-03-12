import { DeleteActionType, ICreateCommentForum } from "./../types/Post.d"
import { AxiosResponse } from "axios"
import { CreatePostForum } from "hooks/query/forum/useForum"
import axiosClient from "shared/axios/httpClient"
import axiosServer from "shared/axios/httpSever"
import { URL_API } from "shared/constant/constant"
import { IComment, IPost } from "types/Post"
import { IServerResponse } from "types/server/IServerResponse"
class ForumService {
  async createPost(data: CreatePostForum) {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", data.content)
    formData.append("Author.UserID", data.userId)
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
  async getAllPost() {
    const res: AxiosResponse = await axiosServer.get(
      `${URL_API.FORUM_POST}/GetAllPost`
    )
    return res.data as IServerResponse<IPost[]>
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
}
export const forumService = new ForumService()
