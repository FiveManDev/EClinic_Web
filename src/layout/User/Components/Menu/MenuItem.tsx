import React, { ReactNode } from "react"
interface Props {
  children: ReactNode
}

const MenuItem = ({ children }: Props) => {
  return (
    <>
      <p className="relative group">
        <span className="group-hover:text-primary">{children}</span>
        <span className="absolute left-0 w-0 h-[3px] transition-all duration-300 bg-primary -bottom-1 group-hover:w-full"></span>
      </p>
    </>
  )
}

export default MenuItem
