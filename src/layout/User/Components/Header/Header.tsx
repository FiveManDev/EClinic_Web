import { Menu } from "../Menu"

const Header = () => {
  return (
    <header className="fixed top-0 z-20 w-full h-16 md:h-[72px] bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.08)] ">
      <Menu />
    </header>
  )
}
export default Header
