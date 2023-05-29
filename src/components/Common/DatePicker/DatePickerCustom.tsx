import { FormControlProps, FormHelperText, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { Control, useController } from "react-hook-form"
interface Props extends FormControlProps {
  name: string
  label: string
  control: Control<any>
  // eslint-disable-next-line no-unused-vars
  onErrorField: (value: string) => void
  errorMessage?: string | undefined
  inputFormat?: string
}
const DatePickerCustom = ({
  name,
  label,
  errorMessage,
  size = "small",
  control,
  onErrorField,
  inputFormat = "MM/DD/YYYY"
}: Props) => {
  const { field } = useController({
    control,
    name,
    defaultValue: dayjs()
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture
        label={label || "Date of birth"}
        inputFormat={inputFormat}
        onError={(reason) => onErrorField(reason?.toString() || "")}
        {...field}
        renderInput={(params) => (
          <div className="flex flex-col ">
            <TextField {...field} {...params} size={size} />
            {errorMessage && (
              <FormHelperText className="text-error mx-[14px]">
                {errorMessage}
              </FormHelperText>
            )}
          </div>
        )}
      />
    </LocalizationProvider>
  )
}

export default DatePickerCustom
