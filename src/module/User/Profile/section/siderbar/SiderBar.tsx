import { Tab, Tabs } from "@mui/material"
import { useRouter } from "next/router"
import { SyntheticEvent, useMemo, useState } from "react"
import { routers } from "shared/constant/routers"
import { logoutUser } from "store/module/auth/action-creators"
import { useAppDispatch } from "store/store"
import LayoutItem from "../../components/layout"
const Profile = dynamic(() => import("../profile"), {
  ssr: false
})
const ChangePassword = dynamic(() => import("../change-password"), {
  ssr: false
})
const HistoryQuestion = dynamic(() => import("../profile"), {
  ssr: false
})
const ChatData = dynamic(() => import("../chat/ChatData"), {
  ssr: false
})
const AppointmentSchedule = dynamic(
  () => import("../appoiment/AppointmentSchedule"),
  {
    ssr: false
  }
)
import { TabsWrapper } from "./Tabs.style"
import dynamic from "next/dynamic"

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
        children: (
          <LayoutItem label="Profile">
            <Profile />
          </LayoutItem>
        )
      },
      {
        key: 1,
        label: `Change password`,
        children: (
          <LayoutItem label="Change password">
            <ChangePassword />
          </LayoutItem>
        )
      },
      {
        key: 2,
        label: `History of question`,
        children: (
          <LayoutItem label="History of question">
            <HistoryQuestion />
          </LayoutItem>
        )
      },
      {
        key: 3,
        label: `Chat with doctor`,
        children: <ChatData />
      },
      {
        key: 4,
        label: `Appointment schedule`,
        children: <AppointmentSchedule />
      },
      {
        key: 5,
        label: `Logout`,
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
        className="h-fit tab-wrapper"
      >
        {tabs.map((tab) => (
          <Tab
            onClick={tab?.onclick}
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
