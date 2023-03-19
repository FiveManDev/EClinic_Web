import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
export type ItemSidebar = {
  icon: ReactNode
  title: string
  link: string
  onClick?: () => void
}
export type Props = {
  items: ItemSidebar[]
}
const SideBar = ({ items }: Props) => {
  const { asPath } = useRouter()

  return (
    <nav className="flex flex-col items-center px-[14px] py-6 max-w-[250px] w-full bg-white">
      <div className="relative scale-90 md:scale-100 w-[150px] h-9 mb-11">
        <Link href="/">
          <Image
            src={"/images/logo.png"}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="elinic"
            className="object-contain cursor-pointer"
          />
        </Link>
      </div>
      <ul className="flex flex-col w-full">
        {items.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={classNames(
              "flex items-center h-12 rounded-[10px] space-x-[14px] w-full px-3 py-4 text-sm transition-transform",
              asPath == item.link
                ? "bg-[#0C0B1A] text-white font-semibold"
                : "font-light text-[#5F666F]"
            )}
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default SideBar
