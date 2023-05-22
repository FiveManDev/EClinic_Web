import { IconButton } from "@mui/material"
import React from "react"
import { HiOutlinePaperAirplane, HiPlus } from "react-icons/hi2"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

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
      {/* <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <>
                <ChoiceAction />
              </>
            }
          >

          </Tooltip>
        </div>
      </ClickAwayListener> */}
      <IconButton size="medium" onClick={handleClick}>
        <HiPlus />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Attack images</MenuItem>
        <MenuItem onClick={handleClose}>Attack files</MenuItem>
      </Menu>

      <div className="flex-1 px-2 py-1 bg-gray-100 rounded-md ">
        <input
          type="text"
          className="py-2.5 my-auto bg-transparent border-none outline-none placeholder:text-disable text-grayPrimary"
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
