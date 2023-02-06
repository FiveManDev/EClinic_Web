import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import classNames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"
import { LANGUAGE, LOCALSTORAGE } from "shared/constant/constant"
interface Props {
  className?: string
}
const ChangeLanguage = ({ className }: Props) => {
  const { i18n } = useTranslation()
  const handleChange = (event: SelectChangeEvent) => {
    localStorage.setItem(LOCALSTORAGE.LANGUAGE, event.target.value)
    i18n.changeLanguage(event.target.value)
  }
  return (
    <>
      <Select
        className={classNames("w-[110px] text-sm", className)}
        value={i18n.language}
        size="small"
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={LANGUAGE.VIETNAM}>Tiếng Việt</MenuItem>
        <MenuItem value={LANGUAGE.ENGLISH}>EngLish</MenuItem>
      </Select>
    </>
  )
}

export default ChangeLanguage
