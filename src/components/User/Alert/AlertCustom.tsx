import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material"
import CustomButton from "../Button"

type Props = {
  handleClose: () => void
  onConfirm: () => void
  open?: boolean
  title?: string
  content?: string
  btnAgree?: string
  btnDisagree?: string
}
const AlertCustom = ({
  title,
  content,
  open = false,
  handleClose,
  onConfirm,
  btnAgree = "Agree",
  btnDisagree = "Disagree"
}: Props) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {content && (
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <CustomButton kind="tertiary" onClick={handleClose} autoFocus>
            {btnDisagree}
          </CustomButton>
          <CustomButton kind="primary" onClick={onConfirm}>
            {btnAgree}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AlertCustom
