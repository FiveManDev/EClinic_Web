import DoctorLayout from "layout/Management/DoctorLayout"
import dynamic from "next/dynamic"
import { NextPageWithLayout } from "pages/page"
const AppoinmentPage = dynamic(
  () => import("module/Doctor/Appoinments/AppoinmentPage")
)

const Page: NextPageWithLayout = () => {
  return <AppoinmentPage />
}
Page.getLayout = (page) => {
  return <DoctorLayout>{page}</DoctorLayout>
}

export default Page
