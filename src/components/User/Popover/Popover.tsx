import classNames from "classnames"
import useClickOutSide from "hooks/useClickOutSide"
import React, { useState } from "react"
import { Position } from "types/Base.type"
interface PopoverProps {
  position: Position
  children?: React.ReactNode
  className?: string
  buttonTrigger: React.ReactNode
}
function Popover({
  position = "left",
  children,
  className = "z-10",
  buttonTrigger
}: PopoverProps) {
  const [isShowSettings, setIsShowSettings] = useState(false)
  const { nodeRef } = useClickOutSide(() => setIsShowSettings(false))
  const handleToggleSettings = () => {
    setIsShowSettings((s) => !s)
  }
  if (typeof document === "undefined") return null

  return (
    <div className={classNames(className, "relative")} ref={nodeRef}>
      <div onClick={handleToggleSettings}>{buttonTrigger}</div>
      <div
        className={classNames(
          "absolute top-full z-10",
          position === "right"
            ? "-translate-x-full"
            : position === "center"
            ? "-translate-x-2/4 left-2/4"
            : ""
        )}
      >
        {isShowSettings && children}
      </div>
    </div>
  )
}
export default Popover
