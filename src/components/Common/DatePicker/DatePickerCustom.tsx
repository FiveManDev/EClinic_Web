import { FormControlProps } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Control, useController } from "react-hook-form"

interface Props extends FormControlProps {
  name: string
  label: string
  control: Control<any>
  onErrorField: (value: string) => void
  errorMessage?: string | undefined
  inputFormat?: string
}
const DatePickerCustom = ({
  name,
  label,
  errorMessage,
  control,
  onErrorField,
  inputFormat = "MM/DD/YYYY"
}: Props) => {
  const { field } = useController({
    control,
    name,
    defaultValue: ""
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture
        label={label || "Date of birth"}
        format={inputFormat}
        onError={(reason) => onErrorField(reason?.toString() || "")}
        {...field}
        slotProps={{
          textField: {
            helperText: errorMessage
          }
        }}
      />
    </LocalizationProvider>
  )
}

export default DatePickerCustom
