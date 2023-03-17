import { yupResolver } from "@hookform/resolvers/yup"
import { Alert, Divider } from "@mui/material"

import GoogleIcon from "components/Common/Icon/GoogleIcon"
import Spinner from "components/Common/Loading/LoadingIcon"
import CustomButton from "components/User/Button"
import { CustomInput, CustomInputPassword } from "components/User/Input"
import useUserGoogle from "hooks/auth/useUserGoogle"
import jwt_decode from "jwt-decode"
import ButtonIcon from "module/Auth/components/ButtonIcon"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { authService } from "services/auth.service"
import { routerByRole } from "shared/helpers/helper"
import { token } from "shared/utils/token"
import { loginUser } from "store/module/auth/action-creators"
import { useAppDispatch } from "store/store"
import { ITokenDecode } from "types/Token"
import * as yup from "yup"

const schema = yup.object({
  username: yup.string().required("Please enter your user name"),
  password: yup.string().required("Please enter your password")
})
const FormLogin = () => {
  const { action, profile, error } = useUserGoogle()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })
  const handleSignIn = async (values: FieldValues) => {
    try {
      const result = await authService.signIn(values.username, values.password)
      if (result.isSuccess) {
        handleNavigate(result.data.accessToken, result.data.refreshToken)
        setIsError(false)
      } else {
        setIsError(true)
      }
    } catch (error) {
      setIsError(true)
      console.log("handleSignIn ~ error", error)
    }
  }
  const handleNavigate = (accessToken: string, refreshToken: string) => {
    token.saveToken(accessToken, refreshToken)
    const payload = jwt_decode(accessToken) as ITokenDecode
    dispatch(
      loginUser({
        userId: payload.UserID,
        role: payload.role
      })
    )
    router.push(routerByRole(payload.role), undefined, { shallow: true })
  }
  useEffect(() => {
    if (error) {
      toast.error("Login failed, please try again!!!")
    }
  }, [error])
  useEffect(() => {
    if (profile) {
      const login = async () => {
        const res = await authService.signInWithGoogle(profile.access_token)
        console.log("login ~ res:", res)
        try {
          if (res.isSuccess) {
            console.log("login ~ res:", res)
            handleNavigate(res.data.accessToken, res.data.refreshToken)
            toast.success("Sign in successfuly")
          } else {
            toast.error(res.message || "Login failed, please try again!!!")
          }
        } catch (error) {
          console.error("login ~ error:", error)
          toast.error("Login failed, please try again!!!")
        }
      }
      login()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])
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
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col mt-3 space-y-5 md:mt-5"
      >
        <CustomInput
          label="User name"
          control={control}
          name="username"
          error={!!errors.username}
          helperText={errors.username?.message?.toString()}
        />
        <CustomInputPassword
          label="Password"
          control={control}
          name="password"
          error={!!errors.password}
          errorMessage={errors.password?.message?.toString()}
        />
        <Link
          href={"/reset-password"}
          className="!mt-2 text-right no-underline hover:underline hover:decoration-primary"
        >
          <span className="text-primary">Forgot password!</span>
        </Link>
        {isError && (
          <Alert icon={<AiOutlineExclamationCircle />} severity="error">
            User Name or password incorrect
          </Alert>
        )}
        <CustomButton
          kind="primary"
          className="rounded-md md:h-[42px]"
          type="submit"
        >
          {isSubmitting ? <Spinner /> : "Sign In"}
        </CustomButton>
      </form>
      <p className="text-center mt-5 text-[#4E5D78">
        {"You haven't any account?"}{" "}
        <Link
          href={"/sign-up"}
          className="no-underline hover:underline hover:decoration-primary"
        >
          <span className="text-primary">Sign Up</span>
        </Link>
      </p>
    </div>
  )
}

export default FormLogin
