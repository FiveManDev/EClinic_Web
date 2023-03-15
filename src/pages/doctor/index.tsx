import DoctorLayout from "layout/ManagementLayout/DocterLayout"
import { NextPageWithLayout } from "pages/page"
import React from "react"

const Page: NextPageWithLayout = () => {
  return <div>Doctor page</div>
}
Page.getLayout = (page) => {
  return <DoctorLayout>{page}</DoctorLayout>
}

export default Page
