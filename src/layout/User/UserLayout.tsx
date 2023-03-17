import dynamic from "next/dynamic"
import { Footer } from "./Components"
const Header = dynamic(
  () => import("./Components").then((module) => module.Header),
  {
    ssr: false
  }
)
export interface IUserLayout extends React.ComponentPropsWithoutRef<"div"> {
  justify?: "items-center" | "items-start"
}

const UserLayout: React.FC<IUserLayout> = ({
  children,
  justify = "items-center",
  ...divProps
}) => {
  return (
    <>
      <div {...divProps} className={`min-h-screen flex flex-col ${justify} `}>
        <Header />
        <div className="flex-1 w-full">{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default UserLayout
