import { AxiosResponse } from "axios"
import { CreatePostForum } from "hooks/query/forum/useForum"
import axiosClient from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { IBlog } from "types/Blog"
import { IServerResponse } from "types/server/IServerResponse"
class BlogService {
  async searchPosts(
    keyword: string,
    pageNumber: number,
    pageSize: number,
    tags: string[]
  ) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.BLOG_POST}/SearchBlog?SearchText=${keyword}&${
          tags.length > 0 ? tags.map((item) => `Tags=${item}`).join("&") : ""
        }`,
        {
          headers: {
            PageNumber: pageNumber,
            PageSize: pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<IBlog[]>>
    } catch (error) {
      console.log("BlogService ~ error:", error)
    }
  }
  async getPostById(id: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.BLOG_POST}/GetBlogByID?BlogID=${id}`
    )
    return res.data as IServerResponse<IBlog>
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
}
export const blogService = new BlogService()
