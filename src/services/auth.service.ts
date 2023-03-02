import { IUser } from "./../types/User.type"
import { AxiosResponse } from "axios"
import { token as Token } from "shared/utils/token"
import { IServerResponse } from "types/server/IServerResponse"
import { IToken } from "types/Token.type"
import axiosClient from "shared/axios/httpClient"
import { URL_API, VERSION } from "shared/constant/constant"

class AuthService {
  async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.ACCOUNT}/ChangePassword`,
      {
        oldPassword,
        newPassword,
        confirmPassword
      }
    )
    return res.data as IServerResponse<any>
  }

  async refreshToken(accessToken?: string, refreshToken?: string) {
    const token = {
      accessToken: accessToken || Token.getToken().access_token || "",
      refreshToken: refreshToken || Token.getToken().refresh_token || ""
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v${VERSION}/${URL_API.AUTH}/RefreshToken`,
      {
        headers: {
          "Content-Type": "application/json",
          AccessToken: "1",
          RefreshToken: token.refreshToken
        }
      }
    )
    const data: IServerResponse<IToken> = await res.json()
    return data
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
  async logout() {
    const res = await axiosClient.post("auth/logout", null, {
      withCredentials: true
    })
    return res.data as IServerResponse<any>
  }
  // async currentUser() {
  //   // const res = await http.post("auth/logout", null, {
  //   //   withCredentials: true
  //   // })
  //   const res = {
  //     data: {
  //       isSuccess: true,
  //       data: {
  //         userId: "42ce372a-7078-4a4c-93a3-c5000d58bff1",
  //         role: "User"
  //       }
  //     }
  //   }
  //   return res.data as IServerResponse<IUser>
  // }
  async test() {
    const res = await axiosClient.get(`${URL_API.AUTH}/GetID`)
    return res.data as IServerResponse<any>
  }
}

export const authService = new AuthService()
