import { useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import InputCustom from "components/Common/Input"
import CustomButton from "components/User/Button"
import {
  useDeleteProfileMutation,
  useProfieId,
  useUpdateProfileMutation
} from "hooks/query/profile/useProfileId"
import { useEffect, useState } from "react"
import { FieldValues } from "react-hook-form"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { useSelector } from "react-redux"
import { RELATIONSHIPS } from "shared/constant/constant"
import { RootState } from "store/store"
import { IProfile, IRelationShip } from "types/Profile.type"
import Edit from "./components/form/Edit"
import ProfileDisplay from "./components/ProfileDisplay/ProfileDisplay"
import ProfileItem from "./components/ProfileItem"

type Action = "add" | "edit" | "view"
const Profile = () => {
  const [ownerProfile, setOwnerProfile] = useState<
    (IProfile & IRelationShip) | undefined
  >(undefined)
  const auth = useSelector((state: RootState) => state.auth)
  const [mode, setMode] = useState<Action>("view")

  //query
  const queryClient = useQueryClient()
  const deleteProfileMutation = useDeleteProfileMutation()
  const { data, isError, isLoading } = useProfieId(auth.user.userId)
  const updateProfileMutaiton = useUpdateProfileMutation()

  useEffect(() => {
    if (data) {
      const owner = data.data.find(
        (item) => item.relationshipName === RELATIONSHIPS.ME
      )
      setOwnerProfile(owner)
    }
  }, [data])
  if (isError) {
    return <p>error</p>
  }
  if (isLoading) {
    return <p>...loading</p>
  }
  const handleSubmitForm = (value: FieldValues) => {
    if (mode === "edit") {
      updateProfileMutaiton.mutate(value as IProfile & IRelationShip, {
        onSuccess: (data) => {
          if (data.isSuccess) {
            message.success("Update successfuly")
            queryClient.invalidateQueries({ queryKey: ["useProfieId"] })
          } else {
            message.error("Update error")
          }
        },
        onError: () => {
          message.error("Update error")
        }
      })
    } else if (mode === "add") {
      console.log("handleSubmitForm ~ mode:", mode)
    }
  }
  const handleChangeForm = (profileID: string | null, mode: Action) => {
    if (mode == "add") {
      setOwnerProfile(undefined)
    } else if (mode === "edit" || mode === "view") {
      const owner = data.data.find((item) => {
        return item.profileID === profileID
      })
      setOwnerProfile(owner)
    }
    setMode(mode)
  }
  const handleDeleteProfile = (profileId: string) => {
    deleteProfileMutation.mutate(profileId, {
      onSuccess: (data) => {
        if (data.isSuccess) {
          message.success("Delete successfuly")
          queryClient.invalidateQueries({ queryKey: ["useProfieId"] })
          setMode("view")
        } else {
          message.error("Delete error")
        }
      },
      onError: () => {
        message.error("Delete error")
      }
    })
  }

  return (
    <div className="flex w-full p-6 bg-white rounded-md shadow-md background-primary">
      <div className="w-[340px] flex flex-col space-y-4">
        <InputCustom
          icon={<HiMagnifyingGlass />}
          className="w-full md:max-w-[412px]"
          placeholder="Tìm nhanh hồ sơ"
        />
        <ul className="max-h-[600px] overflow-auto space-y-2">
          {data.data.map((item, index) => (
            <ProfileItem
              data={item}
              key={index}
              onClick={() => handleChangeForm(item.profileID, "view")}
            />
          ))}
        </ul>
        <CustomButton
          kind="primary"
          onClick={() => handleChangeForm(null, "add")}
        >
          <span className="text-base">Add Profile</span>
        </CustomButton>
      </div>
      <div className="flex-1 px-6 ">
        {(mode == "add" || mode === "edit") && (
          <Edit
            labelForm={
              mode === "add"
                ? "Add new profile of your family"
                : "Edit profile of your family"
            }
            onSubmit={handleSubmitForm}
            profile={ownerProfile}
            onDelete={handleDeleteProfile}
          />
        )}
        {mode == "view" && (
          <ProfileDisplay
            profile={ownerProfile}
            onEdit={(profileId) => handleChangeForm(profileId, "edit")}
          />
        )}
      </div>
    </div>
  )
}

export default Profile
