import DoctorLayout from "layout/Management/DoctorLayout"
import DoctorHomePage from "module/Doctor/Home/DoctorHomePage"
import { NextPageWithLayout } from "pages/page"
import React from "react"

const Page: NextPageWithLayout = () => {
  return <DoctorHomePage />
}
Page.getLayout = (page) => {
  return <DoctorLayout>{page}</DoctorLayout>
}

export default Page
