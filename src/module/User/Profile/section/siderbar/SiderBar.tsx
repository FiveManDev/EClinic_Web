import { Tab, Tabs } from "@mui/material"
import { useRouter } from "next/router"
import { SyntheticEvent, useMemo, useState } from "react"
import { MdLogout, MdOutlineHistory, MdOutlinePeopleAlt } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { routers } from "shared/constant/constant"
import { logoutUser } from "store/module/auth/action-creators"
import { useAppDispatch } from "store/store"
import LayoutItem from "../../components/layout"
import ChangePassword from "../change-password"
import HistoryQuestion from "../history-question"
import Profile from "../profile"
import { TabsWrapper } from "./Tabs.style"

const SiderBar = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setTabIndex(value)
  }
  const logout = () => {
    dispatch(logoutUser())
    router.push(routers.signIn)
  }
  const tabs = useMemo(
    () => [
      {
        key: 0,
        label: `Profile`,
        icon: <MdOutlinePeopleAlt />,
        children: (
          <LayoutItem label="Profile">
            <Profile />
          </LayoutItem>
        )
      },
      {
        key: 1,
        label: `Change password`,
        icon: <RiLockPasswordLine />,
        children: (
          <LayoutItem label="Change password">
            <ChangePassword />
          </LayoutItem>
        )
      },
      {
        key: 2,
        label: `History of question`,
        icon: <MdOutlineHistory />,
        children: (
          <LayoutItem label="History of question">
            <HistoryQuestion />
          </LayoutItem>
        )
      },
      {
        key: 3,
        label: `Logout`,
        icon: <MdLogout />,
        onclick: () => logout()
      }
    ],
    []
  )
  return (
    <TabsWrapper>
      <Tabs
        orientation="vertical"
        value={tabIndex}
        onChange={handleTabChange}
        className="rounded-lg shadow-md h-fit"
      >
        {tabs.map((tab) => (
          <Tab
            onClick={tab?.onclick}
            icon={tab.icon}
            label={tab.label}
            key={tab.key}
            value={tab.key}
          />
        ))}
      </Tabs>
      {tabs.map((tab) => {
        if (tab.key === tabIndex) {
          return (
            <div className="flex-1 ml-6" key={tab.key}>
              {tab.children}
            </div>
          )
        }
      })}
    </TabsWrapper>
  )
}

export default SiderBar
