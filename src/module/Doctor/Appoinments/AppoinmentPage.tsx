import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import TabsCustom from "layout/Management/components/TabsCustom"
import Head from "next/head"
import { useMemo } from "react"
import TableAPM from "./sections/TableAPM"
import ScheduleAPM from "./sections/ScheduleAPM"

const AppoinmentPage = () => {
  const tabs = useMemo(
    () => [
      {
        key: 0,
        label: `All Appointment`,
        children: <TableAPM />
      },
      {
        key: 1,
        label: `My schedule`,
        children: <ScheduleAPM />
      }
    ],
    []
  )
  return (
    <>
      <Head>
        <title>Appointment page</title>
      </Head>
      <MainHeadingLayout heading="Appointment List">
        <TabsCustom tabs={tabs} />
      </MainHeadingLayout>
    </>
  )
}

export default AppoinmentPage
