import UserLayout from "layout/User/UserLayout"
import ServicesDetailPage from "module/User/Services/ServicesDetailPage"
import { NextPageWithLayout } from "pages/page"

const ServicesDetail: NextPageWithLayout = () => {
  return <ServicesDetailPage />
}
ServicesDetail.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default ServicesDetail
