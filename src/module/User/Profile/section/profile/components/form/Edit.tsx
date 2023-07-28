import { yupResolver } from "@hookform/resolvers/yup"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Skeleton
} from "@mui/material"
import DatePickerCustom from "components/Common/DatePicker/DatePickerCustom"
import Spinner from "components/Common/Loading/LoadingIcon"
import CustomButton from "components/User/Button"
import { CustomInput } from "components/User/Input"
import InputField from "components/User/Input/InputField"
import useConfirm from "context/ComfirmContext"
import {
  useAllRelationship,
  useGetBloodTypes
} from "hooks/query/profile/useProfile"
import { useImageFile } from "hooks/useImageFile"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { RELATIONSHIPS } from "shared/constant/constant"
import { IProfile, IRelationShip } from "types/Profile.type"
import * as yup from "yup"
interface Props {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (value: FieldValues) => void
  // eslint-disable-next-line no-unused-vars
  onDelete: (profileId: string) => void
  labelForm: string
  profile?: IProfile & IRelationShip
  isLoading: boolean
}

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
  firstName: yup
    .string()
    .required("Please enter your first name")
    .matches(/^[A-Za-z ]+$/, "Please enter valid name"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .matches(/^[A-Za-z ]+$/, "Please enter valid name"),
  phone: yup
    .string()
    .nullable()
    .required("Please enter your phone number")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Please enter valid phone number"
    ),
  dateOfBirth: yup.string().required("Please enter your date of birth"),
  address: yup.string().required("Please enter your address").nullable(),
  bloodType: yup.string().required("Please choose your blood").default("A+"),
  weight: yup
    .number()
    .typeError("Weight must be numbers")
    .required("Please enter your weight"),
  height: yup
    .number()
    .typeError("Height must be numbers")
    .required("Please enter your weight")
})
const Edit = ({
  onSubmit,
  onDelete,
  labelForm,
  profile,
  isLoading = false
}: Props) => {
  const confirm = useConfirm()

  const relationShipQuery = useAllRelationship()
  const getBloodTypes = useGetBloodTypes()
  const {
    setFocus,
    handleSubmit,
    control,
    setError,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: profile
  })
  watch("avatar", null)
  const watchBlood = watch("bloodType", profile ? profile?.bloodType : "A+")
  const watchGender = watch("gender", profile ? profile?.gender : true)
  const watchRelationship = watch("relationshipID", profile?.relationshipID)
  const onFileChange = (file: File) => {
    setValue("avatar", file)
  }
  const handleDelete = async (profileId: string) => {
    if (confirm) {
      const choice = await confirm({
        title: "Delete profile",
        content: "Are you sure you want to delete this profile?"
      })
      if (choice) {
        onDelete(profileId)
      }
    }
  }
  useEffect(() => {
    if (profile === undefined) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        bloodType: "A+",
        weight: 0,
        height: 0
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])
  useEffect(() => {
    for (const fieldName of Object.keys(errors)) {
      if (errors[fieldName as keyof typeof errors]) {
        setFocus(fieldName as any)
        break
      }
    }
  }, [errors, setFocus])
  return (
    <>
      <h3 className="pb-4 text-lg font-medium">{labelForm}</h3>
      {getBloodTypes.isLoading ||
        (relationShipQuery.isLoading && (
          <>
            <div className="flex items-center justify-center w-full h-full">
              <Spinner color="#024ED5" />
            </div>
          </>
        ))}
      <div className="flex flex-col justify-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <Uploadfile
            imageUrl={profile?.avatar as string | null}
            onFileChange={onFileChange}
          />
          <div className="flex items-start space-x-3">
            <InputField
              size="medium"
              control={control}
              name="firstName"
              label={"First name"}
            />
            <InputField
              size="medium"
              control={control}
              name="lastName"
              label={"Last name"}
            />
          </div>
          <InputField
            disabled={
              profile?.relationshipName === RELATIONSHIPS.ME ? true : false
            }
            size="medium"
            control={control}
            name="email"
            label={"Email"}
          />
          <InputField
            size="medium"
            control={control}
            name="address"
            label={"Address"}
          />
          <div className="flex space-x-3">
            <DatePickerCustom
              size="medium"
              label="Date of birth"
              control={control}
              name="dateOfBirth"
              onErrorField={(reason) => {
                const message =
                  reason === "invalidDate"
                    ? "Please enter valid date"
                    : reason === "disableFuture"
                    ? "The birthday cannot be less than the current date"
                    : ""
                setError("dateOfBirth", { type: "focus", message })
              }}
              errorMessage={errors.dateOfBirth?.message?.toString()}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Blood group</InputLabel>
              <Select
                size="medium"
                value={watchBlood}
                label="blood group"
                onChange={(value) => {
                  setValue("bloodType", value.target.value)
                }}
              >
                {getBloodTypes?.data?.data.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <InputField
            size="medium"
            control={control}
            name="phone"
            label={"Phone number"}
          />
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              value={watchGender}
              onChange={(e) =>
                setValue("gender", e.target.value === "true" ? true : false)
              }
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={true}
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                value={false}
                control={<Radio size="small" />}
                label="Male"
              />
            </RadioGroup>
          </FormControl>
          <div className="flex items-start space-x-3">
            <InputField
              size="medium"
              control={control}
              name="weight"
              label={"Weight"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                )
              }}
            />
            <InputField
              size="medium"
              control={control}
              name="height"
              label={"Height"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Cm</InputAdornment>
                )
              }}
            />
          </div>
          {profile?.relationshipName !== RELATIONSHIPS.ME && (
            <FormControl>
              <FormLabel>Relationship</FormLabel>
              <RadioGroup
                row
                value={watchRelationship}
                onChange={(e) => setValue("relationshipID", e.target.value)}
                name="radio-buttons-group"
                className="gap-3 mt-2 ml-3"
              >
                {relationShipQuery.isLoading &&
                  Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rounded"
                        width={70}
                        height={30}
                      />
                    ))}
                {relationShipQuery.isSuccess &&
                  relationShipQuery.data.data.map((item, index) => {
                    if (item.relationshipName !== RELATIONSHIPS.ME) {
                      return (
                        <FormControlLabel
                          className="px-3 border border-gray-200 border-solid rounded-md shadow-sm"
                          key={index}
                          value={item.relationshipID}
                          control={<Radio size="small" />}
                          label={item.relationshipName}
                        />
                      )
                    }
                  })}
              </RadioGroup>
            </FormControl>
          )}

          <div className="flex justify-end space-x-4">
            {profile !== undefined &&
              profile?.relationshipName !== RELATIONSHIPS.ME && (
                <CustomButton
                  kind="secondary"
                  className="text-red-600 border-red-600 hover:border-red-500 "
                  onClick={() => handleDelete(profile.profileID)}
                >
                  Delete
                </CustomButton>
              )}

            <CustomButton
              disabled={isLoading}
              isLoading={isLoading}
              kind="primary"
              type="submit"
            >
              {profile ? "Update profile" : "Add new profile"}
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  )
}

// eslint-disable-next-line no-unused-vars
interface IFileProps {
  imageUrl: string | null
  // eslint-disable-next-line no-unused-vars
  onFileChange: (file: File) => void
}
export const Uploadfile = ({ imageUrl, onFileChange }: IFileProps) => {
  const { image, handleImageChange } = useImageFile(imageUrl)
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = handleImageChange(e)
    onFileChange(file!)
  }
  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="rounded-lg lg:w-1/2">
          <div className="flex items-center justify-center w-full">
            <label className="relative flex flex-col items-center justify-center w-40 h-40 transition-all border border-gray-400 border-dashed rounded-full cursor-pointer hover:bg-gray-100 hover:border-gray-300">
              {image && (
                <Image
                  src={image}
                  fill
                  alt="avatar"
                  className="object-cover rounded-full"
                />
              )}
              <div className="flex flex-col items-center justify-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="pt-1 text-xs tracking-wider text-gray-400 group-hover:text-gray-600">
                  Select a photo
                </p>
              </div>
              <input
                type="file"
                className="opacity-0"
                onChange={(e) => onImageChange(e)}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit
