import AdminLayout from "layout/Management/AdminLayout"
import Doctor from "module/Admin/Account/Doctor"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <Doctor />
}
Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page
