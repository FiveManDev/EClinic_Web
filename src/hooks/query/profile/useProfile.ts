import { useMutation, useQuery } from "@tanstack/react-query"
import { IProfile, IRelationShip } from "types/Profile.type"
import { profileService } from "../../../services/profile.service"

export const useProfieId = (userId: string) => {
  const queryKey = ["useProfieId", userId]
  const profileQuery = useQuery({
    queryKey,
    queryFn: () => profileService.GetUserProfilesByID(userId),
    retry: 0
  })
  return profileQuery
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
