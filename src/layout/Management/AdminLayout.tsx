import { useRouter } from "next/router"
import { PropsWithChildren, useMemo } from "react"
import { routers } from "shared/constant/routers"
import { logoutUser } from "store/module/auth/action-creators"
import { useAppDispatch } from "store/store"
import ManagmentLayout from "./ManagmentLayout"
import { ItemSidebar } from "./components/SideBar"

const DoctorLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const logout = () => {
    dispatch(logoutUser())
    router.push(routers.signIn)
  }
  const sidebars: ItemSidebar[] = useMemo(
    () => [
      {
        icon: (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </>
        ),
        title: "Overview",
        link: "/admin"
      },
      {
        icon: (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </>
        ),
        title: "Appointment",
        link: "/admin/appointment"
      },
      {
        icon: (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </>
        ),
        title: "Account",
        subItem: [
          {
            title: "Doctor",
            link: "/admin/accounts/doctor"
          },
          {
            title: "Supporter",
            link: "/admin/accounts/sup"
          },
          {
            title: "Patient",
            link: "/admin/accounts/user"
          },
          {
            title: "Expert",
            link: "/admin/accounts/expert"
          }
        ]
      },
      {
        title: `Logout`,
        icon: (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </>
        ),
        link: routers.signIn,
        onClick: () => logout()
      }
    ],
    []
  )
  return <ManagmentLayout sidebars={sidebars}>{children}</ManagmentLayout>
}

export default DoctorLayout
