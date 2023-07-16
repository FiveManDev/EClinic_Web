import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import TableAPM from "module/Doctor/Appoinments/sections/TableAPM"
import Head from "next/head"
import React from "react"

const AppointmentPage = () => {
  return (
    <>
      <Head>
        <title>Appointment list</title>
      </Head>
      <MainHeadingLayout heading="Appointment list">
        <TableAPM />
      </MainHeadingLayout>
    </>
  )
}

export default AppointmentPage
