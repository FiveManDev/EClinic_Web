import React from "react"
import { Button, ButtonTypeMap, ButtonProps } from "@mui/material"
interface Props extends ButtonProps {
  kind: "primary" | "secondary" | "tertiary`"
}

const CustomButton = ({ kind, ...props }: Props) => {
  const variant =
    kind === "primary"
      ? "contained"
      : kind === "secondary"
      ? "outlined"
      : "text"
  return (
    <Button
      variant={variant}
      className={`rounded-[10px] flex items-center justify-center h-11 min-w-[95px] ${
        kind === "primary"
          ? "bg-primary hover:bg-opacity-90"
          : "border-primary outline-primary text-primary"
      }`}
      disableElevation
      {...props}
    >
      {props.children}
    </Button>
  )
}
export default CustomButton
