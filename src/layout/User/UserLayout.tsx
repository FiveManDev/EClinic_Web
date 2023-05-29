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
  footer?: boolean
}

const UserLayout: React.FC<IUserLayout> = ({
  children,
  footer = true,
  justify = "items-center",
  ...divProps
}) => {
  return (
    <>
      <div {...divProps} className={`min-h-screen flex flex-col ${justify} `}>
        <Header />
        <div className="flex flex-col flex-1 w-full">{children}</div>
        {footer && <Footer />}
      </div>
    </>
  )
}

export default UserLayout
