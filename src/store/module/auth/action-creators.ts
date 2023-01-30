import { IUser } from "./../../../types/User.type"
import { AppDispatch } from "./../../store"
import { token } from "shared/utils/token"
import { authenticate, deleteAuthenticate } from "./auth-slice"
import { authService } from "services/auth.service"

export const loginUser = (user: IUser) => async (dispatch: AppDispatch) => {
  dispatch(authenticate(user))
}

export const logoutUser = () => async (dispatch: AppDispatch) => {
  token.deleteToken()
  dispatch(deleteAuthenticate())
}

export const checkLogin = () => async (dispatch: AppDispatch) => {
  const accessToken = token.getToken().access_token
  const isAuthenticated = !!accessToken
  if (isAuthenticated) {
    authService.currentUser().then((res) => {
      if (res && res?.isSuccess === true) {
        dispatch(authenticate(res.data))
      }
    })
  } else {
    dispatch(deleteAuthenticate())
  }
}
