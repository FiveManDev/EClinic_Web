import dynamic from "next/dynamic"
import {LeftPanel} from "./Components"
const Header = dynamic(
  () => import("./Components").then((module) => module.Header),
  {
    ssr: false
  }
)
export interface IUserLayout extends React.ComponentPropsWithoutRef<"div"> {
  justify?: "items-center" | "items-start"
}

const AdminLayout: React.FC<IUserLayout> = ({
  children,
  justify = "items-center",
  ...divProps
}) => {
  return (
    <>
      <div {...divProps} className={`min-h-screen flex flex-col ${justify} bg-[#F6F8FB]`}>
        <Header />
        <LeftPanel />
        {children}
      </div>
    </>
  )
}

export default AdminLayout
