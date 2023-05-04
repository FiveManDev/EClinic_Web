import styled from "@emotion/styled"
import { Tab, Tabs } from "@mui/material"
import { ReactNode, useState } from "react"
const TabsStyles = styled(Tabs)`
  .MuiTabs-flexContainer {
    .Mui-selected {
      color: #171822;
      font-weight: 600;
    }
  }
  .css-i32t7c-MuiTabs-indicator {
    background-color: #171822;
  }
`
interface Props {
  tabs: {
    key: number
    label: string
    children: ReactNode
  }[]
}
const TabsCustom = ({ tabs }: Props) => {
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <>
      <TabsStyles value={tabIndex} onChange={(_, value) => setTabIndex(value)}>
        {tabs.map((tab) => (
          <Tab
            label={tab.label}
            key={tab.key}
            value={tab.key}
            className="px-0 mr-[18px] text-base font-normal normal-case text-disable"
          />
        ))}
      </TabsStyles>
      {tabs.map((tab) => {
        if (tab.key === tabIndex) {
          return (
            <div className="flex-1" key={tab.key}>
              {tab.children}
            </div>
          )
        }
      })}
    </>
  )
}

export default TabsCustom
