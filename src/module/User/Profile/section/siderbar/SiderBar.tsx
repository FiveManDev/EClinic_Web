import { Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useMemo, useState } from "react"
import LayoutItem from "../../components/layout"
import HistoryQuestion from "../history-question"
import Profile from "../profile"
import { TabsWrapper } from "./Tabs.style"

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
        children: (
          <LayoutItem label="Profile">
            <Profile />
          </LayoutItem>
        )
      },
      {
        key: 1,
        label: `History of question`,
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
        className="w-[300px] shadow-md h-fit "
      >
        {tabs.map((tab) => (
          <Tab
            label={tab.label}
            key={tab.key}
            value={tab.key}
            className="font-semibold"
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
