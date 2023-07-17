import ChangeLanguage from "components/Common/ChangeLanguage"
import Notification from "components/Common/Notification"
import CustomButton from "components/User/Button"
import DrawerCustom from "components/User/Drawer"
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
const MENU = [
  {
    title: "Hồ sơ ",
    href: "/user/my-profile"
  }
]
const Navbar = ({ show = false, onClose }: Props) => {
  const auth = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation("home")
  return (
    <DrawerCustom
      show={show}
      onClose={onClose}
      className="flex flex-col items-center space-y-5 md:flex-row md:space-y-0 md:justify-between w-[260px] md:w-full px-5 py-4 md:p-0"
    >
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
            priority
          />
        </Link>
        <ul className="flex flex-col items-center space-y-6 list-none md:flex-row md:space-y-0 md:space-x-10">
          <MenuItem href="/forum">{t("banner.menu.Portal")}</MenuItem>
          <MenuItem href="/services">{t("banner.menu.Services")}</MenuItem>
          <MenuItem href="/doctors">{t("banner.menu.Doctor")}</MenuItem>
          <MenuItem href="/blog">{t("banner.menu.Blog")}</MenuItem>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-start w-full h-auto space-x-0 space-y-3 md:space-x-4 md:justify-start md:space-y-0 md:h-full md:flex-row md:w-auto">
        <ChangeLanguage />
        {auth.isLoggedIn ? (
          <>
            <Notification />
            <UserAvatar menu={MENU} />
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
    </DrawerCustom>
  )
}

export default Navbar
