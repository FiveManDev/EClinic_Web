import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import GoogleIcon from "components/Common/Icon/GoogleIcon"
import CustomButton from "components/User/Button"
import dayjs, { Dayjs } from "dayjs"
import ButtonIcon from "module/Auth/components/ButtonIcon"
import Link from "next/link"
import React from "react"
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2"

const FormSignup = () => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  )
  const [showPassword, setShowPassword] = React.useState(false)
  const handleChangeDate = (newValue: Dayjs | null) => {
    setValue(newValue)
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <div className="md:max-w-[580px] w-full  bg-white rounded-md shadow-[1.69138px_-2.81897px_19.7328px_rgba(205,_205,_212,_0.1)] px-4 py-6 mt-7">
      <ButtonIcon text="Log in with Google" icon={<GoogleIcon />} />
      <Divider className="my-[30px]">
        <span className="text-[10px] text-[#4E5D78] md:text-lg">OR</span>
      </Divider>
      <div className="flex flex-col space-y-5">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
        />
        <TextField
          id="outlined-basic"
          label="Your Name"
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
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
            <FormControlLabel
              value="other"
              control={<Radio size="small" />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
        <CustomButton kind="primary" className="rounded-md md:h-[42px]">
          Sign Up
        </CustomButton>
      </div>
      <p className="text-center mt-5 text-[#4E5D78">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="no-underline  hover:underline hover:decoration-primary"
        >
          <span className="text-primary">Sign In</span>
        </Link>
      </p>
    </div>
  )
}

export default FormSignup
