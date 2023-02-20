import classNames from "classnames"
import ChangeLanguage from "components/Common/ChangeLanguage"
import CustomButton from "components/User/Button"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import { MenuItem } from "../Menu"
import UserAvatar from "../UserAvatar/UserAvatar"
interface Props {
  show: boolean
  onClose: () => void
}
const Navbar = ({ show = false, onClose }: Props) => {
  const auth = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation("home")
  return (
    <div
      className={classNames(
        "fixed z-10 md:relative left-0 top-0 w-[260px] md:w-full md:h-auto h-full bg-white md:bg-transparent shadow-md md:shadow-none px-5 py-4 md:p-0 flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:justify-between transition-all",
        show ? "" : "-translate-x-full md:translate-x-0"
      )}
    >
      <span
        className="absolute top-0 right-0 p-2 cursor-pointer md:hidden"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <div className="flex flex-col items-center justify-between w-full space-y-5 md:space-x-8 md:space-y-0 md:flex-row md:justify-start">
        <Link href="/" className="relative scale-90 md:scale-100 w-[130px] h-9">
          <Image
            src={"/images/logo.png"}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="elinic"
            className="cursor-pointer"
          />
        </Link>
        <ul className="flex flex-col items-center space-y-6 list-none md:flex-row md:space-y-0 md:space-x-10">
          <MenuItem href="/forum">{t("banner.menu.Portal")}</MenuItem>
          <MenuItem href="/">{t("banner.menu.Services")}</MenuItem>
          <MenuItem href="/">{t("banner.menu.Booking")}</MenuItem>
          <MenuItem href="/">{t("banner.menu.Contact")}</MenuItem>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-start w-full h-auto space-x-0 space-y-3 md:space-x-4 md:justify-start md:space-y-0 md:h-full md:flex-row md:w-auto">
        <ChangeLanguage />
        {auth.isLoggedIn ? (
          <>
            <UserAvatar />
          </>
        ) : (
          <>
            <Link
              href="/sign-up"
              passHref
              className="w-full no-underline md:w-auto"
            >
              <CustomButton kind="secondary" className="w-full md:w-auto">
                {t("banner.button.signup")}
              </CustomButton>
            </Link>
            <Link
              href="/sign-in"
              passHref
              className="w-full no-underline md:w-auto"
            >
              <CustomButton kind="primary" className="w-full md:w-[120px]">
                {t("banner.button.signin")}
              </CustomButton>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
