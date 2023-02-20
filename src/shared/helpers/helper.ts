import { RcFile } from "antd/es/upload"
import axios, { AxiosError } from "axios"
import { ITokenDecode } from "types/Token.type"

export const isProduction = () => {
  return process.env.NODE_ENV === "production"
}

export const isDevelopment = () => {
  return process.env.NODE_ENV !== "development"
}

export const isServer = () => {
  return typeof window === "undefined"
}

export const isBrowser = () => {
  return !isServer()
}
export const numberWithCommas = (x: any) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
export const routerByRole = (role: ITokenDecode["role"]) => {
  let url = "/"
  switch (role) {
    case "User":
      url = "/"
      break
    case "Admin":
      url = "/admin"
      break
    case "Supporter":
      url = "/sup"
      break
    case "Doctor":
      url = "/doctor"
      break
    default:
      break
  }
  return url
}
export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}
