import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import Head from "next/head"
import React from "react"
import HeaderCard from "./sections/HeaderCard"
import ChartEarning from "./sections/ChartEarning"

const AdminHomePage = () => {
  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <MainHeadingLayout>
        <HeaderCard />
        <ChartEarning />
      </MainHeadingLayout>
    </>
  )
}

export default AdminHomePage
