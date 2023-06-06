import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material"
import classNames from "classnames"
import { useState } from "react"
export type Option = {
  label: string
  value: string
}

type SelectProps = {
  options: Option[]
  // eslint-disable-next-line no-unused-vars
  onSelectOption: (option: Option) => void
  className?: string
  placeholder: string
}

export const SelectCustom = ({
  options,
  onSelectOption,
  className,
  placeholder
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleChange = (event: SelectChangeEvent) => {
    const value = options.find((item) => item.value == event.target.value)
    setSelectedOption(value!)
    onSelectOption(value!)
  }

  return (
    <div className={classNames("relative min-w-[200px] h-10 ", className)}>
      <FormControl size="small" fullWidth>
        <InputLabel>{placeholder}</InputLabel>
        <Select
          value={selectedOption?.value}
          label={placeholder}
          onChange={handleChange}
        >
          {options.map((opt, index) => (
            <MenuItem key={index} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
