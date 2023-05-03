import Notification from "components/Common/Notification"
import UserAvatar from "layout/User/Components/UserAvatar/UserAvatar"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "store/store"
const MENU = [
  {
    title: "Hồ sơ ",
    href: "/user/profile"
  }
]
const TopBar = () => {
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <div className="flex items-center justify-between w-full py-5 border border-t-0 border-solid px-7 border-x-0 border-b-carbon">
      <div className="flex items-center flex-1 gap-x-2">
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z"
            stroke="#828A9D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 16.5L14.25 14.25"
            stroke="#828A9D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by doctor’s name..."
          className="flex-1 text-sm bg-transparent border-none outline-0 placeholder:text-disable max-w-[300px] w-full"
        />
      </div>
      {auth.isLoggedIn && (
        <div className="flex items-center gap-x-4">
          <Notification />
          <UserAvatar menu={MENU} />
        </div>
      )}
    </div>
  )
}

export default TopBar
