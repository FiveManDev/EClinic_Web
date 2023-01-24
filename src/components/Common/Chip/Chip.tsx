import { Chip, ChipProps } from "@mui/material"
import classNames from "classnames"

interface Props {
  label: string
  className?: string
}

const ChipCustom = ({ label, className, ...props }: Props) => {
  return (
    <div
      className={classNames(
        "h-[34px] px-5 py-2 w-max bg-[#F3F6FD] rounded-[4px] font-semibold text-h1 flex items-center justify-center text-sm",
        className
      )}
      {...props}
    >
      {label}
    </div>
  )
}

export default ChipCustom
