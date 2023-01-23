import Cookies from "js-cookie"
class Token {
  objCookies = {
    expires: 30,
    domain: process.env.NEXT_PUBLIC_APP_URL
  }

  saveToken = (access_token: string, refresh_token: string) => {
    if (access_token && refresh_token) {
      Cookies.set(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string,
        access_token,
        {
          ...this.objCookies
        }
      )
      Cookies.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string,
        refresh_token,
        {
          ...this.objCookies
        }
      )
    } else {
      Cookies.remove(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string, {
        ...this.objCookies,
        path: "/",
        domain: process.env.COOKIE_DOMAIN
      })
      Cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string, {
        ...this.objCookies,
        path: "/",
        domain: process.env.COOKIE_DOMAIN
      })
    }
  }

  getToken = () => {
    const access_token = Cookies.get(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string
    )
    const refresh_token = Cookies.get(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string
    )
    return {
      access_token,
      refresh_token
    }
  }
  deleteToken = () => {
    const access_token = Cookies.get(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string
    )
    if (access_token) {
      Cookies.remove(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string, {
        ...this.objCookies,
        path: "/",
        domain: process.env.COOKIE_DOMAIN
      })
      Cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string, {
        ...this.objCookies,
        path: "/",
        domain: process.env.COOKIE_DOMAIN
      })
    }
  }
}
export const token = new Token()
