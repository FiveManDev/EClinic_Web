import { BaseTextFieldProps, TextField } from "@mui/material"
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
  ...props
}: Props) => {
  const { field } = useController({
    control,
    name,
    defaultValue: ""
  })
  return (
    <TextField
      label={label}
      fullWidth={fullWidth}
      size={size}
      {...field}
      {...props}
    />
  )
}

export default CustomInput
