import { ButtonProps } from "@mui/material"
import Button from "@mui/material/Button"
import classNames from "classnames"
import Spinner from "components/Common/Loading/LoadingIcon"
interface Props extends ButtonProps {
  kind: "primary" | "secondary" | "tertiary"
  isLoading?: boolean
}

const CustomButton = ({
  kind,
  className,
  isLoading = false,
  ...props
}: Props) => {
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
        `rounded-[10px] flex items-center justify-center h-11 min-w-[95px] normal-case hover:scale-[1.02] transition-all ${
          kind === "primary"
            ? "bg-primary hover:bg-opacity-90"
            : "border-primary outline-primary text-primary"
        }`,
        className
      )}
      disableElevation
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : props.children}
    </Button>
  )
}
export default CustomButton
