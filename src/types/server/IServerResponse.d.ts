import { AxiosRequestConfig } from "axios"

export interface IServerResponse<T> {
  isSuccess: boolean
  message?: string
  data: T
}
