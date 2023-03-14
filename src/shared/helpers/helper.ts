import dayjs from "dayjs"
import { ITokenDecode } from "types/Token"

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
export const getCurrentDate = (date: string) => {
  return dayjs(date, "ddd, DD MMM YYYY HH:mm:ss [GMT]").toISOString()
}
export const combineName = (lastName: string, firstName: string) => {
  return lastName + " " + firstName
}
export const dayformat = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY")
}
