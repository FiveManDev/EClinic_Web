import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material"
import GoogleIcon from "components/Common/Icon/GoogleIcon"
import CustomButton from "components/User/Button"
import ButtonIcon from "module/Auth/components/ButtonIcon"
import Link from "next/link"
import React from "react"
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2"
type Props = {}

const FormLogin = (props: Props) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <div className="md:max-w-[580px] w-full  bg-white rounded-md shadow-[1.69138px_-2.81897px_19.7328px_rgba(205,_205,_212,_0.1)] px-4 py-6 mt-7">
      <ButtonIcon text="Log in with Google" icon={<GoogleIcon />} />
      <div className="flex flex-col space-y-5 mt-3 md:mt-5">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
        />
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <CustomButton kind="primary" className="rounded-md md:h-[42px]">
          Sign In
        </CustomButton>
      </div>
      <p className="text-center mt-5 text-[#4E5D78">
        You haven't any account?{" "}
        <Link
          href={"/sign-up"}
          className="no-underline  hover:underline hover:decoration-primary"
        >
          <span className="text-primary">Sign Up</span>
        </Link>
      </p>
    </div>
  )
}

export default FormLogin
