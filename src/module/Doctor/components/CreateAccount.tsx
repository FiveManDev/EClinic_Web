import { yupResolver } from "@hookform/resolvers/yup"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch
} from "@mui/material"
import DatePickerCustom from "components/Common/DatePicker/DatePickerCustom"
import SwitchCustom from "components/Common/IOSSwitch"
import Spinner from "components/Common/Loading/LoadingIcon"
import CustomButton from "components/User/Button"
import { CustomInput } from "components/User/Input"
import useConfirm from "context/ComfirmContext"
import dayjs from "dayjs"
import {
  useAllRelationship,
  useGetBloodTypes
} from "hooks/query/profile/useProfile"
import { Uploadfile } from "module/User/Profile/section/profile/components/form/Edit"
import { useEffect } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { IProfileDoctor } from "types/Profile.type"
import * as yup from "yup"
const schema = yup.object({
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter a valid email address"),
  firstName: yup
    .string()
    .required("Please enter first name")
    .matches(/^[A-Za-z ]+$/, "Please enter valid name"),
  lastName: yup
    .string()
    .required("Please enter last name")
    .matches(/^[A-Za-z ]+$/, "Please enter valid name"),
  phone: yup
    .string()
    .required("Please enter phone number")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Please enter valid phone number"
    ),
  workStart: yup.string().required("Please enter date of working start"),
  address: yup.string().required("Please enter address"),
  title: yup.string().required("Please enter position")
})
export interface IProfileDoctorWithFile extends IProfileDoctor {
  avatarFile: File | null
}
interface Props {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (value: FieldValues) => void
  // eslint-disable-next-line no-unused-vars
  onDelete?: (profileId: string) => void
  labelForm: string
  profile?: IProfileDoctorWithFile
}
const CreateAccount = ({ onSubmit, onDelete, labelForm, profile }: Props) => {
  const confirm = useConfirm()

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
  watch("avatarFile", null)
  const watchGender = watch("gender", profile ? profile?.gender : true)

  const onFileChange = (file: File) => {
    setValue("avatarFile", file)
  }
  const handleDelete = async (profileId: string) => {
    if (confirm) {
      const choice = await confirm({
        title: "Delete profile",
        content: "Are you sure you want to delete this profile?"
      })
      if (choice) {
        onDelete && onDelete(profileId)
      }
    }
  }
  useEffect(() => {
    if (profile === undefined) {
      reset({
        profileID: "",
        userID: "",
        firstName: "",
        lastName: "",
        avatar: "",
        avatarFile: null,
        gender: true,
        dateOfBirth: dayjs().toString(),
        address: "",
        email: "",
        phone: "",
        title: "",
        workStart: ""
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])
  return (
    <form className="flex w-full gap-x-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="background-primary max-w-[360px] w-full flex flex-col items-center gap-y-6 h-fit py-16">
        <Uploadfile
          imageUrl={profile?.avatar as string | null}
          onFileChange={onFileChange}
        />
        <p className="text-xs text-disable max-w-[200px] text-center leading-relaxed">
          Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
        </p>
        <div className="flex items-center justify-between w-full max-w-[140px]">
          <span className="text-base text-black2">Publish</span>
          <SwitchCustom />
        </div>
      </div>
      <div className="flex-1 background-primary">
        <h3 className="pb-4 text-lg font-medium">{labelForm}</h3>
        <div className="flex flex-col justify-start">
          <form className="flex flex-col space-y-5">
            <div className="flex items-start space-x-3">
              <CustomInput
                size="medium"
                label="First name"
                control={control}
                name="firstName"
                error={!!errors.firstName}
                helperText={errors.firstName?.message?.toString()}
              />
              <CustomInput
                size="medium"
                label="Last name"
                control={control}
                name="lastName"
                error={!!errors.lastName}
                helperText={errors.lastName?.message?.toString()}
              />
            </div>

            <CustomInput
              size="medium"
              label="Address"
              control={control}
              name="address"
              error={!!errors.address}
              helperText={errors.address?.message?.toString()}
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
              <CustomInput
                size="medium"
                label="Email"
                control={control}
                name="email"
                error={!!errors.email}
                helperText={errors.email?.message?.toString()}
              />
            </div>
            <div className="flex space-x-3">
              <DatePickerCustom
                size="medium"
                label="Date start work"
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
              <CustomInput
                size="medium"
                label="Phone number"
                control={control}
                name="phone"
                error={!!errors.phone}
                helperText={errors.phone?.message?.toString()}
              />
            </div>

            <CustomInput
              size="medium"
              multiline
              label="About"
              rows={4}
              control={control}
              name="address"
              error={!!errors.address}
              helperText={errors.address?.message?.toString()}
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
            <CustomButton
              kind="primary"
              type="submit"
              className="ml-auto w-fit"
            >
              Create account
            </CustomButton>
          </form>
        </div>
      </div>
    </form>
  )
}

export default CreateAccount
