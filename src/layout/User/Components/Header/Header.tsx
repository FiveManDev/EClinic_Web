import ChangeLanguage from "components/Common/ChangeLanguage"
import CustomButton from "components/User/Button"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import UserAvatar from "../UserAvatar/UserAvatar"

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation("home")

  return (
    <header className="fixed top-0 z-20 w-full h-16 md:h-[72px] bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.08)] ">
      <div className="flex items-center justify-between px-5 md:px-[60px] lg:max-w-[1440px]  w-full h-full mx-auto">
        <div className="flex items-center justify-between w-full space-x-8 md:justify-start">
          <div className="relative scale-90 md:scale-100 w-[130px] h-9 ">
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
          {/* Humberger */}
          <span className="cursor-pointer md:hidden">
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
          <ul className="hidden list-none md:space-x-10 md:flex">
            <ItemMenu>{t("banner.menu.Portal")}</ItemMenu>
            <ItemMenu>{t("banner.menu.Services")}</ItemMenu>
            <ItemMenu>{t("banner.menu.Booking")}</ItemMenu>
            <ItemMenu>{t("banner.menu.Contact")}</ItemMenu>
          </ul>
        </div>
        <div className="items-center hidden h-full space-x-4 md:flex ">
          <ChangeLanguage />
          {auth.isLoggedIn ? (
            <>
              <UserAvatar />
            </>
          ) : (
            <>
              <Link href="/sign-up" passHref className="no-underline">
                <CustomButton kind="secondary">
                  {t("banner.button.signup")}
                </CustomButton>
              </Link>
              <Link href="/sign-in" passHref className="no-underline">
                <CustomButton kind="primary" className="flex-shrink">
                  {t("banner.button.signin")}
                </CustomButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
function ItemMenu({ children }: { children: ReactNode }) {
  return (
    <>
      <p className="relative group">
        <span className="group-hover:text-primary">{children}</span>
        <span className="absolute left-0 w-0 h-[3px] transition-all duration-300 bg-primary -bottom-1 group-hover:w-full"></span>
      </p>
    </>
  )
}
export default Header
