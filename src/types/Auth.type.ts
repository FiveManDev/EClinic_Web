import { IUser } from "./User.type"
export interface IAuthState {
  isLoggedIn: boolean
  user: IUser
}
export interface ILogin {
  userName: string
  password: string
}
