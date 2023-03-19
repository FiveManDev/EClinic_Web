import { useRouter } from "next/router"
import { PropsWithChildren, useMemo } from "react"
import { MdLogout } from "react-icons/md"
import { routers } from "shared/constant/constant"
import { logoutUser } from "store/module/auth/action-creators"
import { useAppDispatch } from "store/store"
import { ItemSidebar } from "./components/SideBar"
import ManagmentLayout from "./ManagmentLayout"

const SupporterLayout = ({ children }: PropsWithChildren) => {
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
              width={18}
              height={20}
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.56836 1.66663H7.4476V7.91663H1.56836V1.66663Z"
                stroke="#5F666F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.56836 12.0833H7.4476V18.3333H1.56836V12.0833Z"
                stroke="#5F666F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3671 1.66663H17.2463V7.91663H11.3671V1.66663Z"
                stroke="#5F666F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3671 12.0833H17.2463V18.3333H11.3671V12.0833Z"
                stroke="#5F666F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ),
        title: "Overview",
        link: "/sup"
      },
      {
        icon: (
          <>
            <svg
              width={19}
              height={21}
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3018 3.49731V6.83065C10.3018 7.75112 11.104 8.49731 12.0936 8.49731H15.6771M11.1977 3.49731H5.13477C4.0302 3.49731 3.13477 4.39274 3.13477 5.49731V16.4973C3.13477 17.6019 4.03019 18.4973 5.13476 18.4973H13.6771C14.7817 18.4973 15.6771 17.6019 15.6771 16.4973V7.66398L11.1977 3.49731Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.7588 11.6223C11.7588 11.9675 11.479 12.2473 11.1338 12.2473H6.89648C6.55131 12.2473 6.27148 11.9675 6.27148 11.6223V11.6223C6.27148 11.2771 6.55131 10.9973 6.89648 10.9973H11.1338C11.479 10.9973 11.7588 11.2771 11.7588 11.6223V11.6223Z"
                fill="#5F666F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3253 14.9556C13.3253 15.3008 13.0455 15.5806 12.7003 15.5806H6.11133C5.76615 15.5806 5.48633 15.3008 5.48633 14.9556V14.9556C5.48633 14.6104 5.76615 14.3306 6.11133 14.3306H12.7003C13.0455 14.3306 13.3253 14.6104 13.3253 14.9556V14.9556Z"
                fill="#5F666F"
              />
            </svg>
          </>
        ),
        title: "Setting",
        link: "/sup/12"
      },
      {
        icon: (
          <>
            <svg
              width={19}
              height={21}
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3018 3.49731V6.83065C10.3018 7.75112 11.104 8.49731 12.0936 8.49731H15.6771M11.1977 3.49731H5.13477C4.0302 3.49731 3.13477 4.39274 3.13477 5.49731V16.4973C3.13477 17.6019 4.03019 18.4973 5.13476 18.4973H13.6771C14.7817 18.4973 15.6771 17.6019 15.6771 16.4973V7.66398L11.1977 3.49731Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.7588 11.6223C11.7588 11.9675 11.479 12.2473 11.1338 12.2473H6.89648C6.55131 12.2473 6.27148 11.9675 6.27148 11.6223V11.6223C6.27148 11.2771 6.55131 10.9973 6.89648 10.9973H11.1338C11.479 10.9973 11.7588 11.2771 11.7588 11.6223V11.6223Z"
                fill="#5F666F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3253 14.9556C13.3253 15.3008 13.0455 15.5806 12.7003 15.5806H6.11133C5.76615 15.5806 5.48633 15.3008 5.48633 14.9556V14.9556C5.48633 14.6104 5.76615 14.3306 6.11133 14.3306H12.7003C13.0455 14.3306 13.3253 14.6104 13.3253 14.9556V14.9556Z"
                fill="#5F666F"
              />
            </svg>
          </>
        ),
        title: "Question Request",
        link: "/sup/question-request"
      },
      {
        title: `Logout`,
        icon: <MdLogout />,
        link: routers.signIn,
        onClick: () => logout()
      }
    ],
    []
  )
  return <ManagmentLayout sidebars={sidebars}>{children}</ManagmentLayout>
}

export default SupporterLayout
