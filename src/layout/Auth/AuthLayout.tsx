import { Header } from "layout/User/Components"
import Image from "next/image"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.4)_0%,_rgba(255,_255,_255,_0.1)_100%)]">
      <header className="w-full h-[84px] bg-white">
        <div className="flex items-center justify-between px-4 md:px-[60px] max-w-[1440px] w-full h-full mx-auto">
          <div className="relative scale-90 md:scale-100 w-[130px] h-9">
            <Image
              src={"/images/logo.png"}
              fill
              alt="elinic"
              className="cursor-pointer object-contain"
            />
          </div>
        </div>
      </header>
      <main className="max-w-[580px] w-full mx-auto ">{children}</main>
    </div>
  )
}

export default AuthLayout
