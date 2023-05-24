import AdminLayout from "layout/Management/AdminLayout"
import Doctor from "module/Admin/Account/Doctor"
import Supporter from "module/Admin/Account/Supporter"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <Supporter />
}
Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page
