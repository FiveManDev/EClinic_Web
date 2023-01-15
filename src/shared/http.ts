import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { authService } from "services/auth";
import { token } from "./utils/token";

let isRefreshing = false;

function rejectErrorAndClearToken(error: AxiosError) {
  token.deleteToken();
  window.location.href = "/";

  return Promise.reject(error);
}
//call api
class Http {
  instance: AxiosInstance;
  cancelTokenSource: CancelTokenSource;

  constructor() {
    /**
     * cancelTokenSource
     * This can be useful for cases such as when a user navigates away from a page before a request has completed, or when a user initiates a new request before a previous one has completed.
     */
    this.cancelTokenSource = axios.CancelToken.source();
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_APP_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken: this.cancelTokenSource.token,
    });

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const _token = token.getToken();
        if (_token.access_token) {
          config.headers = { ...config.headers } as AxiosHeaders;
          config.headers.set("Authorization", `Bearer ${_token.access_token}`);
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const access_token = await authService.refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
          return this.instance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
