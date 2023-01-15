import { AxiosResponse } from "axios";
import http from "shared/http";
import { token } from "shared/utils/token";

class AuthService {
  async currentUser() {
    const res = await http.get("auth/me");
    return res.data;
  }

  async updateMeInfo(params: string) {
    const res: AxiosResponse = await http.put("auth/update-info", params);
    return res.data;
  }

  async changePassword(params: string) {
    const res: AxiosResponse = await http.put("auth/change-password", params);
    return res.data;
  }

  async refreshToken() {
    const res = await http.post("auth/refresh-token", null, {
      withCredentials: true,
    });
    return res.data;
  }

  async logout() {
    const res = await http.post("auth/logout", null, {
      withCredentials: true,
    });
    token.deleteToken();
    return res.data;
  }
}

export const authService = new AuthService();
