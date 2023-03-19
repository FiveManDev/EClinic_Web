import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import Spinner from "components/Common/Loading/LoadingIcon"
import CustomButton from "components/User/Button"
import { CustomInput, CustomInputPassword } from "components/User/Input"
import {
  IResetPassowrd,
  useAccountResetPassowordMutation
} from "hooks/query/account/useAccount"
import ConfirmCode from "module/Auth/SignUp/components/ConfirmCode"
import Link from "next/link"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { emailService } from "services/mail.service"
import * as yup from "yup"

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email address"),
  newPassword: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
})
const Form = () => {
  const [code, setCode] = useState<string | null>(null)
  const [emailVerify, setEmailVerify] = useState<string | null>(null)
  const accountResetPassowordMutation = useAccountResetPassowordMutation()
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })
  const handleResetCode = async () => {
    getCodeFromEmail(emailVerify as string)
    toast.success("Send code again succesfully")
  }
  const getCodeFromEmail = async (email: string) => {
    toast.loading("Wait a minutes")
    try {
      const res = await emailService.verifyEmail(email)
      if (res.isSuccess) {
        setCode(res.data)
        setEmailVerify(email)
      } else {
        toast.error(res?.message || "Change passoword failed")
      }
    } catch (error) {
      toast.error("Change passoword failed")
    } finally {
      toast.dismiss()
    }
  }
  const handleSubmitForgot = async (values: FieldValues) => {
    getCodeFromEmail(values.email)
  }
  const handleChangePassword = () => {
    const values = getValues() as IResetPassowrd
    accountResetPassowordMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Change password successfully")
        reset({
          email: "",
          password: "",
          confirmPassword: ""
        })
        setEmailVerify("")
      },
      onError: (data) => {
        if (data instanceof AxiosError) {
          toast.error(data.response?.data.message)
        } else {
          toast.error("Update password Failed")
        }
      }
    })
  }
  return (
    <>
      {code && emailVerify ? (
        <ConfirmCode
          onSubmit={handleChangePassword}
          code={code}
          handleResetCode={handleResetCode}
          handleBack={() => setEmailVerify(null)}
          email={emailVerify}
        />
      ) : (
        <div className="md:max-w-[580px] w-full  bg-white rounded-md px-4 py-6 mt-7">
          <form
            onSubmit={handleSubmit(handleSubmitForgot)}
            className="flex flex-col space-y-5"
          >
            <CustomInput
              label="Email"
              control={control}
              name="email"
              error={!!errors.email}
              helperText={errors.email?.message?.toString()}
            />
            <CustomInputPassword
              label="New Password"
              control={control}
              name="newPassword"
              error={!!errors.newPassword}
              errorMessage={errors.newPassword?.message?.toString()}
            />
            <CustomInputPassword
              label="Confirm password"
              placeholder="Confirm password"
              control={control}
              name="confirmPassword"
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message?.toString()}
            />
            <CustomButton
              kind="primary"
              className="rounded-md md:h-[42px]"
              type="submit"
            >
              {isSubmitting ? <Spinner /> : "Sign Up"}
            </CustomButton>
          </form>
          <p className="text-center mt-5 text-[#4E5D78">
            Back to{" "}
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

export default Form
