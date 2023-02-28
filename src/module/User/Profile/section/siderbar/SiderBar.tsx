import { Tabs, TabsProps } from "antd"
import LayoutItem from "../../components/layout"
import HistoryQuestion from "../history-question"
import Profile from "../profile"
import { TabsWrapper } from "./Tabs.style"

const SiderBar = () => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Profile`,
      children: (
        <LayoutItem label="Profile">
          <Profile />
        </LayoutItem>
      )
    },
    {
      key: "2",
      label: `History of question`,
      children: (
        <LayoutItem label="History of question">
          <HistoryQuestion />
        </LayoutItem>
      )
    }
  ]
  return (
    <TabsWrapper>
      <Tabs
        className="w-full"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        tabPosition="left"
      />
    </TabsWrapper>
  )
}

export default SiderBar
