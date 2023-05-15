import AdminLayout from "layout/Management/AdminLayout"
import AdminHomePage from "module/Admin/Home/AdminHomePage"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <AdminHomePage />
}
Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page
