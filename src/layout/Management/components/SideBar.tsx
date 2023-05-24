import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
export type ItemSidebar = {
  icon?: ReactNode
  title?: string
  link?: string
  onClick?: () => void
  subItem?: ItemSidebar[]
}
export type Props = {
  items: ItemSidebar[]
}
const SideBar = ({ items }: Props) => {
  const { asPath, route } = useRouter()
  const [expandITem, setExpandITem] = useState<null | number>(null)
  const classItem =
    "flex items-center text-[15px] gap-x-5 p-3 font-medium mb-1 text-gray80 cursor-pointer"
  const classActive =
    "border-[4px] border-primary border-solid border-y-0 border-r-0 bg-primary bg-opacity-10 !text-primary"
  const classHover =
    "hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all hover:border-[4px] hover:border-primary hover:border-solid hover:border-y-0 hover:border-r-0"
  useEffect(() => {
    items.some((item, idx) =>
      item.subItem?.some((subItem) => {
        if (subItem.link === asPath) {
          setExpandITem(idx)
          return true
        }
        return false
      })
    )
  }, [route])
  return (
    <nav className="flex flex-col items-center py-6 w-[250px] flex-shrink-0 bg-white background-primary p-0 rounded-none ">
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
        {items.map((item, index) => {
          if (item.subItem) {
            return (
              <>
                <div
                  key={index}
                  className={classNames(classItem, "flex flex-col")}
                  onClick={() =>
                    setExpandITem(index === expandITem ? null : index)
                  }
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-x-5">
                      <span className="w-6 h-6">{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                    <span
                      className={classNames(
                        "w-5 h-5 transition-all",
                        index === expandITem && "rotate-90"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </div>
                  {index === expandITem && (
                    <ul className="flex flex-col w-full py-3 mt-2 bg-gray-100 rounded-sm">
                      {item.subItem.map((subItem, idx) => {
                        return (
                          <Link
                            href={subItem.link || asPath}
                            key={idx}
                            className={classNames(
                              classHover,
                              classItem,
                              asPath === subItem.link && classActive,
                              "pl-4"
                            )}
                          >
                            <span className="pl-6">{subItem?.title}</span>
                          </Link>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </>
            )
          } else {
            return (
              <Link
                href={item.link ? item.link : asPath}
                key={index}
                className={classNames(
                  classItem,
                  classHover,
                  asPath === item.link && classActive
                )}
                onClick={item.onClick}
              >
                <span className="w-6 h-6">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default SideBar
