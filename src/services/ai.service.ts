import { AxiosResponse } from "axios"
import { HttpClient } from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { DeepLearning, MachineLearning, Model } from "types/AI"
import { IServerResponse } from "types/server/IServerResponse"

const http = new HttpClient(process.env.NEXT_PUBLIC_API_AI_URL as string)
  .instance

class AiService {
  async getAllMachineLearning() {
    try {
      const res: AxiosResponse = await http.get(
        `${URL_API.AI.MachineLearning}/GetAll`
      )
      return res as AxiosResponse<IServerResponse<MachineLearning[]>>
    } catch (error) {
      console.log("AIgService ~ error:", error)
    }
  }
  async updateMachineLearning(data: MachineLearning) {
    try {
      const res: AxiosResponse = await http.put(
        `${URL_API.AI.MachineLearning}/Update`,
        {
          ...data
        }
      )
      return res.data as IServerResponse<string>
    } catch (error) {
      console.log("AIgService ~ error:", error)
    }
  }
  async createMachineLearning(name: string) {
    try {
      const res: AxiosResponse = await http.post(
        `${URL_API.AI.MachineLearning}/Create?MachineName=${name}`
      )
      if (res.status === 200) {
        return res.data as IServerResponse<string>
      }
    } catch (error) {
      console.log("AIgService ~ error:", error)
    }
  }
  async getAllDeepLearning() {
    try {
      const res: AxiosResponse = await http.get(
        `${URL_API.AI.DeepLearning}/GetAll`
      )
      return res as AxiosResponse<IServerResponse<DeepLearning[]>>
    } catch (error) {
      console.log("AIgService ~ error:", error)
    }
  }
  async updateDeepLearning(data: DeepLearning) {
    try {
      const res: AxiosResponse = await http.put(
        `${URL_API.AI.DeepLearning}/Update`,
        {
          ...data
        }
      )
      return res.data as IServerResponse<string>
    } catch (error) {
      console.log("AIgService ~ error:", error)
    }
  }
  async createDeepLearning(name: string) {
    try {
      const res: AxiosResponse = await http.post(
        `${URL_API.AI.DeepLearning}/Create?DeepName=${name}`
      )
      if (res.status === 200) {
        return res.data as IServerResponse<string>
      }
    } catch (error) {
      console.log("AIgService ~ error:", error)
    }
  }
  //Model
  async getAllModel() {
    try {
      const res: AxiosResponse = await http.get(`${URL_API.AI.Model}/GetAll`)
      return res as AxiosResponse<IServerResponse<Model[]>>
    } catch (error) {
      console.log("AIgService ~ error:", error)
    }
  }
}
export const aiService = new AiService()
