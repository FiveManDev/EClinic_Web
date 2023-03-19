import { yupResolver } from "@hookform/resolvers/yup"
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material"

import DatePickerCustom from "components/Common/DatePicker/DatePickerCustom"
import GoogleIcon from "components/Common/Icon/GoogleIcon"
import Spinner from "components/Common/Loading/LoadingIcon"
import CustomButton from "components/User/Button"
import { CustomInput, CustomInputPassword } from "components/User/Input"
import useUserGoogle from "hooks/auth/useUserGoogle"
import ButtonIcon from "module/Auth/components/ButtonIcon"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { authService } from "services/auth.service"
import { emailService } from "services/mail.service"
import { getCurrentDate } from "shared/helpers/helper"
import * as yup from "yup"
import ConfirmCode from "../ConfirmCode"

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
  gender: yup.bool().required("Please choose your gender")
})
const SIGN_UP_FAILED = "Sign up failed!!"
const FormSignup = () => {
  const [isVerify, setIsVerify] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [emailVerify, setEmailVerify] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [loginMethod, setLoginMethod] = useState<"google" | "normal" | null>(
    null
  )
  const { action, profile, error } = useUserGoogle()
  const {
    handleSubmit,
    register,
    control,
    setError,
    reset,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })

  const handleSubmitSignup = async (values: FieldValues) => {
    setIsVerify(true)
    setLoginMethod("normal")
    setEmail(values.email)
    getCodeFromEmail(values.email)
  }
  const handleResetCode = async () => {
    setIsVerify(true)
    getCodeFromEmail(email)
    toast.success("Send code again succesfully")
  }
  const getCodeFromEmail = async (email: string) => {
    toast.loading("Wait a minutes")
    try {
      const res = await emailService.confirmEmail(email)
      if (res.isSuccess) {
        setCode(res.data)
        setEmailVerify(email)
      } else {
        toast.error(res?.message || "Sign up failed")
      }
    } catch (error) {
      toast.error("Sign up failed")
    } finally {
      toast.dismiss()
    }
  }
  const signUp = async () => {
    if (loginMethod === "normal") {
      const date = getCurrentDate(getValues("dateOfBirth"))
      const result = {
        ...getValues(),
        gender: getValues("gender") === "true" ? true : false,
        dateOfBirth: date
      }
      try {
        const data = await authService.signUp(result)
        if (data.isSuccess) {
          toast.success(data.message || "Sign up successfuly!!")
        } else {
          toast.error(data.message || SIGN_UP_FAILED)
        }
      } catch (error) {
        toast.error("Sign up failed!!")
      }
    } else if (loginMethod === "google") {
      try {
        const data = await authService.signInWithGoogle(profile.access_token)
        if (data.isSuccess) {
          toast.success(data.message || "Sign up successfuly!!")
        } else {
          toast.error(data.message || SIGN_UP_FAILED)
        }
      } catch (error) {
        toast.error(SIGN_UP_FAILED)
      }
    }
    reset()
    setCode(null)
    setIsVerify(false)
    setEmail("")
  }
  useEffect(() => {
    /***
     * sign-up with google
     */
    if (profile) {
      setIsVerify(true)
      getCodeFromEmail(profile?.data.email)
      setEmail(profile?.data.email)
      setLoginMethod("google")
      toast.dismiss()
    }
  }, [profile])
  useEffect(() => {
    if (error) {
      toast.error(SIGN_UP_FAILED)
    }
  }, [error])
  return (
    <>
      {isVerify && code && emailVerify ? (
        <ConfirmCode
          onSubmit={signUp}
          code={code}
          handleResetCode={handleResetCode}
          handleBack={() => setIsVerify(false)}
          email={emailVerify}
        />
      ) : (
        <div className="md:max-w-[580px] w-full  bg-white rounded-md px-4 py-6 mt-7">
          <ButtonIcon
            text="Sign up with Google"
            icon={<GoogleIcon />}
            onClick={() => action()}
          />
          <Divider className="my-[30px]">
            <span className="text-[10px] text-[#4E5D78] md:text-lg">OR</span>
          </Divider>
          <form
            onSubmit={handleSubmit(handleSubmitSignup)}
            className="flex flex-col space-y-5"
          >
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
                defaultValue={true}
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
              className="rounded-md md:h-[42px]"
              type="submit"
            >
              {isSubmitting ? <Spinner /> : "Sign Up"}
            </CustomButton>
          </form>
          <p className="text-center mt-5 text-[#4E5D78">
            Already have an account?{" "}
            <Link
              href={"/sign-in"}
              className="no-underline hover:underline hover:decoration-primary"
            >
              <span className="text-primary">Sign In</span>
            </Link>
          </p>
        </div>
      )}
    </>
  )
}

export default FormSignup
