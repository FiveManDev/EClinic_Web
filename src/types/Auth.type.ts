import { ICurrentUser } from "./User.type"
export interface IAuthState {
  isAuthenticated: boolean
  isFetched: boolean
  me: ICurrentUser
}
