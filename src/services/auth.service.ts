import { AxiosResponse } from "axios"
import { IChangePassowrd, IResetPassowrd } from "hooks/query/account/useAccount"
import axiosClient from "shared/axios/httpClient"
import { URL_API, VERSION } from "shared/constant/constant"
import { token as Token } from "shared/utils/token"
import { IServerResponse } from "types/server/IServerResponse"
import { IToken } from "types/Token"

class AuthService {
  async changePassword(value: IChangePassowrd) {
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.ACCOUNT}/ChangePassword`,
      {
        oldPassword: value.oldPassword,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword
      }
    )
    return res.data as IServerResponse<any>
  }
  async resetPassword(value: IResetPassowrd) {
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.ACCOUNT}/ResetPassword`,
      {
        email: value.email,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword
      }
    )
    return res.data as IServerResponse<null>
  }
  async refreshToken(refreshToken?: string) {
    try {
      const token = {
        refreshToken: refreshToken || Token.getToken().refresh_token || ""
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_MAIN_URL}:${process.env.NEXT_PUBLIC_API_URL_PORT_BASE}/api/v${VERSION}/${URL_API.AUTH}/RefreshToken`,
        {
          headers: {
            RefreshToken: token.refreshToken
          }
        }
      )
      const data: IServerResponse<IToken> = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
  async signIn(userName: string, password: string) {
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.AUTH}/SignIn`,
      {
        userName,
        password
      }
    )
    return res.data as IServerResponse<IToken>
  }
  async signUp(values: any) {
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.ACCOUNT}/SignUp`,
      {
        ...values
      },
      {
        validateStatus: function (status) {
          return status < 500
        }
      }
    )
    return res.data as IServerResponse<any>
  }
  async signInWithGoogle(access_token: string) {
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.AUTH}/SignInWithGoogle`,
      access_token,
      {
        validateStatus: function (status) {
          return status < 500
        }
      }
    )
    return res.data as IServerResponse<IToken>
  }
  async changeStatus(userId: string) {
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.ACCOUNT}/ChangeStatus?userID=${userId}`
    )
    return res.data as IServerResponse<string>
  }
  async logout() {
    const res = await axiosClient.post("auth/logout", null, {
      withCredentials: true
    })
    return res.data as IServerResponse<any>
  }
  async test() {
    const res = await axiosClient.get(`${URL_API.AUTH}/GetID`)
    return res.data as IServerResponse<any>
  }
}

export const authService = new AuthService()
