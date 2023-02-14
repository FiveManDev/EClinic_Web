import { BaseTextFieldProps, TextField } from "@mui/material"
import classNames from "classnames"
import { Control, useController } from "react-hook-form"

interface Props extends BaseTextFieldProps {
  name: string
  label: string
  control: Control<any>
}

const CustomInput = ({
  name,
  label,
  fullWidth = true,
  size = "small",
  control,
  className,
  ...props
}: Props) => {
  const { field } = useController({
    control,
    name,
    defaultValue: ""
  })
  return (
    <TextField
      className={classNames("", className)}
      label={label}
      fullWidth={fullWidth}
      size={size}
      {...field}
      {...props}
    />
  )
}

export default CustomInput
