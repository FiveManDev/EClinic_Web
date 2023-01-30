import { IUser } from "./../types/User.type"
import { AxiosResponse } from "axios"
import http from "shared/axios/http"
import { token as Token } from "shared/utils/token"
import { IServerResponse } from "types/server/IServerResponse"
import { IToken } from "types/Token.type"

class AuthService {
  authUrl = "Authentication"
  accountUrl = "Account"
  async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const res: AxiosResponse = await http.put(
      `${this.accountUrl}/ChangePassword`,
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
      accessToken: accessToken || Token.getToken().access_token,
      refreshToken: refreshToken || Token.getToken().refresh_token
    }
    const res = await http.post(`${this.authUrl}/RefreshToken`, null, {
      withCredentials: true,
      headers: {
        AccessToken: token.accessToken,
        RefreshToken: token.refreshToken
      }
    })
    return res.data as IServerResponse<IToken>
  }
  async signIn(userName: string, password: string) {
    const res: AxiosResponse = await http.post(`${this.authUrl}/SignIn`, {
      userName,
      password
    })
    return res.data as IServerResponse<IToken>
  }
  async logout() {
    const res = await http.post("auth/logout", null, {
      withCredentials: true
    })
    return res.data as IServerResponse<any>
  }
  async currentUser() {
    // const res = await http.post("auth/logout", null, {
    //   withCredentials: true
    // })
    const res = {
      data: {
        isSuccess: true,
        data: {
          userId: "1",
          userName: "user",
          role: "User"
        }
      }
    }
    return res.data as IServerResponse<IUser>
  }
}

export const authService = new AuthService()
