import { Menu } from "../Menu"

const Header = () => {
  return (
    <header className="fixed top-0 z-20 w-full h-16 md:h-[72px] bg-white border-b border-solid border-gray-200">
      <Menu />
    </header>
  )
}
export default Header
