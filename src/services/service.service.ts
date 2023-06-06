import { AxiosResponse } from "axios"
import axiosClient from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { Service, Specialization } from "types/Service"
import { IServerResponse } from "types/server/IServerResponse"
import { IPaginationSearch, IPaging } from "types/Pagination"
import {
  CreateServiceItem,
  CreateSpecialization,
  UpdateService
} from "hooks/query/service/useService"

class ServiceService {
  //service
  async searchServiceForAd(data: IPaginationSearch) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.SERVICE}/GetAllServiceForAd?SearchText=${data.searchText}`,
      {
        headers: {
          PageNumber: data.pageNumber,
          PageSize: data.pageSize
        }
      }
    )
    return res as AxiosResponse<IServerResponse<Service[]>>
  }
  async getServiceByIDForAd(serviceId: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.SERVICE}/GetServiceByIDForAd?serviceID=${serviceId}`
    )
    return res.data as IServerResponse<Service>
  }
  async createService(data: CreateServiceItem) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }
    const res = await axiosClient.post(
      `${URL_API.SERVICE}/CreateService`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    )
    return res.data as IServerResponse<null>
  }
  async updateService(data: UpdateService) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }
    const res = await axiosClient.put(
      `${URL_API.SERVICE}/UpdateService`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    )
    return res.data as IServerResponse<null>
  }
  //specialization
  async getAllSpecialization(data: IPaging) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.SPECIALIZATION}/GetAllSpecialization`,
        {
          headers: {
            PageNumber: data.pageNumber,
            PageSize: data.pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<Specialization[]>>
    } catch (error) {
      console.log("getAllSpecialization ~ error:", error)
    }
  }
  async searchSpecialization(data: IPaginationSearch) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.SPECIALIZATION}/SearchSpecialization?SearchText=${data.searchText}`,
      {
        headers: {
          PageNumber: data.pageNumber,
          PageSize: data.pageSize
        }
      }
    )
    return res as AxiosResponse<IServerResponse<Specialization[]>>
  }
  async createSpecialization(data: CreateSpecialization) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }
    const res = await axiosClient.post(
      `${URL_API.SPECIALIZATION}/CreateSpecialization`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    )
    return res.data as IServerResponse<null>
  }
  async updateSpecialization(data: Specialization) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }
    const res = await axiosClient.put(
      `${URL_API.SPECIALIZATION}/UpdateSpecialization`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    )
    return res.data as IServerResponse<null>
  }
}

export const serviceService = new ServiceService()
