import Link from "next/link"
import React, { ReactNode } from "react"
interface Props {
  children: ReactNode
  href: string
}

const MenuItem = ({ children, href }: Props) => {
  return (
    <Link href={href} passHref className="text-black">
      <p className="relative group">
        <span className="md:text-sm lg:text-base group-hover:text-primary">
          {children}
        </span>
        <span className="absolute left-0 w-0 h-[3px] transition-all duration-300 bg-primary -bottom-1 group-hover:w-full"></span>
      </p>
    </Link>
  )
}

export default MenuItem
