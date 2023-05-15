import { BaseTextFieldProps, TextField } from "@mui/material"
import { Control, useController } from "react-hook-form"

interface Props extends BaseTextFieldProps {
  name: string
  label: string
  control?: Control<any> // Make control prop optional
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
  const FieldWithController = () => {
    const { field } = useController({
      control: control!,
      name,
      defaultValue: ""
    })

    return (
      <TextField
        className={className}
        label={label}
        fullWidth={fullWidth}
        size={size}
        {...field}
        {...props}
      />
    )
  }

  return control ? (
    <FieldWithController />
  ) : (
    <TextField
      className={className}
      label={label}
      fullWidth={fullWidth}
      size={size}
      {...props}
    />
  )
}

export default CustomInput
