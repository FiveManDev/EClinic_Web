import { Navbar } from "../NavBar"
import { AdminAvatar } from "../AdminAvatar"
const Header = () => {
  return (
    <header className="fixed top-0 z-20 w-full h-16 md:h-[72px] bg-[#F6F8FB] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.08)] ">
      <Navbar />
      <AdminAvatar />
    </header>
  )
}
export default Header
