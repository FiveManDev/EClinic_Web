import { Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useMemo, useState } from "react"
import { MdOutlineHistory, MdOutlinePeopleAlt } from "react-icons/md"
import LayoutItem from "../../components/layout"
import ChangePassword from "../change-password"
import HistoryQuestion from "../history-question"
import Profile from "../profile"
import { TabsWrapper } from "./Tabs.style"
import { RiLockPasswordLine } from "react-icons/ri"

const SiderBar = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setTabIndex(value)
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
        className="shadow-md h-fit"
      >
        {tabs.map((tab) => (
          <Tab
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
