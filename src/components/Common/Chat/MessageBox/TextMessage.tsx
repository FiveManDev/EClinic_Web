import { IconButton } from "@mui/material"
import classNames from "classnames"
import ImageCustom from "components/Common/ImageCustom"
import React from "react"
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2"
interface IProps {
  kind?: "owner" | "other"
}
const TextMessage = ({ kind = "other" }: IProps) => {
  return (
    <div
      className={classNames(
        "flex items-end gap-x-2",
        kind === "owner" && "flex-row-reverse"
      )}
    >
      <div className="relative w-10 h-10 overflow-hidden rounded-full">
        <ImageCustom
          src={"/images/avatars/avatar_2.jpg"}
          fill
          alt="user-avatar"
          className="object-cover"
        />
      </div>
      <div
        className={classNames(
          "flex items-center gap-x-2",
          kind === "owner" && "flex-row-reverse"
        )}
      >
        <div className="flex flex-col">
          <time className="text-xs text-disable">Today 7.59 am</time>
          <div
            className={classNames(
              "max-w-[266px] rounded-xl py-3 text-sm",
              kind === "other"
                ? "rounded-bl-none pl-[10px] pr-7 bg-gray-100"
                : "rounded-br-none pr-[10px] pl-7 bg-primary bg-opacity-80 text-white"
            )}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <IconButton>
          <span className="text-3xl text-disable">
            <HiOutlineEllipsisHorizontal />
          </span>
        </IconButton>
      </div>
    </div>
  )
}

export default TextMessage
