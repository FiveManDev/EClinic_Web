import { yupResolver } from "@hookform/resolvers/yup"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material"
import DatePickerCustom from "components/Common/DatePicker/DatePickerCustom"
import SwitchCustom from "components/Common/IOSSwitch"
import Tag from "components/Common/Tag"
import CustomButton from "components/User/Button"
import { CustomInput } from "components/User/Input"
import useConfirm from "context/ComfirmContext"
import dayjs from "dayjs"
import {
  CreateSupporterProfile,
  UpdateSupporterProfile,
  useCreateSupporterDoctorMutation,
  useUpdateSupporterMutation
} from "hooks/query/profile/useProfile"
import { Uploadfile } from "module/User/Profile/section/profile/components/form/Edit"
import { useEffect } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IProfileSupporter } from "types/Profile.type"
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
  description: yup.string().required("Please enter description")
})
interface Props {
  labelForm: string
  profile?: IProfileSupporter
  mode?: "update" | "create"
}
const CreateAccountSupporter = ({
  labelForm,
  profile,
  mode = "create"
}: Props) => {
  const confirm = useConfirm()
  const createSupporterDoctorMutation = useCreateSupporterDoctorMutation()
  const updateSupporterDoctorMutation = useUpdateSupporterMutation()
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
  const watchGender = watch("gender", profile ? profile?.gender : true)
  const onFileChange = (file: File) => {
    setValue("avatar", file)
  }
  const resetForm = () => {
    reset({
      profileID: "",
      userID: "",
      firstName: "",
      lastName: "",
      avatar: null,
      gender: true,
      dateOfBirth: dayjs().toString(),
      address: "",
      email: "",
      phone: "",
      workStart: dayjs().toString(),
      description: ""
    })
  }
  const onSubmit = async (value: FieldValues) => {
    if (mode === "update") {
      if (confirm) {
        const choice = await confirm({
          title: "Update account",
          content: "Are you sure you want to update this profile?"
        })
        if (choice) {
          updateSupporterDoctorMutation.mutate(
            {
              ...value
            } as UpdateSupporterProfile,
            {
              onSuccess: (data) => {
                if (data.isSuccess) {
                  toast.success("Update successfuly")
                  resetForm()
                } else {
                  toast.error("Update error")
                }
              },
              onError: () => {
                toast.error("Update error")
              }
            }
          )
        }
      }
    } else {
      createSupporterDoctorMutation.mutate(
        {
          ...value
        } as CreateSupporterProfile,
        {
          onSuccess: (data) => {
            if (data.isSuccess) {
              toast.success("Add successfuly")
            } else {
              toast.error("Add error")
            }
          },
          onError: () => {
            toast.error("Add error")
          }
        }
      )
    }
  }
  useEffect(() => {
    if (profile === undefined) {
      resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  return (
    <form
      className="flex flex-col w-full gap-y-6 md:gap-y-0 md:flex-row gap-x-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative background-primary w-full md:max-w-[360px] flex flex-col items-center h-fit py-16">
        <Tag
          color="#07AB55"
          className="absolute top-0 right-0 -translate-x-1/4 translate-y-2/4"
        >
          Active
        </Tag>

        <Uploadfile
          imageUrl={profile?.avatar as string | null}
          onFileChange={onFileChange}
        />
        <p className="text-xs text-disable max-w-[200px] text-center leading-relaxed mt-3">
          Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
        </p>
        <div className="flex items-center justify-between w-full max-w-[260px] mt-6">
          <div className="flex flex-col">
            <span className="text-base font-medium text-black2">Publish</span>
            <p className="text-xs text-disable">Apply disable account</p>
          </div>
          <SwitchCustom />
        </div>
      </div>
      <div className="flex-1 background-primary">
        <h3 className="pb-4 text-lg font-medium">{labelForm}</h3>
        <div className="flex flex-col justify-start">
          <div className="flex flex-col space-y-5">
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

            <div className="flex space-x-3">
              <CustomInput
                size="medium"
                label="Address"
                control={control}
                name="address"
                error={!!errors.address}
                helperText={errors.address?.message?.toString()}
              />
            </div>
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
                name="workStart"
                onErrorField={(reason) => {
                  const message =
                    reason === "invalidDate"
                      ? "Please enter valid date"
                      : reason === "disableFuture"
                      ? "The birthday cannot be less than the current date"
                      : ""
                  setError("workStart", { type: "focus", message })
                }}
                errorMessage={errors.workStart?.message?.toString()}
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
            <CustomInput
              multiline
              rows={4}
              size="medium"
              label="About"
              control={control}
              name="description"
              error={!!errors.description}
              helperText={errors.description?.message?.toString()}
            />
            <CustomButton
              kind="primary"
              type="submit"
              className="ml-auto w-fit"
              isLoading={
                updateSupporterDoctorMutation.isLoading ||
                createSupporterDoctorMutation.isLoading
              }
            >
              {mode === "create" ? "Create account" : "Update account"}
            </CustomButton>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateAccountSupporter