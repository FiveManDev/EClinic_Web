import { yupResolver } from "@hookform/resolvers/yup"
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material"
import { message } from "antd"
import DatePickerCustom from "components/Common/DatePicker/DatePickerCustom"
import GoogleIcon from "components/Common/Icon/GoogleIcon"
import Spinner from "components/Common/Loading/LoadingIcon"
import SnakbarCustom from "components/Common/Snackbar/SnakbarCustom"
import CustomButton from "components/User/Button"
import { CustomInput, CustomInputPassword } from "components/User/Input"
import dayjs from "dayjs"
import useUserGoogle from "hooks/auth/useUserGoogle"
import ButtonIcon from "module/Auth/components/ButtonIcon"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { authService } from "services/auth.service"
import * as yup from "yup"

const schema = yup.object({
  userName: yup.string().required("Please enter your user name"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
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
  dateOfBirth: yup.string().required("Please enter your date of birth"),
  gender: yup.string().required("Please choose your gender")
})
const FormSignup = () => {
  const { action, profile, error } = useUserGoogle()

  const [success, setSuccess] = useState<{
    message: string
    state: "success" | "error"
    open: boolean
  }>({
    message: "",
    state: "error",
    open: false
  })

  const {
    handleSubmit,
    register,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })

  const signUp = async (values: FieldValues) => {
    setSuccess((prev) => ({
      ...prev,
      open: false
    }))
    const date = dayjs(
      values.dateOfBirth,
      "ddd, DD MMM YYYY HH:mm:ss [GMT]"
    ).toISOString()
    const result = { ...values, gender: true, dateOfBirth: date }
    try {
      const data = await authService.signUp(result)
      data.isSuccess && reset()
      const message = data.isSuccess
        ? "Sign-up successful! Welcome."
        : data.message || "Sorry, sign-up failed"
      setSuccess((prev) => ({
        ...prev,
        state: data.isSuccess ? "success" : "error",
        open: true,
        message: message
      }))
    } catch (error) {
      setSuccess((prev) => ({
        ...prev,
        state: "error",
        open: true,
        message: "Sorry, sign-up failed"
      }))
    }
  }
  useEffect(() => {
    if (error) {
      message.error("Unable to register, please try again!!!")
    }
  }, [error])
  return (
    <div className="md:max-w-[580px] w-full  bg-white rounded-md shadow-[1.69138px_-2.81897px_19.7328px_rgba(205,_205,_212,_0.1)] px-4 py-6 mt-7">
      <ButtonIcon
        text="Log in with Google"
        icon={<GoogleIcon />}
        onClick={() => action()}
      />
      <Divider className="my-[30px]">
        <span className="text-[10px] text-[#4E5D78] md:text-lg">OR</span>
      </Divider>
      <form onSubmit={handleSubmit(signUp)} className="flex flex-col space-y-5">
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
          label="User name"
          control={control}
          name="userName"
          error={!!errors.userName}
          helperText={errors.userName?.message?.toString()}
        />
        <CustomInputPassword
          label="Password"
          control={control}
          name="password"
          error={!!errors.password}
          errorMessage={errors.password?.message?.toString()}
        />
        <CustomInputPassword
          label="Confirm password"
          placeholder="Confirm password"
          control={control}
          name="confirmPassword"
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message?.toString()}
        />
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
        <FormControl>
          <FormLabel id="radio-buttons">Gender</FormLabel>
          <RadioGroup
            {...register("gender")}
            row
            aria-labelledby="radio-buttons"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio size="small" />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio size="small" />}
              label="Male"
            />
          </RadioGroup>
        </FormControl>
        <CustomButton
          kind="primary"
          className="rounded-md md:h-[42px]"
          type="submit"
        >
          {isSubmitting ? <Spinner /> : "Sign Up"}
        </CustomButton>
      </form>
      <p className="text-center mt-5 text-[#4E5D78">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="no-underline hover:underline hover:decoration-primary"
        >
          <span className="text-primary">Sign In</span>
        </Link>
      </p>
      <SnakbarCustom
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        state={success.state}
        isOpen={success.open}
        title={success.message}
      />
    </div>
  )
}

export default FormSignup
