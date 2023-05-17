import AdminLayout from "layout/Management/AdminLayout"
import AdminAppoinmentPage from "module/Admin/Appointment/AdminAppoinmentPage"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <AdminAppoinmentPage />
}
Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page
