import {
  IconButton,
  Menu,
  MenuProps,
  Skeleton,
  styled,
  Tooltip
} from "@mui/material"
import ImageCustom from "components/Common/ImageCustom"
import { useSimpleProfile } from "hooks/query/profile/useProfile"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useSelector } from "react-redux"
import { logoutUser } from "store/module/auth/action-creators"
import { RootState, useAppDispatch } from "store/store"

const MENU = [
  {
    title: "Hồ sơ ",
    href: "/user/profile"
  },
  {
    title: "Giỏ hàng",
    href: "/profile"
  },
  {
    title: "Câu hỏi của bạn",
    href: "/profile"
  },
  {
    title: "Lịch sử giao dịch",
    href: "/profile"
  }
]

const UserAvatar = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { isLoading, data } = useSimpleProfile(user.userId)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="circular"
          width={32}
          height={32}
          className="flex-shrink-0"
        />
      )}
      {data && (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <div className="relative overflow-hidden w-9 h-9">
                <ImageCustom
                  classNameImage="overflow-hidden rounded-full"
                  src={data?.data?.avatar || "/images/default.jpeg"}
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  alt={"avatar"}
                />
              </div>
            </IconButton>
          </Tooltip>
          <StyledMenu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <div
              onClick={handleCloseUserMenu}
              className="flex flex-col w-[235px]"
            >
              <div className="flex flex-col space-y-2">
                <span className="px-5 mt-3 text-xs font-semibold uppercase text-h1">
                  Account
                </span>
                {/* profile basic */}
                <div className="flex px-5 py-3 space-x-2 ">
                  <div className="relative overflow-hidden rounded-full w-9 h-9">
                    <Image
                      src={data?.data?.avatar || "/images/default.jpeg"}
                      fill
                      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                      alt={"avatar"}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm">
                      {data.data.firstName + " " + data.data.lastName}
                    </div>
                    <small className="text-[10px] text-gray-400">
                      abc@gmail.com
                    </small>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-gray-100"></div>
                <div>
                  <span className="block px-5 mt-3 mb-2 text-xs font-semibold uppercase text-h1">
                    Eclinic
                  </span>
                  <ul className="flex flex-col w-full">
                    {MENU.map((item, index) => (
                      <Link
                        key={index}
                        href={process.env.NEXT_PUBLIC_APP_URL + item.href}
                        className="w-full py-2 transition-all cursor-pointer hover:bg-gray-100"
                      >
                        <span className="px-5 text-sm font-normal">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                    <div className="mb-1 w-full h-[2px] bg-gray-100"></div>
                    <li
                      className="w-full py-2 transition-all cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        logout()
                      }}
                    >
                      <span className="px-5 text-sm font-normal">Log out</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </StyledMenu>
        </>
      )}
    </>
  )
}
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
  }
}))
export default UserAvatar
