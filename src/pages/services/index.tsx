import UserLayout from "layout/User/UserLayout"
import ServicesPage from "module/User/Services/ServicesPage"
import { NextPageWithLayout } from "pages/page"

const Services: NextPageWithLayout = () => {
  return <ServicesPage />
}
Services.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Services
