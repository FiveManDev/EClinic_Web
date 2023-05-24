import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "shared/constant/constant"
import { IPaginationSearch } from "types/Pagination"
import { IProfile, IProfileDoctor, IRelationShip } from "types/Profile.type"
import { profileService } from "../../../services/profile.service"

export type CreateDoctorProfile = Omit<IProfileDoctor, "profileID" | "userID">
export const useProfieId = (userId: string) => {
  const queryKey = [QUERY_KEYS.PROFILE, userId]
  const profileQuery = useQuery({
    queryKey,
    queryFn: () => profileService.GetUserProfilesByID(userId)
  })
  return profileQuery
}
export const useSearchFamlyProfilesQuery = (
  pageNumber: number,
  pageSize: number,
  searchText: string
) => {
  const queryKey = [QUERY_KEYS.PROFILE, pageNumber, pageSize, searchText]
  return useQuery({
    queryKey,
    queryFn: () =>
      profileService.searchFamlyProfiles(pageNumber, pageSize, searchText)
  })
}
export const useSimpleProfile = (userId: string) => {
  const queryKey = ["useSimpleProfile", userId]
  const profileQuery = useQuery({
    queryKey,
    queryFn: () => profileService.getSimpleProfile(userId),
    retry: 0
  })
  return profileQuery
}
export const useGetUserMainProfilesByID = () => {
  const queryKey = [QUERY_KEYS.PROFILE]
  return useQuery({
    queryKey,
    queryFn: () => profileService.getUserMainProfilesByID()
  })
}
export const useAllRelationship = () => {
  const queryKey = ["AllRelationship"]
  const relationshipQuery = useQuery({
    queryKey,
    queryFn: () => profileService.getAllRelationshisp(),
    staleTime: Infinity
  })
  return relationshipQuery
}
export const useUpdateProfileMutation = () => {
  const updateProfileMutation = useMutation({
    mutationFn: (profile: IProfile & IRelationShip) =>
      profileService.updateUserProfile(profile)
  })
  return updateProfileMutation
}
export const useDeleteProfileMutation = () => {
  const deleteProfileMutation = useMutation({
    mutationFn: (profileId: string) =>
      profileService.deleteUserProfile(profileId)
  })
  return deleteProfileMutation
}
export const useCreateProfileMutation = () => {
  const createProfileMutation = useMutation({
    mutationFn: (profile: IProfile & IRelationShip) =>
      profileService.createUserProfile(profile)
  })
  return createProfileMutation
}
export const useCreateProfileDoctorMutation = () => {
  const createProfileMutation = useMutation({
    mutationFn: (profile: CreateDoctorProfile) =>
      profileService.createDoctorProfile(profile)
  })
  return createProfileMutation
}
export const useGetBloodTypes = () => {
  const queryKey = ["blood"]
  return useQuery({
    queryKey,
    queryFn: () => profileService.getBloodTypes()
  })
}
export const useGetDoctorProfilesQuery = (data: IPaginationSearch) => {
  const queryKey = [
    QUERY_KEYS.PROFILE,
    data.pageNumber,
    data.pageSize,
    data.searchText
  ]
  return useQuery({
    queryKey,
    queryFn: () =>
      profileService.getDoctorProfiles({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        searchText: data.searchText
      })
  })
}
