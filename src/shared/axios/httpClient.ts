import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource
} from "axios"
import { authService } from "services/auth.service"
import { VERSION } from "shared/constant/constant"
import { token } from "shared/utils/token"

class HttpClient {
  instance: AxiosInstance
  cancelTokenSource: CancelTokenSource
  constructor() {
    /**
     * cancelTokenSource
     * This can be useful for cases such as when a user navigates away from a page before a request has completed, or when a user initiates a new request before a previous one has completed.
     */
    this.cancelTokenSource = axios.CancelToken.source()
    this.instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v${VERSION}/`,
      timeout: 100000,
      headers: {
        "Content-Type": "application/json"
      },
      cancelToken: this.cancelTokenSource.token
    })

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const _token = token.getToken()
        if (_token.access_token) {
          config.headers = Object.assign({}, config.headers, {
            Authorization: `Bearer ${_token.access_token}`
          })
        }
        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true
          const res = await authService.refreshToken()
          if (res?.isSuccess) {
            token.saveToken(res.data.accessToken, res.data.refreshToken)
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`
            return this.instance(originalRequest)
          }
        }
        return Promise.reject(error)
      }
    )
  }
}
const axiosClient = new HttpClient().instance

export default axiosClient
