import Notification from "components/Common/Notification"
import UserAvatar from "layout/User/Components/UserAvatar/UserAvatar"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
const MENU = [
  {
    title: "Hồ sơ ",
    href: "/user/my-profile"
  }
]
const TopBar = () => {
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <div className="flex items-center justify-between w-full py-5 border border-t-0 border-solid px-7 border-x-0 border-b-carbon">
      {auth.isLoggedIn && (
        <div className="flex items-center ml-auto gap-x-4">
          <Notification />
          <UserAvatar menu={MENU} />
        </div>
      )}
    </div>
  )
}

export default TopBar
