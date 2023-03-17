import SideBar, { ItemSidebar } from "./components/SideBar"
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
      <div {...divProps} className="min-h-screen  bg-[#F9F9F9] flex">
        <SideBar items={sidebars} />
        <div className="flex-1 w-full">{children}</div>
      </div>
    </>
  )
}

export default ManagmentLayout
