import UserLayout from "layout/User/UserLayout"
import ServicesDetailPage from "module/User/Services/ServicesDetailPage"
import { useRouter } from "next/router"
import { NextPageWithLayout } from "pages/page"

const ServicesDetail: NextPageWithLayout = () => {
  const router = useRouter()
  console.log(router.query)
  return <ServicesDetailPage />
}
ServicesDetail.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default ServicesDetail
