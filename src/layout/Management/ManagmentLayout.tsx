import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
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
    <OverlayScrollbarsComponent
      defer
      options={{ scrollbars: { autoHide: "scroll" } }}
    >
      <div {...divProps} className="flex w-screen min-h-screen">
        <SideBar items={sidebars} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar />
          {children}
        </div>
      </div>
    </OverlayScrollbarsComponent>
  )
}

export default ManagmentLayout
