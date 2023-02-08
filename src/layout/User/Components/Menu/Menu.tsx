import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Navbar from "../Nav"

const Menu = () => {
  const [show, setShow] = useState(false)
  const handlerNav = () => {
    setShow(!show)
  }
  return (
    <>
      <div className="flex items-center justify-between px-5 md:px-[60px] lg:max-w-[1440px]  w-full h-full mx-auto">
        <div className="relative scale-90 md:scale-100 w-[130px] h-9 md:hidden ">
          <Link href="/">
            <Image
              src={"/images/logo.png"}
              fill
              sizes=""
              alt="elinic"
              className="cursor-pointer"
            />
          </Link>
        </div>
        {show && (
          <div
            className="fixed top-0 right-0 w-full h-full bg-black md:w-0 md:h-0 bg-opacity-20"
            onClick={() => handlerNav()}
          ></div>
        )}
        <Navbar show={show} onClose={handlerNav} />
        {/* Humberger */}
        <span className="cursor-pointer md:hidden" onClick={() => handlerNav()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </span>
      </div>
    </>
  )
}

export default Menu