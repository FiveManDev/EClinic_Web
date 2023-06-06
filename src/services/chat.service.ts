import { AxiosResponse } from "axios"
import axiosClient from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { ChatMessage, IRoom, RoomType } from "types/Chat"
import { IServerResponse } from "types/server/IServerResponse"
class ChatService {
  //room
  async getAllNewRoom(pageNumber: number, pageSize: number) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.CHAT.ROOM}/GetAllNewRoom`,
        {
          headers: {
            PageNumber: pageNumber,
            PageSize: pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<IRoom[]>>
    } catch (error) {
      console.log("BlogService ~ error:", error)
    }
  }
  async getAllRoomOfUser(pageNumber: number, pageSize: number) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.CHAT.ROOM}/GetAllRoomOfUser`,
        {
          headers: {
            PageNumber: pageNumber,
            PageSize: pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<IRoom[]>>
    } catch (error) {
      console.log("BlogService ~ error:", error)
    }
  }
  async getAllRoomOfSupporter(pageNumber: number, pageSize: number) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.CHAT.ROOM}/GetAllRoomOfSupporter`,
        {
          headers: {
            PageNumber: pageNumber,
            PageSize: pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<IRoom[]>>
    } catch (error) {
      console.log("BlogService ~ error:", error)
    }
  }
  async getAllRoomOfDoctor(pageNumber: number, pageSize: number) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.CHAT.ROOM}/GetAllRoomOfDoctor`,
        {
          headers: {
            PageNumber: pageNumber,
            PageSize: pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<IRoom[]>>
    } catch (error) {
      console.log("BlogService ~ error:", error)
    }
  }
  //chat message
  async getAllMessageOfRoom(
    pageNumber: number,
    pageSize: number,
    roomId: string
  ) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.CHAT.CHATMESSAGE}/GetAllMessageOfRoom?roomId=${roomId}`,
        {
          headers: {
            PageNumber: pageNumber,
            PageSize: pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<ChatMessage[]>>
    } catch (error) {
      console.log("BlogService ~ error:", error)
    }
  }
  //Roomtype
  async getAllRoomType() {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.CHAT.RoomTypes}/GetAllRoomType`
      )
      return res as AxiosResponse<IServerResponse<RoomType[]>>
    } catch (error) {
      console.log("BlogService ~ error:", error)
    }
  }
}
export const chatService = new ChatService()
