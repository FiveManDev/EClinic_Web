import { AxiosResponse } from "axios"
import axiosClient from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { IProfile, IProfileDoctor } from "types/Profile.type"
import { IServerResponse } from "types/server/IServerResponse"
import { IRelationShip } from "./../types/Profile.type.d"
import { IPaginationSearch } from "types/Pagination"
import { CreateDoctorProfile } from "hooks/query/profile/useProfile"

class ProfileService {
  async GetUserProfilesByID(userId: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PROFILE}/GetUserProfilesById?UserID=${userId}`
    )
    return res.data as IServerResponse<(IProfile & IRelationShip)[]>
  }
  async searchFamlyProfiles(
    pageNumber: number,
    pageSize: number,
    searchText: string
  ) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PROFILE}/SearchFamlyProfiles?SearchText=${searchText}`,
      {
        headers: {
          PageNumber: pageNumber,
          PageSize: pageSize
        }
      }
    )
    return res as AxiosResponse<IServerResponse<(IProfile & IRelationShip)[]>>
  }
  async getUserMainProfilesByID() {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PROFILE}/GetUserMainProfilesByID`
    )
    return res.data as IServerResponse<IProfile & IRelationShip>
  }
  async getSimpleProfile(userId: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PROFILE}/GetSimpleProfile?UserID=${userId}`
    )
    return res.data as IServerResponse<any>
  }
  async getAllRelationshisp() {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.RELATIONSHIPS}/GetAllRelationship`
    )
    return res.data as IServerResponse<IRelationShip[]>
  }
  async updateUserProfile(profile: IProfile & IRelationShip) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(profile)) {
      if (key !== "userID" && key !== "relationshipName") {
        formData.append(key, value)
      }
    }
    const res: AxiosResponse = await axiosClient.put(
      `${URL_API.PROFILE}/UpdateUserProfile`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    )
    return res.data as IServerResponse<null>
  }
  async createUserProfile(profile: IProfile & IRelationShip) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(profile)) {
      if (key !== "relationshipName" && key !== "profieID") {
        formData.append(key, value)
      }
    }
    const res: AxiosResponse = await axiosClient.post(
      `${URL_API.PROFILE}/CreateUserProfile`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    )
    return res.data as IServerResponse<null>
  }
  async deleteUserProfile(profileId: string) {
    const res: AxiosResponse = await axiosClient.delete(
      `${URL_API.PROFILE}/DeleteUserProfile?ProfileID=${profileId}`
    )
    return res.data as IServerResponse<null>
  }
  async getBloodTypes() {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PROFILE_OTHER}/GetBloodTypes`
    )
    return res.data as IServerResponse<string[]>
  }
  async getDoctorProfiles(data: IPaginationSearch) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PROFILE}/GetDoctorProfiles?SearchText=${data.searchText}`,
      {
        headers: {
          PageNumber: data.pageNumber,
          PageSize: data.pageSize
        }
      }
    )
    return res as AxiosResponse<IServerResponse<IProfileDoctor[]>>
  }
  async createDoctorProfile(data: CreateDoctorProfile) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }
    const res = await axiosClient.post(
      `${URL_API.PROFILE}/CreateDoctorProfile`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    )
    return res.data as IServerResponse<null>
  }
}

export const profileService = new ProfileService()
