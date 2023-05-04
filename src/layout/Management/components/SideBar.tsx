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
    <nav className="flex flex-col items-center px-3 py-6 max-w-[250px] w-full bg-white ">
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
              "flex items-center gap-5 p-3 font-medium rounded-md hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all mb-3",
              asPath == item.link
                ? "bg-primary bg-opacity-10 text-primary"
                : "text-gray80"
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
