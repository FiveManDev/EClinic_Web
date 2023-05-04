import { ButtonProps } from "@mui/material"
import Button from "@mui/material/Button"
import classNames from "classnames"
interface Props extends ButtonProps {
  kind: "primary" | "secondary" | "tertiary"
}

const CustomButton = ({ kind, className, ...props }: Props) => {
  const variant =
    kind === "primary"
      ? "contained"
      : kind === "secondary"
      ? "outlined"
      : "text"
  return (
    <Button
      variant={variant}
      className={classNames(
        `rounded-md flex items-center justify-center h-11 min-w-[95px] normal-case hover:scale-[1.02] transition-all ${
          kind === "primary"
            ? "bg-primary hover:bg-opacity-90"
            : "border-primary outline-primary text-primary"
        }`,
        className
      )}
      disableElevation
      {...props}
    >
      {props.children}
    </Button>
  )
}
export default CustomButton
