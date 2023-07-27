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
import Head from "next/head"
const SiderBar = ({ children }: PropsWithChildren) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [tabTitle, setTabTitle] = useState("")
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleTabChange = (_: SyntheticEvent<Element, Event>, value: any) => {
    const selectedTab = tabs.find((tab) => tab.key === value)
    if (selectedTab) {
      router.push(selectedTab.slug as string)
    }
    setTabIndex(value)
    setTabTitle(selectedTab?.label || "")
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
        label: `Communication`,
        slug: "/user/chat",
        layout: false
      },
      {
        key: 4,
        slug: "/user/app-schedule",
        label: `Appointment schedule`
      },
      {
        key: 5,
        slug: "/login",
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
      setTabTitle(currentTab?.label || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])
  return (
    <>
      <Head>
        <title>{tabTitle}</title>
      </Head>
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
          {tabTitle === tabs[3].label ? (
            children
          ) : (
            <LayoutItem label={tabTitle}>{children}</LayoutItem>
          )}
        </div>
      </TabsWrapper>
    </>
  )
}

export default SiderBar
