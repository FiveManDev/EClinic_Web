import SideBar, { ItemSidebar } from "./components/SideBar"
import TopBar from "./components/TopBar"
export interface IManagmentLayout
  extends React.ComponentPropsWithoutRef<"div"> {
  justify?: "items-center" | "items-start"
  sidebars: ItemSidebar[]
}

const ManagmentLayout: React.FC<IManagmentLayout> = ({
  children,
  sidebars,
  ...divProps
}) => {
  return (
    <>
      <div {...divProps} className="flex min-h-screen">
        <SideBar items={sidebars} />
        <div className="flex-1 w-full">
          <div className="flex flex-col">
            <TopBar />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManagmentLayout
