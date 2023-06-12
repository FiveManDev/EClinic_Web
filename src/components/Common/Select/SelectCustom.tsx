import {
  FormControl,
  FormControlPropsSizeOverrides,
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

interface SelectProps {
  options: Option[]
  // eslint-disable-next-line no-unused-vars
  onSelectOption: (option: Option) => void
  className?: string
  placeholder: string
  isLoading?: boolean
  value: string
  size?: "small" | "medium"
}

export const SelectCustom = ({
  options,
  onSelectOption,
  className,
  placeholder,
  value,
  isLoading = false,
  size = "small"
}: SelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const value = options.find((item) => item.value == event.target.value)
    onSelectOption(value!)
  }

  return (
    <div className={classNames("relative min-w-[200px] h-10 ", className)}>
      <FormControl size={size === "small" ? "small" : "medium"} fullWidth>
        <InputLabel>{placeholder}</InputLabel>
        <Select value={value} label={placeholder} onChange={handleChange}>
          {isLoading ? (
            <div>loading</div>
          ) : (
            options.map((opt, index) => (
              <MenuItem key={index} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  )
}
