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
