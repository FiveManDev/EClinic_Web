import CustomButton from "components/User/Button"
import Image from "next/image"
import Link from "next/link"
type Props = {}

const Header = (props: Props) => {
  return (
    <header className="w-full h-[84px] bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.08)]  ">
      <div className="flex items-center justify-between px-[60px] max-w-[1440px] w-full h-full mx-auto">
        <Image
          src={"/images/logo.png"}
          width={130}
          height={36}
          alt="elinic"
          className="cursor-pointer"
        />
        <ul className="flex space-x-11 list-none">
          <li>Cổng thông tin</li>
          <li>Dịch vụ</li>
          <li>Đặt Khám</li>
          <li>Liên hệ</li>
        </ul>
        <div className="flex items-center space-x-4">
          <Link href="/sign-up" passHref className="no-underline">
            <CustomButton kind="secondary">Đăng kí</CustomButton>
          </Link>
          <Link href="/login" passHref className="no-underline">
            <CustomButton kind="primary">Đăng nhập</CustomButton>
          </Link>
        </div>
      </div>
    </header>
  )
}
export default Header
