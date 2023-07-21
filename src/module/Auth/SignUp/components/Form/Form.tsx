import { yupResolver } from "@hookform/resolvers/yup"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material"

import { useMutation } from "@tanstack/react-query"
import DatePickerCustom from "components/Common/DatePicker/DatePickerCustom"
import CustomButton from "components/User/Button"
import { CustomInput, CustomInputPassword } from "components/User/Input"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { authService } from "services/auth.service"
import { ISignupForm } from "types/Auth"
import * as yup from "yup"
import ConfirmCode from "../ConfirmCode"
import { routers } from "shared/constant/routers"
import { RESEND_CODE_TYPE } from "shared/constant/constant"

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
  const router = useRouter()
  const [countError, setCountError] = useState(0)

  const [keyVerify, setKeyVerify] = useState<string | null>(null)
  const confirmSignUpMutation = useMutation({
    mutationFn: (data: { code: string; key: string }) =>
      authService.confirmSignUp(data.code, data.key)
  })
  const signUpMutation = useMutation({
    mutationFn: (data: ISignupForm) => authService.signUp(data)
  })
  const resendCodeMutaiton = useMutation({
    mutationFn: (data: { key: string; type: number }) =>
      authService.resendCode(data.key, data.type)
  })

  const {
    handleSubmit,
    register,
    control,
    setError,
    setFocus,
    getValues,
    formState: { errors }
  } = useForm<ISignupForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })

  const handleSignup = async (values: ISignupForm) => {
    signUpMutation.mutate(
      {
        ...values,
        dateOfBirth: dayjs(values.dateOfBirth, "YYYY-MM-DD").toISOString()
      },
      {
        onSuccess: (res) => {
          console.log("handleSignup ~ res:", res)
          setKeyVerify(res.data)
        },
        onError: (data: any) => {
          toast.error(data?.response?.data?.message || SIGN_UP_FAILED)
        }
      }
    )
  }
  const handleResetCode = async () => {
    resendCodeMutaiton.mutate(
      {
        key: keyVerify || "",
        type: RESEND_CODE_TYPE.SIGNUP
      },
      {
        onSuccess: () => {
          setCountError(0)
          toast.success("Send code again succesfully")
        },
        onError: () => {
          toast.error("Send code again failed!!")
        }
      }
    )
  }
  const handleSendcode = (code: string) => {
    confirmSignUpMutation.mutate(
      {
        code,
        key: keyVerify || ""
      },
      {
        onSuccess: () => {
          toast.success("Sign up successfuly!!")
          router.push(routers.signIn)
        },
        onError: (data: any) => {
          setCountError((prev) => prev + 1)
          toast.error(data?.response?.data?.message || "Send code failed!!")
        }
      }
    )
  }

  useEffect(() => {
    for (const fieldName of Object.keys(errors)) {
      if (errors[fieldName as keyof ISignupForm]) {
        setFocus(fieldName as any)
        break
      }
    }
  }, [errors, setFocus])
  return (
    <>
      {keyVerify ? (
        <ConfirmCode
          countError={countError}
          handleSencode={handleSendcode}
          handleResendCode={handleResetCode}
          handleBack={() => {
            setKeyVerify(null)
            countError > 0 && setCountError(0)
          }}
          email={getValues("email")}
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-[10px] text-[#4E5D78] font-bold text-center max-w-[280px] md:max-w-[488px] mx-auto mt-[42px]">
            <h1 className="text-lg md:text-[30px]">Getting Started</h1>
            <h3 className="text-sm md:text-base">
              Create an account to continue and connect with the people.
            </h3>
          </div>

          <div className="w-full px-4 py-6 bg-white rounded-md mt-7">
            <form
              onSubmit={handleSubmit(handleSignup)}
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
                isLoading={signUpMutation.isLoading}
                kind="primary"
                className="rounded-md md:h-[42px]"
                type="submit"
              >
                Sign Up
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
        </div>
      )}
    </>
  )
}

export default FormSignup
