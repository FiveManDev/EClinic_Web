import { Tab, Tabs } from "@mui/material"
import { useRouter } from "next/router"
import {
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState
} from "react"
import { routers } from "shared/constant/routers"
import { logoutUser } from "store/module/auth/action-creators"
import { useAppDispatch } from "store/store"
import LayoutItem from "../../components/layout"
import { TabsWrapper } from "./Tabs.style"
const SiderBar = ({ children }: PropsWithChildren) => {
  const [tabIndex, setTabIndex] = useState(0)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleTabChange = (_: SyntheticEvent<Element, Event>, value: any) => {
    const selectedTab = tabs.find((tab) => tab.key === value)
    if (selectedTab) {
      router.push(selectedTab.slug as string)
    }
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
        slug: "/user/my-profile"
      },
      {
        key: 1,
        label: `Change password`,
        slug: "/user/change-password"
      },
      {
        key: 2,
        label: `History of question`,
        slug: "/user/history-question"
      },
      {
        key: 3,
        label: `Chat with doctor`,
        slug: "/user/chat"
      },
      {
        key: 4,
        slug: "/user/app-schedule",
        label: `Appointment schedule`
      },
      {
        key: 5,
        label: `Logout`,
        onclick: () => logout()
      }
    ],
    []
  )
  useEffect(() => {
    if (router.pathname) {
      const currentTab = tabs.find((item) => router.pathname === item.slug)
      setTabIndex(currentTab?.key as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])
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
      <div className="flex-1 ml-6">
        <LayoutItem
          label={
            (tabs.find((tab) => tab.key === tabIndex)?.label as string) || ""
          }
        >
          {children}
        </LayoutItem>
      </div>
    </TabsWrapper>
  )
}

export default SiderBar
