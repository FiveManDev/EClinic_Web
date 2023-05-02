import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material"
import Zoom from "@mui/material/Zoom"
import { TransitionProps } from "@mui/material/transitions"
import React from "react"
import CustomButton from "../Button"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Zoom timeout={50} ref={ref} {...props} />
})
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
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        {content && (
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <CustomButton
            kind="tertiary"
            onClick={handleClose}
            className="text-gray-600"
            autoFocus
          >
            {btnDisagree}
          </CustomButton>
          <CustomButton
            kind="primary"
            color="error"
            className="bg-red-600"
            onClick={onConfirm}
          >
            {btnAgree}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AlertCustom
