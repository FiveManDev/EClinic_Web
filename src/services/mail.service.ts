import axios, { AxiosResponse } from "axios"
import axiosClient from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { IServerResponse } from "types/server/IServerResponse"

class EmailService {
  async confirmEmail(email: string) {
    // const res: AxiosResponse = await axiosClient.post(
    //   `${URL_API.MAIL}/ConfirmEmail?email=${email}`
    // )
    const res: AxiosResponse = await axios.get(
      `https://localhost:4444/api/v1/Mail/ConfirmEmail?email=${email}`
    )
    return res.data as IServerResponse<string>
  }
}

export const emailService = new EmailService()
