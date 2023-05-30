import AdminLayout from "layout/Management/AdminLayout"
import Patient from "module/Admin/Account/Patient"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <Patient />
}
Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page
