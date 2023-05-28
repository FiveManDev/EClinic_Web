import AdminLayout from "layout/Management/AdminLayout"
import Doctor from "module/Admin/Account/Doctor"
import Expert from "module/Admin/Account/Expert"
import Supporter from "module/Admin/Account/Supporter"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <Expert />
}
Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page
