import { yupResolver } from "@hookform/resolvers/yup"
import Spinner from "components/Common/Loading/LoadingIcon"
import CustomButton from "components/User/Button"
import { CustomInputPassword } from "components/User/Input"
import {
  IChangePassowrd,
  useAccountChangePassowordMutation
} from "hooks/query/account/useAccount"
import { FieldValues, useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup.object({
  oldPassword: yup.string().required("Please enter your old password"),
  newPassword: yup.string().required("Please enter your new password"),
  confirmPassword: yup
    .string()
    .required("Please enter new confirm password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
})
const ChangePassword = () => {
  const { mutate, isLoading } = useAccountChangePassowordMutation()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })
  const handleChangePassowrd = (value: FieldValues) => {
    mutate(value as IChangePassowrd, {
      onSuccess: () => {
        reset()
      }
    })
  }
  return (
    <form
      onSubmit={handleSubmit(handleChangePassowrd)}
      className="grid grid-cols-2 gap-6"
    >
      <CustomInputPassword
        size="medium"
        label="Old Password"
        control={control}
        name="oldPassword"
        error={!!errors.oldPassword}
        errorMessage={errors.oldPassword?.message?.toString()}
      />
      <CustomInputPassword
        size="medium"
        label="New Password"
        control={control}
        name="newPassword"
        error={!!errors.newPassword}
        errorMessage={errors.newPassword?.message?.toString()}
      />
      <CustomInputPassword
        size="medium"
        label="Enter confirm new password"
        control={control}
        name="confirmPassword"
        error={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message?.toString()}
      />
      <div className=""></div>
      <CustomButton type="submit" isLoading={isLoading}>
        Update password
      </CustomButton>
    </form>
  )
}

export default ChangePassword
