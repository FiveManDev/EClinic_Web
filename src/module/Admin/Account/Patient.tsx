import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import TabsCustom from "layout/Management/components/TabsCustom"
import CreateAccount from "module/Doctor/components/CreateAccount"
import ListDoctor from "module/Doctor/components/ListDoctor"
import ListPatient from "module/Doctor/components/ListPatient"
import Head from "next/head"
import React, { useMemo } from "react"

const Patient = () => {
  const tabs = useMemo(
    () => [
      {
        key: 0,
        label: `All Patient`,
        // children: <ListDoctor />
        children: <ListPatient />
      }
    ],
    []
  )
  return (
    <>
      <Head>
        <title>Patient account</title>
      </Head>
      <MainHeadingLayout heading="Account Patient">
        <TabsCustom tabs={tabs} />
      </MainHeadingLayout>
    </>
  )
}

export default Patient
