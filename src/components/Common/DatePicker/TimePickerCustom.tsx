import { Popover } from "@mui/material"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import React from "react"
import { renderQuarterArray } from "shared/helpers/helper"

const TimePickerCustom = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null)
  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <div className="max-w-[120px] w-full">
      <input
        onClick={(e) => handleClick(e)}
        type="text"
        placeholder="From"
        className="flex items-center justify-center w-full px-3 py-2 text-gray-400 bg-transparent border border-gray-400 border-solid rounded-md cursor-pointer hover:border-primary hover:border-2 "
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <OverlayScrollbarsComponent defer>
          <div className="max-h-[300px] h-full space-y-2">
            {renderQuarterArray().map((item, index) => (
              <p
                className="w-[120px] py-2 px-3 hover:bg-gray-200  cursor-pointer transition-all"
                key={index}
              >
                {item}
              </p>
            ))}
          </div>
        </OverlayScrollbarsComponent>
      </Popover>
    </div>
  )
}

export default TimePickerCustom
