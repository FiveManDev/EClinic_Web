import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import TabsCustom from "layout/Management/components/TabsCustom"
import CreateAccount from "module/Doctor/components/CreateAccount"
import ListDoctor from "module/Doctor/components/ListDoctor"
import ListPatient from "module/Doctor/components/ListPatient"
import Head from "next/head"
import React, { useMemo } from "react"

const Patient = () => {
  return (
    <>
      <Head>
        <title>Patient account</title>
      </Head>
      <MainHeadingLayout heading="Account Patient">
        <ListPatient />
      </MainHeadingLayout>
    </>
  )
}

export default Patient
