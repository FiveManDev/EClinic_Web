import { yupResolver } from "@hookform/resolvers/yup"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Skeleton
} from "@mui/material"
import DatePickerCustom from "components/Common/DatePicker/DatePickerCustom"
import CustomButton from "components/User/Button"
import { CustomInput } from "components/User/Input"
import { useAllRelationship } from "hooks/query/profile/useProfile"
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
    .required("Please enter your phone number")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Please enter valid phone number"
    ),
  dateOfBirth: yup.string().required("Please enter your date of birth"),
  address: yup.string().required("Please enter your address"),
  bloodType: yup.string().required("Please choose your blood").default("A")
})
const Edit = ({ onSubmit, onDelete, labelForm, profile }: Props) => {
  const relationShipQuery = useAllRelationship()

  const {
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
  const watchBlood = watch("bloodType", "A")
  const watchGender = watch("gender", true)
  const watchRelationship = watch("relationshipID", profile?.relationshipID)
  const onFileChange = (file: File) => {
    setValue("avatar", file)
  }
  useEffect(() => {
    if (profile === undefined) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        bloodType: "A",
        weight: 0,
        height: 0
      })
    }
  }, [profile])
  return (
    <>
      <h3 className="pb-4 text-lg font-medium">{labelForm}</h3>
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
            <CustomInput
              label="First name"
              control={control}
              name="firstName"
              error={!!errors.firstName}
              helperText={errors.firstName?.message?.toString()}
            />
            <CustomInput
              label="Last name"
              control={control}
              name="lastName"
              error={!!errors.lastName}
              helperText={errors.lastName?.message?.toString()}
            />
          </div>
          <CustomInput
            label="Email"
            control={control}
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
          <CustomInput
            label="Address"
            control={control}
            name="address"
            error={!!errors.address}
            helperText={errors.address?.message?.toString()}
          />
          <div className="flex space-x-3">
            <DatePickerCustom
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
              <InputLabel id="demo-simple-select-label">Blood group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={watchBlood}
                label="blood group"
                onChange={(value) => {
                  setValue("bloodType", value.target.value)
                }}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
          </div>
          <CustomInput
            label="Phone number"
            control={control}
            name="phone"
            error={!!errors.phone}
            helperText={errors.phone?.message?.toString()}
          />

          <FormControl>
            <FormLabel id="radio-buttons">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-buttons"
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
            <CustomInput label="Weight" control={control} name="weight" />
            <CustomInput label="Height" control={control} name="height" />
          </div>
          {profile?.relationshipName !== RELATIONSHIPS.ME && (
            <FormControl>
              <FormLabel id="radio-buttons">Relationship</FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons"
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
                  onClick={() => onDelete(profile?.profileID)}
                >
                  Delete
                </CustomButton>
              )}

            <CustomButton kind="primary" type="submit">
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
const Uploadfile = ({ imageUrl, onFileChange }: IFileProps) => {
  const [image, setImage] = useState(imageUrl)
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files?.length > 0) {
      const objectUrl = URL.createObjectURL(event.target.files[0])
      setImage(objectUrl)
      onFileChange(event.target.files[0])
    }
  }
  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="rounded-lg lg:w-1/2">
          <div className="flex items-center justify-center w-full">
            <label className="relative flex flex-col w-40 h-40 border-2 border-gray-400 border-dashed rounded-full cursor-pointer hover:bg-gray-100 hover:border-gray-300">
              {image && (
                <Image src={image} fill alt="avatar" className="rounded-full" />
              )}
              <div className="flex flex-col items-center justify-center pt-7">
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
                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  Select a photo
                </p>
              </div>
              <input
                type="file"
                className="opacity-0"
                onChange={(e) => handleImageChange(e)}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit
