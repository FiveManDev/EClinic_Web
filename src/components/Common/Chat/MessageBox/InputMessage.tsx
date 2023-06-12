import { IconButton } from "@mui/material"
import React from "react"
import {
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlinePhoto,
  HiPlus
} from "react-icons/hi2"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import styled from "@emotion/styled"
const MenuWrapper = styled(Menu)`
  .MuiPaper-elevation {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`

const InputMessage = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className="flex items-end w-full px-5 py-4 bg-white gap-x-2 ">
      <IconButton size="medium" onClick={handleClick}>
        <HiPlus />
      </IconButton>
      <MenuWrapper
        elevation={0}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <div className="flex items-center space-x-2">
            <HiOutlinePhoto />
            <span>Attack images</span>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="flex items-center space-x-2">
            <HiOutlinePaperClip />
            <span>Attack files</span>
          </div>
        </MenuItem>
      </MenuWrapper>

      <div className="flex-1 w-full px-2 py-1 bg-gray-100 rounded-md">
        <input
          type="text"
          className="py-2.5 my-auto bg-transparent border-none outline-none placeholder:text-disable text-grayPrimary w-full"
          placeholder="Type a message"
        />
      </div>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
        <IconButton size="small" className="text-white">
          <HiOutlinePaperAirplane />
        </IconButton>
      </div>
    </div>
  )
}

export default InputMessage
