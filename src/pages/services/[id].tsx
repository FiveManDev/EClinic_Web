import UserLayout from "layout/User/UserLayout"
import dynamic from "next/dynamic"
import { NextPageWithLayout } from "pages/page"
const ServicesDetailPage = dynamic(
  () => import("module/User/Services/ServicesDetailPage")
)

const ServicesDetail: NextPageWithLayout = () => {
  return <ServicesDetailPage />
}
ServicesDetail.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default ServicesDetail
