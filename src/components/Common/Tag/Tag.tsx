import classNames from "classnames"
import React, { ReactNode } from "react"
interface Props {
  className?: string
  children: ReactNode
}

const Tag = ({ className, children }: Props) => {
  return (
    <div
      className={classNames(
        "px-[10px] py-1 bg-primary text-primary bg-opacity-20 flex items-center justify-center rounded-md",
        className
      )}
    >
      <span>{children}</span>
    </div>
  )
}

export default Tag
