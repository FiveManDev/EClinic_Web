import CustomButton from "components/User/Button"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
import UserAvatar from "../UserAvatar/UserAvatar"

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <header className="w-full h-[80px] bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.08)]  ">
      <div className="flex items-center justify-between px-[60px] max-w-[1440px] w-full h-full mx-auto">
        <div className="relative w-[130px] h-9">
          <Link href="/">
            <Image
              src={"/images/logo.png"}
              width={130}
              height={36}
              alt="elinic"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <ul className="flex space-x-11 list-none">
          <li key={1}>Cổng thông tin</li>
          <li key={2}>Dịch vụ</li>
          <li key={3}>Đặt Khám</li>
          <li key={4}>Liên hệ</li>
        </ul>
        <div className="flex items-center space-x-4 h-full ">
          {auth.isLoggedIn ? (
            <>
              <UserAvatar />
            </>
          ) : (
            <>
              <Link href="/sign-up" passHref className="no-underline">
                <CustomButton kind="secondary">Đăng kí</CustomButton>
              </Link>
              <Link href="/sign-in" passHref className="no-underline">
                <CustomButton kind="primary">Đăng nhập</CustomButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
