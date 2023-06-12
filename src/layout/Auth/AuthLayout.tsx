import ImageCustom from "components/Common/ImageCustom"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="grid grid-cols-2">
          <div className="relative w-full h-full min-h-screen">
            <ImageCustom
              src={"/images/background-auth.png"}
              fill
              alt="cover"
              priority
            />
            <Link
              href={"/"}
              className="absolute top-5 left-5 w-[160px] h-[50px]"
            >
              <ImageCustom
                priority
                src={"/images/logo.png"}
                fill
                alt="cover"
                className="object-contain"
              />
            </Link>
          </div>
          <main className="w-full m-auto max-w-[540px]">{children}</main>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
