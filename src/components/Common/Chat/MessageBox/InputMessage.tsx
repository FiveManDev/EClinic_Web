import styled from "@emotion/styled"
import { IconButton } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import classNames from "classnames"
import { useCreateChatMessage } from "hooks/query/chat/message"
import React, { useState } from "react"
import {
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlinePhoto,
  HiPlus
} from "react-icons/hi2"
const MenuWrapper = styled(Menu)`
  .MuiPaper-elevation {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`
interface Props {
  // eslint-disable-next-line no-unused-vars
  onCreate: (value: string) => void
  isLoading: boolean
}
const InputMessage = ({ onCreate, isLoading = false }: Props) => {
  const [messageText, setMessageText] = useState("")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          type="text"
          className="py-2.5 my-auto bg-transparent border-none outline-none placeholder:text-disable text-grayPrimary w-full"
          placeholder="Type a message"
        />
      </div>
      <div
        className={classNames(
          "flex items-center justify-center w-10 h-10 rounded-full bg-primary transition-all",
          (!messageText || isLoading) &&
            "bg-carbon bg-opacity-50 cursor-none pointer-events-none"
        )}
      >
        <IconButton
          size="small"
          className="text-white"
          disabled={!messageText || isLoading}
          onClick={() => onCreate(messageText)}
        >
          <HiOutlinePaperAirplane />
        </IconButton>
      </div>
    </div>
  )
}

export default InputMessage
