import AdminLayout from "layout/Management/AdminLayout"
import dynamic from "next/dynamic"
import { NextPageWithLayout } from "pages/page"
const AdminAppoinmentPage = dynamic(
  () => import("module/Admin/Appointment/AdminAppoinmentPage"),
  {
    ssr: false
  }
)

const Page: NextPageWithLayout = () => {
  return <AdminAppoinmentPage />
}
Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page
